/**
 * Batch image optimizer — compresses and resizes all images in public/images/
 * Run: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMG_DIR = 'public/images';
const MAX_WIDTH = 1920;        // max width for regular images
const HERO_MAX_WIDTH = 2400;   // slightly wider for hero/background images
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;        // for PNG compression level

// Hero/large background images get wider max
const HERO_PATTERNS = ['hero', 'background', 'communityhero'];

function isHeroImage(filename) {
  const lower = filename.toLowerCase();
  return HERO_PATTERNS.some(p => lower.includes(p));
}

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllImages(fullPath));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  const name = basename(filePath);
  const maxW = isHeroImage(name) ? HERO_MAX_WIDTH : MAX_WIDTH;

  const before = (await stat(filePath)).size;
  const metadata = await sharp(filePath).metadata();

  let pipeline = sharp(filePath).rotate(); // auto-rotate based on EXIF

  // Only resize if wider than max
  if (metadata.width && metadata.width > maxW) {
    pipeline = pipeline.resize({ width: maxW, withoutEnlargement: true });
  }

  const tmpPath = filePath + '.optimized';

  if (ext === '.png') {
    await pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 }).toFile(tmpPath);
  } else {
    // jpg/jpeg
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmpPath);
  }

  const after = (await stat(tmpPath)).size;
  const saved = ((before - after) / before * 100).toFixed(1);

  // Replace original
  await unlink(filePath);
  await rename(tmpPath, filePath);

  const beforeMB = (before / 1024 / 1024).toFixed(1);
  const afterMB = (after / 1024 / 1024).toFixed(1);

  console.log(`  ${name}: ${beforeMB}MB -> ${afterMB}MB (${saved}% saved)`);
  return { before, after };
}

async function main() {
  console.log('Scanning images in', IMG_DIR, '...\n');
  const images = await getAllImages(IMG_DIR);
  console.log(`Found ${images.length} images to optimize\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const img of images) {
    try {
      const { before, after } = await optimizeImage(img);
      totalBefore += before;
      totalAfter += after;
    } catch (err) {
      console.error(`  SKIP ${basename(img)}: ${err.message}`);
    }
  }

  const totalBeforeMB = (totalBefore / 1024 / 1024).toFixed(1);
  const totalAfterMB = (totalAfter / 1024 / 1024).toFixed(1);
  const totalSaved = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1);

  console.log(`\nDone! Total: ${totalBeforeMB}MB -> ${totalAfterMB}MB (${totalSaved}% saved)`);
}

main().catch(console.error);
