#!/usr/bin/env node
/* Precompile src/*.jsx -> dist/*.js so Babel never ships to the browser.
   Each file is transformed INDIVIDUALLY and loaded as a separate classic
   script, exactly as the old type="text/babel" tags were. Do NOT bundle them
   into one file or wrap them in a module/IIFE: primitives.jsx declares
   `const {useState,...} = React` and `function` components at global scope,
   and the other files rely on reaching them there. */
const fs = require('fs');
const path = require('path');
const babel = require('/private/tmp/claude-501/-Users-carlosguerrero/43e88208-5b51-4eec-9e08-d6a2e27ae163/scratchpad/node_modules/@babel/standalone');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
/* Load order matters — same order as the old script tags. */
const FILES = ['primitives','nav','hero','sections','interiors','tweaks','app'];

fs.mkdirSync(DIST, { recursive: true });
let total = 0;
for (const name of FILES) {
  const from = path.join(SRC, name + '.jsx');
  const code = fs.readFileSync(from, 'utf8');
  const out = babel.transform(code, {
    presets: [['react', { runtime: 'classic' }]],
    compact: true,
    comments: false,
sourceType: 'script',
  }).code;
  const to = path.join(DIST, name + '.js');
  fs.writeFileSync(to, out);
  total += Buffer.byteLength(out);
  console.log('  ' + name.padEnd(12), (fs.statSync(from).size/1024).toFixed(1) + ' KB jsx  ->  ' + (Buffer.byteLength(out)/1024).toFixed(1) + ' KB js');
}
console.log('total dist:', (total/1024).toFixed(1), 'KB');
