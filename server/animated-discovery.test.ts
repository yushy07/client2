import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const roomInspirationPage = readFileSync(resolve(projectRoot, "client/src/pages/RoomInspirationPage.tsx"), "utf8");
const roomStudio = readFileSync(resolve(projectRoot, "client/src/components/experiences/RoomShadeStudio.tsx"), "utf8");
const coloursPreview = readFileSync(resolve(projectRoot, "client/src/components/home/HomeColoursPreview.tsx"), "utf8");
const surfaceStudio = readFileSync(resolve(projectRoot, "client/src/pages/SurfaceStudioPage.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

describe("animated discovery catalogues", () => {
  it("keeps the room-shade visual and inspiration catalogue distinct from the live shade ticker", () => {
    expect(roomInspirationPage).toContain("RoomShadeStudio");
    expect(roomStudio).toContain("ROOM_SHADE_STUDIO_SCENES");
    expect(coloursPreview).toContain("colourTickerLoop");
    expect(coloursPreview).toContain("colourTickerShades");
    expect(stylesheet).toContain(".room-shade-catalogue-wash");
  });

  it("provides interactive room shades and texture world collections", () => {
    expect(roomStudio).toContain("variants");
    expect(surfaceStudio).toContain("ExtendedTextures");
    expect(surfaceStudio).toContain("WallpaperGallery");
  });
});
