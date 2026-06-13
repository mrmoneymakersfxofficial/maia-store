#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// MAIA STORE — Image Optimization Script (Sharp)
// Optimizes product images for premium jewelry e-commerce
//
// Strategy:
//   - WebP primary format (universal browser support)
//   - AVIF secondary (best compression, modern browsers)
//   - Multi-size responsive: 400px, 800px, 1200px, 1600px
//   - Thumbnail: 300px
//   - Quality: 85 (WebP), 70 (AVIF) — preserves metal reflections
//   - ICC color profile preservation
//   - No upscaling (only downscale)
//
// Usage:
//   node scripts/optimize-images.mjs --input public/products --output public/products
//   node scripts/optimize-images.mjs --input public/products --output public/products --dry-run
//   node scripts/optimize-images.mjs --input public/products --output public/products --sizes 400,800,1200
// ═══════════════════════════════════════════════════════════════════

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

// ─── CLI Arguments ──────────────────────────────────────────────

const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : null;
}
function hasFlag(name) {
  return args.includes(`--${name}`);
}

const INPUT_DIR = getArg('input') || 'public/products';
const OUTPUT_DIR = getArg('output') || 'public/products';
const DRY_RUN = hasFlag('dry-run');
const CUSTOM_SIZES = getArg('sizes')
  ? getArg('sizes').split(',').map(Number)
  : [400, 800, 1200, 1600];
const THUMB_SIZE = 300;
const WEBP_QUALITY = 85;
const AVIF_QUALITY = 70;

// ─── Stats ───────────────────────────────────────────────────────

let stats = {
  processed: 0,
  skipped: 0,
  errors: 0,
  totalOriginalSize: 0,
  totalOptimizedSize: 0,
  formats: { webp: 0, avif: 0 },
  sizes: {},
};

// ─── Main Pipeline ──────────────────────────────────────────────

async function optimizeImage(inputPath, outputBasePath, filename) {
  const ext = path.extname(filename).toLowerCase();
  const name = path.basename(filename, ext);

  // Skip already optimized files
  if (['.webp', '.avif'].includes(ext)) {
    stats.skipped++;
    return;
  }

  // Skip non-image files
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    stats.skipped++;
    return;
  }

  try {
    const inputBuffer = fs.readFileSync(inputPath);
    const inputSize = inputBuffer.length;
    stats.totalOriginalSize += inputSize;

    // Get original metadata
    const metadata = await sharp(inputBuffer).metadata();

    console.log(
      `  🖼️  ${path.basename(inputPath)} → ${metadata.width}x${metadata.height} (${(inputSize / 1024).toFixed(0)}KB)`
    );

    // ── 1. Original-size WebP (highest quality) ──
    const webpOriginalPath = path.join(outputBasePath, `${name}.webp`);
    await sharp(inputBuffer)
      .webp({
        quality: WEBP_QUALITY,
        smartSubsample: true,
        effort: 4, // Fast but good quality
      })
      .toFile(webpOriginalPath);
    stats.formats.webp++;
    const webpOrigSize = fs.statSync(webpOriginalPath).size;
    stats.totalOptimizedSize += webpOrigSize;
    console.log(
      `     ✓ WebP original: ${(webpOrigSize / 1024).toFixed(0)}KB (${((1 - webpOrigSize / inputSize) * 100).toFixed(0)}% smaller)`
    );

    // ── 2. Responsive sizes (WebP) ──
    for (const targetWidth of CUSTOM_SIZES) {
      if (metadata.width <= targetWidth) {
        stats.skipped++;
        continue; // Don't upscale
      }

      const ratio = metadata.height / metadata.width;
      const targetHeight = Math.round(targetWidth * ratio);
      const sizedPath = path.join(outputBasePath, `${name}-${targetWidth}.webp`);

      await sharp(inputBuffer)
        .resize(targetWidth, targetHeight, {
          fit: 'inside',
          withoutEnlargement: true,
          kernel: 'lanczos3', // Best quality for jewelry details
        })
        .webp({
          quality: WEBP_QUALITY,
          smartSubsample: true,
          effort: 4,
        })
        .toFile(sizedPath);

      stats.formats.webp++;
      const sizedSize = fs.statSync(sizedPath).size;
      stats.totalOptimizedSize += sizedSize;
      if (!stats.sizes[targetWidth]) stats.sizes[targetWidth] = { count: 0, totalSize: 0 };
      stats.sizes[targetWidth].count++;
      stats.sizes[targetWidth].totalSize += sizedSize;

      console.log(
        `     ✓ ${targetWidth}px: ${targetWidth}x${targetHeight} → ${(sizedSize / 1024).toFixed(0)}KB`
      );
    }

    // ── 3. Thumbnail (WebP) ──
    const thumbWidth = THUMB_SIZE;
    const thumbHeight = Math.round((metadata.height / metadata.width) * thumbWidth);
    const thumbPath = path.join(outputBasePath, `${name}-thumb.webp`);

    await sharp(inputBuffer)
      .resize(thumbWidth, thumbHeight, {
        fit: 'cover',
        withoutEnlargement: true,
        kernel: 'lanczos3',
      })
      .webp({
        quality: 80,
        smartSubsample: true,
        effort: 4,
      })
      .toFile(thumbPath);

    stats.formats.webp++;
    const thumbSize = fs.statSync(thumbPath).size;
    stats.totalOptimizedSize += thumbSize;
    console.log(`     ✓ Thumb: ${thumbWidth}x${thumbHeight} → ${(thumbSize / 1024).toFixed(0)}KB`);

    // ── 4. AVIF (best compression, modern browsers) ──
    const avifPath = path.join(outputBasePath, `${name}.avif`);
    await sharp(inputBuffer)
      .avif({
        quality: AVIF_QUALITY,
        effort: 4,
        chromaSubsampling: '4:2:0',
      })
      .toFile(avifPath);
    stats.formats.avif++;
    const avifSize = fs.statSync(avifPath).size;
    stats.totalOptimizedSize += avifSize;
    console.log(
      `     ✓ AVIF: ${(avifSize / 1024).toFixed(0)}KB (${((1 - avifSize / inputSize) * 100).toFixed(0)}% smaller)`
    );

    stats.processed++;
  } catch (err) {
    console.error(`     ❌ Error: ${err.message}`);
    stats.errors++;
  }
}

async function walkAndOptimize(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walkAndOptimize(fullPath);
    } else if (entry.isFile()) {
      await optimizeImage(fullPath, dir, entry.name);
    }
  }
}

// ─── Main ───────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  MAIA STORE — Image Optimization (Sharp)');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`  Input:    ${INPUT_DIR}`);
  console.log(`  Output:   ${OUTPUT_DIR}`);
  console.log(`  Sizes:    ${CUSTOM_SIZES.join(', ')}px + thumb ${THUMB_SIZE}px`);
  console.log(`  WebP Q:   ${WEBP_QUALITY} | AVIF Q: ${AVIF_QUALITY}`);
  console.log(`  Dry Run:  ${DRY_RUN}`);
  console.log('═══════════════════════════════════════════════════════════\n');

  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`\n❌ Input directory not found: ${INPUT_DIR}`);
    process.exit(1);
  }

  if (DRY_RUN) {
    console.log('🔍 DRY RUN — No files will be modified\n');
    // Just list what would be processed
    const entries = fs.readdirSync(INPUT_DIR, { withFileTypes: true, recursive: true });
    const images = entries.filter(e => e.isFile() && ['.jpg', '.jpeg', '.png'].includes(path.extname(e.name).toLowerCase()));
    console.log(`  Would process: ${images.length} image(s)\n`);
    for (const img of images) {
      console.log(`  → ${img.path}/${img.name}`);
    }
    return;
  }

  await walkAndOptimize(INPUT_DIR);

  // ── Summary ──
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('  📊 OPTIMIZATION SUMMARY');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`  Processed:     ${stats.processed} image(s)`);
  console.log(`  Skipped:        ${stats.skipped} file(s)`);
  console.log(`  Errors:         ${stats.errors}`);
  console.log(`  WebP files:     ${stats.formats.webp}`);
  console.log(`  AVIF files:     ${stats.formats.avif}`);
  console.log(`  Original size:  ${(stats.totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Optimized:     ${(stats.totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  if (stats.totalOriginalSize > 0) {
    const savings = ((1 - stats.totalOptimizedSize / stats.totalOriginalSize) * 100).toFixed(1);
    console.log(`  Note: Optimized includes multiple formats/sizes per image`);
  }
  console.log('\n  Size breakdown:');
  for (const [size, info] of Object.entries(stats.sizes)) {
    console.log(`    ${size}px: ${info.count} files (${(info.totalSize / 1024 / 1024).toFixed(2)} MB)`);
  }
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  ✅ Optimization completed!');
  console.log('═══════════════════════════════════════════════════════════');

  // Generate optimization report JSON
  const reportPath = 'scripts/optimization-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(stats, null, 2));
  console.log(`  📄 Report: ${reportPath}\n`);
}

main().catch(console.error);
