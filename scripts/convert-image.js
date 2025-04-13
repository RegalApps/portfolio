const sharp = require('sharp');
const path = require('path');

async function convertToWebp() {
  try {
    const inputPath = path.join(__dirname, 'thred-migration.jpeg');
    
    // Get image info
    const metadata = await sharp(inputPath).metadata();
    console.log('Original dimensions:', metadata.width, 'x', metadata.height);
    
    // Convert and resize
    await sharp(inputPath)
      .resize(800, null, {  // Set width to 800px, maintain aspect ratio
        withoutEnlargement: true  // Don't enlarge if image is smaller
      })
      .webp({ 
        quality: 95,
        effort: 6,
        lossless: true
      })
      .toFile(path.join(__dirname, '../public/screenshots/thred-migration.webp'));
    
    // Get converted image info
    const newMetadata = await sharp(path.join(__dirname, '../public/screenshots/thred-migration.webp')).metadata();
    console.log('New dimensions:', newMetadata.width, 'x', newMetadata.height);
    
    console.log('Successfully converted image to WebP');
  } catch (error) {
    console.error('Error converting image:', error);
  }
}

convertToWebp();
