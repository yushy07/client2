import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const publicDir = path.resolve(rootDir, "client/public");
const distPublicDir = path.resolve(rootDir, "dist/public");

// Collect all ts/tsx files in client/src and shared
function getSourceFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getSourceFiles(fullPath));
    } else if (/\.(ts|tsx|json)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

const sourceFiles = [
  ...getSourceFiles(path.resolve(rootDir, "client/src")),
  ...getSourceFiles(path.resolve(rootDir, "shared")),
];

// Regex for extracting /storage/... paths
const storagePathRegex = /["'`]((\/storage\/[^"'`\s?#]+))["'`]/g;

const foundPaths = new Set<string>();

for (const file of sourceFiles) {
  const content = fs.readFileSync(file, "utf-8");
  let match;
  while ((match = storagePathRegex.exec(content)) !== null) {
    const url = match[1];
    // Filter out dynamic expressions or code fragments
    if (!url.includes("${") && !url.includes(":") && !url.endsWith("/") && /\.(webp|jpg|jpeg|png|svg|mp4|webm|avif)$/i.test(url)) {
      foundPaths.add(url);
    }
  }
}

console.log(`Found ${foundPaths.size} unique media/asset paths in source code.`);

const missingInPublic: string[] = [];
const missingInDist: string[] = [];

for (const assetPath of Array.from(foundPaths).sort()) {
  const relPath = assetPath.replace(/^\//, "");
  const publicPath = path.resolve(publicDir, relPath);
  const distPath = path.resolve(distPublicDir, relPath);

  if (!fs.existsSync(publicPath)) {
    missingInPublic.push(assetPath);
  }
  if (!fs.existsSync(distPath)) {
    missingInDist.push(assetPath);
  }
}

console.log("\n--- ASSET AUDIT REPORT ---");
console.log(`Missing in client/public (${missingInPublic.length}):`);
for (const p of missingInPublic) {
  console.log(`  [MISSING PUBLIC] ${p}`);
}

console.log(`\nMissing in dist/public (${missingInDist.length}):`);
for (const p of missingInDist) {
  console.log(`  [MISSING DIST] ${p}`);
}

if (missingInPublic.length === 0 && missingInDist.length === 0) {
  console.log("\nALL statically referenced assets exist in both client/public and dist/public!");
}
