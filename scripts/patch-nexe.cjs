const fs = require('fs');
const p  = 'package.json';
const pkg = JSON.parse(fs.readFileSync(p, 'utf8'));

pkg.engines = pkg.engines || {};
pkg.engines.node = '16.x';

pkg.scripts = pkg.scripts || {};
pkg.scripts['build:win']   = 'mkdir -p dist && npx nexe main.js -t windows-x64-16.16.0 -o dist/kleee02-win-x64.exe   --resource "fonts/**/*" --resource "token_*.json" --resource "**/*.node"';
pkg.scripts['build:linux'] = 'mkdir -p dist && npx nexe main.js -t linux-x64-16.16.0   -o dist/kleee02-linux-x64     --resource "fonts/**/*" --resource "token_*.json" --resource "**/*.node"';
pkg.scripts['build:mac']   = 'mkdir -p dist && npx nexe main.js -t mac-x64-16.16.0     -o dist/kleee02-macos-x64     --resource "fonts/**/*" --resource "token_*.json" --resource "**/*.node"';
pkg.scripts['build:all']   = 'npm run build:win && npm run build:linux && npm run build:mac';

fs.writeFileSync(p, JSON.stringify(pkg, null, 2));
console.log('✅ package.json scripts set for nexe (Node 16.16.0).');
