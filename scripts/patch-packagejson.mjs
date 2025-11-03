import fs from 'fs';
const P = 'package.json';
if (!fs.existsSync(P)) {
  fs.writeFileSync(P, JSON.stringify({
    name: "projectKleee02",
    version: "0.1.0",
    description: "Play Kleee02 NFTs on an ILDA laser projector (bundled binary)",
    license: "MIT",
    type: "module",
    bin: "./main.js",
    scripts: {}
  }, null, 2));
}
const pkg = JSON.parse(fs.readFileSync(P, 'utf8'));
pkg.name ??= "projectKleee02";
pkg.version ??= "0.1.0";
pkg.description ??= "Play Kleee02 NFTs on an ILDA laser projector (bundled binary)";
pkg.license ??= "MIT";
pkg.type = pkg.type || "module";
pkg.bin  = pkg.bin  || "./main.js";

pkg.scripts ||= {};
pkg.scripts["build:win"]   = 'npx pkg --targets node16-win-x64   --out-path dist --output dist/kleee02-win-x64.exe .';
pkg.scripts["build:linux"] = 'npx pkg --targets node16-linux-x64 --out-path dist --output dist/kleee02-linux-x64 .';
pkg.scripts["build:mac"]   = 'npx pkg --targets node16-macos-x64 --out-path dist --output dist/kleee02-macos-x64 .';
pkg.scripts["build:all"]   = 'npm run build:win && npm run build:linux && npm run build:mac';

pkg.pkg ||= {};
pkg.pkg.outputPath = "dist";
const assets = new Set([...(pkg.pkg.assets || []), "fonts/**/*", "token_*.json"]);
pkg.pkg.assets = Array.from(assets);

pkg.engines ||= {};
pkg.engines.node = "16.x";

fs.writeFileSync(P, JSON.stringify(pkg, null, 2));
console.log("✅ package.json patched for pkg builds (Node 16).");
