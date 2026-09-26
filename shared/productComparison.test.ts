import { describe, expect, it } from "vitest";
import { maxComparisonProducts, toggleComparisonProduct } from "./productComparison";

describe("product comparison selection", () => {
  it("adds products until the comparison limit and never creates duplicates", () => {
    const selected = ["one", "two"];

    expect(toggleComparisonProduct(selected, "three")).toEqual(["one", "two", "three"]);
    expect(toggleComparisonProduct(["one", "two", "three"], "four")).toEqual(["one", "two", "three"]);
    expect(maxComparisonProducts).toBe(3);
  });

  it("removes an already selected product", () => {
    expect(toggleComparisonProduct(["one", "two"], "one")).toEqual(["two"]);
  });
});
