import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

async function optimizeImages(directory) {
  try {
    const files = await readdir(directory, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = join(directory, file.name);
      
      if (file.isDirectory()) {
        await optimizeImages(fullPath);
        continue;
      }
      
      if (!file.name.toLowerCase().endsWith('.png')) {
        continue;
      }

      console.log(`Optimizing: ${fullPath}`);
      
      try {
        await sharp(fullPath)
          .png({
            quality: 80,
            compressionLevel: 9,
            palette: true
          })
          .toBuffer()
          .then(buffer => sharp(buffer).toFile(fullPath));
          
        console.log(`✓ Optimized: ${file.name}`);
      } catch (err) {
        console.error(`Error optimizing ${file.name}:`, err);
      }
    }
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

// Directories to optimize
const directories = [
  join(projectRoot, 'public', 'screenshots'),
  join(projectRoot, 'public', 'thumbnails'),
];

console.log('Starting image optimization...');

for (const dir of directories) {
  await optimizeImages(dir);
}

console.log('Image optimization complete!');
