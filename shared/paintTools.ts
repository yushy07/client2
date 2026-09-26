export type SpaceType = "apartment" | "villa" | "studio" | "commercial";
export type SurfaceType = "interior" | "exterior";

export const storeDirectory = [
  {
    name: "Jaymurti Traders",
    nameHindi: "जयमूर्ति ट्रेडर्स",
    address: "Shukul Bazar, Baskhari",
    hours: "8:00 AM – 9:00 PM",
    city: "Ambedkar Nagar, Uttar Pradesh 224129",
    phone: "+91 8756659035",
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
