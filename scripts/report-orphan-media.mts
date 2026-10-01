/**
 * Reports media that no source file references.
 *
 * This script never deletes anything. It prints a breakdown you can review, and
 * optionally writes a JSON manifest with `--json=<path>`, so removal can be
 * decided deliberately.
 *
 * Usage:
 *   tsx scripts/report-orphan-media.mts
 *   tsx scripts/report-orphan-media.mts --json=reports/orphan-media.json
 */
import { readdir, readFile, stat, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");

/** Directories scanned for `/storage/...` references. */
const SOURCE_ROOTS = [
  "client/src",
  "client/index.html",
  "client/public/robots.txt",
  "client/public/sitemap.xml",
  "shared",
  "server",
  "scripts",
  "docs",
  "README.md",
  "drizzle",
];

const MEDIA_ROOTS = [
  { label: "client/public/storage", dir: "client/public/storage", urlPrefix: "/storage/" },
  { label: "assets/storage", dir: "assets/storage", urlPrefix: null },
];

const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".mts",
  ".js",
  ".jsx",
  ".cjs",
  ".json",
  ".css",
  ".html",
  ".md",
  ".txt",
  ".xml",
  ".yml",
  ".yaml",
]);

/** Extensions that count as deployable media rather than source. */
const MEDIA_EXTENSIONS = new Set([
  ".webp",
  ".avif",
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".svg",
  ".mp4",
  ".webm",
  ".mov",
  ".pdf",
]);

interface MediaFile {
  absolute: string;
  relative: string;
  bytes: number;
  root: string;
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
    if (entry.isDirectory()) {
      results.push(...(await walk(child)));
    } else if (entry.isFile()) {
      results.push(child);
    }
  }
  return results;
}

async function collectSourceText(): Promise<string> {
  const chunks: string[] = [];

  for (const relative of SOURCE_ROOTS) {
    const absolute = path.join(PROJECT_ROOT, relative);
    let info;
    try {
      info = await stat(absolute);
    } catch {
      continue;
    }

    const files = info.isDirectory() ? await walk(absolute) : [absolute];
    for (const file of files) {
      if (!TEXT_EXTENSIONS.has(path.extname(file).toLowerCase())) continue;
      try {
        chunks.push(await readFile(file, "utf8"));
      } catch {
        // Unreadable source file; skip it.
      }
    }
  }

  return chunks.join("\n");
}

async function collectMedia(): Promise<MediaFile[]> {
  const files: MediaFile[] = [];

  for (const root of MEDIA_ROOTS) {
    const absoluteRoot = path.join(PROJECT_ROOT, root.dir);
    for (const absolute of await walk(absoluteRoot)) {
      const extension = path.extname(absolute).toLowerCase();
      if (!MEDIA_EXTENSIONS.has(extension)) continue;
      let bytes = 0;
      try {
        bytes = (await stat(absolute)).size;
      } catch {
        continue;
      }
      files.push({
        absolute,
        relative: path.relative(absoluteRoot, absolute).split(path.sep).join("/"),
        bytes,
        root: root.label,
      });
    }
  }

  return files;
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 ** 3)).toFixed(2)} GB`;
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 ** 2)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

function isReferenced(file: MediaFile, sourceText: string): boolean {
  const withoutExtension = file.relative.replace(/\.[^/.]+$/, "");
  const baseName = path.basename(file.relative);

  // Full relative path (the common case: `/storage/logo.webp`).
  if (sourceText.includes(file.relative)) return true;
  // Path without extension, e.g. an image resolved from a slug.
  if (sourceText.includes(withoutExtension)) return true;
  // Bare filename, for dynamically built paths.
  if (sourceText.includes(baseName)) return true;
  // Responsive variants are referenced through their base name.
  const withoutMobileSuffix = withoutExtension.replace(/-mobile$/, "");
  if (withoutMobileSuffix !== withoutExtension && sourceText.includes(withoutMobileSuffix)) {
    return true;
  }

  return false;
}

async function main() {
  const jsonFlag = process.argv.find(arg => arg.startsWith("--json="));
  const sourceText = await collectSourceText();
  const media = await collectMedia();

  const byRoot = new Map<string, MediaFile[]>();
  for (const file of media) {
    const list = byRoot.get(file.root) ?? [];
    list.push(file);
    byRoot.set(file.root, list);
  }

  const totalBytes = media.reduce((sum, file) => sum + file.bytes, 0);
  const orphaned: MediaFile[] = [];

  console.log("Media inventory");
  console.log("===============");
  for (const [root, files] of byRoot) {
    const bytes = files.reduce((sum, file) => sum + file.bytes, 0);
    console.log(`  ${root.padEnd(26)} ${String(files.length).padStart(6)} files  ${formatBytes(bytes)}`);
  }
  console.log(`  ${"total".padEnd(26)} ${String(media.length).padStart(6)} files  ${formatBytes(totalBytes)}`);
  console.log();

  for (const file of media) {
    if (!isReferenced(file, sourceText)) orphaned.push(file);
  }

  orphaned.sort((a, b) => b.bytes - a.bytes);
  const orphanedBytes = orphaned.reduce((sum, file) => sum + file.bytes, 0);

  console.log("Unreferenced by any source file");
  console.log("===============================");
  console.log(
    `  ${orphaned.length} of ${media.length} files, ${formatBytes(orphanedBytes)} of ${formatBytes(totalBytes)}`,
  );
  console.log();

  if (orphaned.length > 0) {
    const largest = orphaned.slice(0, 40);
    console.log("  Largest unreferenced files:");
    for (const file of largest) {
      console.log(`    ${formatBytes(file.bytes).padStart(9)}  ${file.root}/${file.relative}`);
    }
    if (orphaned.length > largest.length) {
      console.log(`    … and ${orphaned.length - largest.length} more`);
    }
    console.log();
  }

  // Duplicate content across the two media roots is pure deploy weight.
  const publicStorage = byRoot.get("client/public/storage") ?? [];
  const assetStorage = byRoot.get("assets/storage") ?? [];
  const publicNames = new Set(publicStorage.map(file => path.basename(file.relative)));
  const duplicated = assetStorage.filter(file => publicNames.has(path.basename(file.relative)));
  const duplicatedBytes = duplicated.reduce((sum, file) => sum + file.bytes, 0);

  console.log("Duplicated between assets/storage and client/public/storage");
  console.log("==========================================================");
  console.log(`  ${duplicated.length} files, ${formatBytes(duplicatedBytes)}`);
  console.log();

  console.log("Nothing was deleted. Review the list above before removing anything.");
  console.log("Note: a match on a bare filename can be coincidental, so confirm each entry.");

  if (jsonFlag) {
    const jsonPath = path.resolve(PROJECT_ROOT, jsonFlag.slice("--json=".length));
    await mkdir(path.dirname(jsonPath), { recursive: true });
    await writeFile(
      jsonPath,
      `${JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          totals: { files: media.length, bytes: totalBytes },
          orphaned: {
            files: orphaned.length,
            bytes: orphanedBytes,
            entries: orphaned.map(file => ({
              root: file.root,
              relative: file.relative,
              bytes: file.bytes,
            })),
          },
          duplicated: {
            files: duplicated.length,
            bytes: duplicatedBytes,
            entries: duplicated.map(file => ({
              root: file.root,
              relative: file.relative,
              bytes: file.bytes,
            })),
          },
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    console.log(`\nWrote manifest to ${jsonFlag.slice("--json=".length)}`);
  }
}

main().catch(error => {
  console.error("[report-orphan-media] Failed:", error);
  process.exit(1);
});
