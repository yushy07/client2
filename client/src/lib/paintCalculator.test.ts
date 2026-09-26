import { describe, expect, it } from "vitest";
import { calculatePaintRequirements, PRESET_HOME_CONFIGS } from "./paintCalculator";

describe("paintCalculator", () => {
  it("calculates positive paintable area and liters for a standard room", () => {
    const singleRoom = [
      {
        id: "test-room",
        name: "Test Living Room",
        lengthFeet: 10,
        widthFeet: 10,
        heightFeet: 10,
        doorsCount: 1,
        windowsCount: 1,
        includeCeiling: true,
      },
    ];

    const result = calculatePaintRequirements(singleRoom);
    // Wall area = 2 * (10+10) * 10 = 400 sq ft
    // Ceiling area = 100 sq ft
    // Deductions = 1 door (21) + 1 window (16) = 37 sq ft
    // Net area = 400 + 100 - 37 = 463 sq ft
    expect(result.wallAreaSqFt).toBe(400);
    expect(result.ceilingAreaSqFt).toBe(100);
    expect(result.deductionsSqFt).toBe(37);
    expect(result.netPaintableAreaSqFt).toBe(463);
    expect(result.paintLiters2Coats).toBeGreaterThan(0);
    expect(result.primerLiters).toBeGreaterThan(0);
    expect(result.oneCostEstimate.min).toBeGreaterThan(result.styleCostEstimate.min);
  });

  it("evaluates 2 BHK and 3 BHK presets cleanly with increasing area", () => {
    const res2Bhk = calculatePaintRequirements(PRESET_HOME_CONFIGS["2bhk"].rooms);
    const res3Bhk = calculatePaintRequirements(PRESET_HOME_CONFIGS["3bhk"].rooms);

    expect(res3Bhk.netPaintableAreaSqFt).toBeGreaterThan(res2Bhk.netPaintableAreaSqFt);
    expect(res3Bhk.paintLiters2Coats).toBeGreaterThan(res2Bhk.paintLiters2Coats);
  });
});
