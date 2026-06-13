#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════════
// MAIA STORE — Premium Jewelry Image Optimization Pipeline
//
// Phase 1: Clean — Remove UI, black bars, screenshot elements
// Phase 2: Re-center — Product at 70-85% of visible area
// Phase 3: Export — AVIF Q85 + WebP Q88 at 400/800/1200/1600px + thumb
//
// Quality priority: Swarovski / Pandora level
// ═══════════════════════════════════════════════════════════════════════

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

// ─── Config ───────────────────────────────────────────────────────
const SOURCE_DIR = '/tmp/maia-raw/Juego Botón';
const OUTPUT_DIR = 'public/products';
const SIZES = [400, 800, 1200, 1600];
const THUMB_SIZE = 300;
const WEBP_QUALITY = 88;
const AVIF_QUALITY = 85;
const BACKGROUND_FILL = { r: 245, g: 243, b: 240 }; // #F5F3F0 warm white

// ─── Pixel Analysis ──────────────────────────────────────────────

function getPixel(raw, x, y, w, ch) {
  const idx = (y * w + x) * ch;
  return { r: raw[idx], g: raw[idx + 1], b: raw[idx + 2] };
}

function brightness(p) {
  return (p.r + p.g + p.b) / 3;
}

function colorDist(a, b) {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

// Detect true black bars (avg brightness < 30 per row/col, 15+ consecutive)
function detectBlackBars(raw, w, h, ch) {
  let top = 0, bottom = 0, left = 0, right = 0;

  for (let y = 0; y < h; y++) {
    let sum = 0;
    for (let x = 0; x < w; x++) { sum += brightness(getPixel(raw, x, y, w, ch)); }
    if (sum / w < 30) top++; else break;
  }

  for (let y = h - 1; y >= 0; y--) {
    let sum = 0;
    for (let x = 0; x < w; x++) { sum += brightness(getPixel(raw, x, y, w, ch)); }
    if (sum / w < 30) bottom++; else break;
  }

  for (let x = 0; x < w; x++) {
    let sum = 0;
    for (let y = 0; y < h; y++) { sum += brightness(getPixel(raw, x, y, w, ch)); }
    if (sum / h < 30) left++; else break;
  }

  for (let x = w - 1; x >= 0; x--) {
    let sum = 0;
    for (let y = 0; y < h; y++) { sum += brightness(getPixel(raw, x, y, w, ch)); }
    if (sum / h < 30) right++; else break;
  }

  return {
    hasBars: top >= 15 || bottom >= 15 || left >= 15 || right >= 15,
    top, bottom, left, right
  };
}

// Detect UI elements: look for bright (white) text/icon pixels in dark regions
function detectUIElements(raw, w, h, ch) {
  // Check bottom 80px for UI bar with white text
  let bottomUIRows = 0;
  for (let y = Math.max(0, h - 80); y < h; y++) {
    let whitePixels = 0;
    for (let x = 0; x < w; x++) {
      const p = getPixel(raw, x, y, w, ch);
      // White text: all channels > 200
      if (p.r > 200 && p.g > 200 && p.b > 200) whitePixels++;
    }
    if (whitePixels > w * 0.005) bottomUIRows++;
  }

  // Check for Gemini-specific bottom bar (dark uniform bar with slight color variation)
  let bottomDarkBar = 0;
  for (let y = h - 1; y >= Math.max(0, h - 100); y--) {
    let rowStd = 0, rowAvg = 0;
    const pixels = [];
    for (let x = 0; x < w; x++) {
      const p = getPixel(raw, x, y, w, ch);
      const b = brightness(p);
      rowAvg += b;
      pixels.push(b);
    }
    rowAvg /= w;
    for (const b of pixels) rowStd += (b - rowAvg) ** 2;
    rowStd = Math.sqrt(rowStd / w);
    // UI bars are very uniform (low std dev) and dark
    if (rowAvg < 45 && rowStd < 8) bottomDarkBar++;
    else break;
  }

  return {
    hasUI: bottomUIRows >= 5 || bottomDarkBar >= 20,
    bottomUIRows,
    bottomDarkBar
  };
}

// Detect product bounding box using edge detection from corners
function detectProductBounds(raw, w, h, ch) {
  // Sample corners to determine background color
  const cornerSize = 20;
  const corners = [];
  for (let y = 0; y < cornerSize; y++) {
    for (let x = 0; x < cornerSize; x++) corners.push(getPixel(raw, x, y, w, ch));
    for (let x = w - cornerSize; x < w; x++) corners.push(getPixel(raw, x, y, w, ch));
  }
  for (let y = h - cornerSize; y < h; y++) {
    for (let x = 0; x < cornerSize; x++) corners.push(getPixel(raw, x, y, w, ch));
    for (let x = w - cornerSize; x < w; x++) corners.push(getPixel(raw, x, y, w, ch));
  }

  // Average corner color as background reference
  const bgR = Math.round(corners.reduce((s, p) => s + p.r, 0) / corners.length);
  const bgG = Math.round(corners.reduce((s, p) => s + p.g, 0) / corners.length);
  const bgB = Math.round(corners.reduce((s, p) => s + p.b, 0) / corners.length);
  const bgColor = { r: bgR, g: bgG, b: bgB };

  // Find product bounds: scan from each edge to find where non-background starts
  const threshold = 40; // color distance threshold

  let productTop = 0, productBottom = h - 1, productLeft = 0, productRight = w - 1;

  // Top: scan rows until we find significant non-bg content
  for (let y = 0; y < h; y++) {
    let nonBgPixels = 0;
    for (let x = 0; x < w; x++) {
      const p = getPixel(raw, x, y, w, ch);
      if (colorDist(p, bgColor) > threshold) nonBgPixels++;
    }
    if (nonBgPixels > w * 0.05) { productTop = y; break; }
  }

  // Bottom
  for (let y = h - 1; y >= 0; y--) {
    let nonBgPixels = 0;
    for (let x = 0; x < w; x++) {
      const p = getPixel(raw, x, y, w, ch);
      if (colorDist(p, bgColor) > threshold) nonBgPixels++;
    }
    if (nonBgPixels > w * 0.05) { productBottom = y; break; }
  }

  // Left
  for (let x = 0; x < w; x++) {
    let nonBgPixels = 0;
    for (let y = 0; y < h; y++) {
      const p = getPixel(raw, x, y, w, ch);
      if (colorDist(p, bgColor) > threshold) nonBgPixels++;
    }
    if (nonBgPixels > h * 0.05) { productLeft = x; break; }
  }

  // Right
  for (let x = w - 1; x >= 0; x--) {
    let nonBgPixels = 0;
    for (let y = 0; y < h; y++) {
      const p = getPixel(raw, x, y, w, ch);
      if (colorDist(p, bgColor) > threshold) nonBgPixels++;
    }
    if (nonBgPixels > h * 0.05) { productRight = x; break; }
  }

  return {
    bgColor,
    product: {
      top: productTop,
      bottom: productBottom,
      left: productLeft,
      right: productRight,
      width: productRight - productLeft + 1,
      height: productBottom - productTop + 1,
    }
  };
}

// ─── Processing Pipeline ──────────────────────────────────────────

const stats = { processed: 0, cleaned: 0, skipped: 0, errors: 0, files: 0 };

async function processImage(inputPath, outputPath, name) {
  console.log(`\n  📷 ${name}`);

  const meta = await sharp(inputPath).metadata();
  const w = meta.width, h = meta.height;
  const raw = await sharp(inputPath).raw().toBuffer();
  const ch = meta.channels || 3;

  console.log(`     Original: ${w}x${h}`);

  // ── PHASE 1: Detect and remove UI ──
  const bars = detectBlackBars(raw, w, h, ch);
  const ui = detectUIElements(raw, w, h, ch);
  const needsCleaning = bars.hasBars || ui.hasUI;

  let cropTop = 0, cropBottom = 0, cropLeft = 0, cropRight = 0;

  if (needsCleaning) {
    if (bars.top >= 15) cropTop = bars.top;
    if (bars.bottom >= 15) cropBottom = bars.bottom;
    if (bars.left >= 15) cropLeft = bars.left;
    if (bars.right >= 15) cropRight = bars.right;
    // Also add any UI dark bar
    if (ui.bottomDarkBar >= 20 && ui.bottomDarkBar > cropBottom) {
      cropBottom = ui.bottomDarkBar;
    }
    stats.cleaned++;
    console.log(`     🔧 CLEANING: crop T=${cropTop} B=${cropBottom} L=${cropLeft} R=${cropRight}`);
  } else {
    console.log(`     ✅ Clean — no UI detected`);
  }

  // ── PHASE 2: Re-center product ──
  // Crop UI first, then analyze product bounds
  const cropW = w - cropLeft - cropRight;
  const cropH = h - cropTop - cropBottom;

  if (cropW <= 100 || cropH <= 100) {
    console.log(`     ⚠️  Image too small after crop, skipping`);
    stats.skipped++;
    return;
  }

  // Get cropped raw data for product analysis
  const croppedRaw = await sharp(inputPath)
    .extract({ left: cropLeft, top: cropTop, width: cropW, height: cropH })
    .raw()
    .toBuffer();

  const bounds = detectProductBounds(croppedRaw, cropW, cropH, ch);
  const prodFill = bounds.product.width / cropW; // How much of the image the product fills

  console.log(`     Product fill: ${(prodFill * 100).toFixed(1)}% (${bounds.product.width}x${bounds.product.height} in ${cropW}x${cropH})`);

  let finalW = cropW, finalH = cropH;
  let padX = 0, padY = 0;
  let extractRegion = { left: 0, top: 0, width: cropW, height: cropH };

  // If product fills less than 70% or more than 90%, adjust framing
  if (prodFill < 0.70 || prodFill > 0.90) {
    // Calculate ideal padding for 78% fill (middle of 70-85%)
    const targetFill = 0.78;
    const idealW = bounds.product.width / targetFill;
    const idealH = bounds.product.height / targetFill;

    padX = Math.max(0, Math.round((idealW - bounds.product.width) / 2));
    padY = Math.max(0, Math.round((idealH - bounds.product.height) / 2));

    // Clamp padding to not exceed image bounds
    padX = Math.min(padX, bounds.product.left, cropW - bounds.product.right - 1);
    padY = Math.min(padY, bounds.product.top, cropH - bounds.product.bottom - 1);

    extractRegion = {
      left: Math.max(0, bounds.product.left - padX),
      top: Math.max(0, bounds.product.top - padY),
      width: Math.min(cropW, bounds.product.width + padX * 2),
      height: Math.min(cropH, bounds.product.height + padY * 2),
    };

    finalW = extractRegion.width;
    finalH = extractRegion.height;
    console.log(`     🔧 Re-center: padded to ${finalW}x${finalH} for ${(bounds.product.width / finalW * 100).toFixed(1)}% fill`);
  }

  // ── PHASE 3: Premium Export ──
  // Get the final cropped/centered image buffer
  let pipeline = sharp(inputPath).extract({
    left: cropLeft + extractRegion.left,
    top: cropTop + extractRegion.top,
    width: finalW,
    height: finalH,
  });

  // Ensure the output exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const baseName = path.basename(outputPath, path.extname(outputPath));

  // 3a. Original-size WebP (primary display)
  const webpPath = `${path.dirname(outputPath)}/${baseName}.webp`;
  await pipeline.clone()
    .webp({
      quality: WEBP_QUALITY,
      smartSubsample: true,
      effort: 6, // Higher effort for better quality
      alphaQuality: 100,
    })
    .toFile(webpPath);
  const webpSize = fs.statSync(webpPath).size;
  stats.files++;

  // 3b. Responsive sizes (WebP)
  for (const targetWidth of SIZES) {
    if (finalW <= targetWidth) continue; // Don't upscale
    const ratio = finalH / finalW;
    const targetH = Math.round(targetWidth * ratio);
    const sizedPath = `${path.dirname(outputPath)}/${baseName}-${targetWidth}.webp`;

    await sharp(inputPath)
      .extract({
        left: cropLeft + extractRegion.left,
        top: cropTop + extractRegion.top,
        width: finalW,
        height: finalH,
      })
      .resize(targetWidth, targetH, {
        fit: 'inside',
        withoutEnlargement: true,
        kernel: 'lanczos3',
      })
      .webp({
        quality: WEBP_QUALITY,
        smartSubsample: true,
        effort: 6,
      })
      .toFile(sizedPath);
    stats.files++;

    const sz = fs.statSync(sizedPath).size;
    console.log(`     ✓ ${targetWidth}px → ${(sz / 1024).toFixed(0)}KB`);
  }

  // 3c. Thumbnail (WebP)
  const thumbW = THUMB_SIZE;
  const thumbH = Math.round((finalH / finalW) * thumbW);
  const thumbPath = `${path.dirname(outputPath)}/${baseName}-thumb.webp`;

  await sharp(inputPath)
    .extract({
      left: cropLeft + extractRegion.left,
      top: cropTop + extractRegion.top,
      width: finalW,
      height: finalH,
    })
    .resize(thumbW, thumbH, {
      fit: 'cover',
      withoutEnlargement: true,
      kernel: 'lanczos3',
    })
    .webp({
      quality: 85,
      smartSubsample: true,
      effort: 6,
    })
    .toFile(thumbPath);
  stats.files++;

  // 3d. AVIF (best compression, modern browsers)
  const avifPath = `${path.dirname(outputPath)}/${baseName}.avif`;
  await sharp(inputPath)
    .extract({
      left: cropLeft + extractRegion.left,
      top: cropTop + extractRegion.top,
      width: finalW,
      height: finalH,
    })
    .avif({
      quality: AVIF_QUALITY,
      effort: 6,
      chromaSubsampling: '4:2:0',
    })
    .toFile(avifPath);
  const avifSize = fs.statSync(avifPath).size;
  stats.files++;

  console.log(`     ✓ WebP Q${WEBP_QUALITY}: ${(webpSize / 1024).toFixed(0)}KB | AVIF Q${AVIF_QUALITY}: ${(avifSize / 1024).toFixed(0)}KB`);
  stats.processed++;
}

// ─── Main ──────────────────────────────────────────────────────────

async function main() {
  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║  MAIA STORE — Premium Jewelry Image Optimization Pipeline                  ║');
  console.log('║  Quality: Swarovski / Pandora level                                         ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝');
  console.log(`  WebP Q: ${WEBP_QUALITY} | AVIF Q: ${AVIF_QUALITY} | Sizes: ${SIZES.join(',')}px + thumb ${THUMB_SIZE}px`);
  console.log('');

  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Source not found: ${SOURCE_DIR}`);
    process.exit(1);
  }

  // Clear existing output
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true });
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Walk source directory
  async function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }
      if (!['.jpg', '.jpeg', '.png'].includes(path.extname(entry.name).toLowerCase())) continue;

      // Map source path to output path
      const relPath = path.relative(SOURCE_DIR, fullPath);
      // Parse folder structure to create clean output names
      const parts = relPath.split(path.sep);
      // parts: [Type, VariantFolder, filename] (3 parts from inside collection dir)
      if (parts.length < 3) continue;

      const typeSlug = slugify(parts[0]);               // "aretes-boton"
      const variantFolder = parts[parts.length - 2];    // Full variant name
      const colorName = extractColorName(variantFolder) || slugify(variantFolder);

      // Count images in this variant directory to assign index
      const variantDir = path.dirname(fullPath);
      const variantImages = fs.readdirSync(variantDir)
        .filter(f => ['.jpg', '.jpeg', '.png'].includes(path.extname(f).toLowerCase()))
        .sort();
      const imgIndex = variantImages.indexOf(entry.name) + 1;

      const cleanName = `${colorName}-${imgIndex}`;
      const collectionSlug = slugify(path.basename(SOURCE_DIR)); // "juego-boton"
      const outputPath = path.join(OUTPUT_DIR, collectionSlug, typeSlug, colorName, `${cleanName}.jpg`);

      try {
        await processImage(fullPath, outputPath, relPath);
      } catch (err) {
        console.error(`     ❌ Error: ${err.message}`);
        stats.errors++;
      }
    }
  }

  await walk(SOURCE_DIR);

  // ── Summary ──
  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║  PREMIUM OPTIMIZATION COMPLETE                                                ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝');
  console.log(`  Processed:     ${stats.processed} images`);
  console.log(`  Cleaned:      ${stats.cleaned} (UI/black bars removed)`);
  console.log(`  Skipped:       ${stats.skipped}`);
  console.log(`  Errors:        ${stats.errors}`);
  console.log(`  Files created: ${stats.files}`);
  const totalSize = fs.readdirSync(OUTPUT_DIR, { recursive: true }).reduce((sum, f) => {
    const fp = path.join(OUTPUT_DIR, f);
    return sum + (fs.statSync(fp).isFile() ? fs.statSync(fp).size : 0);
  }, 0);
  console.log(`  Total output:  ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log('');
}

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractColorName(folderName) {
  // Parse color from variant folder name
  const colors = ['Crema', 'Rosado', 'Verde Botella', 'Amatista', 'Cuarzo Rosa', 'Azul', 'Negro', 'Blanco', 'Dorado', 'Rojo'];
  for (const color of colors) {
    if (folderName.includes(color)) return slugify(color);
  }
  return null;
}

main().catch(console.error);
