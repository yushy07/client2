import { describe, expect, it } from "vitest";
import { colourArchiveAssets, colourCollections, colourFamilies, inspirationChannels, supplementaryProductCategories, textureGroups, textureLibrary } from "../shared/discoveryContent";

describe("Birla Opus discovery content", () => {
  it("contains the official public colour family structure", () => {
    expect(colourFamilies.map((family) => family.name)).toContain("Whites");
    expect(colourFamilies.map((family) => family.name)).toContain("Neutrals: Browns & Greys");
    expect(colourFamilies).toHaveLength(10);
    expect(colourCollections.map((collection) => collection.name)).toEqual(["The Everyday", "Earth & Sky", "Once Upon a Time"]);
  });

  it("keeps the verified Colours archive records exact-name, image-linked, and role-complete", () => {
    expect(colourArchiveAssets).toHaveLength(4);
    expect(colourArchiveAssets.map((asset) => asset.name)).toEqual([
      "Colours Landing Banner",
      "More",
      "Cozy composition of living room interior with gray armchair, dark pillow, beige sideboard, wooden coffee table, vase with branch, round pillow and personal accessories. Home decor. Template.",
      "In hands of palette with blue shades against blue wall. Selection of paint for walls and facades concept",
    ]);
    expect(colourArchiveAssets.every((asset) => asset.imageUrl.startsWith("/storage/extracted/"))).toBe(true);
    expect(colourArchiveAssets.map((asset) => asset.role)).toEqual(["banner", "collection", "room-reference", "swatch-reference"]);
  });

  it("contains verified texture and product discovery routes", () => {
    expect(textureGroups.flatMap((group) => group.textures)).toContain("Metallic Mirage");
    expect(textureGroups.flatMap((group) => group.textures)).toContain("Bamboo");
    expect(supplementaryProductCategories.map((category) => category.name)).toEqual(["Wallpapers", "Tools", "Aerosols"]);
    expect(inspirationChannels.map((channel) => channel.name)).toEqual(["All ideas", "Makeover Manual", "Homes", "Life in Colour"]);
  });

  it("keeps every imported Texture record exact-name, image-linked, and assigned to a visible Texture group", () => {
    expect(textureLibrary).toHaveLength(21);
    expect(textureLibrary.every((texture) => texture.imageUrl.startsWith("/storage/extracted/"))).toBe(true);
    expect(textureLibrary.every((texture) => textureGroups.some((group) => group.name === texture.group))).toBe(true);
    expect(textureLibrary.map((texture) => texture.name)).toEqual(expect.arrayContaining([
      "Bamboo Textured Wall: Birla Opus ",
      "Sanstone texture interior walls",
      "Trelis texture interior walls",
      "Pearl Marmorino texture interior walls",
    ]));
  });
});
