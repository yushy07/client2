import { describe, expect, it } from "vitest";
import { birlaOpusCategories, birlaOpusProductCount, birlaOpusProducts } from "./birlaOpusCatalogue";

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
    expect(birlaOpusProductCount).toBeGreaterThan(70);
    expect(birlaOpusProducts.every((product) => product.sourceUrl.startsWith("https://www.birlaopus.com/paint-products/"))).toBe(true);
    expect(birlaOpusProducts.map((product) => product.name)).toContain("One Pure Elegance");
    expect(birlaOpusProducts.map((product) => product.name)).toContain("Alldry Total Stop");
    expect(birlaOpusProducts.map((product) => product.name)).toContain("Allwood SoftTouch");
  });
});
