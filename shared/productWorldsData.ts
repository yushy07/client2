// Product Worlds Registry
// Editorial narratives connecting visual assets to product solutions without duplicating the 124-product catalogue

export interface ProductWorldStory {
  id: string;
  category: "interior" | "exterior" | "woodfinishes";
  title: string;
  headline: string;
  description: string;
  keyAspects: string[];
  heroImage: string;
  featuredProducts: {
    name: string;
    image: string;
    tier: string;
    finishType: string;
    idealFor: string;
  }[];
}

export const INTERIOR_PAINT_WORLD: ProductWorldStory = {
  id: "world-interior",
  category: "interior",
  title: "Interior Paint World",
  headline: "Interior Emulsions & Wall Paint Collections",
  description: "Explore Birla Opus interior paint collections ranging from smooth mattes and soft sheens to washable emulsions and surface preparation systems.",
  keyAspects: [
    "One Pure Elegance: Interior luxury emulsion in matt and soft sheen options",
    "Calista Ever Wash & Everclear: Washable interior emulsion formulations",
    "Surface Prep: One Pro Smooth Putty and primer undercoat systems",
    "Style Smart Range: Interior wall paint options for residential and rental spaces",
  ],
  heroImage: "/storage/extracted/birlaopus_products_interior/One_Pure_Elegance_Interior_Paint_Birla_Opus_.jpg",
  featuredProducts: [
    {
      name: "One Pure Elegance Luxury Emulsion",
      image: "/storage/extracted/birlaopus_products_interior/One_Pure_Elegance_Interior_Paint_Birla_Opus_.jpg",
      tier: "Luxury Emulsion",
      finishType: "Matt / Soft Sheen",
      idealFor: "Bedrooms, living rooms, and dining areas",
    },
    {
      name: "Calista Everclear & Everwash",
      image: "/storage/extracted/birlaopus_products_interior/Calista_Everclear_Emulsion_Paint_Birla_Opus.jpg",
      tier: "Washable Emulsion",
      finishType: "Smooth Finish",
      idealFor: "Family spaces, hallways, and dining areas",
    },
    {
      name: "Calista Neo Star Emulsion",
      image: "/storage/extracted/birlaopus_products_interior/Calista_Neo_Star_Emulsion_Paint_Birla_Opus.jpg",
      tier: "Interior Emulsion",
      finishType: "Soft Glow Finish",
      idealFor: "Living spaces and bedrooms",
    },
    {
      name: "One Pro Smooth Putty & Luxury Primer",
      image: "/storage/extracted/birlaopus_products_interior/One_Pro_Smooth_Interior_Acrylic_Putty_Birla_Opus.jpg",
      tier: "Surface Preparation",
      finishType: "Undercoat & Leveling",
      idealFor: "Bare plaster and wall leveling before painting",
    },
    {
      name: "Style Colour Fresh & Smart",
      image: "/storage/extracted/birlaopus_products_interior/Style_Colour_Fresh_Interior_Paint_Birla_Opus.jpg",
      tier: "Interior Wall Paint",
      finishType: "Matt / Satin",
      idealFor: "Interior walls and refreshes",
    },
  ],
};

export const EXTERIOR_PROTECTION_WORLD: ProductWorldStory = {
  id: "world-exterior",
  category: "exterior",
  title: "Exterior & Protection World",
  headline: "Exterior Paint & Surface Protection Solutions",
  description: "Exterior surfaces require weather-facing paint systems and waterproofing coatings designed for outer walls, roofs, and terraces.",
  keyAspects: [
    "One True Life & True Flex: Exterior emulsion ranges for outer facades",
    "Style Power Bright: Exterior acrylic emulsion for facade walls",
    "Alldry Systems: Waterproofing coatings, crack pastes, and surface sealants",
    "Tile & Floor Finishes: Calista Neo Tile & Floor specialised paint coats",
  ],
  heroImage: "/storage/extracted/birlaopus_products_exterior/One_True_Life_Exterior_Emulsion_Paint_Birla_Opus.jpg",
  featuredProducts: [
    {
      name: "One True Life Exterior Emulsion",
      image: "/storage/extracted/birlaopus_products_exterior/One_True_Life_Exterior_Emulsion_Paint_Birla_Opus.jpg",
      tier: "Exterior Emulsion",
      finishType: "Exterior Finish",
      idealFor: "Exterior elevations and boundary walls",
    },
    {
      name: "One True Flex Elastic Shield",
      image: "/storage/extracted/birlaopus_products_exterior/One_True_Flex.jpg",
      tier: "Exterior Emulsion",
      finishType: "Flexible Exterior Coating",
      idealFor: "Outer masonry walls",
    },
    {
      name: "Style Power Bright & Power Fit",
      image: "/storage/extracted/birlaopus_products_exterior/Style_Power_Bright_Exterior_Emulsion_Paint_Birla_Opus.jpg",
      tier: "Exterior Paint",
      finishType: "Exterior Acrylic Finish",
      idealFor: "Residential outer walls and compounds",
    },
    {
      name: "Alldry Total 2K Waterproofing Coating",
      image: "/storage/extracted/birlaopus_products_waterproofing/All_Dry_2K_Waterproof_Coating_Birla_Opus.jpg",
      tier: "Waterproofing",
      finishType: "Polymer Coating",
      idealFor: "Terraces, parapets, and exterior slabs",
    },
    {
      name: "Alldry Salt Seal & Wall Fix System",
      image: "/storage/extracted/birlaopus_products_waterproofing/All_Dry_Salt_Seal_Waterproofing_Primer_Birla_Opus.jpg",
      tier: "Waterproofing Primer",
      finishType: "Sealing Primer",
      idealFor: "Damp walls and surface pre-treatment",
    },
  ],
};

export const WOOD_FINISHES_WORLD: ProductWorldStory = {
  id: "world-woodfinishes",
  category: "woodfinishes",
  title: "Wood & Finishes World",
  headline: "Wood Coatings & Polish Collections",
  description: "Birla Opus Allwood wood coatings help seal, protect, and highlight natural timber surfaces across furniture, doors, and architectural woodwork.",
  keyAspects: [
    "Allwood Italian PU: High clarity polyurethane wood finishes",
    "Melamine Polish: Resilient finish for indoor furniture and cabinetry",
    "Wood Stains & Fillers: Timber tinting and surface filling",
    "Special Effects: Specialty finishes for architectural wood surfaces",
  ],
  heroImage: "/storage/extracted/birlaopus_products_woodfinishes/Allwood_Italian_PU_Paint_Birla_Opus_.jpg",
  featuredProducts: [
    {
      name: "Allwood Italian PU Clear & Colour",
      image: "/storage/extracted/birlaopus_products_woodfinishes/Allwood_Italian_PU_Paint_Birla_Opus_.jpg",
      tier: "Polyurethane Coating",
      finishType: "Gloss / Matt",
      idealFor: "Furniture, timber doors, and panels",
    },
    {
      name: "Allwood Melamine Ultra Clear",
      image: "/storage/extracted/birlaopus_products_woodfinishes/Allwood_Melamine_Ultra_Clear.jpg",
      tier: "Melamine Polish",
      finishType: "Clear Polish",
      idealFor: "Cabinets, tables, and interior woodwork",
    },
    {
      name: "Allwood PU Color Metallic & SFX",
      image: "/storage/extracted/birlaopus_products_woodfinishes/Allwood_PU_Color_Metallic.jpg",
      tier: "Specialty Finish",
      finishType: "Special Effect Coating",
      idealFor: "Decorative panels and accent furniture",
    },
    {
      name: "Allwood Wood Stain & Filler System",
      image: "/storage/extracted/birlaopus_products_woodfinishes/Allwood_Wood_Stain.jpg",
      tier: "Stain & Preparation",
      finishType: "Transparent Tint",
      idealFor: "Bare wood tinting and grain preparation",
    },
  ],
};
