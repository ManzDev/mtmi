#!/bin/bash

# Build app

npm run build

# Fix to GitHub Pages issue with _folders
echo "# Fix _folder" > dist/.nojekyll

# Deploy to GitHub Pages
npx gh-pages -d dist
