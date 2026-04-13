import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';

const IMAGE_DIR = './public/assets/images';
const MAX_WIDTH = 2400;
const QUALITY = 85;

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (e) => {
    const full = join(dir, e.name);
    return e.isDirectory() ? getFiles(full) : full;
  }));
  return files.flat();
}

async function convert() {
  const files = await getFiles(IMAGE_DIR);
  const images = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));

  console.log(`Found ${images.length} images to convert\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of images) {
    const ext = extname(file);
    const webpPath = file.replace(ext, '.webp');
    const { size: before } = await stat(file);
    totalBefore += before;

    try {
      await sharp(file)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(webpPath);

      const { size: after } = await stat(webpPath);
      totalAfter += after;

      const saved = Math.round((1 - after / before) * 100);
      console.log(`✓ ${basename(file)} → ${basename(webpPath)} (${saved}% menor)`);
    } catch (e) {
      console.error(`✗ ${basename(file)}: ${e.message}`);
    }
  }

  console.log(`\n─────────────────────────────────────`);
  console.log(`Total antes:  ${(totalBefore / 1e6).toFixed(0)} MB`);
  console.log(`Total depois: ${(totalAfter / 1e6).toFixed(0)} MB`);
  console.log(`Economia:     ${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%`);
  console.log(`\nWebP gerados. Agora atualize os src no código para .webp`);
}

convert();
