#!/bin/bash

# Create necessary directories if they don't exist
mkdir -p public/images
mkdir -p public/thumbnails

# Copy project screenshots
for img in rev0-campaign rev0-sales rev0-devops; do
  if [ -f "screenshots/$img.png" ]; then
    cp "screenshots/$img.png" "public/images/$img.webp"
  fi
done

# Copy interview thumbnails
# Expected format: thumbnails/interview-name.png (e.g., thumbnails/dan-romero.png)
for thumbnail in thumbnails/*.png; do
  if [ -f "$thumbnail" ]; then
    filename=$(basename "$thumbnail" .png)
    cp "$thumbnail" "public/thumbnails/$filename.webp"
  fi
done

echo "Image copy complete!"
echo "Place your interview thumbnails (768x432 recommended) in the 'thumbnails' directory and run this script again."
