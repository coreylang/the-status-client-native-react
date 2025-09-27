const fs = require("fs");
const path = require("path");

const dist = path.resolve(__dirname, "..", "dist");
const index = path.join(dist, "index.html");
const dest404 = path.join(dist, "404.html");
const nojekyll = path.join(dist, ".nojekyll");
const expoDir = path.join(dist, "_expo");

if (!fs.existsSync(dist)) {
  console.error("Error: dist directory not found. Run the web build first.");
  process.exit(1);
}

if (!fs.existsSync(index)) {
  console.error("Error: dist/index.html not found. Run the web build first.");
  process.exit(1);
}

// copy index -> 404 for SPA fallback
fs.copyFileSync(index, dest404);
console.log("Copied dist/index.html -> dist/404.html");

// create .nojekyll to disable Jekyll on GitHub Pages
try {
  fs.writeFileSync(nojekyll, "");
  console.log("Wrote dist/.nojekyll to disable Jekyll.");
} catch (err) {
  console.warn("Could not write .nojekyll:", err);
}

// diagnostic: warn if _expo is missing (helpful during troubleshooting)
if (!fs.existsSync(expoDir)) {
  console.warn("Warning: dist/_expo not found. Ensure your build produced it. If building with `expo export -p web`, the _expo folder should exist.");
} else {
  console.log("dist/_expo exists and will be published.");
}
