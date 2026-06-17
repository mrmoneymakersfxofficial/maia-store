const { chromium } = require('playwright');
const { spawn } = require('child_process');

const BASE = 'http://localhost:3789';
const results = [];

async function test(name, fn) {
  try {
    await fn();
    results.push({ name, status: 'PASS' });
    console.log(`  ✅ ${name}`);
  } catch (err) {
    results.push({ name, status: 'FAIL', error: err.message.slice(0, 300) });
    console.log(`  ❌ ${name}`);
    console.log(`     → ${err.message.slice(0, 300)}`);
  }
}

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

// Wait for page content to stabilize after hash navigation
async function navigateAndWait(page, url, waitForSelector, timeout = 5000) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
  if (waitForSelector) {
    try {
      await page.waitForSelector(waitForSelector, { timeout });
    } catch {
      // Some pages might not have the exact selector
    }
  }
  await wait(800);
}

(async () => {
  console.log('\n🚀 MAIA STORE — DEEP AUDIT (v2)\n');

  const server = spawn('npx', ['next', 'dev', '-p', '3789'], {
    cwd: '/home/z/my-project', stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PORT: '3789' }
  });
  let out = '';
  server.stdout.on('data', d => { out += d.toString(); });
  server.stderr.on('data', d => { out += d.toString(); });
  for (let i = 0; i < 30; i++) { await wait(1000); if (out.includes('Ready')) break; }
  await wait(2000);

  try {
    await (await fetch(BASE)).text();
  } catch {
    console.log('❌ Server failed to start');
    server.kill();
    process.exit(1);
  }
  console.log('✅ Server ready\n');

  const browser = await chromium.launch({ headless: true });

  // ═══════════════════════════════════════════
  // DESKTOP CONTEXT
  // ═══════════════════════════════════════════
  const page = await browser.newContext({ viewport: { width: 1440, height: 900 } }).then(c => c.newPage());
  page.on('pageerror', () => {});
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore common non-critical errors
      if (text.includes('favicon') || text.includes('DevTools') || text.includes('Extension')) return;
      console.log(`  ⚠ Console error: ${text.slice(0, 120)}`);
    }
  });

  // ═══════════════════════════════════════════
  // 1. HOME PAGE
  // ═══════════════════════════════════════════
  console.log('📄 HOME PAGE');
  await test('Home loads 200', async () => {
    const res = await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 });
    if (res.status() !== 200) throw new Error(`Status ${res.status}`);
    await wait(1000);
  });

  await test('Hero section with CTA buttons', async () => {
    const hero = await page.$('#hero');
    if (!hero) throw new Error('#hero missing');
    const text = await hero.innerText();
    if (!text.includes('Ver Coleccion') && !text.includes('Ver Colección')) throw new Error('Hero CTA missing');
  });

  await test('Featured products grid', async () => {
    await page.waitForSelector('#featured-products', { timeout: 8000 });
    const cards = await page.$$('#featured-products .group');
    if (cards.length === 0) throw new Error('No featured product cards');
  });

  await test('MAIA STORE branding', async () => {
    const text = await page.evaluate(() => document.body.innerText);
    if (!text.includes('MAIA') || !text.includes('STORE')) throw new Error('Branding missing');
  });

  // ═══════════════════════════════════════════
  // 2. ALL PAGE NAVIGATION
  // ═══════════════════════════════════════════
  console.log('\n🔗 NAVIGATION');
  const pages = [
    { hash: '#/nosotros', check: 'Nosotros' },
    { hash: '#/coleccion', check: 'Coleccion' },
    { hash: '#/comprar', check: 'Comprar' },
    { hash: '#/contacto', check: 'Contacto' },
    { hash: '#/buscar', check: 'joyas' },
    { hash: '#/favoritos', check: 'Favoritos' },
    { hash: '#/carrito', check: 'Carrito' },
    { hash: '#/checkout', check: 'Checkout' },
  ];
  for (const p of pages) {
    await test(`→ ${p.hash}`, async () => {
      await navigateAndWait(page, BASE + p.hash);
      const hash = await page.evaluate(() => location.hash);
      if (hash !== p.hash) throw new Error(`Hash: "${hash}" ≠ "${p.hash}"`);
      const text = await page.evaluate(() => document.body.innerText);
      if (!text.toLowerCase().includes(p.check.toLowerCase())) throw new Error(`"${p.check}" not in page`);
    });
  }

  // ═══════════════════════════════════════════
  // 3. PRODUCT DETAIL (CRITICAL)
  // ═══════════════════════════════════════════
  console.log('\n📦 PRODUCT DETAIL');
  await test('Navigate to product detail', async () => {
    await navigateAndWait(page, BASE + '#/coleccion/pulsera-boton-rosado');
    const hash = await page.evaluate(() => location.hash);
    if (!hash.includes('pulsera-boton-rosado')) throw new Error(`Hash: ${hash}`);
  });

  await test('Product detail: "Volver a la Colección" button', async () => {
    await page.waitForSelector('text=Volver a la Colección', { timeout: 8000 });
  });

  await test('Product detail: "Agregar al Carrito" button', async () => {
    await page.waitForSelector('button:has-text("Agregar al Carrito")', { timeout: 5000 });
  });

  await test('Product detail: "Pedir por WhatsApp" button', async () => {
    await page.waitForSelector('text=Pedir por WhatsApp', { timeout: 5000 });
  });

  await test('Product detail: breadcrumb navigation', async () => {
    const text = await page.evaluate(() => document.body.innerText);
    if (!text.includes('Inicio') || !text.includes('Colección')) throw new Error('Breadcrumb incomplete');
  });

  await test('Product detail: price displayed', async () => {
    const text = await page.evaluate(() => document.body.innerText);
    if (!text.includes('S/.')) throw new Error('No price (S/.) found');
  });

  // ═══════════════════════════════════════════
  // 4. COLLECTION PAGE — PRODUCT CLICK
  // ═══════════════════════════════════════════
  console.log('\n🎨 COLLECTION — PRODUCT CARD CLICK');
  await navigateAndWait(page, BASE + '#/coleccion');
  await wait(1000);

  await test('Product cards exist', async () => {
    const cards = await page.$$('.product-card');
    if (cards.length === 0) throw new Error('No .product-card elements');
  });

  await test('Click card → navigates to product detail', async () => {
    const firstCard = await page.$('.product-card');
    if (!firstCard) throw new Error('No card');
    await firstCard.click();
    await wait(1200);
    const hash = await page.evaluate(() => location.hash);
    if (!hash.match(/#\/coleccion\/[^/]+$/)) throw new Error(`Not on product detail. Hash: ${hash}`);
  });

  // ═══════════════════════════════════════════
  // 5. SEARCH
  // ═══════════════════════════════════════════
  console.log('\n🔍 SEARCH');
  await navigateAndWait(page, BASE + '#/buscar');

  await test('Search input renders', async () => {
    await page.waitForSelector('input[placeholder*="joyas"]', { timeout: 5000 });
  });

  await test('Search "aretes" filters correctly', async () => {
    const input = await page.$('input[placeholder*="joyas"]');
    await input.fill('aretes');
    await wait(800);
    const text = await page.evaluate(() => document.body.innerText.toLowerCase());
    if (!text.includes('arete')) throw new Error('No aretes in results');
    if (!text.includes('resultado')) throw new Error('No result count');
  });

  await test('Search "pulsera" shows pulseras', async () => {
    const input = await page.$('input[placeholder*="joyas"]');
    await input.fill('');
    await wait(300);
    await input.fill('pulsera');
    await wait(800);
    const text = await page.evaluate(() => document.body.innerText.toLowerCase());
    if (!text.includes('pulsera')) throw new Error('No pulseras in results');
  });

  await test('Empty search shows all products', async () => {
    const input = await page.$('input[placeholder*="joyas"]');
    await input.fill('');
    await wait(800);
    const text = await page.evaluate(() => document.body.innerText);
    if (!text.includes('productos')) throw new Error('All products not shown');
  });

  // ═══════════════════════════════════════════
  // 6. WHATSAPP IN HEADER
  // ═══════════════════════════════════════════
  console.log('\n💬 WHATSAPP IN HEADER');
  await navigateAndWait(page, BASE);

  await test('WhatsApp button in #navigation', async () => {
    const btn = await page.$('#navigation button[aria-label="WhatsApp"]');
    if (!btn) throw new Error('No WhatsApp button found');
  });

  await test('WhatsApp SVG icon present', async () => {
    const nav = await page.$('#navigation');
    const svgCount = await nav.$$eval('svg', els => els.length);
    if (svgCount < 2) throw new Error(`Only ${svgCount} SVGs in nav (expected WhatsApp + menu)`);
  });

  // ═══════════════════════════════════════════
  // 7. MOBILE BOTTOM NAV
  // ═══════════════════════════════════════════
  console.log('\n📱 MOBILE BOTTOM NAV');
  const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await mCtx.newPage();
  mp.on('pageerror', () => {});

  await navigateAndWait(mp, BASE);

  await test('grid-cols-5 bottom nav', async () => {
    const grid = await mp.$('.grid.grid-cols-5');
    if (!grid) throw new Error('No grid-cols-5');
  });

  await test('5 tab labels present', async () => {
    const text = await mp.evaluate(() => document.body.innerText);
    for (const l of ['Inicio', 'Colección', 'Favoritos', 'Carrito', 'Buscar']) {
      if (!text.includes(l)) throw new Error(`Missing "${l}"`);
    }
  });

  await test('No floating WhatsApp circle', async () => {
    const btns = await mp.$$eval('button.rounded-full', els =>
      els.filter(e => e.className.includes('shadow-lg') && e.className.includes('w-14')).length
    );
    if (btns > 0) throw new Error('Floating WhatsApp circle detected!');
  });

  await test('Click "Inicio" tab → home', async () => {
    const tabs = await mp.$$('.grid.grid-cols-5 button');
    if (tabs.length < 1) throw new Error('No tabs');
    await tabs[0].click({ force: true }); // force to avoid actionability hang
    await wait(1000);
    const hash = await mp.evaluate(() => location.hash);
    if (hash !== '#/') throw new Error(`Hash: ${hash}`);
  });

  await test('Click "Colección" tab → collection', async () => {
    const tabs = await mp.$$('.grid.grid-cols-5 button');
    if (tabs.length < 2) throw new Error('No tabs');
    await tabs[1].click({ force: true });
    await wait(1000);
    const hash = await mp.evaluate(() => location.hash);
    if (hash !== '#/coleccion') throw new Error(`Hash: ${hash}`);
  });

  await test('Click "Buscar" tab → search', async () => {
    const tabs = await mp.$$('.grid.grid-cols-5 button');
    if (tabs.length < 5) throw new Error('No tabs');
    await tabs[4].click({ force: true });
    await wait(1000);
    const hash = await mp.evaluate(() => location.hash);
    if (hash !== '#/buscar') throw new Error(`Hash: ${hash}`);
  });

  // ═══════════════════════════════════════════
  // 8. CART DRAWER (MOBILE)
  // ═══════════════════════════════════════════
  console.log('\n🛒 CART DRAWER');

  await test('Add product to cart', async () => {
    await navigateAndWait(mp, BASE + '#/coleccion/pulsera-boton-rosado', 'button:has-text("Agregar al Carrito")', 8000);
    const btn = await mp.$('button:has-text("Agregar al Carrito")');
    if (!btn) throw new Error('"Agregar al Carrito" not found');
    await btn.click();
    await wait(600);
  });

  await test('Cart tab opens drawer (not page)', async () => {
    await navigateAndWait(mp, BASE);
    const tabs = await mp.$$('.grid.grid-cols-5 button');
    if (tabs.length < 4) throw new Error('No tabs');
    await tabs[3].click({ force: true });
    await wait(1000);

    const hash = await mp.evaluate(() => location.hash);
    if (hash === '#/carrito') throw new Error('Navigated to #/carrito instead of drawer!');

    const sheet = await mp.$('[data-slot="sheet-content"]');
    if (!sheet) throw new Error('Drawer did not open');
  });

  await test('Drawer content: "Mi Carrito"', async () => {
    const text = await mp.evaluate(() => {
      const s = document.querySelector('[data-slot="sheet-content"]');
      return s ? s.innerText : '';
    });
    if (!text.includes('Mi Carrito')) throw new Error('"Mi Carrito" not in drawer');
    if (!text.includes('artículo') && !text.includes('articulos')) throw new Error('No item count');
  });

  // Close drawer
  await mp.keyboard.press('Escape');
  await wait(500);

  // ═══════════════════════════════════════════
  // 9. CONTACT — TIKTOK
  // ═══════════════════════════════════════════
  console.log('\n📱 CONTACT — TIKTOK');
  await navigateAndWait(mp, BASE + '#/contacto');

  await test('TikTok card present', async () => {
    const text = await mp.evaluate(() => document.body.innerText);
    if (!text.includes('TikTok')) throw new Error('TikTok missing');
    if (!text.includes('@maia_store81')) throw new Error('@maia_store81 missing');
  });

  await test('TikTok link correct', async () => {
    const links = await mp.$$eval('a[href*="tiktok"]', els =>
      els.map(e => e.getAttribute('href'))
    );
    if (!links.some(l => l.includes('@maia_store81'))) throw new Error('Wrong TikTok URL');
  });

  // ═══════════════════════════════════════════
  // 10. NO "GARANTÍA DE PRODUCTOS"
  // ═══════════════════════════════════════════
  console.log('\n🚫 GARANTÍA REMOVED');
  await navigateAndWait(page, BASE);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await wait(1000);

  await test('No "Garantia Artesanal"', async () => {
    const text = await page.evaluate(() => document.body.innerText);
    if (text.includes('Garantía Artesanal') || text.includes('Garantia Artesanal')) {
      throw new Error('Still present!');
    }
  });

  await test('"Calidad Premium" replaced it', async () => {
    const text = await page.evaluate(() => document.body.innerText);
    if (!text.includes('Calidad Premium')) throw new Error('"Calidad Premium" not found');
  });

  // ═══════════════════════════════════════════
  // 11. CATEGORY FILTERS
  // ═══════════════════════════════════════════
  console.log('\n🏷️ CATEGORIES');
  await test('Category URL: aretes', async () => {
    await navigateAndWait(page, BASE + '#/coleccion/categoria/aretes');
    const text = await page.evaluate(() => document.body.innerText.toLowerCase());
    if (!text.includes('arete')) throw new Error('Aretes not shown');
  });

  await test('Category URL: collares', async () => {
    await navigateAndWait(page, BASE + '#/coleccion/categoria/collares');
    const text = await page.evaluate(() => document.body.innerText.toLowerCase());
    if (!text.includes('collar')) throw new Error('Collares not shown');
  });

  await test('Category URL: pulseras', async () => {
    await navigateAndWait(page, BASE + '#/coleccion/categoria/pulseras');
    const text = await page.evaluate(() => document.body.innerText.toLowerCase());
    if (!text.includes('pulsera')) throw new Error('Pulseras not shown');
  });

  // ═══════════════════════════════════════════
  // 12. SCROLL PROGRESS & BACK-TO-TOP
  // ═══════════════════════════════════════════
  console.log('\n⬆️ UI ELEMENTS');
  await test('Scroll progress bar in DOM', async () => {
    await navigateAndWait(mp, BASE);
    const fixed = await mp.$$eval('.fixed', els => els.length);
    if (fixed < 3) throw new Error(`Only ${fixed} fixed elements (expected nav + scroll progress + ...)`);
  });

  // ═══════════════════════════════════════════
  // SUMMARY
  // ═══════════════════════════════════════════
  console.log('\n' + '═'.repeat(55));
  console.log('📊 AUDIT RESULTS');
  console.log('═'.repeat(55));
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  console.log(`  Total: ${results.length}  |  ✅ Passed: ${passed}  |  ❌ Failed: ${failed}`);

  if (failed > 0) {
    console.log('\n❌ FAILED:');
    results.filter(r => r.status === 'FAIL').forEach(r => {
      console.log(`  • ${r.name}`);
      console.log(`    ${r.error}`);
    });
  } else {
    console.log('\n🎉 ALL TESTS PASSED — EVERYTHING WORKS PERFECTLY');
  }
  console.log('');

  await browser.close();
  server.kill();
  process.exit(failed > 0 ? 1 : 0);
})();