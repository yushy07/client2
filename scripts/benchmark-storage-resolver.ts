import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";

const PROJECT_ROOT = process.cwd();
const publicBase = path.resolve(PROJECT_ROOT, "client", "public", "storage", "extracted");
const rootBase = path.resolve(PROJECT_ROOT, "storage", "extracted");

// Replicate unoptimized getAllFiles logic from vite.config.ts
function getAllFilesUnoptimized() {
  const searchDirs: string[] = [];
  if (fs.existsSync(publicBase)) {
    const subdirs = fs.readdirSync(publicBase).map((d) => path.join(publicBase, d));
    searchDirs.push(...subdirs.filter((d) => fs.statSync(d).isDirectory()));
  }
  if (fs.existsSync(rootBase)) {
    const subdirs = fs.readdirSync(rootBase).map((d) => path.join(rootBase, d));
    searchDirs.push(...subdirs.filter((d) => fs.statSync(d).isDirectory()));
  }

  const results: { filePath: string; fileName: string; alpha: string; tokens: string[] }[] = [];
  const seen = new Set<string>();

  for (const dir of searchDirs) {
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith(".csv")) continue;
      const fullPath = path.join(dir, f);
      if (seen.has(fullPath) || !fs.statSync(fullPath).isFile()) continue;
      seen.add(fullPath);
      const nameNoExt = f.replace(/\.[^/.]+$/, "");
      const alpha = nameNoExt.toLowerCase().replace(/[^a-z0-9]/g, "");
      const tokens = nameNoExt.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
      results.push({ filePath: fullPath, fileName: f, alpha, tokens });
    }
  }
  return results;
}

// Optimized getAllFiles implementation with caching
let cachedIndexedFiles: ReturnType<typeof getAllFilesUnoptimized> | null = null;

function getAllFilesOptimized() {
  if (cachedIndexedFiles) {
    return cachedIndexedFiles;
  }
  cachedIndexedFiles = getAllFilesUnoptimized();
  return cachedIndexedFiles;
}

function invalidateCache() {
  cachedIndexedFiles = null;
}

function runBenchmark() {
  const ITERATIONS = 1000;
  console.log(`Running benchmark with ${ITERATIONS} iterations...\n`);

  // Warmup
  getAllFilesUnoptimized();
  invalidateCache();

  // Benchmark unoptimized
  const startUnoptimized = performance.now();
  for (let i = 0; i < ITERATIONS; i++) {
    getAllFilesUnoptimized();
  }
  const endUnoptimized = performance.now();
  const durationUnoptimized = endUnoptimized - startUnoptimized;

  // Benchmark optimized (cached)
  const startOptimized = performance.now();
  for (let i = 0; i < ITERATIONS; i++) {
    getAllFilesOptimized();
  }
  const endOptimized = performance.now();
  const durationOptimized = endOptimized - startOptimized;

  console.log(`--- Benchmark Results ---`);
  console.log(`Unoptimized duration (${ITERATIONS} ops): ${durationUnoptimized.toFixed(2)} ms`);
  console.log(`Optimized duration (${ITERATIONS} ops):   ${durationOptimized.toFixed(2)} ms`);
  console.log(`Speedup factor: ${(durationUnoptimized / durationOptimized).toFixed(2)}x`);
  console.log(`Time saved per request: ${((durationUnoptimized - durationOptimized) / ITERATIONS).toFixed(4)} ms`);
}

runBenchmark();
