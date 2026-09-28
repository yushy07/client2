// Wallpaper Gallery Data Registry
// Verified genuine wallpaper design families from birlaopus_wallpaper

export interface WallpaperFamily {
  id: string;
  title: string;
  category: "Fauna & Nature" | "Architectural & Textures" | "Classic & Royal" | "Heritage & Culture" | "Botanical" | "Modern & Abstract" | "Curated Designer";
  file: string;
  url: string;
  description: string;
  suggestedSpaces: string[];
}

export const WALLPAPER_GALLERY_ITEMS: WallpaperFamily[] = [
  {
    id: "wp-animal",
    title: "Animal, Bird & Insect",
    category: "Fauna & Nature",
    file: "Birla_Opus_Animal_Bird_Insect.jpg",
    url: "/storage/extracted/birlaopus_wallpaper/Birla_Opus_Animal_Bird_Insect.jpg",
    description: "Intricately etched wildlife and avian illustrations bringing organic majesty to signature feature walls.",
    suggestedSpaces: ["Study Room", "Accent Corridor", "Reading Nook"],
  },
  {
    id: "wp-bricks",
    title: "Bricks & Stones",
    category: "Architectural & Textures",
    file: "Birla_Opus_Bricks_Stones.jpg",
    url: "/storage/extracted/birlaopus_wallpaper/Birla_Opus_Bricks_Stones.jpg",
    description: "Tactile masonry, exposed brickwork, and organic ashlar textures for modern industrial interiors.",
    suggestedSpaces: ["Living Room Feature Wall", "Cafe / Lounge Corner", "Studio"],
  },
  {
    id: "wp-damask",
    title: "Classic Damask",
    category: "Classic & Royal",
    file: "Birla_Opus_Damask.jpg",
    url: "/storage/extracted/birlaopus_wallpaper/Birla_Opus_Damask.jpg",
    description: "Regal European symmetry woven with subtle metallic reflections for stately dining and formal salons.",
    suggestedSpaces: ["Formal Drawing Room", "Dining Alcove", "Master Suite"],
  },
  {
    id: "wp-ethnic",
    title: "Ethnic & Traditional",
    category: "Heritage & Culture",
    file: "Birla_Opus_Ethnic.jpg",
    url: "/storage/extracted/birlaopus_wallpaper/Birla_Opus_Ethnic.jpg",
    description: "Authentic Indian artisan handloom prints and ornate regional borders steeped in historic warmth.",
    suggestedSpaces: ["Puja Room", "Traditional Foyer", "Living Room Wall"],
  },
  {
    id: "wp-florals",
    title: "Botanical Florals",
    category: "Botanical",
    file: "Birla_Opus_Florals.jpg",
    url: "/storage/extracted/birlaopus_wallpaper/Birla_Opus_Florals.jpg",
    description: "Lush blooming blossoms and romantic petal compositions that bring effortless freshness indoors.",
    suggestedSpaces: ["Bedroom Headboard Wall", "Powder Room", "Balcony Foyer"],
  },
  {
    id: "wp-garden",
    title: "Garden Charms",
    category: "Botanical",
    file: "Birla_Opus_Garden_Charms.jpg",
    url: "/storage/extracted/birlaopus_wallpaper/Birla_Opus_Garden_Charms.jpg",
    description: "Verdant greenhouse foliage and trailing vine canopies creating a tranquil sanctuary ambiance.",
    suggestedSpaces: ["Breakfast Corner", "Garden Lounge", "Bedroom"],
  },
  {
    id: "wp-geometric",
    title: "Geometric Retreat",
    category: "Modern & Abstract",
    file: "Birla_Opus_Geometric_Retreat.jpg",
    url: "/storage/extracted/birlaopus_wallpaper/Birla_Opus_Geometric_Retreat.jpg",
    description: "Sharp architectural angles, rhythmic tessellations, and modernist mid-century geometry.",
    suggestedSpaces: ["Home Office", "Entertainment Zone", "Contemporary Foyer"],
  },
  {
    id: "wp-heritage",
    title: "Heritage Collection",
    category: "Heritage & Culture",
    file: "Birla_Opus_Heritage_collection.jpg",
    url: "/storage/extracted/birlaopus_wallpaper/Birla_Opus_Heritage_collection.jpg",
    description: "Palatial motifs and timeless architectural silhouettes celebrating timeless royal heritage.",
    suggestedSpaces: ["Grand Living Area", "Dining Room", "Staircase Landing"],
  },
  {
    id: "wp-natural",
    title: "Natural Minerals & Slate",
    category: "Architectural & Textures",
    file: "Birla_Opus_Natural_Imitations.jpg",
    url: "/storage/extracted/birlaopus_wallpaper/Birla_Opus_Natural_Imitations.jpg",
    description: "Realistic simulations of slate, quartz veining, and raw unpolished earth strata.",
    suggestedSpaces: ["Media Console Backdrop", "Executive Study", "Corridor Wall"],
  },
  {
    id: "wp-signature",
    title: "Opus Signature Collection",
    category: "Curated Designer",
    file: "Birla_Opus_Signature_collection.jpg",
    url: "/storage/extracted/birlaopus_wallpaper/Birla_Opus_Signature_collection.jpg",
    description: "Birla Opus top-tier bespoke wallpaper curation combining luxury paper substrate with designer inks.",
    suggestedSpaces: ["Luxury Master Suite", "Main Reception Salon"],
  },
  {
    id: "wp-timeless",
    title: "Timeless Medallion Damask",
    category: "Classic & Royal",
    file: "Birla_Opus_Timeless_Damask.jpg",
    url: "/storage/extracted/birlaopus_wallpaper/Birla_Opus_Timeless_Damask.jpg",
    description: "Subdued monochromatic damask shields creating quiet opulence without visual clutter.",
    suggestedSpaces: ["Bed Chamber", "Private Lounge"],
  },
  {
    id: "wp-woods",
    title: "Timber Woods & Grain",
    category: "Architectural & Textures",
    file: "Birla_Opus_Woods.jpg",
    url: "/storage/extracted/birlaopus_wallpaper/Birla_Opus_Woods.jpg",
    description: "Warm acoustic wood panelling effect and vertical cedar plank aesthetics.",
    suggestedSpaces: ["Living Room TV Wall", "Home Library", "Dining Nook"],
  },
  {
    id: "wp-tropical",
    title: "Tropical Flair",
    category: "Botanical",
    file: "Tropical_Flair_Wallpaper_Interior_Texture_Birla_Opus.jpg",
    url: "/storage/extracted/birlaopus_wallpaper/Tropical_Flair_Wallpaper_Interior_Texture_Birla_Opus.jpg",
    description: "Deep tropical palm leaves with high-contrast emerald and gold depth for statement rooms.",
    suggestedSpaces: ["Lounge Feature Wall", "Sunroom", "Bar Area"],
  },
];
