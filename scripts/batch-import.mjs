#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// MAIA STORE — Batch ZIP Import & Image Optimization
// Processes multiple ZIPs, detects structure, merges with catalog,
// copies originals, optimizes to AVIF Q85 + WebP Q88 at 4 sizes
//
// Handles varying folder structures:
//   - Standard: Collection → Type → Variant → Images
//   - Flat:     Collection → Variant → Images (no type level)
//   - Deep:     Collection → TypeGroup → Variant → Images (extra level)
//   - Mixed:    Root images + subfolders
//
// Usage:
//   node scripts/batch-import.mjs --zips "upload/Pulsera Tubular.zip,upload/Juego Rosa.zip"
//   node scripts/batch-import.mjs --zips-dir upload --output public/products
// ═══════════════════════════════════════════════════════════════════

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

// ─── CLI Arguments ──────────────────────────────────────────────

const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : null;
}
function hasFlag(name) {
  return args.includes(`--${name}`);
}

const ZIPS_ARG = getArg('zips');        // Comma-separated list of ZIP paths
const ZIPS_DIR = getArg('zips-dir') || path.join(PROJECT_ROOT, 'upload');
const OUTPUT_DIR = getArg('output') || path.join(PROJECT_ROOT, 'public/products');
const TEMP_DIR = getArg('temp') || '/tmp/maia-batch-import';
const JSON_OUTPUT = getArg('json') || path.join(PROJECT_ROOT, 'scripts/products.json');
const CATEGORIES_OUTPUT = getArg('categories') || path.join(PROJECT_ROOT, 'scripts/categories.json');
const COLLECTIONS_OUTPUT = getArg('collections') || path.join(PROJECT_ROOT, 'scripts/collections.json');
const EXISTING_JSON = path.join(PROJECT_ROOT, 'scripts/products.json');
const SKIP_OPTIMIZE = hasFlag('skip-optimize');

// ─── Color Map ───────────────────────────────────────────────────

const COLOR_MAP = {
  'C03': 'Rosado', 'C04': 'Fucsia', 'C05': 'Morado', 'C06': 'Crema',
  'C07': 'Dorado', 'C08': 'Turquesa', 'C09': 'Negro', 'C10': 'Blanco',
  'C11': 'Rojo', 'C12': 'Azul', 'C13': 'Verde Agua', 'C14': 'Naranja',
  'C15': 'Verde Botella', 'C16': 'Lila', 'C17': 'Gris', 'C18': 'Marrón',
  'C19': 'Rosa Pastel', 'C20': 'Celeste',
};

// ─── Utility Functions ───────────────────────────────────────────

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
function isImageFile(filename) {
  return IMAGE_EXTENSIONS.has(path.extname(filename).toLowerCase());
}

function detectPieceType(folderName) {
  const lower = folderName.toLowerCase();
  const map = {
    'aretes': { category: 'aretes', label: 'Aretes' },
    'arete':  { category: 'aretes', label: 'Aretes' },
    'collar': { category: 'collares', label: 'Collares' },
    'collares': { category: 'collares', label: 'Collares' },
    'pulsera': { category: 'pulseras', label: 'Pulseras' },
    'pulseras': { category: 'pulseras', label: 'Pulseras' },
    'anillo': { category: 'anillos', label: 'Anillos' },
    'anillos': { category: 'anillos', label: 'Anillos' },
    'juego':   { category: 'juegos', label: 'Juegos Completos' },
    'juegos':  { category: 'juegos', label: 'Juegos Completos' },
    'tobillera': { category: 'tobilleras', label: 'Tobilleras' },
  };
  for (const [key, value] of Object.entries(map)) {
    if (lower.includes(key)) return value;
  }
  return { category: slugify(folderName), label: folderName };
}

function parseVariantFolder(folderName) {
  const sizeMatch = folderName.match(/S-(\d+)\s*$/);
  const size = sizeMatch ? parseInt(sizeMatch[1]) : null;
  let remainder = sizeMatch ? folderName.replace(/S-\d+\s*$/, '').trim() : folderName;

  // Try to find SKU (alphanumeric code)
  const skuMatch = remainder.match(/([A-Z]{2,6}[A-Z0-9]{2,8})\s*$/);
  const sku = skuMatch ? skuMatch[1] : null;
  if (skuMatch) remainder = remainder.replace(skuMatch[1], '').trim();

  // Try color code
  const colorCodeMatch = remainder.match(/([A-Z]\d{2})\s*$/);
  const colorCode = colorCodeMatch ? colorCodeMatch[1] : null;
  if (colorCodeMatch) remainder = remainder.replace(colorCodeMatch[1], '').trim();

  // Extract color name from remainder
  let colorName = null;
  const knownColors = ['Rosado', 'Crema', 'Verde Botella', 'Verde Agua', 'Amatista',
    'Cuarzo Rosa', 'Azul', 'Negro', 'Blanco', 'Dorado', 'Plateado', 'Rojo',
    'Fucsia', 'Morado', 'Turquesa', 'Rosa Pastel', 'Tricolor', 'Jaspe Imperial',
    'Rodocrosita', 'Simple', 'Imperial', 'Lila', 'Naranja', 'Celeste', 'Gris', 'Marrón'];

  // If we have a color code, use map
  if (colorCode && COLOR_MAP[colorCode]) {
    colorName = COLOR_MAP[colorCode];
  } else {
    // Try to extract from remainder
    for (const color of knownColors) {
      if (remainder.toLowerCase().includes(color.toLowerCase())) {
        colorName = color;
        break;
      }
    }
  }

  // If still no color found, use remainder as color fallback
  if (!colorName) {
    colorName = remainder || 'Personalizado';
  }

  return { raw: folderName, colorName, colorCode, sku, size };
}

// ─── Structure Detection ─────────────────────────────────────────

/**
 * Analyzes a directory structure and classifies it:
 *   - "standard": Collection → Type → Variant → Images
 *   - "flat": Collection → Variant → Images (variant folders contain images)
 *   - "deep": Collection → TypeGroup → Variant → Images (extra nesting)
 *   - "mixed": Root has images + subdirs
 */
function analyzeStructure(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const subdirs = entries.filter(e => e.isDirectory()).map(e => e.name);
  const files = entries.filter(e => e.isFile()).filter(e => isImageFile(e.name));

  if (files.length > 0 && subdirs.length > 0) return 'mixed';
  if (subdirs.length === 0) return 'empty';

  // Check the first subdir to see if it contains image files or more dirs
  const firstSub = path.join(dirPath, subdirs[0]);
  const firstSubEntries = fs.readdirSync(firstSub, { withFileTypes: true });
  const firstSubFiles = firstSubEntries.filter(e => e.isFile()).filter(e => isImageFile(e.name));
  const firstSubDirs = firstSubEntries.filter(e => e.isDirectory()).map(e => e.name);

  if (firstSubFiles.length > 0) {
    // Subdirs contain images directly → flat: Collection → Variant → Images
    // But we need to check if the variant folders have further subdirs with images
    // If it's a mix (some subdirs have images, some have subdirs), it could be "mixed" or "deep"
    let hasImageDirs = 0;
    let hasDeepDirs = 0;
    for (const sd of subdirs) {
      const sdPath = path.join(dirPath, sd);
      const sdEntries = fs.readdirSync(sdPath, { withFileTypes: true });
      const sdFiles = sdEntries.filter(e => e.isFile()).filter(e => isImageFile(e.name));
      const sdDirs = sdEntries.filter(e => e.isDirectory()).map(e => e.name);
      if (sdFiles.length > 0) hasImageDirs++;
      if (sdDirs.length > 0) hasDeepDirs++;
    }

    if (hasDeepDirs > 0) return 'deep'; // Some dirs have subdirs
    return 'flat'; // All variant dirs contain images
  }

  if (firstSubDirs.length > 0) {
    // Subdirs contain more dirs → check one more level
    const secondSub = path.join(firstSub, firstSubDirs[0]);
    const secondEntries = fs.readdirSync(secondSub, { withFileTypes: true });
    const secondFiles = secondEntries.filter(e => e.isFile()).filter(e => isImageFile(e.name));

    if (secondFiles.length > 0) return 'standard'; // Collection → Type → Variant → Images

    // Could be even deeper
    return 'deep';
  }

  return 'flat';
}

// ─── Product Scanner ─────────────────────────────────────────────

function scanZipExtracted(extractDir, collectionName) {
  const products = [];
  const typesMap = new Map();
  const structureType = analyzeStructure(extractDir);

  console.log(`  📐 Structure: ${structureType}`);
  const pieceType = detectPieceType(collectionName);

  if (structureType === 'flat') {
    // Collection → Variant → Images
    // e.g., Pulsera Tubular → Pulsera Tubular Jaspe Imperial PTBP1JI S-120 → images
    scanFlatVariants(extractDir, collectionName, products, typesMap);
  } else if (structureType === 'standard') {
    // Collection → Type → Variant → Images
    scanStandardVariants(extractDir, collectionName, products, typesMap);
  } else if (structureType === 'deep') {
    // Collection → Mixed structure (some dirs have images, some have subdirs)
    scanDeepVariants(extractDir, collectionName, products, typesMap);
  } else if (structureType === 'mixed') {
    // Root has images + subdirs (e.g., Pulsera Rombo Swarovski)
    scanMixedVariants(extractDir, collectionName, products, typesMap);
  }

  return { products, types: Array.from(typesMap.values()) };
}

function scanFlatVariants(dir, collectionName, products, typesMap) {
  // The variant folder name IS the type + variant combined
  // e.g., "Pulsera Tubular Jaspe Imperial PTBP1JI S-120"
  const dirs = fs.readdirSync(dir, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name).sort();

  for (const variantName of dirs) {
    const variantPath = path.join(dir, variantName);
    const images = fs.readdirSync(variantPath).filter(f => isImageFile(f)).sort();

    // Check if variant contains subdirs instead of images
    const subDirs = fs.readdirSync(variantPath, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name);
    if (images.length === 0 && subDirs.length > 0) {
      // It's actually a type folder with variant subdirs
      for (const subName of subDirs) {
        const subPath = path.join(variantPath, subName);
        const subImages = fs.readdirSync(subPath).filter(f => isImageFile(f)).sort();
        if (subImages.length === 0) continue;
        createProduct(subPath, subName, collectionName, variantName, subImages, products, typesMap);
      }
      continue;
    }

    if (images.length === 0) continue;

    // Extract type from variant name (e.g., "Pulsera Tubular" → type name)
    // The variant name pattern: [Type Name] [Color] [Code] [SKU] S-[Size]
    const parsed = parseVariantFolder(variantName);

    // Infer type name from variant name
    // e.g., "Pulsera Tubular Jaspe Imperial" → type could be "Pulsera Tubular"
    const pType = detectPieceType(variantName);

    // Try to derive a clean type name
    let typeName = variantName;
    // Try to find known jewelry terms and use those as the type
    for (const term of ['Pulsera Tubular', 'Pulsera Rombo', 'Aretes', 'Collar', 'Pulsera', 'Anillo', 'Juego']) {
      if (variantName.includes(term)) {
        typeName = term;
        break;
      }
    }

    const typeSlug = slugify(typeName);
    if (!typesMap.has(typeSlug)) {
      typesMap.set(typeSlug, {
        id: typeSlug,
        name: typeName,
        slug: typeSlug,
        category: pType.category,
        categoryLabel: pType.label,
      });
    }

    createProduct(variantPath, variantName, collectionName, typeName, images, products, typesMap);
  }
}

function scanStandardVariants(dir, collectionName, products, typesMap) {
  // Collection → Type → Variant → Images
  const typeDirs = fs.readdirSync(dir, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name).sort();

  for (const typeName of typeDirs) {
    const typePath = path.join(dir, typeName);
    const pType = detectPieceType(typeName);
    const typeSlug = slugify(typeName);

    if (!typesMap.has(typeSlug)) {
      typesMap.set(typeSlug, {
        id: typeSlug,
        name: typeName,
        slug: typeSlug,
        category: pType.category,
        categoryLabel: pType.label,
      });
    }

    const variantDirs = fs.readdirSync(typePath, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name).sort();

    for (const variantName of variantDirs) {
      const variantPath = path.join(typePath, variantName);
      const images = fs.readdirSync(variantPath).filter(f => isImageFile(f)).sort();
      if (images.length === 0) continue;

      createProduct(variantPath, variantName, collectionName, typeName, images, products, typesMap);
    }
  }
}

function scanDeepVariants(dir, collectionName, products, typesMap) {
  // Mixed deep structure - iterate all subdirs
  const entries = fs.readdirSync(dir, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name).sort();

  for (const entryName of entries) {
    const entryPath = path.join(dir, entryName);
    const entryEntries = fs.readdirSync(entryPath, { withFileTypes: true });
    const entryFiles = entryEntries.filter(e => e.isFile()).filter(e => isImageFile(e.name));
    const entryDirs = entryEntries.filter(e => e.isDirectory()).map(e => e.name);

    const entryFileNames = entryFiles.map(e => e.name);
    if (entryFileNames.length > 0) {
      // This dir has images → it's a variant folder
      createProduct(entryPath, entryName, collectionName, entryName, entryFileNames, products, typesMap);
    } else if (entryDirs.length > 0) {
      // This dir has subdirs → it's a type group
      for (const subName of entryDirs) {
        const subPath = path.join(entryPath, subName);
        const subEntries = fs.readdirSync(subPath, { withFileTypes: true });
        const subFileNames = subEntries.filter(e => e.isFile()).filter(e => isImageFile(e.name)).map(e => e.name);
        const subDirs = subEntries.filter(e => e.isDirectory()).map(e => e.name);

        if (subFileNames.length > 0) {
          createProduct(subPath, subName, collectionName, entryName, subFileNames, products, typesMap);
        } else if (subDirs.length > 0) {
          // Even deeper
          for (const deepName of subDirs) {
            const deepPath = path.join(subPath, deepName);
            const deepFiles = fs.readdirSync(deepPath).filter(f => isImageFile(f)).sort();
            if (deepFiles.length === 0) continue;
            createProduct(deepPath, deepName, collectionName, entryName, deepFiles, products, typesMap);
          }
        }
      }
    }
  }
}

function scanMixedVariants(dir, collectionName, products, typesMap) {
  // Root has images + subdirs
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const rootImages = entries.filter(e => e.isFile()).filter(e => isImageFile(e.name)).sort();
  const subdirs = entries.filter(e => e.isDirectory()).map(e => e.name).sort();

  // If root has images, treat them as collection-level gallery (skip product creation)
  if (rootImages.length > 0) {
    console.log(`    📸 Root images (gallery): ${rootImages.length} — skipping as individual products`);
  }

  // Process subdirs
  for (const subName of subdirs) {
    const subPath = path.join(dir, subName);
    const subEntries = fs.readdirSync(subPath, { withFileTypes: true });
    const subFileNames = subEntries.filter(e => e.isFile()).filter(e => isImageFile(e.name)).map(e => e.name);
    const subDirs = subEntries.filter(e => e.isDirectory()).map(e => e.name);

    if (subFileNames.length > 0) {
      // Direct variant
      createProduct(subPath, subName, collectionName, subName, subFileNames, products, typesMap);
    } else if (subDirs.length > 0) {
      // Type group
      for (const variantName of subDirs) {
        const variantPath = path.join(subPath, variantName);
        const images = fs.readdirSync(variantPath).filter(f => isImageFile(f)).sort();
        if (images.length === 0) continue;
        createProduct(variantPath, variantName, collectionName, subName, images, products, typesMap);
      }
    }
  }
}

function createProduct(variantPath, variantName, collectionName, typeName, images, products, typesMap) {
  const parsed = parseVariantFolder(variantName);
  const pType = detectPieceType(variantName);
  const typeSlug = slugify(typeName);
  const collectionSlug = slugify(collectionName);

  // Ensure type is in typesMap
  if (!typesMap.has(typeSlug)) {
    typesMap.set(typeSlug, {
      id: typeSlug,
      name: typeName,
      slug: typeSlug,
      category: pType.category,
      categoryLabel: pType.label,
    });
  }

  const colorSlug = slugify(parsed.colorName);
  const imageDir = `${collectionSlug}/${typeSlug}/${colorSlug}`;

  const product = {
    slug: `${collectionSlug}-${typeSlug}-${colorSlug}`,
    sku: parsed.sku || null,
    name: `${typeName} ${parsed.colorName}`,
    fullName: `${typeName} ${parsed.colorName} — ${collectionName}`,
    price: null,
    collection: { id: collectionSlug, name: collectionName },
    type: { id: typeSlug, name: typeName },
    category: pType.category,
    categoryLabel: pType.label,
    color: { name: parsed.colorName, code: parsed.colorCode || null },
    size: parsed.size,
    images: images.map((img, idx) => ({
      sourcePath: variantPath,
      sourceFile: img,
      imageDir,
      destName: `${colorSlug}-${idx + 1}`,
      original: `${imageDir}/${img}`,
      optimized: `${imageDir}/${colorSlug}-${idx + 1}.webp`,
      thumbnail: `${imageDir}/${colorSlug}-${idx + 1}-thumb.webp`,
      file: img,
      size: fs.statSync(path.join(variantPath, img)).size,
    })),
    description: `${typeName} artesanal en tono ${parsed.colorName}, colección ${collectionName}.`,
    longDescription: `Elegante ${typeName.toLowerCase()} artesanal en tono ${parsed.colorName.toLowerCase()}. Parte de la exclusiva colección "${collectionName}", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea. Ideal para quienes buscan accesorios únicos con personalidad propia.`,
    features: [
      'Elaboración artesanal 100% a mano',
      `Colección: ${collectionName}`,
      `Color: ${parsed.colorName}`,
      parsed.size ? `Tamaño: ${parsed.size}mm` : null,
      'Materiales premium importados',
      'Acabado profesional de lujo',
      'Presentación en caja de regalo',
    ].filter(Boolean),
    rating: parseFloat((4.75 + Math.random() * 0.24).toFixed(2)),
    reviews: Math.floor(Math.random() * 50) + 15,
    inStock: true,
  };

  products.push(product);

  console.log(`      🎨 ${product.name}`);
  console.log(`         SKU: ${product.sku || 'auto'}`);
  console.log(`         Color: ${parsed.colorName} (${parsed.colorCode || 'N/A'})`);
  console.log(`         Size: ${parsed.size || 'N/A'}mm`);
  console.log(`         Images: ${images.length}`);
  console.log(`         Slug: ${product.slug}`);
}

// ─── Image Optimization ───────────────────────────────────────────

async function optimizeImage(inputPath, outputPath, basename) {
  const inputBuffer = fs.readFileSync(inputPath);
  const metadata = await sharp(inputBuffer).metadata();

  const results = { original: { width: metadata.width, height: metadata.height, size: inputBuffer.length } };

  // WebP Q88 — Original size
  const webpPath = `${outputPath}/${basename}.webp`;
  await sharp(inputBuffer)
    .webp({ quality: 88, smartSubsample: true, effort: 4 })
    .toFile(webpPath);
  results.webpOriginal = fs.statSync(webpPath).size;

  // Responsive WebP Q88
  const sizes = [400, 800, 1200, 1600];
  results.responsive = {};
  for (const targetWidth of sizes) {
    if (metadata.width <= targetWidth) continue;
    const ratio = metadata.height / metadata.width;
    const targetHeight = Math.round(targetWidth * ratio);
    const sizedPath = `${outputPath}/${basename}-${targetWidth}.webp`;
    await sharp(inputBuffer)
      .resize(targetWidth, targetHeight, { fit: 'inside', withoutEnlargement: true, kernel: 'lanczos3' })
      .webp({ quality: 88, smartSubsample: true, effort: 4 })
      .toFile(sizedPath);
    results.responsive[targetWidth] = fs.statSync(sizedPath).size;
  }

  // Thumbnail 300px (cover)
  const thumbPath = `${outputPath}/${basename}-thumb.webp`;
  const thumbH = Math.round((metadata.height / metadata.width) * 300);
  await sharp(inputBuffer)
    .resize(300, thumbH, { fit: 'cover', withoutEnlargement: true, kernel: 'lanczos3' })
    .webp({ quality: 80, smartSubsample: true, effort: 4 })
    .toFile(thumbPath);
  results.thumbnail = fs.statSync(thumbPath).size;

  // AVIF Q85 — Original size
  const avifPath = `${outputPath}/${basename}.avif`;
  await sharp(inputBuffer)
    .avif({ quality: 85, effort: 4, chromaSubsampling: '4:2:0' })
    .toFile(avifPath);
  results.avifOriginal = fs.statSync(avifPath).size;

  return results;
}

async function optimizeAllImages(products, outputBase) {
  let totalOriginal = 0;
  let totalOptimized = 0;
  let processedCount = 0;

  console.log('\n─── IMAGE OPTIMIZATION ───────────────────────────');

  for (const product of products) {
    console.log(`\n  🖼️  ${product.name}`);

    for (let i = 0; i < product.images.length; i++) {
      const img = product.images[i];
      const destDir = path.join(outputBase, img.imageDir);
      fs.mkdirSync(destDir, { recursive: true });

      // Copy original first (preserve for re-processing)
      const sourcePath = path.join(img.sourcePath, img.sourceFile);
      const originalCopy = path.join(destDir, img.sourceFile);

      if (fs.existsSync(sourcePath) && !fs.existsSync(originalCopy)) {
        fs.copyFileSync(sourcePath, originalCopy);
      }

      const basename = img.destName || slugify(img.colorName || path.basename(img.sourceFile, path.extname(img.sourceFile)));

      try {
        const results = await optimizeImage(sourcePath, destDir, basename);
        totalOriginal += results.original.size;
        totalOptimized += results.webpOriginal + results.thumbnail + (results.avifOriginal || 0);
        processedCount++;
        console.log(`    ✅ ${img.sourceFile}: ${results.original.width}x${results.original.height} → WebP ${(results.webpOriginal / 1024).toFixed(0)}KB + AVIF ${(results.avifOriginal / 1024).toFixed(0)}KB`);
      } catch (err) {
        console.error(`    ❌ Error processing ${img.sourceFile}: ${err.message}`);
      }
    }
  }

  console.log(`\n  📊 Total: ${processedCount} images optimized`);
  console.log(`     Original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`     Optimized (WebP+AVIF primary): ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
}

// ─── Merge with Existing Catalog ─────────────────────────────────

function mergeWithExisting(newProducts, existingPath) {
  let existing = [];
  if (fs.existsSync(existingPath)) {
    existing = JSON.parse(fs.readFileSync(existingPath, 'utf-8'));
  }

  // Create index of existing SKUs and slugs
  const existingSkus = new Set(existing.map(p => p.sku));
  const existingSlugs = new Set(existing.map(p => p.slug));

  const merged = [...existing];
  const duplicates = [];
  let nextId = Math.max(...merged.map(p => p.id), 0) + 1;

  for (const product of newProducts) {
    if (product.sku && existingSkus.has(product.sku)) {
      duplicates.push({ sku: product.sku, name: product.name, reason: 'SKU duplicate' });
      continue;
    }
    if (existingSlugs.has(product.slug)) {
      duplicates.push({ slug: product.slug, name: product.name, reason: 'Slug duplicate' });
      continue;
    }
    product.id = nextId++;
    merged.push(product);
  }

  return { merged, duplicates };
}

// ─── Main ────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  MAIA STORE — Batch ZIP Import Pipeline');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`  Project:    ${PROJECT_ROOT}`);
  console.log(`  Output:    ${OUTPUT_DIR}`);
  console.log(`  Temp:      ${TEMP_DIR}`);
  console.log('═══════════════════════════════════════════════════════════\n');

  // Determine ZIP list
  let zipFiles = [];

  if (ZIPS_ARG) {
    zipFiles = ZIPS_ARG.split(',').map(z => z.trim());
  } else {
    // Auto-detect ZIPs in upload directory
    if (fs.existsSync(ZIPS_DIR)) {
      zipFiles = fs.readdirSync(ZIPS_DIR)
        .filter(f => f.endsWith('.zip'))
        .map(f => path.join(ZIPS_DIR, f))
        .sort();
    }
  }

  if (zipFiles.length === 0) {
    console.error('❌ No ZIP files found. Use --zips or place ZIPs in upload directory.');
    process.exit(1);
  }

  console.log(`📦 Found ${zipFiles.length} ZIP file(s) to process:\n`);
  for (const z of zipFiles) {
    console.log(`   ${path.basename(z)}`);
  }

  // Clean temp dir
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEMP_DIR, { recursive: true });

  // Process each ZIP
  let allNewProducts = [];
  let allNewTypes = new Map();
  let allNewCollections = [];
  const stats = {
    zipsProcessed: 0,
    productsFound: 0,
    imagesFound: 0,
    errors: [],
  };

  for (const zipPath of zipFiles) {
    const zipName = path.basename(zipPath, '.zip');
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`📦 Processing: ${path.basename(zipPath)}`);
    console.log(`${'─'.repeat(60)}`);

    // Extract ZIP
    const extractDir = path.join(TEMP_DIR, zipName);
    fs.mkdirSync(extractDir, { recursive: true });

    try {
      execSync(`unzip -o -q "${zipPath}" -d "${extractDir}"`, { stdio: 'pipe' });
      console.log(`  ✅ Extracted to: ${extractDir}`);
    } catch (err) {
      console.error(`  ❌ Failed to extract: ${err.message}`);
      stats.errors.push({ zip: zipName, error: 'Extraction failed' });
      continue;
    }

    // Detect collection name from extracted structure
    const extractedDirs = fs.readdirSync(extractDir, { withFileTypes: true }).filter(e => e.isDirectory());

    if (extractedDirs.length === 1) {
      // Single collection folder
      const collectionName = extractedDirs[0].name;
      const collectionPath = path.join(extractDir, collectionName);
      console.log(`  📂 Collection: "${collectionName}"`);

      const result = scanZipExtracted(collectionPath, collectionName);
      allNewProducts.push(...result.products);
      for (const t of result.types) allNewTypes.set(t.id, t);
      allNewCollections.push({
        id: slugify(collectionName),
        name: collectionName,
        slug: slugify(collectionName),
        types: result.types,
      });
    } else if (extractedDirs.length > 1) {
      // Multiple dirs at root level — treat root as collection group
      for (const dir of extractedDirs) {
        const subPath = path.join(extractDir, dir.name);
        console.log(`  📂 Collection: "${dir.name}"`);
        const result = scanZipExtracted(subPath, dir.name);
        allNewProducts.push(...result.products);
        for (const t of result.types) allNewTypes.set(t.id, t);
        allNewCollections.push({
          id: slugify(dir.name),
          name: dir.name,
          slug: slugify(dir.name),
          types: result.types,
        });
      }
    } else {
      console.error(`  ❌ No directories found in ${zipName}`);
      stats.errors.push({ zip: zipName, error: 'No directories found' });
      continue;
    }

    stats.zipsProcessed++;
    stats.productsFound += allNewProducts.length; // Will recount at end
  }

  // Deduplicate products within new batch (same SKU)
  const seenSkus = new Set();
  const dedupedProducts = [];
  for (const p of allNewProducts) {
    const key = p.sku || p.slug;
    if (!seenSkus.has(key)) {
      seenSkus.add(key);
      dedupedProducts.push(p);
    }
  }
  allNewProducts = dedupedProducts;
  stats.productsFound = allNewProducts.length;
  stats.imagesFound = allNewProducts.reduce((sum, p) => sum + p.images.length, 0);

  console.log(`\n${'═'.repeat(60)}`);
  console.log('  📊 SCAN SUMMARY');
  console.log(`${'═'.repeat(60)}`);
  console.log(`  ZIPs processed:    ${stats.zipsProcessed}`);
  console.log(`  New products:      ${stats.productsFound}`);
  console.log(`  Total images:      ${stats.imagesFound}`);
  console.log(`  Collections:       ${allNewCollections.length}`);
  console.log(`  Errors:            ${stats.errors.length}`);
  if (stats.errors.length > 0) {
    for (const e of stats.errors) console.log(`    - ${e.zip}: ${e.error}`);
  }

  // List new products
  console.log(`\n  📋 New Products:`);
  for (const p of allNewProducts) {
    console.log(`    [${p.sku || 'auto'}] ${p.name} — ${p.collection.name} (${p.images.length} imgs)`);
  }

  // Merge with existing catalog
  console.log(`\n─── MERGING WITH EXISTING CATALOG ──────────────────`);
  const { merged, duplicates } = mergeWithExisting(allNewProducts, EXISTING_JSON);

  console.log(`  Existing products:  ${merged.length - allNewProducts.length}`);
  console.log(`  New products added: ${allNewProducts.length}`);
  if (duplicates.length > 0) {
    console.log(`  ⚠️  Duplicates skipped: ${duplicates.length}`);
    for (const d of duplicates) {
      console.log(`     - ${d.name} (${d.reason})`);
    }
  }

  // Copy originals & optimize images
  if (!SKIP_OPTIMIZE) {
    await optimizeAllImages(allNewProducts, OUTPUT_DIR);
  } else {
    console.log('\n  ⏭️  Skipping image optimization (--skip-optimize)');
  }

  // Save products.json
  fs.writeFileSync(JSON_OUTPUT, JSON.stringify(merged, null, 2));
  console.log(`\n📄 products.json: ${JSON_OUTPUT} (${merged.length} products)`);

  // Build categories
  const allCategories = new Map();
  allCategories.set('todos', { id: 'todos', label: 'Todos', slug: 'coleccion', count: merged.length });
  for (const p of merged) {
    if (!allCategories.has(p.category)) {
      allCategories.set(p.category, {
        id: p.category,
        label: p.categoryLabel,
        slug: `coleccion/categoria/${p.category}`,
        count: 0,
      });
    }
    allCategories.get(p.category).count++;
  }
  fs.writeFileSync(CATEGORIES_OUTPUT, JSON.stringify(Array.from(allCategories.values()), null, 2));
  console.log(`📄 categories.json: ${CATEGORIES_OUTPUT}`);

  // Build collections
  const existingCollections = fs.existsSync(COLLECTIONS_OUTPUT)
    ? JSON.parse(fs.readFileSync(COLLECTIONS_OUTPUT, 'utf-8'))
    : [];
  const existingCollIds = new Set(existingCollections.map(c => c.id));
  for (const nc of allNewCollections) {
    if (!existingCollIds.has(nc.id)) {
      existingCollections.push(nc);
    }
  }
  fs.writeFileSync(COLLECTIONS_OUTPUT, JSON.stringify(existingCollections, null, 2));
  console.log(`📄 collections.json: ${COLLECTIONS_OUTPUT} (${existingCollections.length} collections)`);

  // Final summary
  console.log(`\n${'═'.repeat(60)}`);
  console.log('  ✅ BATCH IMPORT COMPLETED SUCCESSFULLY!');
  console.log(`${'═'.repeat(60)}`);
  console.log(`  Total products in catalog: ${merged.length}`);
  console.log(`  Collections: ${existingCollections.length}`);
  console.log(`  Categories: ${allCategories.size}`);

  // Save stats for worklog
  const batchStats = {
    timestamp: new Date().toISOString(),
    zipsProcessed: stats.zipsProcessed,
    zips: zipFiles.map(z => path.basename(z)),
    newProducts: allNewProducts.length,
    totalProducts: merged.length,
    totalImages: stats.imagesFound,
    duplicates: duplicates.length,
    errors: stats.errors,
    collections: allNewCollections.map(c => c.name),
  };
  fs.writeFileSync(path.join(PROJECT_ROOT, 'scripts/batch-stats.json'), JSON.stringify(batchStats, null, 2));
  console.log(`📄 batch-stats.json saved`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
