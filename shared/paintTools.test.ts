import { describe, expect, it } from "vitest";
import { calculatePaintEstimate, findStoreByPincode, storeDirectory } from "./paintTools";

describe("paintTools", () => {
  describe("findStoreByPincode", () => {
    it("returns store when pincode matches directory", () => {
      const store = findStoreByPincode("224129");
      expect(store).toBeDefined();
      expect(store?.name).toBe("Birla Opus Paint Jaymurti Traders");
      expect(store).toEqual(storeDirectory[0]);
    });

    it("returns undefined when pincode is not found or invalid", () => {
      expect(findStoreByPincode("000000")).toBeUndefined();
      expect(findStoreByPincode("invalid")).toBeUndefined();
    });
  });

  describe("calculatePaintEstimate", () => {
    it("calculates estimate correctly for valid inputs and various space/surface types", () => {
      // Interior Apartment
      const aptEstimate = calculatePaintEstimate("apartment", "interior", 500, "224129");
      expect(aptEstimate).toEqual({ low: 6000, high: 7320 });

      // Exterior Villa
      const villaEstimate = calculatePaintEstimate("villa", "exterior", 1000, "224129");
      expect(villaEstimate).toEqual({ low: 17400, high: 21228 });

      // Interior Studio
      const studioEstimate = calculatePaintEstimate("studio", "interior", 200, "224129");
      // rate = 12, multiplier = 0.88, base = Math.round(200 * 12 * 0.88) = 2112
      // high = Math.round(2112 * 1.22) = 2577
      expect(studioEstimate).toEqual({ low: 2112, high: 2577 });

      // Exterior Commercial
      const commEstimate = calculatePaintEstimate("commercial", "exterior", 500, "224129");
      // rate = 15, multiplier = 1.28, base = Math.round(500 * 15 * 1.28) = 9600
      // high = Math.round(9600 * 1.22) = 11712
      expect(commEstimate).toEqual({ low: 9600, high: 11712 });
    });

    it("handles boundary area values (area = 100 vs area < 100)", () => {
      expect(calculatePaintEstimate("apartment", "interior", 100, "224129")).not.toBeNull();
      expect(calculatePaintEstimate("apartment", "interior", 99.9, "224129")).toBeNull();
      expect(calculatePaintEstimate("apartment", "interior", 0, "224129")).toBeNull();
      expect(calculatePaintEstimate("apartment", "interior", -500, "224129")).toBeNull();
    });

    it("returns null for non-finite area values", () => {
      expect(calculatePaintEstimate("apartment", "interior", NaN, "224129")).toBeNull();
      expect(calculatePaintEstimate("apartment", "interior", Infinity, "224129")).toBeNull();
      expect(calculatePaintEstimate("apartment", "interior", -Infinity, "224129")).toBeNull();
    });

    it("returns null for invalid pincode formats", () => {
      expect(calculatePaintEstimate("apartment", "interior", 500, "22412")).toBeNull();
      expect(calculatePaintEstimate("apartment", "interior", 500, "2241299")).toBeNull();
      expect(calculatePaintEstimate("apartment", "interior", 500, "22412a")).toBeNull();
      expect(calculatePaintEstimate("apartment", "interior", 500, "")).toBeNull();
    });
  });
});
