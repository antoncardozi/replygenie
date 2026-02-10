#!/usr/bin/env node
// Post-build: Fix CSS in static export HTML files
// React 18 hydration removes <link> stylesheets from <head>
// Solution: inline the CSS as a <style> tag in <head> so React can't strip it
import fs from 'fs';
import path from 'path';

const outDir = path.join(import.meta.dirname, 'out');

// Find all CSS files
const cssDir = path.join(outDir, '_next', 'static', 'css');
let allCss = '';
if (fs.existsSync(cssDir)) {
  for (const f of fs.readdirSync(cssDir).filter(f => f.endsWith('.css'))) {
    allCss += fs.readFileSync(path.join(cssDir, f), 'utf8') + '\n';
  }
}

function fixHtmlFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const before = html;
  // Remove the broken link tag  
  html = html.replace(/<link rel="stylesheet"[^>]*data-precedence[^>]*\/>/g, '');
  // Inject inline style right after opening <body> tag (React hydration nukes <head> but preserves body)
  if (allCss && !html.includes('/* INLINE_CSS_FIX */')) {
    const styleTag = `<style id="css-fix">/* INLINE_CSS_FIX */${allCss}</style>`;
    html = html.replace(/(<body[^>]*>)/, `$1${styleTag}`);
  }
  if (html !== before) {
    fs.writeFileSync(filePath, html);
    console.log(`Fixed: ${path.relative(outDir, filePath)}`);
  }
}

function walkDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(full);
    else if (entry.name.endsWith('.html')) fixHtmlFile(full);
  }
}

walkDir(outDir);
console.log('Done.');
