// Authoritative registries for Part 2 Visual & Editorial Experiences
// Built for Jaymurti Traders (जयमूर्ति ट्रेडर्स)

export interface ColourCapsulePage {
  index: number;
  fileName: string;
  url: string;
  chapter: "Prelude & Warm Neutrals" | "Vibrant Ochres & Terracotta" | "Botanical Greens & Aquas" | "Oceanic & Twilight Blues" | "Pastel Reflections & Architectural Whites";
  title: string;
  subtitle: string;
  paletteHint: string[];
}

export const COLOUR_CAPSULE_PAGES: ColourCapsulePage[] = Array.from({ length: 50 }, (_, i) => {
  const pageNum = i + 1;
  const pad = String(pageNum).padStart(4, "0");
  const fileName = `Colour Capsule _pages-to-jpg-${pad}.jpg`;
  
  let chapter: ColourCapsulePage["chapter"] = "Prelude & Warm Neutrals";
  let title = `Capsule Spread ${pageNum}`;
  let subtitle = "Curated colour harmony";
  let paletteHint = ["#E8DFD8", "#CBB8A9", "#9E8271"];

  if (pageNum <= 10) {
    chapter = "Prelude & Warm Neutrals";
    title = pageNum === 1 ? "Colour Capsule Cover & Prologue" : `Warm Earth & Sanctuary — Spread ${pageNum}`;
    subtitle = "Subtle grounding tones, limestone hues, and soft ambient light";
    paletteHint = ["#F4EFEB", "#D5C2B1", "#A68972", "#665043"];
  } else if (pageNum <= 20) {
    chapter = "Vibrant Ochres & Terracotta";
    title = `Sun-Drenched Clay & Spices — Spread ${pageNum}`;
    subtitle = "Expressive warmth drawn from Indian courtyard sunlight and raw pigment";
    paletteHint = ["#E89758", "#C85A32", "#E5B25D", "#873822"];
  } else if (pageNum <= 30) {
    chapter = "Botanical Greens & Aquas";
    title = `Verdant Leaves & Canopy Mist — Spread ${pageNum}`;
    subtitle = "Restorative jungle greens, sage nuances, and serene morning air";
    paletteHint = ["#CADBB7", "#7A9A60", "#405B3A", "#D3E8E1"];
  } else if (pageNum <= 40) {
    chapter = "Oceanic & Twilight Blues";
    title = `Deep Water & Dusky Horizons — Spread ${pageNum}`;
    subtitle = "Quiet meditative depths, twilight indigo, and refreshing coastal breeze";
    paletteHint = ["#A8C5DA", "#4F7C9E", "#233F5D", "#152238"];
  } else {
    chapter = "Pastel Reflections & Architectural Whites";
    title = `Modern Minimalists & Serene Air — Spread ${pageNum}`;
    subtitle = "Architectural clarity, soft eggshell tints, and luminous spatial balance";
    paletteHint = ["#FAF8F5", "#E3DED8", "#C4C8C5", "#989F9C"];
  }

  return {
    index: pageNum,
    fileName,
    url: `/storage/color-capsule/${encodeURIComponent(fileName)}`,
    chapter,
    title,
    subtitle,
    paletteHint,
  };
});
