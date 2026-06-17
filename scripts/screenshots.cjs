const { chromium } = require('playwright');
const { spawn } = require('child_process');

const BASE = 'http://localhost:3789';
const DIR = '/home/z/my-project/download/audit-screenshots';

const fs = require('fs');
fs.mkdirSync(DIR, { recursive: true });

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
  console.log('✅ Server ready\n');

  const browser = await chromium.launch({ headless: true });
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });

  async function screenshot(page, name, opts = {}) {
    const path = `${DIR}/${name}.png`;
    await page.screenshot({ path, fullPage: opts.fullPage || false });
    console.log(`📸 ${name}.png`);
  }

  // ═══ DESKTOP SCREENSHOTS ═══
  const dp = await desktop.newPage();

  console.log('── DESKTOP ──');
  await dp.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(2000);
  await screenshot(dp, '01-desktop-home');

  // Scroll down on home
  await dp.evaluate(() => window.scrollTo(0, 800));
  await wait(500);
  await screenshot(dp, '02-desktop-home-featured');

  await dp.goto(BASE + '#/coleccion', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(2000);
  await screenshot(dp, '03-desktop-coleccion');

  await dp.goto(BASE + '#/coleccion/pulsera-boton-rosado', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(2500);
  await screenshot(dp, '04-desktop-product-detail');

  await dp.goto(BASE + '#/buscar', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(1500);
  const searchInput = await dp.$('input[placeholder*="joyas"]');
  if (searchInput) {
    await searchInput.fill('aretes');
    await wait(1000);
  }
  await screenshot(dp, '05-desktop-search-aretes');

  await dp.goto(BASE + '#/contacto', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(2000);
  await screenshot(dp, '06-desktop-contacto');

  await dp.goto(BASE + '#/favoritos', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(2000);
  await screenshot(dp, '07-desktop-favoritos');

  await dp.goto(BASE + '#/carrito', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(2000);
  await screenshot(dp, '08-desktop-carrito');

  await dp.goto(BASE + '#/nosotros', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(2000);
  await screenshot(dp, '09-desktop-nosotros');

  await dp.goto(BASE + '#/comprar', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(2000);
  await screenshot(dp, '10-desktop-comprar');

  // Header WhatsApp closeup
  await dp.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(2000);
  const nav = await dp.$('#navigation');
  if (nav) {
    await nav.screenshot({ path: `${DIR}/11-desktop-header-closeup.png` });
    console.log('📸 11-desktop-header-closeup.png');
  }

  // ═══ MOBILE SCREENSHOTS ═══
  const mp = await mobile.newPage();
  console.log('\n── MOBILE (390×844) ──');

  await mp.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(2000);
  await screenshot(mp, '12-mobile-home');

  await mp.goto(BASE + '#/coleccion', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(2000);
  await screenshot(mp, '13-mobile-coleccion');

  // Product detail on mobile
  await mp.goto(BASE + '#/coleccion/pulsera-boton-rosado', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(2500);
  await screenshot(mp, '14-mobile-product-detail');

  // Search on mobile
  await mp.goto(BASE + '#/buscar', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(1500);
  const mSearch = await mp.$('input[placeholder*="joyas"]');
  if (mSearch) {
    await mSearch.fill('collares');
    await wait(1000);
  }
  await screenshot(mp, '15-mobile-search-collares');

  // Bottom nav closeup on mobile
  await mp.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(2000);
  await mp.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await wait(500);
  // Take screenshot of the full mobile page (includes bottom nav at bottom)
  await screenshot(mp, '16-mobile-full-with-bottomnav');

  // Cart drawer on mobile - need to add item first
  await mp.goto(BASE + '#/coleccion/pulsera-boton-rosado', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(2500);
  const addBtn = await mp.$('button:has-text("Agregar al Carrito")');
  if (addBtn) {
    await addBtn.click();
    await wait(600);
    console.log('  → Added item to cart');
  } else {
    console.log('  ⚠ Could not find add to cart button');
  }

  // Open cart drawer
  await mp.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(1500);
  const tabs = await mp.$$('.grid.grid-cols-5 button');
  if (tabs.length >= 4) {
    await tabs[3].click();
    await wait(1000);
    await screenshot(mp, '17-mobile-cart-drawer');
  }

  console.log(`\n✅ ${fs.readdirSync(DIR).length} screenshots saved to ${DIR}/`);

  await browser.close();
  server.kill();
  process.exit(0);
})();