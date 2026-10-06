import { cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const builtAssets = resolve("dist/public");
const vercelPublic = resolve("public");

if (!existsSync(builtAssets)) {
  throw new Error(`Vite output was not found at ${builtAssets}`);
}

mkdirSync(vercelPublic, { recursive: true });
cpSync(builtAssets, vercelPublic, { recursive: true, force: true });
console.log("Copied the pre-rendered site and assets into Vercel's public directory.");
