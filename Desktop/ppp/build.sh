#!/bin/bash

# Build for production
npm run build

# Optimize images
npm run optimize-images 

# Generate service worker
npm run generate-sw

# Copy files to dist
cp -r build/* dist/
