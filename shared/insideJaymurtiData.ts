// Inside Jaymurti Data Registry
// Verified genuine Jaymurti Traders showroom and material assets

export interface ShowroomPhoto {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  aspect: "wide" | "standard" | "tall";
  description: string;
}

export const INSIDE_JAYMURTI_PHOTOS: ShowroomPhoto[] = [
  {
    id: "jm-wide",
    title: "Colour Wall & Display",
    subtitle: "Birla Opus dealer showroom in Shukul Bazar, Baskhari",
    image: "/storage/storefront/shopwide.jpeg",
    aspect: "wide",
    description: "Showroom floor displaying colour wall swatches, customer consultation counter, and product shelving.",
  },
  {
    id: "jm-reception",
    title: "Consultation Counter",
    subtitle: "Showroom desk for shade selection and product assistance",
    image: "/storage/storefront/shopreception.jpeg",
    aspect: "standard",
    description: "Customer counter where visitors and painters review physical shade cards and plan paint requirements.",
  },
  {
    id: "jm-product-pyramid",
    title: "Product Display",
    subtitle: "Birla Opus paint packs on display",
    image: "/storage/shopproductpyramid.jpeg",
    aspect: "standard",
    description: "In-store display of One, Calista, and Style paint packs.",
  },
  {
    id: "jm-materials",
    title: "Paint & Materials",
    subtitle: "Coating products, primers, and painting essentials",
    image: "/storage/shopmaterials.jpeg",
    aspect: "standard",
    description: "Stocked shelves of primers, surface preparation products, and painting tools.",
  },
  {
    id: "jm-shelf",
    title: "Stock & Inventory",
    subtitle: "Birla Opus products on the showroom shelves",
    image: "/storage/shopproduct.jpeg",
    aspect: "tall",
    description: "Shelves showing various pack sizes available for walk-in consultation and purchase.",
  },
  {
    id: "jm-storefront",
    title: "Showroom Entrance",
    subtitle: "Shukul Bazar, Baskhari location",
    image: "/storage/storefront/shop.jpeg",
    aspect: "standard",
    description: "Street-level entrance of Jaymurti Traders on the main road in Shukul Bazar, Baskhari.",
  },
];
