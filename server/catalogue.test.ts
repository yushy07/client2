import { describe, expect, it } from "vitest";
import { birlaOpusCategories, birlaOpusProductCount, birlaOpusProducts } from "../shared/birlaOpusCatalogue";

describe("Birla Opus catalogue", () => {
  it("covers every official category represented in the public product navigation", () => {
    expect(birlaOpusCategories).toEqual([
      "Interior Paints",
      "Exterior Paints",
      "Waterproofing",
      "Enamels",
      "Wood Finishes",
      "Wallpapers",
      "Tools",
      "Aerosols",
    ]);
  });

  it("contains verified official product URLs for all product entries", () => {
    expect(birlaOpusProductCount).toBe(124);
    expect(birlaOpusProducts.every((product) => product.sourceUrl.startsWith("https://www.birlaopus.com/paint-products/"))).toBe(true);
    expect(birlaOpusProducts.map((product) => product.name)).toContain("One Pure Elegance");
    expect(birlaOpusProducts.map((product) => product.name)).toContain("Alldry Total Stop");
    expect(birlaOpusProducts.map((product) => product.name)).toContain("Allwood SoftTouch");
  });

  it("maps every catalogue product to one unique matching packshot", () => {
    const imageUrls = birlaOpusProducts.flatMap((product) => product.imageUrl ? [product.imageUrl] : []);

    expect(imageUrls).toHaveLength(birlaOpusProductCount);
    expect(new Set(imageUrls).size).toBe(imageUrls.length);
    expect(birlaOpusProducts.every((product) => Boolean(product.imageUrl))).toBe(true);
    expect(birlaOpusProducts.map((product) => product.name)).toContain("Alldry Wall N Roof 12");
    expect(birlaOpusProducts.map((product) => product.name)).toContain("Calista Pro White Cement ST Primer");
    expect(birlaOpusProducts.map((product) => product.name)).toEqual(expect.arrayContaining([
      "Alldry Wall Fix 4",
      "Alldry Wall N Roof 7",
      "Alldry Wall N Roof 14",
    ]));
  });

  it("preserves official category coverage and includes the scoped Exterior CSV product records", () => {
    const categoryCounts = Object.fromEntries(
      birlaOpusCategories.map((category) => [
        category,
        birlaOpusProducts.filter((product) => product.category === category).length,
      ]),
    );

    expect(categoryCounts).toEqual({
      "Interior Paints": 34,
      "Exterior Paints": 30,
      Waterproofing: 12,
      Enamels: 10,
      "Wood Finishes": 14,
      Wallpapers: 14,
      Tools: 9,
      Aerosols: 1,
    });
  });

  it("keeps the scoped Wallpapers, Tools, and Aerosols CSV imports in their matching categories with direct packshots", () => {
    const importedCategoryProducts = birlaOpusProducts.filter((product) => ["Wallpapers", "Tools", "Aerosols"].includes(product.category));

    expect(importedCategoryProducts).toHaveLength(24);
    expect(importedCategoryProducts.every((product) => product.imageUrl?.startsWith("/storage/extracted/"))).toBe(true);
    expect(importedCategoryProducts.map((product) => product.name)).toEqual(expect.arrayContaining([
      "Tropical Flair Wallpaper: Interior Texture | Birla Opus",
      "Birla Opus | Animal, Bird & Insect",
      "Birla Opus | Garden Charms",
      "Birla Opus Artist DF Cloud Roller",
      "Artist Painter's Masking Tape 2\"",
      "Birla Opus One Aero Spray Paint",
    ]));
  });

  it("uses the exact-name Exterior CSV packshots without creating extra Exterior products", () => {
    const exteriorProducts = birlaOpusProducts.filter((product) => product.category === "Exterior Paints");

    expect(exteriorProducts).toHaveLength(30);
    expect(exteriorProducts.map((product) => product.name)).not.toContain("Style Alpha Power Bright");
    expect(exteriorProducts.map((product) => product.name)).toEqual(expect.arrayContaining([
      "One Pure Elegance: Interior Paint | Birla Opus",
      "Style Super Bright: Exterior Acrylic Distemper | Birla Opus",
      "Allwood: Italian PU Paint | Birla Opus",
    ]));
    expect(exteriorProducts.every((product) => product.imageUrl?.startsWith("/storage/extracted/birlaopus_products_exterior/"))).toBe(true);
  });

  it("keeps the Interior Paint archive products fully named and image-linked", () => {
    const interiorProducts = birlaOpusProducts.filter((product) => product.category === "Interior Paints");

    expect(interiorProducts).toHaveLength(34);
    expect(interiorProducts.every((product) => product.imageUrl?.startsWith("/storage/extracted/birlaopus_products_interior/"))).toBe(true);
    expect(interiorProducts.map((product) => product.name)).toEqual(expect.arrayContaining([
      "Alpha Ever Wash",
      "Calista Ever Stay",
      "Calista Ever Wash Shine",
      "One Timeless Natura",
      "Style Universal Stainers",
    ]));
  });

  it("updates only exact-name Interior records with the verified uploaded packshots", () => {
    const importedArchiveImages = Object.fromEntries(
      birlaOpusProducts
        .filter((product) => product.category === "Interior Paints" && product.imageUrl?.endsWith(".jpg"))
        .map((product) => [product.name, product.imageUrl]),
    );

    expect(Object.keys(importedArchiveImages)).toHaveLength(34);
    expect(Object.values(importedArchiveImages).every((url) => url.startsWith("/storage/extracted/birlaopus_products_interior/"))).toBe(true);
  });
});
