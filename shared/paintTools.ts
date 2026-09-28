export type SpaceType = "apartment" | "villa" | "studio" | "commercial";
export type SurfaceType = "interior" | "exterior";

export const storeDirectory = [
  {
    name: "Birla Opus Paint Jaymurti Traders",
    address: "Shukul Bazar, Baskhari, Ambedkar Nagar",
    hours: "Daily · 8 AM–9 PM",
    city: "Ambedkar Nagar, Uttar Pradesh 224129",
    phone: "+91 87566 59035",
    instagram: "@paintwalebhaiya45",
    pincodes: ["224129"],
  },
] as const;

export function findStoreByPincode(pincode: string) {
  return storeDirectory.find((store) => store.pincodes.includes(pincode as never));
}

export function calculatePaintEstimate(space: SpaceType, surface: SurfaceType, area: number, pincode: string) {
  if (!Number.isFinite(area) || area < 100 || !/^\d{6}$/.test(pincode)) return null;

  const rate = surface === "interior" ? 12 : 15;
  const multiplier: Record<SpaceType, number> = { apartment: 1, villa: 1.16, studio: 0.88, commercial: 1.28 };
  const base = Math.round(area * rate * multiplier[space]);
  return { low: base, high: Math.round(base * 1.22) };
}
