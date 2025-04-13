const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Ensure screenshots directory exists
const screenshotsDir = path.join(__dirname, '..', 'public', 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Input image is in the scripts directory
const inputPath = path.join(__dirname, 'thred-migration.png');
const outputPath = path.join(screenshotsDir, 'thred-migration.webp');

sharp(inputPath)
  .webp({ 
    quality: 90,
    effort: 6 // Higher compression effort for better results
  })
  .toFile(outputPath)
  .then(info => {
    console.log('Conversion successful:', info);
    console.log('Output saved to:', outputPath);
  })
  .catch(err => {
    console.error('Error converting image:', err);
  });
