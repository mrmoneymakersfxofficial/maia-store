const { chromium } = require('playwright');
const { spawn } = require('child_process');

const BASE = 'http://localhost:3789';
const issues = [];

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  console.log('⏳ Starting server...');
  const server = spawn('npx', ['next', 'dev', '-p', '3789'], {
    cwd: '/home/z/my-project', stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PORT: '3789' }
  });
  let out = '';
  server.stdout.on('data', d => { out += d.toString(); });
  server.stderr.on('data', d => { out += d.toString(); });
  for (let i = 0; i < 30; i++) { await wait(1000); if (out.includes('Ready')) break; }
  await wait(2000);

  // Track all 404s and console errors
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  
  const errors404 = [];
  const consoleErrors = [];
  page.on('response', resp => {
    if (resp.status() === 404) {
      errors404.push(resp.url());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message.slice(0, 200));
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const t = msg.text();
      if (!t.includes('favicon') && !t.includes('DevTools')) {
        consoleErrors.push(t.slice(0, 200));
      }
    }
  });

  // ═══ TEST 1: Real product click flow ═══
  console.log('🔍 TEST 1: Real product click from collection');
  await page.goto(BASE + '#/coleccion', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(2000);

  // Get first product slug from the page
  const firstSlug = await page.evaluate(() => {
    const card = document.querySelector('.product-card');
    if (!card) return null;
    // The card's onClick navigates to #/coleccion/${product.slug}
    // We can find it from the card's click handler or just click it
    return 'WILL_CLICK';
  });

  // Click first product card
  const card = await page.$('.product-card');
  if (card) {
    const clickHash = await page.evaluate(() => location.hash);
    await card.click();
    await wait(1500);
    const newHash = await page.evaluate(() => location.hash);
    const pageText = await page.evaluate(() => document.body.innerText);
    
    console.log(`  Before click: ${clickHash}`);
    console.log(`  After click: ${newHash}`);
    console.log(`  Page text contains:`);
    console.log(`    "Volver": ${pageText.includes('Volver')}`);
    console.log(`    "Agregar al Carrito": ${pageText.includes('Agregar al Carrito')}`);
    console.log(`    "Pedir por WhatsApp": ${pageText.includes('Pedir por WhatsApp')}`);
    console.log(`    "S/.": ${pageText.includes('S/.')}`);
    
    if (newHash.match(/#\/coleccion\/[^/]+$/) && 
        pageText.includes('Volver') && 
        pageText.includes('Agregar al Carrito')) {
      console.log('  ✅ PRODUCT CLICK FLOWS CORRECTLY');
    } else {
      console.log('  ❌ PRODUCT CLICK IS BROKEN');
      issues.push('Product detail page not rendering after click');
    }
  }

  // ═══ TEST 2: Bottom nav with JS evaluate ═══
  console.log('\n🔍 TEST 2: Bottom nav via JS dispatch');
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(2000);

  // Test Colección tab
  const beforeHash = await page.evaluate(() => location.hash);
  await page.evaluate(() => {
    const tabs = document.querySelectorAll('.grid.grid-cols-5 button');
    if (tabs[1]) tabs[1].click(); // Colección
  });
  await wait(1200);
  const afterHash = await page.evaluate(() => location.hash);
  console.log(`  Before: "${beforeHash}" → After: "${afterHash}"`);
  if (afterHash === '#/coleccion') {
    console.log('  ✅ BOTTOM NAV COLECCIÓN WORKS');
  } else {
    console.log('  ❌ BOTTOM NAV BROKEN - hash not set');
    // Check if navigate function exists
    const navCheck = await page.evaluate(() => {
      try {
        // Check if the React fiber has the click handler
        const tabs = document.querySelectorAll('.grid.grid-cols-5 button');
        const tab = tabs[1];
        if (!tab) return 'no tab found';
        // Try getting React props
        const key = Object.keys(tab).find(k => k.startsWith('__reactFiber'));
        if (key) {
          const fiber = tab[key];
          return `React fiber found, memoizedProps: ${!!fiber.memoizedProps}`;
        }
        return 'no React fiber';
      } catch(e) { return e.message; }
    });
    console.log(`  Debug: ${navCheck}`);
  }

  // Test Buscar tab
  await page.evaluate(() => {
    const tabs = document.querySelectorAll('.grid.grid-cols-5 button');
    if (tabs[4]) tabs[4].click(); // Buscar
  });
  await wait(1200);
  const buscarHash = await page.evaluate(() => location.hash);
  console.log(`  Buscar tab → "${buscarHash}"`);

  // ═══ TEST 3: 404 resources ═══
  console.log('\n🔍 TEST 3: 404 resources check');
  await page.goto(BASE + '#/coleccion', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(3000);
  // Collect more 404s by scrolling
  await page.evaluate(() => window.scrollTo(0, 1000));
  await wait(1000);

  // ═══ RESULTS ═══
  console.log('\n' + '═'.repeat(50));
  console.log('🔍 DIAGNOSTIC RESULTS');
  console.log('═'.repeat(50));
  
  console.log(`\n📡 404 URLs (${errors404.length}):`);
  errors404.forEach(u => console.log(`  ${u}`));
  
  console.log(`\n⚠️  Console Errors (${consoleErrors.length}):`);
  consoleErrors.forEach(e => console.log(`  ${e}`));
  
  console.log(`\n🐛 Issues Found: ${issues.length}`);
  issues.forEach(i => console.log(`  • ${i}`));
  
  await browser.close();
  server.kill();
  process.exit(0);
})();