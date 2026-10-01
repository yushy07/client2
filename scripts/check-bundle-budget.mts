/**
 * Guards the deployable output against silent growth.
 *
 * JavaScript and CSS must stay under `ASSET_BUDGET_BYTES` (a real budget that
 * currently passes). Static media is reported and only fails the build when
 * `MEDIA_BUDGET_STRICT=1`, so that pending media cleanup work does not block
 * deploys in the meantime.
 *
 * Usage:
 *   tsx scripts/check-bundle-budget.mts
 *   MEDIA_BUDGET_STRICT=1 tsx scripts/check-bundle-budget.mts
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "dist", "public");

const ASSET_BUDGET_BYTES = Number(process.env.ASSET_BUDGET_BYTES ?? 2 * 1024 * 1024);
const MEDIA_BUDGET_BYTES = Number(process.env.MEDIA_BUDGET_BYTES ?? 20 * 1024 * 1024);
const MEDIA_BUDGET_STRICT = process.env.MEDIA_BUDGET_STRICT === "1";

interface Bucket {
  files: number;
  bytes: number;
}

async function walk(target: string): Promise<string[]> {
  const results: string[] = [];
  let entries;
  try {
    entries = await readdir(target, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const child = path.join(target, entry.name);
    if (entry.isDirectory()) results.push(...(await walk(child)));
    else if (entry.isFile()) results.push(child);
  }
  return results;
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 ** 3)).toFixed(2)} GB`;
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 ** 2)).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

async function main() {
  let outputExists = true;
  try {
    await stat(OUTPUT_DIR);
  } catch {
    outputExists = false;
  }

  if (!outputExists) {
    console.error(
      `[budget] ${path.relative(PROJECT_ROOT, OUTPUT_DIR)} does not exist. Run the client build first.`,
    );
    process.exit(1);
  }

  const buckets: Record<"assets" | "storage" | "html" | "other", Bucket> = {
    assets: { files: 0, bytes: 0 },
    storage: { files: 0, bytes: 0 },
    html: { files: 0, bytes: 0 },
    other: { files: 0, bytes: 0 },
  };

  for (const file of await walk(OUTPUT_DIR)) {
    const relative = path.relative(OUTPUT_DIR, file).split(path.sep).join("/");
    const extension = path.extname(file).toLowerCase();

    let bytes = 0;
    try {
      bytes = (await stat(file)).size;
    } catch {
      continue;
    }

    const bucket =
      relative.startsWith("assets/") && [".js", ".css"].includes(extension)
        ? "assets"
        : relative.startsWith("storage/")
          ? "storage"
          : extension === ".html"
            ? "html"
            : "other";

    buckets[bucket].files += 1;
    buckets[bucket].bytes += bytes;
  }

  const total = Object.values(buckets).reduce((sum, bucket) => sum + bucket.bytes, 0);

  console.log("Deployable output");
  console.log("=================");
  for (const [name, bucket] of Object.entries(buckets)) {
    console.log(
      `  ${name.padEnd(8)} ${String(bucket.files).padStart(6)} files  ${formatBytes(bucket.bytes).padStart(10)}`,
    );
  }
  console.log(`  ${"total".padEnd(8)} ${String(Object.values(buckets).reduce((s, b) => s + b.files, 0)).padStart(6)} files  ${formatBytes(total).padStart(10)}`);
  console.log();

  const failures: string[] = [];

  if (buckets.assets.bytes > ASSET_BUDGET_BYTES) {
    failures.push(
      `JavaScript and CSS use ${formatBytes(buckets.assets.bytes)}, over the ${formatBytes(
        ASSET_BUDGET_BYTES,
      )} budget.`,
    );
  }

  if (buckets.storage.bytes > MEDIA_BUDGET_BYTES) {
    const message = `Static media uses ${formatBytes(buckets.storage.bytes)}, over the ${formatBytes(
      MEDIA_BUDGET_BYTES,
    )} budget. Run \`pnpm report:media\` and review the unreferenced files.`;

    if (MEDIA_BUDGET_STRICT) failures.push(message);
    else console.warn(`[budget] warning: ${message}`);
  }

  if (failures.length > 0) {
    console.error("[budget] failed:");
    for (const failure of failures) console.error(`  - ${failure}`);
    process.exit(1);
  }

  console.log("[budget] passed.");
}

main().catch(error => {
  console.error("[budget] Failed:", error);
  process.exit(1);
});
