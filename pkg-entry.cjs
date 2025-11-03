#!/usr/bin/env node
(async () => {
  try {
    // Import the ESM app. If it exports a function, call it; otherwise
    // most CLIs just run on top-level import.
    const mod = await import('./main.js');
    if (typeof mod.default === 'function') {
      await mod.default();
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
