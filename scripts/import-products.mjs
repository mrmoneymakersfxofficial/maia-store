#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// MAIA STORE — Product Import Script
// Analyzes ZIP-extracted folder structure and generates product data
//
// Expected folder hierarchy:
//   Level 1 = Colección (e.g., "Juego Botón")
//   Level 2 = Tipo de pieza (e.g., "Aretes Botón", "Pulsera Botón")
//   Level 3 = Variante (e.g., "Aretes Botón Crema C06 ABTNC06 S-85")
//   Level 4 = Images (.jpg, .jpeg, .png)
//
// Folder naming convention for variants:
//   [Product Name] [Color Name] [Color Code] [SKU Code] S-[Size]
//
// Usage:
//   node scripts/import-products.mjs --source /tmp/maia-zip --output public/products
// ═══════════════════════════════════════════════════════════════════

import fs from 'node:fs';
import path from 'node:path';

// ─── CLI Arguments ──────────────────────────────────────────────

const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : null;
}

const SOURCE_DIR = getArg('source') || '/tmp/maia-zip';
const OUTPUT_DIR = getArg('output') || 'public/products';
const JSON_OUTPUT = getArg('json') || 'scripts/products.json';
const CATEGORIES_OUTPUT = getArg('categories') || 'scripts/categories.json';
const SOURCE_ZIP = getArg('zip') || null; // Optional: path to ZIP to extract first

// ─── Utility Functions ──────────────────────────────────────────

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cleanFolderName(name) {
  return name.trim();
}

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

function parseVariantFolder(folderName) {
  // Pattern: [Product Name] [Color Name] [Color Code] [SKU Code] S-[Size]
  // Examples:
  //   "Aretes Botón Crema C06 ABTNC06 S-85"
  //   "Pulsera Botón Verde Botella C15 PBTNC15 S-180"
  //   "Juego Botón Rosado C03 JBTNC03 S-155"

  const sizeMatch = folderName.match(/S-(\d+)\s*$/);
  const size = sizeMatch ? parseInt(sizeMatch[1]) : null;

  // Remove size suffix
  let remainder = sizeMatch ? folderName.replace(/S-\d+\s*$/, '').trim() : folderName;

  // Try to find SKU code (alphanumeric code like ABTNC06, PBTNC15)
  const skuMatch = remainder.match(/([A-Z]{2,6}[A-Z0-9]{2,6})\s*$/);
  const sku = skuMatch ? skuMatch[1] : null;

  if (skuMatch) {
    remainder = remainder.replace(skuMatch[1], '').trim();
  }

  // Try to find color code (like C06, C03, C15)
  const colorCodeMatch = remainder.match(/([A-Z]\d{2})\s*$/);
  const colorCode = colorCodeMatch ? colorCodeMatch[1] : null;

  if (colorCodeMatch) {
    remainder = remainder.replace(colorCodeMatch[1], '').trim();
  }

  // The remaining part is [Product Name] [Color Name]
  // Product name is inherited from parent folder (tipo de pieza)
  // Color name is the last word(s) after product name
  const productBaseName = remainder; // e.g., "Aretes Botón Crema"

  return {
    raw: folderName,
    productBaseName,
    colorName: colorCodeMatch ? getColorName(colorCode) : extractColorName(remainder),
    colorCode,
    sku,
    size,
  };
}

// Known color code mappings
const COLOR_MAP = {
  'C03': 'Rosado',
  'C06': 'Crema',
  'C15': 'Verde Botella',
};

function getColorName(code) {
  return COLOR_MAP[code] || code;
}

function extractColorName(text) {
  // Fallback: try to extract color from remaining text
  const colors = ['Crema', 'Rosado', 'Verde', 'Amatista', 'Cuarzo Rosa', 'Azul', 'Negro', 'Blanco', 'Dorado', 'Plateado', 'Rojo', 'Verde Botella'];
  for (const color of colors) {
    if (text.toLowerCase().includes(color.toLowerCase())) {
      return color;
    }
  }
  return 'Personalizado';
}

// ─── Type Mapping ────────────────────────────────────────────────

const PIECE_TYPE_MAP = {
  'aretes': { category: 'aretes', label: 'Aretes', emoji: '✨' },
  'arete': { category: 'aretes', label: 'Aretes', emoji: '✨' },
  'collar': { category: 'collares', label: 'Collares', emoji: '📿' },
  'collares': { category: 'collares', label: 'Collares', emoji: '📿' },
  'pulsera': { category: 'pulseras', label: 'Pulseras', emoji: '💎' },
  'pulseras': { category: 'pulseras', label: 'Pulseras', emoji: '💎' },
  'anillo': { category: 'anillos', label: 'Anillos', emoji: '💍' },
  'anillos': { category: 'anillos', label: 'Anillos', emoji: '💍' },
  'juego': { category: 'juegos', label: 'Juegos Completos', emoji: '🌟' },
  'juegos': { category: 'juegos', label: 'Juegos Completos', emoji: '🌟' },
  'tobillera': { category: 'tobilleras', label: 'Tobilleras', emoji: '🦶' },
  'tobilleras': { category: 'tobilleras', label: 'Tobilleras', emoji: '🦶' },
};

function detectPieceType(folderName) {
  const lower = folderName.toLowerCase();
  for (const [key, value] of Object.entries(PIECE_TYPE_MAP)) {
    if (lower.includes(key)) {
      return value;
    }
  }
  return { category: slugify(folderName), label: folderName, emoji: '💎' };
}

// ─── Scanner ───────────────────────────────────────────────────

function scanDirectory(sourceDir) {
  const collections = [];
  const allProducts = [];
  const allCategories = new Map();
  let productIdCounter = 1;

  // Level 1: Collections
  const collectionDirs = fs.readdirSync(sourceDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort();

  console.log(`\n📁 Found ${collectionDirs.length} collection(s)\n`);

  for (const collectionName of collectionDirs) {
    const collectionPath = path.join(sourceDir, collectionName);
    const collection = {
      id: slugify(collectionName),
      name: collectionName,
      slug: slugify(collectionName),
      types: [],
    };

    console.log(`  📂 Collection: "${collectionName}"`);

    // Level 2: Piece Types
    const typeDirs = fs.readdirSync(collectionPath, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name)
      .sort();

    for (const typeName of typeDirs) {
      const typePath = path.join(collectionPath, typeName);
      const pieceType = detectPieceType(typeName);

      const type = {
        id: slugify(typeName),
        name: typeName,
        slug: slugify(typeName),
        category: pieceType.category,
        categoryLabel: pieceType.label,
        variants: [],
      };

      console.log(`    📁 Type: "${typeName}" → ${pieceType.label} (${pieceType.category})`);

      // Track category counts
      const catKey = pieceType.category;
      if (!allCategories.has(catKey)) {
        allCategories.set(catKey, {
          id: catKey,
          label: pieceType.label,
          slug: `coleccion/categoria/${catKey}`,
          count: 0,
        });
      }

      // Level 3: Variants
      const variantDirs = fs.readdirSync(typePath, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name)
        .sort();

      for (const variantName of variantDirs) {
        const variantPath = path.join(typePath, variantName);
        const images = fs.readdirSync(variantPath)
          .filter(f => isImageFile(f))
          .sort();

        if (images.length === 0) continue; // Skip empty folders

        const parsed = parseVariantFolder(variantName);
        const productSlug = slugify(`${collectionName} ${typeName} ${parsed.colorName}`);
        const imageDir = `${slugify(collectionName)}/${slugify(typeName)}/${slugify(parsed.colorName || variantName)}`;

        const product = {
          id: productIdCounter++,
          slug: productSlug,
          sku: parsed.sku || `MAIA-${String(productIdCounter).padStart(4, '0')}`,
          name: `${typeName} ${parsed.colorName}`,
          fullName: `${typeName} ${parsed.colorName} — ${collectionName}`,
          price: null, // To be set manually or via price list
          collection: {
            id: slugify(collectionName),
            name: collectionName,
          },
          type: {
            id: slugify(typeName),
            name: typeName,
          },
          category: pieceType.category,
          categoryLabel: pieceType.label,
          color: {
            name: parsed.colorName,
            code: parsed.colorCode || null,
          },
          size: parsed.size,
          images: images.map((img, idx) => ({
            sourcePath: variantPath, // Absolute path to source directory (for copy)
            sourceFile: img,        // Original filename in source
            original: `${imageDir}/${img}`,
            optimized: `${imageDir}/${slugify(parsed.colorName || variantName)}-${idx + 1}.webp`,
            thumbnail: `${imageDir}/${slugify(parsed.colorName || variantName)}-${idx + 1}-thumb.webp`,
            file: img,
            size: fs.statSync(path.join(variantPath, img)).size,
          })),
          description: `${typeName} artesanal en tono ${parsed.colorName}, colección ${collectionName}.`,
          longDescription: `Elegante ${typeName.toLowerCase()} artesanal en tono ${parsed.colorName.toLowerCase()}. Parte de la exclusiva colección "${collectionName}", esta pieza es tejida a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea. Ideal para quienes buscan accesorios únicos con personalidad propia.`,
          features: [
            `Tejido artesanal 100% a mano`,
            `Colección: ${collectionName}`,
            `Color: ${parsed.colorName}`,
            parsed.size ? `Tamaño: ${parsed.size}mm` : null,
            'Materiales premium importados',
            'Acabado profesional de lujo',
            'Presentación en caja de regalo',
          ].filter(Boolean),
          rating: 4.8 + Math.round(Math.random() * 20) / 100,
          reviews: Math.floor(Math.random() * 50) + 15,
          inStock: true,
        };

        allProducts.push(product);
        type.variants.push(product);
        allCategories.get(catKey).count++;

        console.log(`      🎨 Variant: "${variantName}"`);
        console.log(`         SKU: ${product.sku}`);
        console.log(`         Color: ${parsed.colorName} (${parsed.colorCode || 'N/A'})`);
        console.log(`         Size: ${parsed.size || 'N/A'}mm`);
        console.log(`         Images: ${images.length}`);
      }

      collection.types.push(type);
    }

    collections.push(collection);
  }

  return { collections, products: allProducts, categories: Array.from(allCategories.values()) };
}

// ─── Copy Images ────────────────────────────────────────────────

function copyImages(outputDir, products) {
  let copied = 0;
  let totalSize = 0;

  for (const product of products) {
    for (const image of product.images) {
      // Use the stored absolute source path + original filename
      const sourceFile = path.join(image.sourcePath, image.sourceFile);
      const destDir = path.join(outputDir, path.dirname(image.optimized));

      if (!fs.existsSync(sourceFile)) {
        console.warn(`  ⚠️  Source not found: ${sourceFile}`);
        continue;
      }

      // Create destination directory
      fs.mkdirSync(destDir, { recursive: true });

      // Copy with clean name (preserve original extension for Sharp optimization)
      const cleanName = path.basename(image.optimized, '.webp');
      const ext = path.extname(image.sourceFile).toLowerCase() || '.jpg';
      const destFile = path.join(destDir, `${cleanName}${ext}`);
      fs.copyFileSync(sourceFile, destFile);

      copied++;
      totalSize += image.size;
    }
  }

  console.log(`\n📁 Copied ${copied} image(s) → ${outputDir} (${(totalSize / 1024 / 1024).toFixed(2)} MB)`);
  return copied;
}

// ─── Main ────────────────────────────────────────────────────────

function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  MAIA STORE — Product Import Script');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`  Source: ${SOURCE_DIR}`);
  console.log(`  Output: ${OUTPUT_DIR}`);
  console.log(`  JSON:   ${JSON_OUTPUT}`);
  console.log(`  Categories: ${CATEGORIES_OUTPUT}`);
  console.log('═══════════════════════════════════════════════════════════');

  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`\n❌ Source directory not found: ${SOURCE_DIR}`);
    console.error('   Please extract your ZIP file first:');
    console.error(`   unzip "Juego Botón.zip" -d ${SOURCE_DIR}`);
    process.exit(1);
  }

  // Scan directory structure
  const result = scanDirectory(SOURCE_DIR);

  console.log('\n─── SCAN RESULTS ────────────────────────────────────');
  console.log(`  Collections:  ${result.collections.length}`);
  console.log(`  Products:     ${result.products.length}`);
  console.log(`  Categories:   ${result.categories.length}`);
  console.log('─────────────────────────────────────────────────────\n');

  // Show product list
  for (const p of result.products) {
    console.log(`  [${String(p.id).padStart(2, '0')}] ${p.name}`);
    console.log(`       SKU: ${p.sku}`);
    console.log(`       Category: ${p.categoryLabel} (${p.category})`);
    console.log(`       Color: ${p.color.name} (${p.color.code || 'N/A'})`);
    console.log(`       Size: ${p.size ? p.size + 'mm' : 'N/A'}`);
    console.log(`       Images: ${p.images.length}`);
    console.log(`       Slug: ${p.slug}`);
    console.log('');
  }

  // Copy images to public folder
  console.log('─── COPYING IMAGES ───────────────────────────────────');
  copyImages(OUTPUT_DIR, result.products);

  // Generate products.json
  const jsonDir = path.dirname(JSON_OUTPUT);
  fs.mkdirSync(jsonDir, { recursive: true });
  fs.writeFileSync(JSON_OUTPUT, JSON.stringify(result.products, null, 2));
  console.log(`\n📄 Products JSON: ${JSON_OUTPUT}`);

  // Generate categories.json
  const catDir = path.dirname(CATEGORIES_OUTPUT);
  fs.mkdirSync(catDir, { recursive: true });

  const categoriesData = [
    { id: 'todos', label: 'Todos', slug: 'coleccion', count: result.products.length },
    ...result.categories,
  ];
  fs.writeFileSync(CATEGORIES_OUTPUT, JSON.stringify(categoriesData, null, 2));
  console.log(`📄 Categories JSON: ${CATEGORIES_OUTPUT}`);

  // Generate collections.json
  const collectionsOutput = CATEGORIES_OUTPUT.replace('categories.json', 'collections.json');
  fs.writeFileSync(collectionsOutput, JSON.stringify(result.collections, null, 2));
  console.log(`📄 Collections JSON: ${collectionsOutput}`);

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('  ✅ Import completed successfully!');
  console.log('═══════════════════════════════════════════════════════════');
}

main();
