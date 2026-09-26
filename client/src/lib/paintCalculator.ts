export interface RoomInput {
  id: string;
  name: string;
  lengthFeet: number;
  widthFeet: number;
  heightFeet: number;
  doorsCount: number;
  windowsCount: number;
  includeCeiling: boolean;
}

export interface PaintCalculationResult {
  carpetAreaSqFt: number;
  wallAreaSqFt: number;
  ceilingAreaSqFt: number;
  deductionsSqFt: number;
  netPaintableAreaSqFt: number;
  // Material requirements
  primerLiters: number;
  puttyKg: number;
  paintLiters2Coats: number;
  // Tier cost estimates (INR approximate)
  oneCostEstimate: { min: number; max: number };
  calistaCostEstimate: { min: number; max: number };
  styleCostEstimate: { min: number; max: number };
}

const DOOR_AREA_SQFT = 21; // 7ft x 3ft
const WINDOW_AREA_SQFT = 16; // 4ft x 4ft

// Coverage standards (sq ft per liter for 2 coats)
const PAINT_COVERAGE_2COATS_SQFT_PER_LITER = 65; // ~130-140 sq ft for 1 coat = ~65 sq ft for 2 coats
const PRIMER_COVERAGE_SQFT_PER_LITER = 110;
const PUTTY_COVERAGE_SQFT_PER_KG = 15; // 2 coats

export function calculatePaintRequirements(
  rooms: RoomInput[],
  isFreshPlaster = false
): PaintCalculationResult {
  let totalWallArea = 0;
  let totalCeilingArea = 0;
  let totalDeductions = 0;
  let totalCarpetArea = 0;

  rooms.forEach((room) => {
    const perimeter = 2 * (room.lengthFeet + room.widthFeet);
    const wallArea = perimeter * room.heightFeet;
    const ceilingArea = room.includeCeiling ? room.lengthFeet * room.widthFeet : 0;
    const deductions = room.doorsCount * DOOR_AREA_SQFT + room.windowsCount * WINDOW_AREA_SQFT;
    const carpetArea = room.lengthFeet * room.widthFeet;

    totalWallArea += wallArea;
    totalCeilingArea += ceilingArea;
    totalDeductions += Math.min(deductions, wallArea * 0.4); // max 40% deduction safety
    totalCarpetArea += carpetArea;
  });

  const netPaintableArea = Math.max(0, totalWallArea + totalCeilingArea - totalDeductions);

  // Requirement calculations
  const paintLiters = Math.ceil(netPaintableArea / PAINT_COVERAGE_2COATS_SQFT_PER_LITER);
  const primerMultiplier = isFreshPlaster ? 1.3 : 1.0;
  const primerLiters = Math.ceil((netPaintableArea / PRIMER_COVERAGE_SQFT_PER_LITER) * primerMultiplier);
  const puttyKg = isFreshPlaster ? Math.ceil(netPaintableArea / PUTTY_COVERAGE_SQFT_PER_KG) : Math.ceil((netPaintableArea / PUTTY_COVERAGE_SQFT_PER_KG) * 0.4);

  // Price estimates (approximate per liter rates)
  // Style: ~₹160-220/L Topcoat, Calista: ~₹280-380/L Topcoat, One Pure Elegance: ~₹480-680/L Topcoat
  // Plus primer (~₹120/L) and Putty (~₹25/kg)
  const basePrepCost = primerLiters * 130 + puttyKg * 28;

  return {
    carpetAreaSqFt: Math.round(totalCarpetArea),
    wallAreaSqFt: Math.round(totalWallArea),
    ceilingAreaSqFt: Math.round(totalCeilingArea),
    deductionsSqFt: Math.round(totalDeductions),
    netPaintableAreaSqFt: Math.round(netPaintableArea),
    primerLiters,
    puttyKg,
    paintLiters2Coats: paintLiters,
    oneCostEstimate: {
      min: Math.round(basePrepCost + paintLiters * 500),
      max: Math.round(basePrepCost + paintLiters * 680),
    },
    calistaCostEstimate: {
      min: Math.round(basePrepCost + paintLiters * 290),
      max: Math.round(basePrepCost + paintLiters * 390),
    },
    styleCostEstimate: {
      min: Math.round(basePrepCost + paintLiters * 170),
      max: Math.round(basePrepCost + paintLiters * 230),
    },
  };
}

export const PRESET_HOME_CONFIGS: Record<string, { label: string; rooms: RoomInput[] }> = {
  "1bhk": {
    label: "Standard 1 BHK (approx 450 sq ft)",
    rooms: [
      { id: "1", name: "Living Room", lengthFeet: 14, widthFeet: 11, heightFeet: 9.5, doorsCount: 2, windowsCount: 2, includeCeiling: true },
      { id: "2", name: "Master Bedroom", lengthFeet: 12, widthFeet: 10, heightFeet: 9.5, doorsCount: 1, windowsCount: 1, includeCeiling: true },
      { id: "3", name: "Kitchen", lengthFeet: 8, widthFeet: 7, heightFeet: 9.5, doorsCount: 1, windowsCount: 1, includeCeiling: true },
    ],
  },
  "2bhk": {
    label: "Comfort 2 BHK (approx 850 sq ft)",
    rooms: [
      { id: "1", name: "Living & Dining Room", lengthFeet: 18, widthFeet: 13, heightFeet: 10, doorsCount: 2, windowsCount: 3, includeCeiling: true },
      { id: "2", name: "Master Bedroom", lengthFeet: 14, widthFeet: 12, heightFeet: 10, doorsCount: 1, windowsCount: 2, includeCeiling: true },
      { id: "3", name: "Guest Bedroom", lengthFeet: 12, widthFeet: 11, heightFeet: 10, doorsCount: 1, windowsCount: 1, includeCeiling: true },
      { id: "4", name: "Kitchen & Passages", lengthFeet: 10, widthFeet: 8, heightFeet: 10, doorsCount: 2, windowsCount: 1, includeCeiling: true },
    ],
  },
  "3bhk": {
    label: "Luxury 3 BHK (approx 1350 sq ft)",
    rooms: [
      { id: "1", name: "Grand Living Room", lengthFeet: 22, widthFeet: 15, heightFeet: 10, doorsCount: 3, windowsCount: 3, includeCeiling: true },
      { id: "2", name: "Master Suite", lengthFeet: 16, widthFeet: 14, heightFeet: 10, doorsCount: 1, windowsCount: 2, includeCeiling: true },
      { id: "3", name: "Bedroom 2", lengthFeet: 14, widthFeet: 12, heightFeet: 10, doorsCount: 1, windowsCount: 2, includeCeiling: true },
      { id: "4", name: "Kids / Guest Room", lengthFeet: 13, widthFeet: 11, heightFeet: 10, doorsCount: 1, windowsCount: 1, includeCeiling: true },
      { id: "5", name: "Kitchen & Dining Area", lengthFeet: 14, widthFeet: 10, heightFeet: 10, doorsCount: 2, windowsCount: 2, includeCeiling: true },
    ],
  },
};
