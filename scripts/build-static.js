#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Optimizing static export for GitHub Pages...');

const outDir = path.join(process.cwd(), 'out');

// Ensure .nojekyll file exists
const nojekyllPath = path.join(outDir, '.nojekyll');
if (!fs.existsSync(nojekyllPath)) {
  fs.writeFileSync(nojekyllPath, '');
  console.log('✅ Created .nojekyll file');
}

// Check if _next directory exists
const nextDir = path.join(outDir, '_next');
if (fs.existsSync(nextDir)) {
  console.log('📁 Found _next directory, checking structure...');
  
  // List all chunks
  const chunksDir = path.join(nextDir, 'static', 'chunks');
  if (fs.existsSync(chunksDir)) {
    const chunks = fs.readdirSync(chunksDir);
    console.log(`📦 Found ${chunks.length} chunk files:`, chunks);
    
    // Check for main chunks
    const mainChunks = chunks.filter(chunk => chunk.startsWith('main'));
    if (mainChunks.length > 1) {
      console.log('⚠️  Multiple main chunks detected - this may cause loading issues on GitHub Pages');
    }
  }
}

// Fix asset paths in HTML files
console.log('🔧 Fixing asset paths for GitHub Pages...');

// Function to recursively find HTML files
function findHtmlFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findHtmlFiles(fullPath));
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Find all HTML files
const htmlFiles = findHtmlFiles(outDir);
console.log(`📄 Found ${htmlFiles.length} HTML files to process`);

// Process each HTML file
for (const htmlFile of htmlFiles) {
  console.log(`🔧 Processing: ${path.relative(outDir, htmlFile)}`);
  
  let content = fs.readFileSync(htmlFile, 'utf8');
  
  // Fix _next paths to be relative
  content = content.replace(/\/_next\//g, './_next/');
  
  // Fix any remaining absolute paths
  content = content.replace(/href="\//g, 'href="./');
  content = content.replace(/src="\//g, 'src="./');
  
  // Write the fixed content back
  fs.writeFileSync(htmlFile, content);
}

console.log('✅ Static export optimization complete!');
console.log('🚀 Ready for GitHub Pages deployment');
