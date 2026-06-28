'use strict';

var fs = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..');
var DIST = path.join(ROOT, 'dist');

var FILES = [
  'index.html',
  'js/message-generator.js',
  'js/grok-client.js',
  'js/app.js',
  'assets/earth-hero.jpg'
];

function copyFile(rel) {
  var src = path.join(ROOT, rel);
  var dest = path.join(DIST, rel);
  if (!fs.existsSync(src)) {
    throw new Error('Missing build asset: ' + rel);
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function main() {
  if (fs.existsSync(DIST)) {
    fs.rmSync(DIST, { recursive: true, force: true });
  }
  fs.mkdirSync(DIST, { recursive: true });
  FILES.forEach(copyFile);
  console.log('Built dist/ with ' + FILES.length + ' files');
}

main();