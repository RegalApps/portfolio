import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

async function createFavicon() {
  try {
    await sharp(join(projectRoot, 'public', 'icon.png'))
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({
        quality: 100,
        compressionLevel: 9
      })
      .toFile(join(projectRoot, 'public', 'favicon.png'));

    console.log('Successfully created favicon');
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

createFavicon();
