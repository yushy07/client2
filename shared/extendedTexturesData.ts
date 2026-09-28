// Extended Texture Collections Registry
// Distinct from the functional 21-item Surface Studio, this represents the visual/material archive

export type TextureCategory = 
  | "Organic & Woods"
  | "Marine & Water"
  | "Air & Atmosphere"
  | "Stone & Mineral"
  | "Fauna & Organic"
  | "Botanical"
  | "Architectural Plaster";

export interface ExtendedTextureItem {
  id: string;
  name: string;
  category: TextureCategory;
  file: string;
  url: string;
  description: string;
  materialSensory: string;
}

export const EXTENDED_TEXTURE_COLLECTIONS: ExtendedTextureItem[] = [
  {
    id: "ext-bamboo",
    name: "Bamboo Striations",
    category: "Organic & Woods",
    file: "Bamboo_Textured_Wall_Birla_Opus_.jpg",
    url: "/storage/extracted/birlaopus_interiortexture/Bamboo_Textured_Wall_Birla_Opus_.jpg",
    description: "Vertical tactile reed relief capturing natural bamboo stalks in subtle relief.",
    materialSensory: "Linear, tactile, organic timber feel",
  },
  {
    id: "ext-seashell",
    name: "Seashell Spiral",
    category: "Marine & Water",
    file: "Blow_Out_Candle_Seashell_Interior_Texture_Birla_Opus.jpg",
    url: "/storage/extracted/birlaopus_interiortexture/Blow_Out_Candle_Seashell_Interior_Texture_Birla_Opus.jpg",
    description: "Iridescent calcium shell contours evoking calming coastal tide patterns.",
    materialSensory: "Curved, luminous, pearlescent reflection",
  },
  {
    id: "ext-forest",
    name: "Forest Canopy",
    category: "Organic & Woods",
    file: "Bring_the_rustic_beauty_of_the_woods_indoors_with_our_forest_inspired_textures_.jpg",
    url: "/storage/extracted/birlaopus_interiortexture/Bring_the_rustic_beauty_of_the_woods_indoors_with_our_forest_inspired_textures_.jpg",
    description: "Deep rustic woodland canopy silhouette bringing woodland organic depth into interior spaces.",
    materialSensory: "Muted, earthen, dappled depth",
  },
  {
    id: "ext-cloud",
    name: "Celestial Cloud",
    category: "Air & Atmosphere",
    file: "Cloud_texture_interior_walls.jpg",
    url: "/storage/extracted/birlaopus_interiortexture/Cloud_texture_interior_walls.jpg",
    description: "Airy sky-inspired swirls replicating soft cumulus clouds and open atmosphere.",
    materialSensory: "Weightless, billowy, diffuse matte",
  },
  {
    id: "ext-feathers",
    name: "Delicate Feathers",
    category: "Fauna & Organic",
    file: "Feathers_texture_interior_walls.jpg",
    url: "/storage/extracted/birlaopus_interiortexture/Feathers_texture_interior_walls.jpg",
    description: "Weightless overlapping plumage creating delicate kinetic ripples across wall surfaces.",
    materialSensory: "Soft, directional, whisper-fine edge",
  },
  {
    id: "ext-grass",
    name: "Meadow Grass",
    category: "Organic & Woods",
    file: "Grass_texture_interior_walls.jpg",
    url: "/storage/extracted/birlaopus_interiortexture/Grass_texture_interior_walls.jpg",
    description: "Fine vertical grassy reeds giving vertical room lift and gentle organic warmth.",
    materialSensory: "Linear, verdant, fresh relief",
  },
  {
    id: "ext-vapour",
    name: "Atmospheric Vapour",
    category: "Air & Atmosphere",
    file: "Interior_Vapour_Finish_Texture_Birla_Opus.jpg",
    url: "/storage/extracted/birlaopus_interiortexture/Interior_Vapour_Finish_Texture_Birla_Opus.jpg",
    description: "Misty diffuse morning vapour creating a soft aura that dissolves harsh wall corners.",
    materialSensory: "Subtle, ethereal, mist-glazed finish",
  },
  {
    id: "ext-waves",
    name: "Oceanic Waves",
    category: "Marine & Water",
    file: "Interior_Waves_Texture_Birla_Opus.jpg",
    url: "/storage/extracted/birlaopus_interiortexture/Interior_Waves_Texture_Birla_Opus.jpg",
    description: "Rhythmic wave crests recalling moving seawater and oceanic tidal swells.",
    materialSensory: "Undulating, horizontal, light-catching crests",
  },
  {
    id: "ext-marble",
    name: "Venetian Marble Finish",
    category: "Stone & Mineral",
    file: "Marble_Finish_texture_interior_walls.jpg",
    url: "/storage/extracted/birlaopus_interiortexture/Marble_Finish_texture_interior_walls.jpg",
    description: "High-sheen mineral marbling with subtle veins mimicking polished Italian marble slabs.",
    materialSensory: "Glossy, cool, monolithic stone touch",
  },
  {
    id: "ext-marigold",
    name: "Embossed Marigold",
    category: "Botanical",
    file: "Marigold_texture_interior_walls.jpg",
    url: "/storage/extracted/birlaopus_interiortexture/Marigold_texture_interior_walls.jpg",
    description: "Rich floral rosette motifs inspired by celebratory Indian marigold blossoms.",
    materialSensory: "Sculptural, ornate, festive relief",
  },
  {
    id: "ext-mushroom",
    name: "Organic Mushroom Gills",
    category: "Fauna & Organic",
    file: "Mushroom_texture_interior_walls.jpg",
    url: "/storage/extracted/birlaopus_interiortexture/Mushroom_texture_interior_walls.jpg",
    description: "Intricate natural gill structures providing tactile macro-botanical depth.",
    materialSensory: "Spongy, granular, earthly shadows",
  },
  {
    id: "ext-sanddune",
    name: "Desert Sanddune",
    category: "Stone & Mineral",
    file: "Sanddune_texture_interior_walls.jpg",
    url: "/storage/extracted/birlaopus_interiortexture/Sanddune_texture_interior_walls.jpg",
    description: "Wind-sculpted sand dunes featuring rhythmic mineral ridges and warm grain.",
    materialSensory: "Sandy, warm, rhythmic ripples",
  },
  {
    id: "ext-stone-plaster",
    name: "Architectural Stone Plaster",
    category: "Architectural Plaster",
    file: "Stone_Plaster_Textured_Paint_Stone_Plaster_1_Birla_Opus.jpg",
    url: "/storage/extracted/birlaopus_interiortexture/Stone_Plaster_Textured_Paint_Stone_Plaster_1_Birla_Opus.jpg",
    description: "Hand-trowelled lime and stone aggregate providing rugged exterior and interior permanence.",
    materialSensory: "Rugged, masonry, mineral matte",
  },
  {
    id: "ext-tree-bark",
    name: "Ancient Tree Bark",
    category: "Organic & Woods",
    file: "Tree_Bark_texture_interior_walls.jpg",
    url: "/storage/extracted/birlaopus_interiortexture/Tree_Bark_texture_interior_walls.jpg",
    description: "Heavy fissure texture replicating aged cedar and teak timber bark.",
    materialSensory: "Deep clefts, timber warmth, rugged tactile",
  },
  {
    id: "ext-tree-husk",
    name: "Raw Tree Husk",
    category: "Organic & Woods",
    file: "Tree_Husk_texture_interior_walls.jpg",
    url: "/storage/extracted/birlaopus_interiortexture/Tree_Husk_texture_interior_walls.jpg",
    description: "Coarse organic fibers and fibrous outer sheath textures in raw earthen finish.",
    materialSensory: "Fibrous, raw, rustic weave",
  },
  {
    id: "ext-tree-rings",
    name: "Concentric Tree Rings",
    category: "Organic & Woods",
    file: "Tree_Rings_texture_interior_walls.jpg",
    url: "/storage/extracted/birlaopus_interiortexture/Tree_Rings_texture_interior_walls.jpg",
    description: "Etched cross-section timber rings documenting seasonal growth and botanical legacy.",
    materialSensory: "Geometric circular, organic, textured",
  },
  {
    id: "ext-trellis",
    name: "Geometric Garden Trellis",
    category: "Architectural Plaster",
    file: "Trellis_Textured_Wall_Birla_Opus_.jpg",
    url: "/storage/extracted/birlaopus_textures/Trellis_Textured_Wall_Birla_Opus_.jpg",
    description: "Interlaced garden lattice relief creating elegant symmetry and spatial dimension.",
    materialSensory: "Structured, architectural, lattice shadow",
  },
];
