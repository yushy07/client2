import fs from "fs";
import path from "path";
import { birlaOpusProducts } from "../shared/birlaOpusCatalogue.ts";
import { EXTENDED_TEXTURE_COLLECTIONS } from "../shared/extendedTexturesData.ts";
import { WALLPAPER_GALLERY_ITEMS } from "../shared/wallpaperData.ts";
import { ROOM_LIBRARY_PAGES } from "../shared/roomLibraryData.ts";
import { COLOUR_CAPSULE_PAGES } from "../shared/colourCapsuleData.ts";
import { ROOM_SHADE_STUDIO_SCENES } from "../shared/roomShadeStudioData.ts";
import { INSIDE_JAYMURTI_PHOTOS } from "../shared/insideJaymurtiData.ts";

const rootDir = process.cwd();
const publicDir = path.resolve(rootDir, "client/public");
const distDir = path.resolve(rootDir, "dist/public");

interface CheckResult {
  source: string;
  url: string;
  existsInPublic: boolean;
  existsInDist: boolean;
}

const results: CheckResult[] = [];

function checkUrl(source: string, url: string | undefined) {
  if (!url) {
    results.push({ source, url: "(undefined)", existsInPublic: false, existsInDist: false });
    return;
  }
  // Decode URL components in case of percent-encoded characters like %20
  const decoded = decodeURIComponent(url);
  const cleanPath = decoded.replace(/^\//, "");
  const publicPath = path.resolve(publicDir, cleanPath);
  const distPath = path.resolve(distDir, cleanPath);

  const existsInPublic = fs.existsSync(publicPath);
  const existsInDist = fs.existsSync(distPath);

  results.push({ source, url: decoded, existsInPublic, existsInDist });
}

// 1. Products (124)
for (const p of birlaOpusProducts) {
  checkUrl(`Product: ${p.name}`, p.imageUrl);
  if (p.mobileImageUrl) checkUrl(`Product Mobile: ${p.name}`, p.mobileImageUrl);
}

// 2. Textures (EXTENDED_TEXTURE_COLLECTIONS)
for (const t of EXTENDED_TEXTURE_COLLECTIONS) {
  checkUrl(`Texture: ${t.name}`, t.url);
}

// 3. Wallpapers (WALLPAPER_GALLERY_ITEMS)
for (const w of WALLPAPER_GALLERY_ITEMS) {
  checkUrl(`Wallpaper: ${w.title}`, w.url);
}

// 4. Room Library (102 pages)
for (const r of ROOM_LIBRARY_PAGES) {
  checkUrl(`Room Library Page ${r.index}`, r.url);
}

// 5. Colour Capsule (50 spreads)
for (const c of COLOUR_CAPSULE_PAGES) {
  checkUrl(`Colour Capsule Spread ${c.index}`, c.url);
}

// 6. Room Shade Studio (all scenes and variants)
for (const s of ROOM_SHADE_STUDIO_SCENES) {
  for (const v of s.variants) {
    checkUrl(`Room Studio: ${s.name} - ${v.label}`, v.url);
  }
}

// 7. Inside Jaymurti Photos
for (const photo of INSIDE_JAYMURTI_PHOTOS) {
  checkUrl(`Inside Jaymurti: ${photo.title}`, photo.image);
}

// 8. Idea Archive (50 items)
import { ideaArchive } from "../shared/ideaArchive.ts";
for (const idea of ideaArchive) {
  checkUrl(`Idea Archive: ${idea.name}`, idea.imageUrl);
}

const failed = results.filter((r) => !r.existsInPublic || !r.existsInDist);

console.log(`Total dataset media URLs checked: ${results.length}`);
console.log(`Failed checks: ${failed.length}`);

if (failed.length > 0) {
  console.log("\nFAILED ASSETS:");
  for (const f of failed) {
    console.log(`  [${f.source}] ${f.url} (public: ${f.existsInPublic}, dist: ${f.existsInDist})`);
  }
  process.exit(1);
} else {
  console.log("\nALL 100% of dataset media URLs exist in client/public and dist/public!");
}
