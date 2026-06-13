#!/usr/bin/env node
// Optimize ALL images in new product directories
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const OUTPUT_BASE = path.resolve('public/products');
const NEW_COLLECTIONS = [
  'juego-flor-de-plata-swarovski',
  'juego-engaste-abierto',
  'dije-engaste-abierto',
  'aretes-corazon-abierto-swarovski',
  'aretes-circular',
  'juego-aro-atrapasueno',
  'juego-aro-vertical-mariposa-swarovski',
];

console.log(`Optimizing images in ${NEW_COLLECTIONS.length} new collections...\n`);

let totalProcessed = 0;
let totalOriginalSize = 0;
let totalOptimizedSize = 0;

for (const col of NEW_COLLECTIONS) {
  const colDir = path.join(OUTPUT_BASE, col);
  if (!fs.existsSync(colDir)) continue;
  
  // Walk all subdirectories
  const colorDirs = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
    }
    colorDirs.push(dir);
  }
  walk(colDir);
  
  for (const dir of colorDirs) {
    const sourceFiles = fs.readdirSync(dir).filter(f => 
      /\.(jpg|jpeg|png)$/i.test(f) && !f.startsWith('.') && !f.startsWith('_temp_')
    ).sort();
    
    if (sourceFiles.length === 0) continue;
    
    const colorSlug = path.basename(dir);
    
    for (let i = 0; i < sourceFiles.length; i++) {
      const f = sourceFiles[i];
      const srcPath = path.join(dir, f);
      const baseName = `${colorSlug}-${i + 1}`;
      
      try {
        const buf = fs.readFileSync(srcPath);
        const meta = await sharp(buf).metadata();
        totalOriginalSize += buf.length;
        
        // WebP full size
        const webpFull = path.join(dir, `${baseName}.webp`);
        if (!fs.existsSync(webpFull)) {
          await sharp(buf).webp({ quality: 88, smartSubsample: true, effort: 4 }).toFile(webpFull);
        }
        totalOptimizedSize += fs.statSync(webpFull).size;
        
        // WebP 800px
        const webp800 = path.join(dir, `${baseName}-800.webp`);
        if (!fs.existsSync(webp800) && meta.width > 800) {
          const h = Math.round((meta.height / meta.width) * 800);
          await sharp(buf).resize(800, h, { fit: 'inside', withoutEnlargement: true, kernel: 'lanczos3' })
            .webp({ quality: 88, smartSubsample: true, effort: 4 }).toFile(webp800);
        }
        if (fs.existsSync(webp800)) totalOptimizedSize += fs.statSync(webp800).size;
        
        // Thumbnail
        const thumb = path.join(dir, `${baseName}-thumb.webp`);
        if (!fs.existsSync(thumb)) {
          const th = Math.round((meta.height / meta.width) * 300);
          await sharp(buf).resize(300, th, { fit: 'cover', withoutEnlargement: true, kernel: 'lanczos3' })
            .webp({ quality: 80, smartSubsample: true, effort: 4 }).toFile(thumb);
        }
        totalOptimizedSize += fs.statSync(thumb).size;
        
        totalProcessed++;
        if (totalProcessed % 10 === 0) {
          process.stdout.write(`  Processed ${totalProcessed}...\r`);
        }
      } catch (err) {
        console.error(`  ❌ ${f}: ${err.message}`);
      }
    }
  }
}

console.log(`\n📊 Total: ${totalProcessed} images optimized`);
console.log(`   Original: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Optimized: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
if (totalOriginalSize > 0) {
  console.log(`   Savings: ${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(0)}%`);
}
