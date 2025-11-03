const fs = require('fs');
const pkgPath = 'package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

pkg.name = pkg.name || "projectKleee02";
pkg.version = pkg.version || "0.1.0";
pkg.description = pkg.description || "Play Kleee02 NFTs on an ILDA laser projector (bundled binary)";
pkg.license = pkg.license || "MIT";

if (!pkg.bin) {
  // allow `pkg` to know the entry point
  pkg.bin = "main.js";
}

pkg.scripts = pkg.scripts || {};
pkg.scripts["build:win"]   = 'npx pkg --targets node16-win-x64   --out-path dist --output dist/kleee02-win-x64.exe .';
pkg.scripts["build:linux"] = 'npx pkg --targets node16-linux-x64 --out-path dist --output dist/kleee02-linux-x64 .';
pkg.scripts["build:mac"]   = 'npx pkg --targets node16-macos-x64 --out-path dist --output dist/kleee02-macos-x64 .';
pkg.scripts["build:all"]   = 'npm run build:win && npm run build:linux && npm run build:mac';

pkg.pkg = pkg.pkg || {};
pkg.pkg.outputPath = "dist";
pkg.pkg.assets = Array.from(new Set([...(pkg.pkg.assets || []), "fonts/**/*", "token_*.json"]));
// Note: if you need additional DLLs or .node binaries, add them to assets like "**/*.node"

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log("package.json patched for pkg build.");
