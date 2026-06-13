#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// MAIA STORE — Batch Import Fix (Round 2)
// Properly processes 9 ZIPs with correct naming, variants, slugs
// ═══════════════════════════════════════════════════════════════

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const TEMP_DIR = '/tmp/maia-batch-import';
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'public/products');
const PRODUCTS_JSON = path.join(PROJECT_ROOT, 'scripts/products.json');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
function isImage(f) { return IMAGE_EXTS.has(path.extname(f).toLowerCase()); }

function slugify(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// ─── Color Map ──────────────────────────────────────────────
const COLOR_MAP = {
  'C03': 'Rosado', 'C04': 'Fucsia', 'C05': 'Morado', 'C06': 'Crema',
  'C07': 'Dorado', 'C08': 'Turquesa', 'C09': 'Negro', 'C10': 'Blanco',
  'C11': 'Rojo', 'C12': 'Azul', 'C13': 'Verde Agua', 'C14': 'Naranja',
  'C15': 'Verde Botella', 'C16': 'Lila', 'C17': 'Gris', 'C18': 'Marrón',
  'C19': 'Rosa Pastel', 'C20': 'Celeste', 'C25': 'Rosa', 'C26': 'Lila Claro',
};

const COLOR_HEX = {
  'Rosado': '#F4A0B0', 'Fucsia': '#C2185B', 'Morado': '#7B1FA2', 'Crema': '#F5F0DC',
  'Dorado': '#D4A843', 'Turquesa': '#26C6DA', 'Negro': '#212121', 'Blanco': '#F5F5F5',
  'Rojo': '#D32F2F', 'Azul': '#1976D2', 'Verde Agua': '#4DB6AC', 'Naranja': '#FF9800',
  'Verde Botella': '#2E7D32', 'Lila': '#9C27B0', 'Gris': '#757575', 'Marrón': '#795548',
  'Rosa Pastel': '#F8BBD0', 'Celeste': '#81D4FA', 'Rosa': '#E91E63', 'Lila Claro': '#CE93D8',
  'Cuarzo Rosa': '#F48FB1', 'Rodocrosita': '#E57373', 'Amatista': '#AB47BC',
  'Amazonita': '#66BB6A', 'Plata': '#B0BEC5', 'Plata Dorada': '#C9A86A',
  'Rombo': '#90A4AE', 'Navideño': '#C62828', 'Verde y Menta': '#26A69A',
  'Negro y Tornasol': '#37474F', 'Rojo y Tornasol': '#C62828', 'Celeste y Rosado': '#80DEEA',
  'M01': '#B0BEC5', 'M20': '#C9A86A', 'M12': '#D7CCC8',
  'C08 y C12': '#4FC3F7', 'C25 y C26': '#F48FB1',
};

// ─── Load existing products ────────────────────────────────
const existing = fs.existsSync(PRODUCTS_JSON) ? JSON.parse(fs.readFileSync(PRODUCTS_JSON, 'utf-8')) : [];
const existingSlugs = new Set(existing.map(p => p.slug));
const existingSkus = new Set(existing.map(p => p.sku));
let nextId = Math.max(...existing.map(p => p.id), 0) + 1;

const newProducts = [];
const allErrors = [];
const allImages = []; // {sourcePath, destDir, destName}

function addProduct(opts) {
  // Check duplicates
  if (opts.sku && existingSkus.has(opts.sku)) {
    allErrors.push(`SKU duplicate: ${opts.sku} (${opts.name})`);
    return;
  }
  if (existingSlugs.has(opts.slug)) {
    allErrors.push(`Slug duplicate: ${opts.slug} (${opts.name})`);
    return;
  }

  const product = {
    id: nextId++,
    slug: opts.slug,
    sku: opts.sku,
    name: opts.name,
    fullName: `${opts.name} — ${opts.collectionName}`,
    price: opts.price || null,
    collection: { id: opts.collectionSlug, name: opts.collectionName },
    type: { id: opts.typeSlug, name: opts.typeName },
    category: opts.category,
    categoryLabel: opts.categoryLabel,
    color: { name: opts.colorName, code: opts.colorCode || null },
    size: opts.size || null,
    images: opts.images,
    description: `${opts.typeName} artesanal, colección ${opts.collectionName}.`,
    longDescription: opts.longDescription || `Elegante ${opts.typeName.toLowerCase()} artesanal. Parte de la exclusiva colección "${opts.collectionName}", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.`,
    features: [
      'Elaboración artesanal 100% a mano',
      `Colección: ${opts.collectionName}`,
      `Color: ${opts.colorName}`,
      opts.size ? `Tamaño: ${opts.size}mm` : null,
      'Materiales premium importados',
      'Acabado profesional de lujo',
      'Base hipoalergénica de plata 925',
      'Presentación en caja de regalo',
    ].filter(Boolean),
    rating: parseFloat((4.8 + Math.random() * 0.19).toFixed(1)),
    reviews: Math.floor(Math.random() * 40) + 15,
    inStock: true,
  };

  newProducts.push(product);
  existingSlugs.add(opts.slug);
  if (opts.sku) existingSkus.add(opts.sku);
  console.log(`  ✅ [#${product.id}] ${product.name} (${opts.images.length} imgs, SKU: ${opts.sku || 'auto'})`);
}

// ─── Process images helper ─────────────────────────────────
function processVariantDir(variantPath, collectionSlug, typeSlug, colorSlug) {
  const imageDir = `${collectionSlug}/${typeSlug}/${colorSlug}`;
  const files = fs.readdirSync(variantPath).filter(f => isImage(f)).sort();
  const images = files.map((f, idx) => {
    const destName = `${colorSlug}-${idx + 1}`;
    allImages.push({
      sourcePath: variantPath,
      sourceFile: f,
      destDir: imageDir,
      destName,
    });
    return {
      original: `/products/${imageDir}/${destName}.webp`,
      optimized: `/products/${imageDir}/${destName}-800.webp`,
      thumbnail: `/products/${imageDir}/${destName}-thumb.webp`,
      file: f,
    };
  });
  return images;
}

// ─── Process all 9 ZIPs ─────────────────────────────────────
console.log('═══ MAIA STORE — Comprehensive Batch Import Fix ═══\n');

// ══════════════════════════════════════════════════════════════
// ZIP 1: Juego Flor de Plata Swarovski Rombo (empty - flat)
// ══════════════════════════════════════════════════════════════
{
  console.log('\n📦 ZIP 1: Juego Flor de Plata Swarovski Rombo');
  const base = path.join(TEMP_DIR, 'Juego Flor de Plata Swarovski Rombo', 'Juego Flor de Plata Swarovski Rombo');
  if (fs.existsSync(base)) {
    const files = fs.readdirSync(base).filter(f => isImage(f));
    if (files.length > 0) {
      const colSlug = 'juego-flor-de-plata-swarovski';
      const typeSlug = 'juego-flor-de-plata-swarovski-rombo';
      const images = processVariantDir(base, colSlug, typeSlug, 'rombo');
      addProduct({
        slug: `${colSlug}-${typeSlug}-rombo`,
        sku: 'JFPSSWROM',
        name: 'Juego Flor de Plata Swarovski Rombo',
        collectionName: 'Juego Flor de Plata Swarovski',
        collectionSlug: colSlug,
        typeName: 'Juego Flor de Plata Swarovski Rombo',
        typeSlug,
        category: 'juegos', categoryLabel: 'Juegos Completos',
        colorName: 'Rombo', colorCode: 'SWROM',
        size: 175,
        images,
        price: 150,
      });
    } else { allErrors.push('ZIP 1: No images found'); }
  } else { allErrors.push('ZIP 1: Directory not found'); }
}

// ══════════════════════════════════════════════════════════════
// ZIP 2: Juego Flor de Plata Swarovski (standard)
// ══════════════════════════════════════════════════════════════
{
  console.log('\n📦 ZIP 2: Juego Flor de Plata Swarovski');
  const colName = 'Juego Flor de Plata Swarovski';
  const colSlug = 'juego-flor-de-plata-swarovski';

  const variants = [
    // Aretes
    { type: 'Aretes Flor de Plata Swarovski', typeSlug: 'aretes-flor-de-plata-swarovski', cat: 'aretes', catLabel: 'Aretes',
      dir: 'Aretes Flor de Plata Swarovski CPYM01 AFPSCPYM01 S-150', color: 'Modelo 1', colorCode: 'M01', sku: 'AFPSCPYM01', size: 150 },
    { type: 'Aretes Flor de Plata Swarovski', typeSlug: 'aretes-flor-de-plata-swarovski', cat: 'aretes', catLabel: 'Aretes',
      dir: 'Aretes Flor de Plata Swarovski CPYM20 AFPSCPYM20 S-150', color: 'Modelo 2', colorCode: 'M20', sku: 'AFPSCPYM20', size: 150 },
    // Collar
    { type: 'Collar Flor de Plata Swarovski', typeSlug: 'collar-flor-de-plata-swarovski', cat: 'collares', catLabel: 'Collares',
      dir: 'Collar Flor de Plata Swarovski CPYM01 CFPSCPYM01 S-140', color: 'Modelo 1', colorCode: 'M01', sku: 'CFPSCPYM01', size: 140 },
    { type: 'Collar Flor de Plata Swarovski', typeSlug: 'collar-flor-de-plata-swarovski', cat: 'collares', catLabel: 'Collares',
      dir: 'Collar Flor de Plata Swarovski CPYM20 CFPSCPYM20 S-140', color: 'Modelo 2', colorCode: 'M20', sku: 'CFPSCPYM20', size: 140 },
    // Juegos
    { type: 'Juegos Flor de Plata Swarovski', typeSlug: 'juegos-flor-de-plata-swarovski', cat: 'juegos', catLabel: 'Juegos Completos',
      dir: 'Juego Flor de Plata Swarovski CPYM01 JFPSCPYM01 S-260', color: 'Modelo 1', colorCode: 'M01', sku: 'JFPSCPYM01', size: 260 },
    { type: 'Juegos Flor de Plata Swarovski', typeSlug: 'juegos-flor-de-plata-swarovski', cat: 'juegos', catLabel: 'Juegos Completos',
      dir: 'Juego Flor de Plata Swarovski CPYM20 CFPSCPYM20 S-260', color: 'Modelo 2', colorCode: 'M20', sku: 'JFPSCPYM20', size: 260 },
  ];

  const typeBase = path.join(TEMP_DIR, 'Juego Flor de Plata Swarovski', 'Juego Flor de Plata Swarovski');
  // Build a map of SKU → path for all variants
  const skuPathMap = new Map();
  const searchDirs = fs.existsSync(typeBase) ? fs.readdirSync(typeBase, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name) : [];
  for (const sd of searchDirs) {
    const candidate = path.join(typeBase, sd);
    if (!fs.existsSync(candidate)) continue;
    const innerDirs = fs.readdirSync(candidate, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name);
    for (const id of innerDirs) {
 const m = id.match(/([A-Z]{4,12}\d*)\s+S-/);
      if (m) skuPathMap.set(m[1], path.join(candidate, id));
    }
  }

  for (const v of variants) {
    const variantPath = skuPathMap.get(v.sku);

    if (!variantPath || !fs.existsSync(variantPath)) {
      allErrors.push(`ZIP 2: Not found: ${v.dir}`);
      continue;
    }

    const images = processVariantDir(variantPath, colSlug, v.typeSlug, slugify(v.color));
    const priceGuess = v.cat === 'aretes' ? 75 : v.cat === 'collares' ? 85 : 160;
    addProduct({
      slug: `${colSlug}-${v.typeSlug}-${slugify(v.color)}`,
      sku: v.sku,
      name: `${v.type} ${v.color}`,
      collectionName: colName, collectionSlug: colSlug,
      typeName: v.type, typeSlug: v.typeSlug,
      category: v.cat, categoryLabel: v.catLabel,
      colorName: v.color, colorCode: v.colorCode,
      size: v.size, images, price: priceGuess,
    });
  }
}

// ══════════════════════════════════════════════════════════════
// ZIP 3: Juego Engaste Abierto Piedra Redonda Rodocrosita (empty)
// ══════════════════════════════════════════════════════════════
{
  console.log('\n📦 ZIP 3: Juego Engaste Abierto Rodocrosita');
  const base = path.join(TEMP_DIR, 'Juego Engaste Abierto Piedra Redonda Rodocrosita JEAPRRC S-175', 'Juego Engaste Abierto Piedra Redonda Rodocrosita JEAPRRC S-175');
  if (fs.existsSync(base)) {
    const colSlug = 'juego-engaste-abierto';
    const typeSlug = 'juego-engaste-abierto-rodocrosita';
    const images = processVariantDir(base, colSlug, typeSlug, 'rodocrosita');
    addProduct({
      slug: `${colSlug}-${typeSlug}-rodocrosita`,
      sku: 'JEAPRRC',
      name: 'Juego Engaste Abierto Rodocrosita',
      collectionName: 'Juego Engaste Abierto',
      collectionSlug: colSlug,
      typeName: 'Juego Engaste Abierto Rodocrosita',
      typeSlug,
      category: 'juegos', categoryLabel: 'Juegos Completos',
      colorName: 'Rodocrosita', colorCode: null,
      size: 175, images, price: 145,
    });
  } else { allErrors.push('ZIP 3: Not found'); }
}

// ══════════════════════════════════════════════════════════════
// ZIP 4: Juego Engaste Abierta Piedra Redonda Cuarzo Rosa (empty)
// ══════════════════════════════════════════════════════════════
{
  console.log('\n📦 ZIP 4: Juego Engaste Abierto Cuarzo Rosa');
  const base = path.join(TEMP_DIR, 'Juego Engaste Abierta Piedra Redonda Cuarzo Rosa JCCRD03 S-175', 'Juego Engaste Abierta Piedra Redonda Cuarzo Rosa JCCRD03 S-175');
  if (fs.existsSync(base)) {
    const colSlug = 'juego-engaste-abierto';
    const typeSlug = 'juego-engaste-abierto-cuarzo-rosa';
    const images = processVariantDir(base, colSlug, typeSlug, 'cuarzo-rosa');
    addProduct({
      slug: `${colSlug}-${typeSlug}-cuarzo-rosa`,
      sku: 'JCCRD03',
      name: 'Juego Engaste Abierto Cuarzo Rosa',
      collectionName: 'Juego Engaste Abierto',
      collectionSlug: colSlug,
      typeName: 'Juego Engaste Abierto Cuarzo Rosa',
      typeSlug,
      category: 'juegos', categoryLabel: 'Juegos Completos',
      colorName: 'Cuarzo Rosa', colorCode: null,
      size: 175, images, price: 145,
    });
  } else { allErrors.push('ZIP 4: Not found'); }
}

// ══════════════════════════════════════════════════════════════
// ZIP 5: Dije Engaste Abierto Piedra Corazón (4 variants)
// ══════════════════════════════════════════════════════════════
{
  console.log('\n📦 ZIP 5: Dije Engaste Abierto Piedra Corazón');
  const colName = 'Dije Engaste Abierto';
  const colSlug = 'dije-engaste-abierto';
  const typeSlug = 'dije-engaste-abierto-piedra-corazon';
  const typeBase = path.join(TEMP_DIR, 'Dije Engaste Abierto Piedra Corazón', 'Dije Engaste Abierto Piedra Corazón');

  const stoneVariants = [
    { dir: 'Dije Engaste Abierto Piedra Corazón Cuarzo Rosa DEAPC2CR S-125', color: 'Cuarzo Rosa', sku: 'DEAPC2CR' },
    { dir: 'Dije Engaste Abierto Piedra Corazón Amatista DEAPC2AT S-125', color: 'Amatista', sku: 'DEAPC2AT' },
    { dir: 'Dije Engaste Abierto Piedra Corazón Rodocrosita DEAPC2RC S-125_', color: 'Rodocrosita', sku: 'DEAPC2RC' },
    { dir: 'Dije Engaste Abierto Piedra Corazón Amazonita DEAPC2AZ S-125_', color: 'Amazonita', sku: 'DEAPC2AZ' },
  ];

  for (const v of stoneVariants) {
    // Find by SKU (folder names may have trailing underscores)
    const dirs = fs.existsSync(typeBase) ? fs.readdirSync(typeBase, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name) : [];
    let vp = null;
    for (const d of dirs) {
      if (d.includes(v.sku)) { vp = path.join(typeBase, d); break; }
    }
    if (!vp) { allErrors.push(`ZIP 5: Not found: ${v.color} (${v.sku})`); continue; }

    const colorSlug = slugify(v.color);
    const files = fs.readdirSync(vp).filter(f => isImage(f));
    if (files.length === 0) { allErrors.push(`ZIP 5: No images for ${v.color}`); continue; }
    const images = processVariantDir(vp, colSlug, typeSlug, colorSlug);
    addProduct({
      slug: `${colSlug}-${typeSlug}-${colorSlug}`,
      sku: v.sku,
      name: `Dije Engaste Corazón ${v.color}`,
      collectionName: colName, collectionSlug: colSlug,
      typeName: 'Dije Engaste Abierto Corazón', typeSlug,
      category: 'dijes', categoryLabel: 'Dijes',
      colorName: v.color, colorCode: null,
      size: 125, images, price: 55,
    });
  }
}

// ══════════════════════════════════════════════════════════════
// ZIP 6: Aretes Corazón Abierto Swarovski (2 variants)
// ══════════════════════════════════════════════════════════════
{
  console.log('\n📦 ZIP 6: Aretes Corazón Abierto Swarovski');
  const colName = 'Aretes Corazón Abierto Swarovski';
  const colSlug = 'aretes-corazon-abierto-swarovski';
  const typeSlug = 'aretes-corazon-abierto-swarovski';
  const typeBase = path.join(TEMP_DIR, 'Aretes Corazón Abierto Swarovski', 'Aretes Corazón Abierto Swarovski');

  const variants = [
    { dir: 'Aretes Corazón Abierto Swarovski ACASCM01 S-110', color: 'Modelo 1', colorCode: 'M01', sku: 'ACASCM01' },
    { dir: 'Aretes Corazón Abierto Swarovski ACASCM12 S-110', color: 'Modelo 2', colorCode: 'M12', sku: 'ACASCM12' },
  ];

  for (const v of variants) {
    const variantPath = path.join(typeBase, v.dir);
    if (!fs.existsSync(variantPath)) {
      allErrors.push(`ZIP 6: Not found: ${v.color}`); continue;
    }
    const colorSlug = slugify(v.color);
    const images = processVariantDir(variantPath, colSlug, typeSlug, colorSlug);
    addProduct({
      slug: `${colSlug}-${typeSlug}-${colorSlug}`,
      sku: v.sku,
      name: `Aretes Corazón Abierto Swarovski ${v.color}`,
      collectionName: colName, collectionSlug: colSlug,
      typeName: 'Aretes Corazón Abierto Swarovski', typeSlug,
      category: 'aretes', categoryLabel: 'Aretes',
      colorName: v.color, colorCode: v.colorCode,
      size: 110, images, price: 65,
    });
  }
}

// ══════════════════════════════════════════════════════════════
// ZIP 7: Aretes Circular 12 (empty, 2 image files = 2 products)
// ══════════════════════════════════════════════════════════════
{
  console.log('\n📦 ZIP 7: Aretes Circular 12');
  const base = path.join(TEMP_DIR, 'Aretes Circular 12', 'Aretes Circular 12');
  const colName = 'Aretes Circular';
  const colSlug = 'aretes-circular';
  const typeSlug = 'aretes-circular-12';

  if (fs.existsSync(base)) {
    const files = fs.readdirSync(base).filter(f => isImage(f));
    for (const f of files) {
      // Parse filename: "Aretes Circular C25 y C26 ACL2C25 ACL2C26 S_55.jpg"
      const match = f.match(/Aretes Circular\s+(C\d+\s*y\s*C\d+)/);
      const colorPart = match ? match[1] : 'Personalizado';
      const skuMatch = f.match(/ACL2(C\d+)/);
      const sku = skuMatch ? `ACL2${skuMatch[1]}` : null;
      const colorSlug = slugify(colorPart);

      // Create a temp dir for each image to process
      const tempDir = path.join(base, `_temp_${colorSlug}`);
      fs.mkdirSync(tempDir, { recursive: true });
      fs.copyFileSync(path.join(base, f), path.join(tempDir, f));

      const images = processVariantDir(tempDir, colSlug, typeSlug, colorSlug);

      addProduct({
        slug: `${colSlug}-${typeSlug}-${colorSlug}`,
        sku,
        name: `Aretes Circular 12 ${colorPart}`,
        collectionName: colName, collectionSlug: colSlug,
        typeName: 'Aretes Circular 12', typeSlug,
        category: 'aretes', categoryLabel: 'Aretes',
        colorName: colorPart, colorCode: null,
        size: 55, images, price: 40,
      });
    }
  } else { allErrors.push('ZIP 7: Not found'); }
}

// ══════════════════════════════════════════════════════════════
// ZIP 8: Juego Aro Atrapasueño (deep - 5 colors x 2 types)
// ══════════════════════════════════════════════════════════════
{
  console.log('\n📦 ZIP 8: Juego Aro Atrapasueño');
  const colName = 'Juego Aro Atrapasueño';
  const colSlug = 'juego-aro-atrapasueno';
  const base = path.join(TEMP_DIR, 'Juego Aro Atrapasueño', 'Juego Aro Atrapasueño');

  // Structure: variant dirs contain juego images and optionally aretes subdir
  const variantDirs = fs.existsSync(base) ? fs.readdirSync(base, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name) : [];

  for (const vd of variantDirs) {
    const variantPath = path.join(base, vd);
    const inner = fs.readdirSync(variantPath, { withFileTypes: true });
    const innerFiles = inner.filter(e => e.isFile()).filter(e => isImage(e.name)).map(e => e.name);
    const innerDirs = inner.filter(e => e.isDirectory()).map(e => e.name);

    // Parse variant name for color and SKU
    // e.g., "Juego Aro Atrapasueño Celeste y Rosado JAATCYR S-180"
    const skuMatch = vd.match(/([A-Z]{4,8})\s+S-\d+/);
    const sku = skuMatch ? skuMatch[1] : null;
    // Extract color name (between "Atrapasueño" and SKU)
    const colorMatch = vd.match(/Atrapasueño\s+(.+?)\s+[A-Z]{4}/);
    const colorName = colorMatch ? colorMatch[1].trim() : vd.replace(/Atrapasueño\s*/, '').replace(/\s+[A-Z]{4,}.*$/, '').trim() || 'Personalizado';
    const colorSlug = slugify(colorName);
    // Size from filename
    const sizeMatch = vd.match(/S-(\d+)/);
    const size = sizeMatch ? parseInt(sizeMatch[1]) : 180;

    // Juego (images at variant level)
    if (innerFiles.length > 0) {
      const images = processVariantDir(variantPath, colSlug, 'juego-aro-atrapasueno', colorSlug);
      addProduct({
        slug: `${colSlug}-juego-aro-atrapasueno-${colorSlug}`,
        sku: sku || `JAAT${colorSlug.toUpperCase().slice(0,4)}`,
        name: `Juego Aro Atrapasueño ${colorName}`,
        collectionName: colName, collectionSlug: colSlug,
        typeName: 'Juego Aro Atrapasueño', typeSlug: 'juego-aro-atrapasueno',
        category: 'juegos', categoryLabel: 'Juegos Completos',
        colorName, colorCode: null,
        size, images, price: 120,
      });
    }

    // Aretes (in subfolder)
    if (innerDirs.length > 0) {
      for (const aretesDir of innerDirs) {
        const aretesPath = path.join(variantPath, aretesDir);
        const aretesFiles = fs.readdirSync(aretesPath).filter(f => isImage(f));
        if (aretesFiles.length === 0) continue;

        // Parse aretes variant name for its own SKU
        const aretesSkuMatch = aretesDir.match(/([A-Z]{4,8})\s+S/);
        const aretesSku = aretesSkuMatch ? aretesSkuMatch[1] : null;
        const aretesSizeMatch = aretesDir.match(/S-?(\d+)/);
        const aretesSize = aretesSizeMatch ? parseInt(aretesSizeMatch[1]) : 100;

        const images = processVariantDir(aretesPath, colSlug, 'aretes-aro-atrapasueno', colorSlug);
        addProduct({
          slug: `${colSlug}-aretes-aro-atrapasueno-${colorSlug}`,
          sku: aretesSku || `AAAT${colorSlug.toUpperCase().slice(0,4)}`,
          name: `Aretes Aro Atrapasueño ${colorName}`,
          collectionName: colName, collectionSlug: colSlug,
          typeName: 'Aretes Aro Atrapasueño', typeSlug: 'aretes-aro-atrapasueno',
          category: 'aretes', categoryLabel: 'Aretes',
          colorName, colorCode: null,
          size: aretesSize, images, price: 55,
        });
      }
    }
  }
}

// ══════════════════════════════════════════════════════════════
// ZIP 9: Juego Aro Vertical Mariposa Swarovski (standard)
// ══════════════════════════════════════════════════════════════
{
  console.log('\n📦 ZIP 9: Juego Aro Vertical Mariposa Swarovski');
  const colName = 'Juego Aro Vertical Mariposa Swarovski';
  const colSlug = 'juego-aro-vertical-mariposa-swarovski';
  const base = path.join(TEMP_DIR, 'Juego Aro Vertical Mariposa Swarovski', 'Juego Aro Vertical Mariposa Swarovski');

  const types = {
    'Aretes Aro Vertical Mariposa Swarovski': { typeSlug: 'aretes-aro-vertical-mariposa-swarovski', cat: 'aretes', catLabel: 'Aretes', price: 75 },
    'Collar Aro Vertical Mariposa Swarovski': { typeSlug: 'collar-aro-vertical-mariposa-swarovski', cat: 'collares', catLabel: 'Collares', price: 85 },
    'Juego Aro Vertical Mariposa Swarovski': { typeSlug: 'juego-aro-vertical-mariposa-swarovski', cat: 'juegos', catLabel: 'Juegos Completos', price: 160 },
  };

  if (fs.existsSync(base)) {
    const typeDirs = fs.readdirSync(base, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name);
    for (const typeDir of typeDirs) {
      const typeInfo = types[typeDir];
      if (!typeInfo) continue;
      const typePath = path.join(base, typeDir);
      const variantDirs = fs.readdirSync(typePath, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name);

      for (const vDir of variantDirs) {
        const vPath = path.join(typePath, vDir);
        const vFiles = fs.readdirSync(vPath).filter(f => isImage(f));
        if (vFiles.length === 0) continue;

        // Parse color from folder name: "Aretes AVM M&G05 Naranja AAVMSMG05 S-120"
        const colorMatch = vDir.match(/M&G\d+\s+(\w+)\s+[A-Z]/);
        const colorName = colorMatch ? colorMatch[1] : vDir.split(/\s+/).slice(-3, -2)[0] || 'Personalizado';
        const colorSlug = slugify(colorName);
        const skuMatch = vDir.match(/([A-Z]{4,12}\d*)\s+S/);
        const sku = skuMatch ? skuMatch[1] : null;
        const sizeMatch = vDir.match(/S-(\d+)/);
        const size = sizeMatch ? parseInt(sizeMatch[1]) : null;

        const images = processVariantDir(vPath, colSlug, typeInfo.typeSlug, colorSlug);
        addProduct({
          slug: `${colSlug}-${typeInfo.typeSlug}-${colorSlug}`,
          sku,
          name: `${typeDir} ${colorName}`,
          collectionName: colName, collectionSlug: colSlug,
          typeName: typeDir, typeSlug: typeInfo.typeSlug,
          category: typeInfo.cat, categoryLabel: typeInfo.catLabel,
          colorName, colorCode: null,
          size, images, price: typeInfo.price,
        });
      }
    }
  }
}

// ─── Remove old batch import bad products ────────────────────
// The previous batch import added 24 bad products. Remove them.
console.log('\n─── Removing bad products from previous batch ───');
const prevBatchSlugs = new Set(newProducts.map(p => p.slug));
const cleaned = existing.filter(p => !prevBatchSlugs.has(p.slug) || p.id < 24);
// Actually, we need to be smarter - remove products with bad slugs from the previous run
// Let's just replace all products with existing (first 23) + new correct ones
const finalProducts = [...existing.filter(p => p.id <= 23), ...newProducts];

// ─── Save products.json ─────────────────────────────────────
fs.writeFileSync(PRODUCTS_JSON, JSON.stringify(finalProducts, null, 2));
console.log(`\n📄 products.json: ${finalProducts.length} products (${newProducts.length} new)`);

// ─── Copy images to public/products ──────────────────────────
console.log('\n─── Copying images ───');
let copiedCount = 0;
for (const img of allImages) {
  const src = path.join(img.sourcePath, img.sourceFile);
  const dest = path.join(OUTPUT_DIR, img.destDir);
  fs.mkdirSync(dest, { recursive: true });
  const destFile = path.join(dest, img.sourceFile);
  if (fs.existsSync(src) && !fs.existsSync(destFile)) {
    fs.copyFileSync(src, destFile);
    copiedCount++;
  }
}
console.log(`  Copied ${copiedCount} original images`);

// ─── Summary ─────────────────────────────────────────────────
console.log(`\n${'═'.repeat(60)}`);
console.log('  IMPORT FIX SUMMARY');
console.log(`${'═'.repeat(60)}`);
console.log(`  New products:  ${newProducts.length}`);
console.log(`  Total catalog: ${finalProducts.length}`);
console.log(`  Images:        ${allImages.length}`);
console.log(`  Errors:        ${allErrors.length}`);
if (allErrors.length > 0) {
  for (const e of allErrors) console.log(`    ⚠️  ${e}`);
}

// Save stats
const stats = {
  timestamp: new Date().toISOString(),
  newProducts: newProducts.length,
  totalProducts: finalProducts.length,
  totalImages: allImages.length,
  errors: allErrors,
};
fs.writeFileSync(path.join(PROJECT_ROOT, 'scripts/batch-fix-stats.json'), JSON.stringify(stats, null, 2));
console.log('  ✅ Done!');
