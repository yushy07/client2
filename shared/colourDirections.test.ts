import { describe, expect, it } from "vitest";
import { colourDirections, colourTickerShades } from "./colourDirections";

describe("colour directions", () => {
  it("provides the requested forty-eight distinct browseable colour directions", () => {
    expect(colourDirections).toHaveLength(48);
    expect(new Set(colourDirections.map(([, code]) => code)).size).toBe(48);
  });

  it("provides a full, selectable 240-position looping shade ticker built from the direction palette", () => {
    expect(colourTickerShades).toHaveLength(240);
    expect(new Set(colourTickerShades.map((shade) => shade.code)).size).toBe(240);
  });
});
