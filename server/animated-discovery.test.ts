import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const homePage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

describe("animated discovery catalogues", () => {
  it("keeps the room-shade visual and inspiration catalogue distinct from the live shade ticker", () => {
    expect(homePage).toContain("roomShadeCatalogue");
    expect(homePage).toContain("room-shade-catalogue");
    expect(homePage).toContain("colour-context-catalogue");
    expect(homePage).toContain("colour-guidance-strip");
    expect(homePage).toContain("colour-collection-catalogue");
    expect(stylesheet).toContain(".room-shade-catalogue-wash");
  });

  it("rotates room shades and texture groups on the requested cadence", () => {
    expect(homePage).toContain("setRoomShadeIndex");
    expect(homePage).toMatch(/setRoomShadeIndex[\s\S]*?5000/);
    expect(homePage).toContain("setTextureGroup((current)");
    expect(homePage).toMatch(/setTextureGroup\(\(current\)[\s\S]*?10_000/);
    expect(homePage).toContain("Auto-rotates to the next texture world every 10 seconds");
  });
});
