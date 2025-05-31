const sharp = require('sharp');
const path = require('path');

async function optimizeIcon() {
  try {
    // Create optimized icon from the existing one
    await sharp('public/icon.png')
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({
        quality: 100,
        compressionLevel: 9
      })
      .toFile(path.join(__dirname, '../public/favicon.png'));

    console.log('Successfully created optimized icon');
  } catch (error) {
    console.error('Error creating icon:', error);
  }
}

optimizeIcon();
