import { birlaOpusProducts } from "../shared/birlaOpusCatalogue.ts";
import { EXTENDED_TEXTURE_COLLECTIONS } from "../shared/extendedTexturesData.ts";
import { WALLPAPER_GALLERY_ITEMS } from "../shared/wallpaperData.ts";
import { ROOM_LIBRARY_PAGES } from "../shared/roomLibraryData.ts";
import { COLOUR_CAPSULE_PAGES } from "../shared/colourCapsuleData.ts";
import { ROOM_SHADE_STUDIO_SCENES } from "../shared/roomShadeStudioData.ts";
import { INSIDE_JAYMURTI_PHOTOS } from "../shared/insideJaymurtiData.ts";
import { ideaArchive } from "../shared/ideaArchive.ts";

const BASE_URL = "http://localhost:3000";

const urlsToTest = new Set<string>();

function addUrl(url: string | undefined) {
  if (!url) return;
  // Ensure it's a relative path starting with /
  if (url.startsWith("/")) {
    urlsToTest.add(url);
  }
}

// Add all hero & static assets
addUrl("/storage/logo.webp");
addUrl("/storage/hero_paint_accent.webp");
addUrl("/storage/teammember.webp");
addUrl("/storage/shopproductpyramid.webp");
addUrl("/storage/shopmaterials.webp");
addUrl("/storage/shopproduct.webp");
addUrl("/storage/storefront/shopwide.webp");
addUrl("/storage/storefront/shopreception.webp");
addUrl("/storage/storefront/shop.webp");

// Add Home Inspiration preview images
addUrl("/storage/rooms-catalogue/phone-view_compressed_page-0001.webp");
addUrl("/storage/rooms-catalogue/phone-view_compressed_page-0026.webp");
addUrl("/storage/rooms-catalogue/phone-view_compressed_page-0051.webp");

// 1. Products (124 + mobile)
for (const p of birlaOpusProducts) {
  addUrl(p.imageUrl);
  if (p.mobileImageUrl) addUrl(p.mobileImageUrl);
}

// 2. Textures
for (const t of EXTENDED_TEXTURE_COLLECTIONS) {
  addUrl(t.url);
}

// 3. Wallpapers
for (const w of WALLPAPER_GALLERY_ITEMS) {
  addUrl(w.url);
}

// 4. Room Library (102)
for (const r of ROOM_LIBRARY_PAGES) {
  addUrl(r.url);
}

// 5. Colour Capsule (50)
for (const c of COLOUR_CAPSULE_PAGES) {
  addUrl(c.url);
}

// 6. Room Shade Studio (173 variants)
for (const s of ROOM_SHADE_STUDIO_SCENES) {
  for (const v of s.variants) {
    addUrl(v.url);
  }
}

// 7. Inside Jaymurti Photos
for (const photo of INSIDE_JAYMURTI_PHOTOS) {
  addUrl(photo.image);
}

// 8. Idea Archive (50)
for (const idea of ideaArchive) {
  addUrl(idea.imageUrl);
}

async function run() {
  console.log(`Testing HTTP requests for ${urlsToTest.size} media assets against local server: ${BASE_URL}...\n`);

  let successCount = 0;
  let failedCount = 0;
  const failedList: { url: string; status: number }[] = [];

  // Batch requests in chunks of 25 for fast execution
  const urlArray = Array.from(urlsToTest);
  const CHUNK_SIZE = 25;

  for (let i = 0; i < urlArray.length; i += CHUNK_SIZE) {
    const chunk = urlArray.slice(i, i + CHUNK_SIZE);
    await Promise.all(
      chunk.map(async (relativeUrl) => {
        const fullUrl = `${BASE_URL}${encodeURI(decodeURI(relativeUrl))}`;
        try {
          const res = await fetch(fullUrl, { method: "HEAD" });
          if (res.ok) {
            successCount++;
          } else {
            failedCount++;
            failedList.push({ url: relativeUrl, status: res.status });
          }
        } catch (err: any) {
          failedCount++;
          failedList.push({ url: relativeUrl, status: 0 });
        }
      })
    );
  }

  console.log(`Results: ${successCount} PASSED (HTTP 200 OK), ${failedCount} FAILED.`);

  if (failedCount > 0) {
    console.log("\nFailed URLs:");
    for (const f of failedList) {
      console.log(`  [HTTP ${f.status}] ${f.url}`);
    }
    process.exit(1);
  } else {
    console.log("\n100% of tested media assets resolve with HTTP 200 OK from local server!");
  }
}

run();
