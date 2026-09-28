import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import GlareHover from "@/components/GlareHover";
import CircularGallery, { type CircularGalleryItem } from "@/components/CircularGallery";
import BorderGlow from "@/components/BorderGlow";
import ServiceScrollStack, { ServiceScrollStackItem } from "@/components/ServiceScrollStack";
import { ProductStories } from "@/components/ProductStories";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  Compass,
  Copy,
  ExternalLink,
  Eye,
  Facebook,
  Heart,
  HelpCircle,
  Info,
  Instagram,
  Layers,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  PhoneCall,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { FormEvent, Fragment, memo, PointerEvent as ReactPointerEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { calculatePaintEstimate, findStoreByPincode, storeDirectory, type SpaceType, type SurfaceType } from "../../../shared/paintTools";
import { businessProfile } from "../../../shared/businessProfile";
import { birlaOpusCategories, birlaOpusProductCount, birlaOpusProducts } from "../../../shared/birlaOpusCatalogue";
import { colourArchiveAssets, colourCollections, colourFamilies, supplementaryProductCategories, textureGroups, textureLibrary } from "../../../shared/discoveryContent";
import { ideaArchive } from "../../../shared/ideaArchive";
import { maxComparisonProducts, toggleComparisonProduct } from "../../../shared/productComparison";
import { paginateProducts } from "../../../shared/productPagination";
import { colourTickerShades } from "../../../shared/colourDirections";
import {
  VERIFIED_BIRLA_OPUS_SHADES,
  COLOUR_FAMILIES,
  filterVerifiedShades,
  SHADE_VARIATION_DISCLAIMER,
  type BirlaOpusShade,
  type ColourFamily,
} from "../../../shared/verifiedBirlaOpusShades";
import { calculatePaintRequirements, PRESET_HOME_CONFIGS } from "@/lib/paintCalculator";
import { ColourCapsule } from "@/components/experiences/ColourCapsule";
import { RoomShadeStudio } from "@/components/experiences/RoomShadeStudio";
import { RoomLibrary } from "@/components/experiences/RoomLibrary";
import { WallpaperGallery } from "@/components/experiences/WallpaperGallery";
import { ExtendedTextures } from "@/components/experiences/ExtendedTextures";
import { ProductWorlds } from "@/components/experiences/ProductWorlds";
import { InsideJaymurti } from "@/components/experiences/InsideJaymurti";
import { StepInside } from "@/components/experiences/StepInside";
import { OwnerAndTeam } from "@/components/experiences/OwnerAndTeam";
import {
  MotionReveal,
  MotionFade,
  MotionStagger,
  MotionStaggerItem,
  MotionTilt,
  MotionMagnetic,
  AnimatedCounter,
  ScrollProgressBar,
  MotionImageReveal,
  MotionParallaxImage,
  MotionCursorLight,
} from "@/lib/motion";
import { motion, AnimatePresence } from "framer-motion";

type CatalogueProduct = (typeof birlaOpusProducts)[number];

// Unified Enquiry Cart Item
interface CartItem {
  id: string;
  type: "product" | "shade" | "texture" | "estimate";
  title: string;
  meta: string;
  quantity?: number;
  colourHex?: string;
  notes?: string;
}

type ProductCardProps = {
  product: CatalogueProduct;
  index: number;
  isImageLoaded: boolean;
  isCompared: boolean;
  onImageLoad: (slug: string) => void;
  onCompare: (slug: string) => void;
  onQuickView: (product: CatalogueProduct) => void;
  onAddCart: (item: CartItem) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerLeave: (event: ReactPointerEvent<HTMLElement>) => void;
};

const ProductCard = memo(function ProductCard({
  product,
  index,
  isImageLoaded,
  isCompared,
  onImageLoad,
  onCompare,
  onQuickView,
  onAddCart,
  onPointerMove,
  onPointerLeave,
}: ProductCardProps) {
  return (
    <article className="product-card" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <div className="product-image-stage">
        <div className="product-topline">
          <span className="product-topline-family">{product.family} · {product.category}</span>
          <span className="product-topline-num">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div
          className={`product-can ${product.imageUrl ? "with-image" : ""} ${isImageLoaded ? "image-ready" : ""}`}
          style={{ "--can-colour": product.colour, "--can-text": product.text } as React.CSSProperties}
        >
          {product.imageUrl ? (
            <>
              <span className="product-image-skeleton" aria-hidden="true" />
              <img
                src={product.imageUrl}
                alt={`${product.name} product pack`}
                width={248}
                height={226}
                loading={index < 2 ? "eager" : "lazy"}
                fetchPriority={index < 2 ? "high" : "auto"}
                decoding="async"
                onLoad={() => onImageLoad(product.slug)}
                onError={() => onImageLoad(product.slug)}
              />
            </>
          ) : (
            <span className="can-label">
              Birla
              <br />
              Opus
            </span>
          )}
        </div>
      </div>
      <div className="product-utility" aria-label="Product utilities">
        <button type="button" onClick={() => onQuickView(product)} aria-label={`Quick view ${product.name}`}>
          <Eye size={16} aria-hidden="true" />
          Quick View
        </button>
        <button
          type="button"
          className={isCompared ? "active" : ""}
          aria-pressed={isCompared}
          onClick={() => onCompare(product.slug)}
        >
          <Copy size={16} aria-hidden="true" />
          {isCompared ? "Added" : "Compare"}
        </button>
      </div>
      <div className="product-card-copy">
        <div className="product-family-tag">{product.family} Series</div>
        <h3>{product.name}</h3>
        <p>{product.copy}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", gap: "8px" }}>
          <button
            type="button"
            className="button-primary"
            style={{ minHeight: "40px", padding: "0 14px", fontSize: "11px", flex: 1, justifyContent: "center" }}
            onClick={() =>
              onAddCart({
                id: `prod-${product.slug}`,
                type: "product",
                title: product.name,
                meta: `${product.category} · ${product.family}`,
                quantity: 1,
              })
            }
          >
            + Add to Enquiry
          </button>
          <a className="product-card-action" href={product.sourceUrl} target="_blank" rel="noreferrer" style={{ padding: "0 4px", whiteSpace: "nowrap" }}>
            Details <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </article>
  );
});

const getInitialProductFilter = () => {
  const requestedCategory = new URLSearchParams(window.location.search).get("category");
  return requestedCategory && birlaOpusCategories.includes(requestedCategory as (typeof birlaOpusCategories)[number])
    ? requestedCategory
    : "All products";
};

const campaigns = [
  {
    eyebrow: "Birla Opus Paint Dealer · Paint & Colour Showroom",
    title: (
      <>
        Colour your space,
        <br />
        the <em>right way.</em>
      </>
    ),
    text: "Explore authentic Birla Opus interior, exterior, waterproofing, and designer finishes with expert guidance in Shukul Bazar, Baskhari.",
    note: "Colour consultation · Technical guidance",
    imageUrl: "/storage/storefront/shopwide.jpeg",
    imageAlt: "Jaymurti Traders Birla Opus paint showroom in Baskhari, Ambedkar Nagar",
    tag: "Experience Studio",
    caption: "Jaymurti Traders Showroom & Colour Studio · Baskhari",
    featureBadge: "Authorized Birla Opus Partner",
  },
  {
    eyebrow: "Colour, Light & Finish",
    title: (
      <>
        Where light
        <br />
        finds its <em>character.</em>
      </>
    ),
    text: "Compare calm neutrals, rich colour, and durable finishes chosen to work beautifully in your space and its natural light.",
    note: "Shukul Bazar · Baskhari · Ambedkar Nagar",
    imageUrl: "/storage/storefront/shopreception.jpeg",
    imageAlt: "Jaymurti Traders showroom entrance and colour consultation desk",
    tag: "Colour Calibration",
    caption: "Physical Fan Decks & Daylight Testing Consultation",
    featureBadge: "159 Verified Birla Opus Shades",
  },
  {
    eyebrow: "Paint Systems & Expert Advice",
    title: (
      <>
        Surfaces made
        <br />
        to <em>last well.</em>
      </>
    ),
    text: "Find authentic Birla Opus interior, exterior, and specialty finishes with clear advice from the Jaymurti Traders team.",
    note: "Direct dealer desk · +91 87566 59035",
    imageUrl: "/storage/storefront/shop.jpeg",
    imageAlt: "Jaymurti Traders Birla Opus paint showroom and product display",
    tag: "Direct Supply",
    caption: "Computerized Tinting & Complete Paint Inventory",
    featureBadge: "Genuine 100% Paint Systems",
  },
];

// Contrast calculation helper for dark or light text based on hex background
function getContrastColor(hexColor: string): string {
  const hex = hexColor.replace("#", "");
  if (hex.length !== 6) return "#171817";
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 155 ? "#171817" : "#FFFFFF";
}

// All 159 verified Birla Opus shades formatted as [name, code, colour, text]
const swatches: [string, string, string, string][] = VERIFIED_BIRLA_OPUS_SHADES.map((shade) => [
  shade.name,
  shade.code,
  shade.digitalColor,
  getContrastColor(shade.digitalColor),
]);

// Map all 159 verified Birla Opus shades for the infinite looping signature gallery
const circularColourItems: CircularGalleryItem[] = swatches.map(([label, code, color, textColor]) => ({
  label,
  code,
  color,
  textColor,
}));

const COLOUR_FAMILY_SWATCH_MAP: Record<string, string> = {
  Whites: "#F4F3ED",
  Neutrals: "#D0C5B4",
  Oranges: "#D98550",
  Yellows: "#E8C468",
  "Yellow-Greens": "#B8C57D",
  Greens: "#52796F",
  "Blue-Greens": "#4D8B95",
  Blues: "#42638E",
  Purples: "#6C4A6F",
  Reds: "#B84A4A",
};

function getColourArchiveAsset(role: (typeof colourArchiveAssets)[number]["role"]) {
  const asset = colourArchiveAssets.find((item) => item.role === role);
  if (!asset) throw new Error(`Missing Colours archive asset: ${role}`);
  return asset;
}

const colourCollectionAsset = getColourArchiveAsset("collection");
const colourRoomAsset = getColourArchiveAsset("room-reference");
const colourSwatchAsset = getColourArchiveAsset("swatch-reference");
const colourCollectionStoryAsset =
  ideaArchive.find((asset) => asset.name === "Personal Colour Testing: Colour Quiz | Birla Opus ") ??
  colourCollectionAsset;
const colourTickerLoop = [...colourTickerShades, ...colourTickerShades, ...colourTickerShades];
const roomShadeCatalogue = swatches.map(([name, code, colour, text]) => ({ name, code, colour, text }));
const findIdeaArchiveAsset = (name: string) =>
  ideaArchive.find((asset) => asset.name === name) ?? colourCollectionAsset;
const colourContextFrames = [
  { label: "Colour testing", asset: colourSwatchAsset },
  { label: "Dopamine décor", asset: findIdeaArchiveAsset("Dopamine Home Decor Ideas | Birla Opus") },
  { label: "Tropical flair", asset: findIdeaArchiveAsset("Tropical Flair Wallpaper: Interior Texture | Birla Opus") },
] as const;
const collectionStoryFrames = [
  { label: "Colour testing", asset: colourCollectionStoryAsset },
  { label: "Modern minimal", asset: findIdeaArchiveAsset("A modern and minimal home that pays homage to Scandinavian interiors") },
  { label: "Layered living", asset: findIdeaArchiveAsset("Rooted in the menagerie of art and memories, blooms this maximalist home") },
] as const;

// 8 Curated Palette Stories (India Iconic & Atmospheric Collections)
const paletteStories = [
  {
    title: "Varanasi Morning",
    subtitle: "Ghats, Temple Stone & Dawn Light",
    description: "An evocative morning palette mirroring earthen terracotta steps, weathered lime wash, and the first golden warmth rising over tranquil water.",
    imageUrl: "/storage/extracted/birlaopus_ideas/Experience_Store_Paint_Studio_Birla_Opus.jpg",
    palette: ["#D98550", "#BE9345", "#E9E0CB", "#5B7FA4"],
    leadShade: "Clay Sun",
    leadCode: "C05-01",
  },
  {
    title: "Terracotta Earth",
    subtitle: "Warm Clay & Sun-baked Substrates",
    description: "Rich mineral depth rooted in baked clay tiles and artisanal earthenware, bringing grounded tactile warmth to dining and family gathering spaces.",
    imageUrl: "/storage/extracted/birlaopus_ideas/Birla_Opus.jpg",
    palette: ["#B96646", "#AD7B57", "#D98550", "#E6B650"],
    leadShade: "Terracotta",
    leadCode: "C06-01",
  },
  {
    title: "Quiet Moss Sanctuary",
    subtitle: "Forest Shade & Restorative Serenity",
    description: "Subtle forest tones and soft chlorophyll hues that visually soften harsh exterior light and invite stillness into bedrooms and private study corners.",
    imageUrl: "/storage/extracted/birlaopus_ideas/Colour_Swatches_Paint_Project_Birla_Opus_.jpg",
    palette: ["#55725E", "#304B3E", "#AAB06B", "#D9D1BD"],
    leadShade: "Moss Path",
    leadCode: "C19-01",
  },
  {
    title: "Afternoon Chai",
    subtitle: "Spice Warmth & Living Room Comfort",
    description: "Comforting aromatic tones reminiscent of cardamom tea, roasted spices, and hand-finished timber, creating spaces that feel naturally welcoming.",
    imageUrl: "/storage/extracted/birlaopus_ideas/Dopamine_Home_Decor_Ideas_Birla_Opus.jpg",
    palette: ["#AD7B57", "#775744", "#D8CCB7", "#D4AA54"],
    leadShade: "Chai Spice",
    leadCode: "C28-01",
  },
  {
    title: "Monsoon Mist",
    subtitle: "Rain Washed Air & Soft Indigo",
    description: "Cool, atmospheric blues and mineral greys that capture the quiet calm following a summer downpour, visually expanding compact rooms.",
    imageUrl: "/storage/extracted/birlaopus_ideas/Home_Paint_Interior_Wall_Paint_Birla_Opus_.jpg",
    palette: ["#7889A9", "#A5C1D6", "#3E5E83", "#F1EEE6"],
    leadShade: "Rain Blue",
    leadCode: "C14-01",
  },
  {
    title: "Awadh Heritage",
    subtitle: "Courtyard Ochre & Sandstone",
    description: "Timeless architectural yellows and deep stone shades inspired by historic monuments and palatial courtyards of Uttar Pradesh.",
    imageUrl: "/storage/extracted/birlaopus_ideas/Franchise_Store_Paint_Gallery_Birla_Opus.jpg",
    palette: ["#BE9345", "#D9A742", "#C6A78D", "#9E9C96"],
    leadShade: "Ochre Field",
    leadCode: "C42-01",
  },
  {
    title: "Subtle Linen Minimal",
    subtitle: "Undyed Fibres & Clean Shadows",
    description: "An understated neutral base designed to reflect light without glare, allowing artwork, textured timber, and woven upholstery to take centre stage.",
    imageUrl: "/storage/extracted/birlaopus_ideas/Tropical_Flair_Wallpaper_Interior_Texture_Birla_Opus.jpg",
    palette: ["#F1EEE6", "#E6E2D8", "#C9C7C2", "#7A766D"],
    leadShade: "Cloud White",
    leadCode: "C33-01",
  },
  {
    title: "Royal Plum & Silk",
    subtitle: "Dusk Pigments & Sculptural Depth",
    description: "A commanding accent palette combining dusky mauve, plum velvet, and warm gold highlights for dramatic powder rooms and focal feature walls.",
    imageUrl: "/storage/extracted/birlaopus_ideas/All_About_Paints_Birla_Opus.jpg",
    palette: ["#876182", "#95475F", "#B19CBC", "#D4AA54"],
    leadShade: "Plum Light",
    leadCode: "C10-01",
  },
];

// Product Universes (8 official Birla Opus categories for Section 05)
const productUniverses = [
  { name: "Interiors", query: "Interior Paints", count: 34, desc: "Washable luxury finishes" },
  { name: "Exteriors", query: "Exterior Paints", count: 30, desc: "All-weather sun & rain shields" },
  { name: "Waterproofing", query: "Waterproofing", count: 12, desc: "Seepage & moisture barriers" },
  { name: "Wood Finishes", query: "Wood Finishes", count: 14, desc: "Protective satin & PU timber coats" },
  { name: "Wallpapers", query: "Wallpapers", count: 14, desc: "Designer wall coverings" },
  { name: "Enamels", query: "Enamels", count: 10, desc: "High-gloss metal & trims" },
  { name: "Tools", query: "Tools", count: 9, desc: "Rollers, brushes & tapes" },
  { name: "Aerosols", query: "Aerosols", count: 1, desc: "Precision touch-up sprays" },
];

const faqs = [
  [
    "How do I choose the right paint colour for my room?",
    "Start by observing the natural light your space receives throughout the day. North-facing rooms often benefit from warm undertones, while bright south-facing spaces pair well with cool, balanced neutrals. You can visit Jaymurti Traders in Baskhari to view physical shade cards and compare sheens.",
  ],
  [
    "Can I enquire or place an order via WhatsApp?",
    "Yes. You can add colours, products, textures, and estimate calculations directly to your enquiry cart on this website and click 'Send Enquiry on WhatsApp' to connect directly with our desk at +91 8756659035.",
  ],
  [
    "How accurate is the online paint estimator?",
    "The estimator provides an engineering-grade material starting point based on standard coverage metrics. Actual coverage may vary based on wall porosity, substrate condition, and application tools. We recommend confirming final quantities at our showroom before mixing.",
  ],
  [
    "Do digital screen colours match the physical paint exactly?",
    "Digital screens display colours with backlighting (RGB), which varies across phone and monitor displays. For critical decisions, we strongly advise verifying physical Birla Opus fan decks and swatch cards in our showroom before tinting.",
  ],
  [
    "Where is Jaymurti Traders located and what are your showroom hours?",
    "We are located at Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh (PIN 224129). Our showroom is open daily from 8:00 AM to 9:00 PM.",
  ],
  [
    "What products are available at the showroom?",
    "We supply the complete Birla Opus range including One, Calista, and Style interior emulsions, all-weather exterior shields, waterproofing systems, enamels, and application supplies.",
  ],
];

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(businessProfile.address)}`;
const googleBusinessProfileUrl = "https://share.google/Nyju9PoRuINGGoD83";

const scrollSections = [
  { id: "top", label: "Hero" },
  { id: "inside-jaymurti", label: "Showroom" },
  { id: "step-inside", label: "Video" },
  { id: "discovery", label: "Explore" },
  { id: "colours", label: "Colours" },
  { id: "stories", label: "Stories" },
  { id: "colour-capsule", label: "Capsule" },
  { id: "room-shade-studio", label: "Room Studio" },
  { id: "room-library", label: "Room Library" },
  { id: "products", label: "Products" },
  { id: "textures", label: "Textures" },
  { id: "budget", label: "Estimator" },
  { id: "services", label: "Services" },
  { id: "leadership", label: "Leadership" },
  { id: "enquiry", label: "Enquire" },
  { id: "why-jaymurti", label: "Why Us" },
  { id: "finder", label: "Visit" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
  { id: "final-cta", label: "Contact" },
  { id: "footer", label: "Footer" },
] as const;

const primaryNavigationSections = [
  { id: "colours", label: "Colours" },
  { id: "room-shade-studio", label: "Room Studio" },
  { id: "products", label: "Products" },
  { id: "textures", label: "Textures" },
  { id: "budget", label: "Estimator" },
  { id: "finder", label: "Showroom" },
] as const;

type ScrollSectionId = (typeof scrollSections)[number]["id"];

export default function Home() {
  const [campaign, setCampaign] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [filter, setFilter] = useState(getInitialProductFilter);
  const [productPage, setProductPage] = useState(1);
  const [productSort, setProductSort] = useState<"featured" | "az">("featured");
  const [colourFamily, setColourFamily] = useState<string>(colourFamilies[0].name);
  const [colourCollection, setColourCollection] = useState<string>(colourCollections[0].name);
  const [textureGroup, setTextureGroup] = useState<string>(textureGroups[0].name);
  const [ideaQuery, setIdeaQuery] = useState("");
  const [ideaLimit, setIdeaLimit] = useState(12);

  // Estimator States
  const [estimatorMode, setEstimatorMode] = useState<"carpet" | "bhk">("carpet");
  const [selectedBhk, setSelectedBhk] = useState<"1bhk" | "2bhk" | "3bhk">("2bhk");
  const [isFreshPlaster, setIsFreshPlaster] = useState(false);
  const [space, setSpace] = useState("apartment");
  const [finish, setFinish] = useState("interior");
  const [area, setArea] = useState("850");
  const [budgetPin, setBudgetPin] = useState("224129");
  const [estimate, setEstimate] = useState("");

  // Store lookup
  const [storePin, setStorePin] = useState("224129");
  const [storeLookup, setStoreLookup] = useState<{ status: "featured" | "found" | "invalid" | "none"; store: (typeof storeDirectory)[number] | null }>({
    status: "featured",
    store: storeDirectory[0],
  });

  // Services consultation form
  const [form, setForm] = useState({ name: "", phone: "", email: "", serviceType: "Colour consultation", pincode: "224129" });
  const [formValidationMessage, setFormValidationMessage] = useState("");

  // Reviews
  const [reviewForm, setReviewForm] = useState({ displayName: "", rating: 0, reviewText: "" });
  const [reviewFormMessage, setReviewFormMessage] = useState("");

  // Visual & media state
  const [loadedProductImages, setLoadedProductImages] = useState<Record<string, boolean>>({});
  const [selectedSwatchCode, setSelectedSwatchCode] = useState(swatches[0][1]);
  const [selectedShadeIndex, setSelectedShadeIndex] = useState(0);
  const [shadeSearchQuery, setShadeSearchQuery] = useState("");
  const [selectedShadeFamily, setSelectedShadeFamily] = useState<ColourFamily | "All">("All");
  const [shadePage, setShadePage] = useState(1);
  const [selectedModalShade, setSelectedModalShade] = useState<BirlaOpusShade | null>(null);
  const [activeScrollSection, setActiveScrollSection] = useState<ScrollSectionId>("top");
  const [roomShadeIndex, setRoomShadeIndex] = useState(0);
  const [colourContextFrameIndex, setColourContextFrameIndex] = useState(0);
  const [collectionStoryFrameIndex, setCollectionStoryFrameIndex] = useState(0);
  const [isTickerHovered, setIsTickerHovered] = useState(false);

  // Comparison & quick view
  const [comparisonSlugs, setComparisonSlugs] = useState<string[]>([]);
  const [comparisonLimitMessage, setComparisonLimitMessage] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<CatalogueProduct | null>(null);
  const [selectedTextureDetail, setSelectedTextureDetail] = useState<(typeof textureLibrary)[number] | null>(null);

  // Unified Enquiry Cart Drawer
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCustomer, setCartCustomer] = useState({ name: "", phone: "", areaLocation: "", pincode: "224129" });
  const [cartCustomerError, setCartCustomerError] = useState("");
  const [addedShadeCode, setAddedShadeCode] = useState<string | null>(null);

  const comparisonSlugsRef = useRef<string[]>([]);
  const supplementaryRailRef = useRef<HTMLDivElement>(null);
  const imageLoadQueue = useRef<Set<string>>(new Set());
  const imageLoadFrame = useRef<number | null>(null);

  const enquiry = trpc.enquiries.create.useMutation({
    onSuccess: () => {
      setForm({ name: "", phone: "", email: "", serviceType: "Colour consultation", pincode: "224129" });
      setFormValidationMessage("");
    },
  });

  const reviewUtils = trpc.useUtils();
  const publishedReviewsQuery = trpc.shopReviews.listPublished.useQuery();
  const reviewSubmission = trpc.shopReviews.create.useMutation({
    onSuccess: (result) => {
      setReviewForm({ displayName: "", rating: 0, reviewText: "" });
      setReviewFormMessage(
        result.published
          ? "Thank you. Your review is now visible in the shop reviews."
          : "Thank you. Your feedback has been submitted successfully."
      );
      if (result.published) void reviewUtils.shopReviews.listPublished.invalidate();
    },
    onError: (error) => setReviewFormMessage(error.message),
  });

  const activeShade = colourTickerShades[selectedShadeIndex] ?? colourTickerShades[0];

  useEffect(() => {
    document.title = "Jaymurti Traders | Birla Opus Paints in Baskhari, Ambedkar Nagar";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Jaymurti Traders is a Birla Opus paint dealer and paint & colour showroom in Baskhari, Shukul Bazar, Ambedkar Nagar — offering interior and exterior paints, waterproofing, colour consultation, and painting supplies."
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", "https://jaymurtitraders.com/");
    }
  }, []);

  useEffect(() => {
    if (heroPaused) return;
    const interval = window.setInterval(() => setCampaign((current) => (current + 1) % campaigns.length), 6000);
    return () => window.clearInterval(interval);
  }, [heroPaused]);

  useEffect(() => {
    if (heroPaused || isTickerHovered) return;
    const interval = window.setInterval(() => {
      setSelectedShadeIndex((current) => (current + 1) % colourTickerShades.length);
    }, 3200);
    return () => window.clearInterval(interval);
  }, [heroPaused, isTickerHovered]);

  useEffect(() => {
    const interval = window.setInterval(() => setRoomShadeIndex((current) => (current + 1) % roomShadeCatalogue.length), 5000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setColourContextFrameIndex((current) => (current + 1) % colourContextFrames.length), 7000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setCollectionStoryFrameIndex((current) => (current + 1) % collectionStoryFrames.length), 8000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTextureGroup((current) => {
        const currentIndex = textureGroups.findIndex((group) => group.name === current);
        return textureGroups[(currentIndex + 1) % textureGroups.length].name;
      });
    }, 10_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => () => {
    if (imageLoadFrame.current !== null) window.cancelAnimationFrame(imageLoadFrame.current);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedModalShade) {
          setSelectedModalShade(null);
        } else if (isCartOpen) {
          setIsCartOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedModalShade, isCartOpen]);

  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      reveals.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.01, rootMargin: "0px 0px 80px 0px" }
    );
    reveals.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const chapters = scrollSections
      .map(({ id }) => document.getElementById(id))
      .filter((chapter): chapter is HTMLElement => Boolean(chapter));
    if (!("IntersectionObserver" in window)) return;
    const updateActiveScrollSection = () => {
      const marker = 94;
      const currentChapter = chapters.reduce<HTMLElement>(
        (current, chapter) => (chapter.getBoundingClientRect().top <= marker ? chapter : current),
        chapters[0]
      );
      setActiveScrollSection((current) => (current === currentChapter.id ? current : (currentChapter.id as ScrollSectionId)));
      setIsScrolled(window.scrollY > 40);
    };
    const observer = new IntersectionObserver(updateActiveScrollSection, {
      rootMargin: "-20% 0px -50% 0px",
      threshold: [0.1, 0.3],
    });
    chapters.forEach((chapter) => observer.observe(chapter));
    updateActiveScrollSection();
    window.addEventListener("scroll", updateActiveScrollSection, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveScrollSection);
    };
  }, []);

  useEffect(() => {
    const scrollToHashTarget = () => {
      const sectionId = window.location.hash.replace("#", "");
      if (!sectionId) return;
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ block: "start" });
      }, 0);
    };
    scrollToHashTarget();
    window.addEventListener("hashchange", scrollToHashTarget);
    return () => window.removeEventListener("hashchange", scrollToHashTarget);
  }, []);

  const activeCampaign = campaigns[campaign];

  // Catalogue Filtering & Pagination
  const filteredProducts = useMemo(
    () => (filter === "All products" ? birlaOpusProducts : birlaOpusProducts.filter((product) => product.category === filter)),
    [filter]
  );
  const sortedProducts = useMemo(
    () => (productSort === "az" ? [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name)) : filteredProducts),
    [filteredProducts, productSort]
  );
  const productPagination = useMemo(() => paginateProducts(sortedProducts, productPage), [sortedProducts, productPage]);
  const visibleProducts = productPagination.items;

  // Colour System Filtering
  const activeColourFamily = colourFamilies.find((f) => f.name === colourFamily) ?? colourFamilies[0];
  const activeColourCollection = colourCollections.find((c) => c.name === colourCollection) ?? colourCollections[0];
  const activeTextureGroup = textureGroups.find((g) => g.name === textureGroup) ?? textureGroups[0];
  const activeTextureEntries = textureLibrary.filter((entry) => entry.group === activeTextureGroup.name);
  const activeRoomShade = roomShadeCatalogue[roomShadeIndex];
  const activeColourContextFrame = colourContextFrames[colourContextFrameIndex];
  const activeCollectionStoryFrame = collectionStoryFrames[collectionStoryFrameIndex];

  // Verified Birla Opus Shades Explorer Filtering (Exactly 159 Canonical Shades)
  const filteredVerifiedShadesList = useMemo(() => {
    return filterVerifiedShades(VERIFIED_BIRLA_OPUS_SHADES, {
      searchQuery: shadeSearchQuery,
      family: selectedShadeFamily,
    });
  }, [shadeSearchQuery, selectedShadeFamily]);

  const SHADES_PER_PAGE = 24;
  const totalVerifiedShadePages = Math.max(1, Math.ceil(filteredVerifiedShadesList.length / SHADES_PER_PAGE));
  const currentVerifiedShadePage = Math.min(shadePage, totalVerifiedShadePages);

  const pagedVerifiedShades = useMemo(() => {
    const start = (currentVerifiedShadePage - 1) * SHADES_PER_PAGE;
    return filteredVerifiedShadesList.slice(start, start + SHADES_PER_PAGE);
  }, [filteredVerifiedShadesList, currentVerifiedShadePage]);

  const visibleFamiliesOnCurrentPage = useMemo(() => {
    const set = new Set<string>();
    pagedVerifiedShades.forEach((shade) => set.add(shade.family));
    return set;
  }, [pagedVerifiedShades]);

  const matchingIdeas = useMemo(() => {
    const normalizedQuery = ideaQuery.trim().toLocaleLowerCase();
    return normalizedQuery ? ideaArchive.filter((idea) => idea.name.toLocaleLowerCase().includes(normalizedQuery)) : ideaArchive;
  }, [ideaQuery]);
  const visibleIdeas = useMemo(() => matchingIdeas.slice(0, ideaLimit), [ideaLimit, matchingIdeas]);

  const comparisonProducts = useMemo(
    () =>
      comparisonSlugs
        .map((slug) => birlaOpusProducts.find((product) => product.slug === slug))
        .filter((product): product is CatalogueProduct => Boolean(product)),
    [comparisonSlugs]
  );

  // Estimator Calculations
  const calculatedBhkResults = useMemo(() => {
    const config = PRESET_HOME_CONFIGS[selectedBhk];
    return calculatePaintRequirements(config.rooms, isFreshPlaster);
  }, [selectedBhk, isFreshPlaster]);

  const calculatedCarpetResults = useMemo(() => {
    const carpetArea = Number(area) || 0;
    const room: (typeof PRESET_HOME_CONFIGS)["1bhk"]["rooms"][0] = {
      id: "carpet-room",
      name: "Total Area",
      lengthFeet: Math.sqrt(carpetArea),
      widthFeet: Math.sqrt(carpetArea),
      heightFeet: 10,
      doorsCount: Math.max(1, Math.round(carpetArea / 250)),
      windowsCount: Math.max(1, Math.round(carpetArea / 200)),
      includeCeiling: true,
    };
    return calculatePaintRequirements([room], isFreshPlaster);
  }, [area, isFreshPlaster]);

  const activeEstimatorResult = estimatorMode === "bhk" ? calculatedBhkResults : calculatedCarpetResults;

  function calculateBudget() {
    const calculated = calculatePaintEstimate(space as SpaceType, finish as SurfaceType, Number(area), budgetPin);
    if (!calculated) {
      setEstimate("Enter a valid area and 6-digit pincode");
      return;
    }
    setEstimate(`₹${calculated.low.toLocaleString("en-IN")} – ₹${calculated.high.toLocaleString("en-IN")}`);
  }

  function findStore() {
    if (!/^\d{6}$/.test(storePin)) {
      setStoreLookup({ status: "invalid", store: null });
      return;
    }
    const store = findStoreByPincode(storePin);
    setStoreLookup(store ? { status: "found", store } : { status: "none", store: null });
  }

  function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.serviceType.trim() || !form.pincode.trim()) {
      setFormValidationMessage("Please complete each field so we can arrange your consultation.");
      return;
    }
    if (!/^[0-9+()\-\s]{7,30}$/.test(form.phone) || !/^\S+@\S+\.\S+$/.test(form.email) || !/^\d{6}$/.test(form.pincode)) {
      setFormValidationMessage("Please check your phone number, email address, and 6-digit pincode.");
      return;
    }
    setFormValidationMessage("");
    enquiry.mutate(form);
  }

  function submitShopReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (reviewForm.displayName.trim().length < 2 || reviewForm.rating < 1 || reviewForm.reviewText.trim().length < 20) {
      setReviewFormMessage("Add your name, choose 1–5 stars, and share at least 20 characters of feedback.");
      return;
    }
    setReviewFormMessage("");
    reviewSubmission.mutate({
      displayName: reviewForm.displayName.trim(),
      rating: reviewForm.rating,
      reviewText: reviewForm.reviewText.trim(),
    });
  }

  const handleProductTilt = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const vertical = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--tilt-x", `${vertical * -2.6}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${horizontal * 3.2}deg`);
  }, []);

  const resetProductTilt = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  }, []);

  const markProductImageLoaded = useCallback((slug: string) => {
    imageLoadQueue.current.add(slug);
    if (imageLoadFrame.current !== null) return;
    imageLoadFrame.current = window.requestAnimationFrame(() => {
      const completedSlugs = Array.from(imageLoadQueue.current);
      imageLoadQueue.current.clear();
      imageLoadFrame.current = null;
      setLoadedProductImages((current) => {
        const next = { ...current };
        completedSlugs.forEach((completedSlug) => {
          next[completedSlug] = true;
        });
        return next;
      });
    });
  }, []);

  const toggleProductComparison = useCallback((slug: string) => {
    const current = comparisonSlugsRef.current;
    const next = toggleComparisonProduct(current, slug);
    if (next === current) {
      setComparisonLimitMessage(`Choose up to ${maxComparisonProducts} products to compare.`);
      return;
    }
    comparisonSlugsRef.current = next;
    setComparisonSlugs(next);
    setComparisonLimitMessage("");
  }, []);

  const clearProductComparison = useCallback(() => {
    comparisonSlugsRef.current = [];
    setComparisonSlugs([]);
    setComparisonLimitMessage("");
  }, []);

  const scrollSupplementaryRail = useCallback((direction: -1 | 1) => {
    const rail = supplementaryRailRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth, behavior: "smooth" });
  }, []);

  // Cart operations
  const addToCart = useCallback((item: CartItem, openDrawer = true) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: (i.quantity ?? 1) + 1 } : i));
      }
      return [...prev, item];
    });
    if (openDrawer) {
      setIsCartOpen(true);
    }
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateCartQuantity = useCallback((id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = Math.max(1, (item.quantity ?? 1) + delta);
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => (item.quantity ?? 1) > 0)
    );
  }, []);

  // WhatsApp Message Formatter for Unified Enquiry Cart
  const generateWhatsAppCartUrl = useCallback(() => {
    const cleanName = cartCustomer.name.trim();
    const cleanPhone = cartCustomer.phone.trim();
    const cleanLocation = cartCustomer.areaLocation.trim();
    const cleanPincode = cartCustomer.pincode.trim();

    const divider = `━━━━━━━━━━━━━━━━━━`;
    const sections: string[] = [];

    // Header
    sections.push(`*NEW ENQUIRY — JAYMURTI TRADERS*\n*जयमूर्ति ट्रेडर्स*`);

    // Customer Details - Strictly from live validated customer form state
    const customerLines: string[] = [
      `*CUSTOMER DETAILS*`,
      ``,
      `👤 *Name:* ${cleanName}`,
      `📞 *Phone:* ${cleanPhone}`,
      `📍 *Area / Locality:* ${cleanLocation}`,
      `📮 *Pincode:* ${cleanPincode}`,
    ];
    sections.push(customerLines.join("\n"));

    // Filter items: Non-estimate items go under ENQUIRY ITEMS
    const enquiryItems = cartItems.filter((i) => i.type !== "estimate");
    const estimateItems = cartItems.filter((i) => i.type === "estimate");

    if (enquiryItems.length > 0) {
      const itemsFormatted: string[] = [`*ENQUIRY ITEMS*`];

      enquiryItems.forEach((item, idx) => {
        const itemNum = idx + 1;
        if (item.type === "product") {
          const parts = item.meta.split("·").map((p) => p.trim());
          const category = parts[0] || "";
          const family = parts[1] || "";
          const lines: string[] = [
            `*${itemNum}. PRODUCT*`,
            `*Product:* ${item.title}`,
          ];
          if (category) lines.push(`*Category:* ${category}`);
          if (family) lines.push(`*Family:* ${family}`);
          lines.push(`*Quantity:* ${item.quantity ?? 1}`);
          itemsFormatted.push(lines.join("\n"));
        } else if (item.type === "shade") {
          // Parse "Code: WW 0146 · Family: Whites"
          const codeMatch = item.meta.match(/Code:\s*([^·]+)/i);
          const familyMatch = item.meta.match(/Family:\s*(.+)/i);
          const shadeCode = codeMatch ? codeMatch[1].trim() : "";
          const shadeFamily = familyMatch ? familyMatch[1].trim() : "";
          const lines: string[] = [
            `*${itemNum}. SHADE*`,
            `*Shade:* ${item.title}`,
          ];
          if (shadeCode) lines.push(`*Code:* ${shadeCode}`);
          if (shadeFamily) lines.push(`*Family:* ${shadeFamily}`);
          itemsFormatted.push(lines.join("\n"));
        } else if (item.type === "texture") {
          const lines: string[] = [
            `*${itemNum}. FINISH / TEXTURE*`,
            `*Finish:* ${item.title}`,
          ];
          if (item.meta) lines.push(`*Series:* ${item.meta}`);
          itemsFormatted.push(lines.join("\n"));
        } else {
          itemsFormatted.push(
            `*${itemNum}. ITEM*\n*Name:* ${item.title}\n*Details:* ${item.meta}`
          );
        }
      });

      sections.push(itemsFormatted.join("\n\n"));
    }

    // Paint Estimate section (only when estimates exist)
    if (estimateItems.length > 0) {
      const estimateFormatted: string[] = [`*PAINT ESTIMATE*`];

      estimateItems.forEach((est) => {
        // title: "Paint Estimate: 2 BHK (~850 sq ft)" or "Paint Estimate: 1200 sq ft"
        // meta: "Paint: ~42L · Primer: ~21L · Putty: ~42kg"
        // notes: "Estimated material range: ₹18,500 – ₹34,200"
        const cleanTitle = est.title.replace(/^Paint Estimate:\s*/i, "").trim();
        const paintMatch = est.meta.match(/Paint:\s*([^·]+)/i);
        const primerMatch = est.meta.match(/Primer:\s*([^·]+)/i);
        const puttyMatch = est.meta.match(/Putty:\s*([^·]+)/i);
        const priceMatch = (est.notes || "").match(/Estimated material range:\s*(.+)/i);

        const estLines: string[] = [];
        estLines.push(`*Project / Estimate:* ${cleanTitle || est.title}`);
        if (paintMatch) estLines.push(`*Paint:* ${paintMatch[1].trim()}`);
        if (primerMatch) estLines.push(`*Primer:* ${primerMatch[1].trim()}`);
        if (puttyMatch) estLines.push(`*Putty:* ${puttyMatch[1].trim()}`);
        if (priceMatch) {
          estLines.push(`*Estimated Material Range:* ${priceMatch[1].trim()}`);
        } else if (est.notes) {
          estLines.push(`*Notes:* ${est.notes}`);
        }
        estimateFormatted.push(estLines.join("\n"));
      });

      sections.push(estimateFormatted.join("\n\n"));
    }

    // Customer Request
    const requestLines: string[] = [
      `*CUSTOMER REQUEST*`,
      ``,
      `Please confirm:`,
      `• Product availability`,
      `• Shade availability`,
      `• Required quantities`,
      `• Suitable finish/options`,
      `• Pickup / delivery availability`,
      `• Any additional information required`,
    ];
    sections.push(requestLines.join("\n"));

    // Source Label
    sections.push(`*Source:* Jaymurti Traders Website Enquiry`);

    const fullText = sections.join(`\n\n${divider}\n\n`);
    return `https://wa.me/918756659035?text=${encodeURIComponent(fullText)}`;
  }, [cartItems, cartCustomer]);

  const handleSendWhatsAppEnquiry = useCallback((e: React.MouseEvent) => {
    if (cartItems.length === 0) {
      e.preventDefault();
      setCartCustomerError("Your enquiry cart is empty. Please add products or shades first.");
      return;
    }
    if (!cartCustomer.name.trim()) {
      e.preventDefault();
      setCartCustomerError("Please enter your name.");
      return;
    }
    if (!/^[0-9+()\-\s]{7,20}$/.test(cartCustomer.phone.trim())) {
      e.preventDefault();
      setCartCustomerError("Please enter a valid phone number (at least 7–10 digits).");
      return;
    }
    if (!/^\d{6}$/.test(cartCustomer.pincode.trim())) {
      e.preventDefault();
      setCartCustomerError("Please enter a valid 6-digit delivery/project pincode.");
      return;
    }
    if (!cartCustomer.areaLocation.trim()) {
      e.preventDefault();
      setCartCustomerError("Please enter your area or locality.");
      return;
    }
    setCartCustomerError("");
  }, [cartItems, cartCustomer]);

  return (
    <div className="site-shell">
      {/* 1. Global Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Top Utility Bar */}
      <div className="utility-bar">
        <span>
          Birla Opus Paint Dealer · <strong className="brand-name-text">JAYMURTI TRADERS (जयमूर्ति ट्रेडर्स)</strong>
        </span>
        <span>Shukul Bazar, Baskhari · Call +91 87566 59035</span>
      </div>

      {/* Global Navigation */}
      <header className={`nav ${isScrolled ? "nav--scrolled shadow-md backdrop-blur-md" : ""}`} style={{ transition: "background-color 0.28s ease, backdrop-filter 0.28s ease, box-shadow 0.28s ease" }}>
        <a className="brand group" href="#top" aria-label="Birla Opus Paint Jaymurti Traders">
          <img src="/storage/logo.png" alt="Jaymurti Traders Logo" width={36} height={36} className="brand-logo transition-transform duration-300 group-hover:scale-105" />
          <span className="brand-name-text">JAYMURTI TRADERS</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links" aria-label="Primary navigation">
          {primaryNavigationSections.map((item) => (
            <a
              href={`#${item.id}`}
              className={activeScrollSection === item.id ? "active" : ""}
              aria-current={activeScrollSection === item.id ? "page" : undefined}
              key={item.id}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            className="nav-enquiry-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open Enquiry Drawer with ${cartItems.length} items`}
          >
            <ShoppingBag size={14} />
            <span>Enquire</span>
            {cartItems.length > 0 && <span className="nav-enquiry-count">{cartItems.length}</span>}
          </button>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="nav-mobile-actions">
          <button
            type="button"
            className="nav-enquiry-btn mobile-cart-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open Enquiry Drawer with ${cartItems.length} items`}
          >
            <ShoppingBag size={14} />
            {cartItems.length > 0 && <span className="nav-enquiry-count">{cartItems.length}</span>}
          </button>
          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="nav-mobile-dropdown" role="dialog" aria-label="Mobile Navigation">
            <nav className="nav-mobile-links">
              {primaryNavigationSections.map((item) => (
                <a
                  href={`#${item.id}`}
                  key={item.id}
                  onClick={() => setMobileMenuOpen(false)}
                  className={activeScrollSection === item.id ? "active" : ""}
                >
                  {item.label}
                </a>
              ))}
              <div className="nav-mobile-divider" />
              <div className="nav-mobile-subheading">Visual Archives</div>
              <a href="#colour-capsule" onClick={() => setMobileMenuOpen(false)}>Colour Capsule (50)</a>
              <a href="#room-shade-studio" onClick={() => setMobileMenuOpen(false)}>Room Shade Studio</a>
              <a href="#room-library" onClick={() => setMobileMenuOpen(false)}>Room Library (102)</a>
              <a href="#wallpaper-gallery" onClick={() => setMobileMenuOpen(false)}>Wallpaper Gallery</a>
              <a href="#extended-textures" onClick={() => setMobileMenuOpen(false)}>Extended Textures</a>
              <a href="#interior-paint-world" onClick={() => setMobileMenuOpen(false)}>Paint Worlds</a>
              <a href="#inside-jaymurti" onClick={() => setMobileMenuOpen(false)}>Inside Jaymurti</a>
              <a href="#step-inside" onClick={() => setMobileMenuOpen(false)}>Step Inside Video</a>
              <a href="#leadership" onClick={() => setMobileMenuOpen(false)}>Founder & Showroom Team</a>
              <div className="nav-mobile-divider" />
              <a
                href={generateWhatsAppCartUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary"
                style={{ textAlign: "center", justifyContent: "center", minHeight: "44px" }}
              >
                <MessageCircle size={16} /> WhatsApp Showroom
              </a>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* =========================================================================
            01 — HERO
            ========================================================================= */}
        <section className="hero scroll-chapter" id="top" data-scroll-section data-section-label="Home" aria-label="Featured colour collection">
          <div className="hero-inner relative">
            <div className="hero-copy">
              <div className="slide-fade" key={`copy-${campaign}`}>
                <div className="hero-brand-lockup">
                  <img src="/storage/logo.png" alt="Jaymurti Traders Logo" width={28} height={28} className="hero-brand-logo" />
                  <span className="hero-brand-title">JAYMURTI TRADERS</span>
                  <span style={{ fontSize: "0.85rem", opacity: 0.8, marginLeft: "6px", fontFamily: "var(--sans)" }}>जयमूर्ति ट्रेडर्स</span>
                </div>
                <div className="eyebrow">{activeCampaign.eyebrow}</div>
                <h1 className="hero-headline">{activeCampaign.title}</h1>
                <p className="hero-description">{activeCampaign.text}</p>
                <div className="hero-actions">
                  <MotionMagnetic strength={10}>
                    <a href="#colours" className="button-primary">
                      Explore Colours <ArrowRight size={15} />
                    </a>
                  </MotionMagnetic>
                  <MotionMagnetic strength={8}>
                    <a href="#products" className="button-ghost">
                      Explore Products
                    </a>
                  </MotionMagnetic>
                  <MotionMagnetic strength={8}>
                    <a href="#finder" className="button-ghost">
                      Visit Showroom
                    </a>
                  </MotionMagnetic>
                </div>
              </div>
              <div className="hero-notes">
                <span>{activeCampaign.note}</span>
                <span>Scroll to explore ↓</span>
              </div>
            </div>
            <div 
              className="hero-visual relative group" 
              aria-label="Hero Showroom Gallery"
              onMouseEnter={() => setHeroPaused(true)}
              onMouseLeave={() => setHeroPaused(false)}
            >
              {/* Top-Left Floating Live Status Pill */}
              <div className="hero-floating-badge hero-floating-badge--top-left">
                <span className="hero-live-dot" />
                <span>Showroom · Baskhari</span>
              </div>

              {/* Top-Right Floating Authorized Dealer Badge */}
              <div className="hero-floating-badge hero-floating-badge--top-right">
                <ShieldCheck size={13} style={{ color: "var(--saffron)" }} />
                <span>{activeCampaign.featureBadge || "Authorized Birla Opus Partner"}</span>
              </div>

              {campaigns.map((camp, idx) => (
                <div
                  key={`hero-slide-${idx}`}
                  className="hero-slide"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    opacity: campaign === idx ? 1 : 0,
                    pointerEvents: campaign === idx ? "auto" : "none",
                    transition: "opacity 0.8s ease-in-out",
                    zIndex: campaign === idx ? 1 : 0,
                  }}
                >
                  <img
                    src={camp.imageUrl}
                    alt={camp.imageAlt}
                    className="hero-image hero-image-ambient transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading={idx === 0 ? "eager" : "lazy"}
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    decoding="async"
                    width={720}
                    height={480}
                  />
                  <div className="hero-image-shade" />
                </div>
              ))}

              {/* Bottom-Left Floating Editorial Insight Card */}
              <div className="hero-floating-caption-card" key={`hero-caption-${campaign}`}>
                <span className="hero-caption-tag">{activeCampaign.tag}</span>
                <h4 className="hero-caption-title">{activeCampaign.caption}</h4>
              </div>

              {/* Side Navigation Arrows */}
              <button
                type="button"
                onClick={() => setCampaign((prev) => (prev - 1 + campaigns.length) % campaigns.length)}
                className="hero-nav-arrow hero-nav-arrow--prev"
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 20,
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "rgba(12, 41, 47, 0.82)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.22)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease-out",
                  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.35)",
                }}
                aria-label="Previous Slide"
              >
                <ArrowLeft size={16} />
              </button>

              <button
                type="button"
                onClick={() => setCampaign((prev) => (prev + 1) % campaigns.length)}
                className="hero-nav-arrow hero-nav-arrow--next"
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 20,
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "rgba(12, 41, 47, 0.82)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.22)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease-out",
                  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.35)",
                }}
                aria-label="Next Slide"
              >
                <ArrowRight size={16} />
              </button>

              {/* Bottom Integrated Status & Dots Bar */}
              <div
                className="hero-carousel-bottom-bar"
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  zIndex: 20,
                  background: "rgba(12, 41, 47, 0.85)",
                  backdropFilter: "blur(12px)",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255, 255, 255, 0.22)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    color: "rgba(255, 255, 255, 0.85)",
                  }}
                >
                  0{campaign + 1} / 0{campaigns.length}
                </span>

                <div style={{ width: "1px", height: "12px", background: "rgba(255, 255, 255, 0.25)" }} />

                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  {campaigns.map((_, i) => (
                    <button
                      key={`hero-dot-${i}`}
                      type="button"
                      onClick={() => setCampaign(i)}
                      style={{
                        width: campaign === i ? "24px" : "8px",
                        height: "8px",
                        borderRadius: "999px",
                        background: campaign === i ? "var(--color-accent)" : "rgba(255, 255, 255, 0.45)",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                        padding: 0,
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SHOWROOM EXPERIENCE: INSIDE JAYMURTI (PHOTOGRAPHIC GALLERY)
            ========================================================================= */}
        <InsideJaymurti />

        {/* =========================================================================
            SHOWROOM EXPERIENCE: STEP INSIDE (CINEMATIC SHOWROOM VIDEO)
            ========================================================================= */}
        <StepInside />

        {/* =========================================================================
            02 — WHAT ARE YOU LOOKING FOR? (DISCOVERY INDEX)
            ========================================================================= */}
        <section className="discovery-index scroll-chapter" id="discovery" data-scroll-section data-section-label="Explore" aria-label="Discovery Index">
          <div className="discovery-index-header">
            <div>
              <div className="eyebrow" style={{ color: "var(--color-accent)" }}>Visual Discovery Index</div>
              <h2>What are you looking for?</h2>
            </div>
            <p>Direct architectural navigation to guide your colour curation, surface finishes, product formulations, and store consultation.</p>
          </div>
          <div className="discovery-grid">
            <a href="#colours" className="discovery-card">
              <div className="discovery-card-top">
                <span>01</span>
                <Palette size={18} />
              </div>
              <div>
                <h3 className="discovery-card-title">Colours</h3>
                <p className="discovery-card-desc">159 verified shades across 10 spectral families</p>
              </div>
            </a>
            <a href="#room-shade-studio" className="discovery-card">
              <div className="discovery-card-top">
                <span>02</span>
                <Compass size={18} />
              </div>
              <div>
                <h3 className="discovery-card-title">Room Studio</h3>
                <p className="discovery-card-desc">Interactive living room & bedroom try-on</p>
              </div>
            </a>
            <a href="#products" className="discovery-card">
              <div className="discovery-card-top">
                <span>03</span>
                <Layers size={18} />
              </div>
              <div>
                <h3 className="discovery-card-title">Products</h3>
                <p className="discovery-card-desc">Master formulations across 8 categories</p>
              </div>
            </a>
            <a href="#textures" className="discovery-card">
              <div className="discovery-card-top">
                <span>04</span>
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="discovery-card-title">Textures</h3>
                <p className="discovery-card-desc">Tactile reliefs, stones & designer wallpapers</p>
              </div>
            </a>
            <a href="#budget" className="discovery-card">
              <div className="discovery-card-top">
                <span>05</span>
                <SlidersHorizontal size={18} />
              </div>
              <div>
                <h3 className="discovery-card-title">Estimator</h3>
                <p className="discovery-card-desc">Transparent litres & material calculator</p>
              </div>
            </a>
            <a href="#finder" className="discovery-card">
              <div className="discovery-card-top">
                <span>06</span>
                <MapPin size={18} />
              </div>
              <div>
                <h3 className="discovery-card-title">Showroom</h3>
                <p className="discovery-card-desc">Shukul Bazar, Baskhari · UP 224129</p>
              </div>
            </a>
            <button type="button" onClick={() => setIsCartOpen(true)} className="discovery-card" style={{ textAlign: "left", cursor: "pointer", border: "1px solid var(--color-accent)" }}>
              <div className="discovery-card-top">
                <span>07</span>
                <ShoppingBag size={18} />
              </div>
              <div>
                <h3 className="discovery-card-title">Enquire</h3>
                <p className="discovery-card-desc">Direct WhatsApp desk & quotation cart</p>
              </div>
            </button>
          </div>
        </section>

        {/* =========================================================================
            03 — COLOUR FINDER
            ========================================================================= */}
        <section className="colours visual-colours-refinement reveal scroll-chapter" id="colours" data-scroll-section data-section-label="Colours" data-reveal>
          <div className="colour-archive-hero visual-archive-hero visual-archive-compact" style={{ "--active-banner-shade": activeShade.hex } as React.CSSProperties}>
            <div className="colour-archive-shade" />
            <div className="colour-archive-hero-copy">
              <div className="eyebrow">The Definitive Colour Finder</div>
              <p className="colour-archive-label">Selected · {activeShade.name} ({activeShade.code})</p>
              <h2>
                Search, Filter,
                <br />
                and Anchor Your Palette.
              </h2>
              <p>Explore 240 calibrated shades across 12 architectural tonal families. Select any tone to understand undertones and add directly to your enquiry.</p>
              <div className="colour-archive-actions">
                <button
                  type="button"
                  className="button-primary"
                  onClick={() =>
                    addToCart({
                      id: `shade-${activeShade.code}`,
                      type: "shade",
                      title: activeShade.name,
                      meta: `Shade Code: ${activeShade.code}`,
                      colourHex: activeShade.hex,
                    })
                  }
                >
                  + Add Shade to Enquiry <ArrowRight size={15} />
                </button>
                <a className="colour-archive-link" href="https://www.birlaopus.com/colour-catalogue" target="_blank" rel="noopener noreferrer">
                  Official Birla Opus shade guide <ArrowRight size={14} />
                </a>
              </div>
            </div>
            <div className="colour-archive-specimen" aria-live="polite">
              <span className="specimen-eyebrow">Active Selection</span>
              <strong className="specimen-name">{activeShade.name}</strong>
              <span className="specimen-code">{activeShade.code}</span>
            </div>
            <div
              className="colour-archive-ticker"
              aria-label="Shade ticker. Select any shade to preview."
              onPointerEnter={() => setIsTickerHovered(true)}
              onPointerLeave={() => setIsTickerHovered(false)}
            >
              <div
                className="colour-archive-ticker-track"
                style={{ "--shade-step": colourTickerShades.length + selectedShadeIndex } as React.CSSProperties}
              >
                {colourTickerLoop.map((shade, idx) => {
                  const isActive = idx % colourTickerShades.length === selectedShadeIndex;
                  return (
                    <button
                      type="button"
                      className={`colour-archive-ticker-swatch${isActive ? " active" : ""}`}
                      style={{ "--ticker-shade": shade.hex } as React.CSSProperties}
                      key={`${shade.code}-${idx}`}
                      onClick={() => setSelectedShadeIndex(idx % colourTickerShades.length)}
                      aria-label={`Display ${shade.name}, ${shade.code}`}
                    >
                      <span>{String(shade.position).padStart(3, "0")}</span>
                      <i aria-hidden="true" />
                      <strong>{shade.name}</strong>
                      <em>{shade.code}</em>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Colour Finder Search & Family Filtering */}
          <div className="colour-section-intro visual-colour-intro">
            <div>
              <div className="eyebrow" style={{ color: "var(--color-highlight)" }}>Verified Birla Opus Shade Explorer</div>
              <h3>
                Explore 159 Verified Shades
                <br />
                across 10 Colour Families.
              </h3>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div className="shade-search-field" style={{ position: "relative", minWidth: "300px" }}>
                <Search size={16} aria-hidden="true" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                <input
                  type="text"
                  value={shadeSearchQuery}
                  onChange={(e) => {
                    setShadeSearchQuery(e.target.value);
                    setShadePage(1);
                  }}
                  placeholder="Search by shade name or code..."
                  aria-label="Search verified Birla Opus shades"
                  style={{
                    width: "100%",
                    padding: "11px 36px 11px 38px",
                    background: "#ffffff",
                    border: "1px solid var(--line)",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontFamily: "var(--sans)",
                    color: "var(--text-primary)",
                    outline: "none",
                  }}
                />
                {shadeSearchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setShadeSearchQuery("");
                      setShadePage(1);
                    }}
                    aria-label="Clear search query"
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: 0,
                      cursor: "pointer",
                      padding: "4px",
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Verified Birla Opus Shade Explorer System */}
          <div className="shade-explorer-container" id="shade-explorer">
            {/* 10 Colour Family Filter Pills */}
            <div className="shade-family-pills" role="tablist" aria-label="Birla Opus colour family filter">
              <button
                type="button"
                className={`shade-family-pill${selectedShadeFamily === "All" ? " active" : ""}`}
                onClick={() => {
                  setSelectedShadeFamily("All");
                  setShadePage(1);
                }}
                role="tab"
                aria-selected={selectedShadeFamily === "All"}
              >
                <span
                  className="shade-family-swatch-dot"
                  style={{ background: "linear-gradient(135deg, #F4F3ED 0%, #D0C5B4 25%, #E8C468 50%, #42638E 75%, #B84A4A 100%)" }}
                  aria-hidden="true"
                />
                All Families (159)
              </button>
              {COLOUR_FAMILIES.map((family) => {
                const familyCount = VERIFIED_BIRLA_OPUS_SHADES.filter((s) => s.family === family).length;
                const isSelected = selectedShadeFamily === family;
                const isInView = selectedShadeFamily === "All" && visibleFamiliesOnCurrentPage.has(family);
                return (
                  <button
                    key={family}
                    type="button"
                    className={`shade-family-pill${isSelected ? " active" : ""}${isInView ? " in-view" : ""}`}
                    onClick={() => {
                      setSelectedShadeFamily(family);
                      setShadePage(1);
                    }}
                    role="tab"
                    aria-selected={isSelected}
                    title={isInView ? `${family} shades are shown on current page` : `Filter by ${family}`}
                  >
                    <span
                      className="shade-family-swatch-dot"
                      style={{ background: COLOUR_FAMILY_SWATCH_MAP[family] || "#999" }}
                      aria-hidden="true"
                    />
                    {family} ({familyCount})
                    {isInView && (
                      <span
                        style={{
                          fontSize: "9px",
                          background: "var(--color-accent)",
                          color: "#ffffff",
                          padding: "1px 5px",
                          borderRadius: "10px",
                          fontWeight: 700,
                          lineHeight: "1.2",
                          letterSpacing: "0.02em",
                        }}
                      >
                        In View
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Results Topbar Count Summary */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid var(--line)", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "11.5px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {filteredVerifiedShadesList.length} {filteredVerifiedShadesList.length === 1 ? "shade" : "shades"} available {selectedShadeFamily !== "All" && `in ${selectedShadeFamily}`}
                </span>
                {selectedShadeFamily === "All" && visibleFamiliesOnCurrentPage.size > 0 && (
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "11px",
                      color: "var(--text-secondary)",
                      background: "#ffffff",
                      border: "1px solid var(--line)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-accent)" }} />
                    Page {currentVerifiedShadePage} contains:{" "}
                    <strong style={{ color: "var(--ink)" }}>{Array.from(visibleFamiliesOnCurrentPage).join(" · ")}</strong>
                  </span>
                )}
              </div>
              {(shadeSearchQuery || selectedShadeFamily !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setShadeSearchQuery("");
                    setSelectedShadeFamily("All");
                    setShadePage(1);
                  }}
                  style={{ background: "none", border: 0, padding: 0, color: "var(--coral)", fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 700, cursor: "pointer", textTransform: "uppercase" }}
                >
                  Reset Filters
                </button>
              )}
            </div>

            {/* Shade Results Grid */}
            {filteredVerifiedShadesList.length === 0 ? (
              <div className="shade-empty-state">
                <Palette size={40} style={{ margin: "0 auto 16px", color: "var(--text-muted)", opacity: 0.5 }} />
                <h4 style={{ fontFamily: "var(--serif)", fontSize: "20px", marginBottom: "8px", color: "var(--text-primary)" }}>No matching Birla Opus shades found</h4>
                <p style={{ fontSize: "13.5px", color: "var(--text-secondary)", maxWidth: "420px", margin: "0 auto 20px" }}>
                  We couldn't find any shade matching "{shadeSearchQuery}". Try searching by code like "WW 0146" or choosing a colour family above.
                </p>
                <button
                  type="button"
                  className="button-primary"
                  onClick={() => {
                    setShadeSearchQuery("");
                    setSelectedShadeFamily("All");
                    setShadePage(1);
                  }}
                >
                  Clear Filters & Show All (159)
                </button>
              </div>
            ) : (
              <div className="shade-grid" role="region" aria-label="Birla Opus Shades">
                {pagedVerifiedShades.map((shade) => {
                  const isJustAdded = addedShadeCode === shade.code;
                  return (
                    <article
                      key={shade.id}
                      className="shade-card"
                      onClick={() => setSelectedModalShade(shade)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedModalShade(shade);
                        }
                      }}
                      aria-label={`View shade details for ${shade.name} ${shade.code}`}
                    >
                      <div className="shade-card-swatch" style={{ background: shade.digitalColor }}>
                        <span className="shade-card-code-badge">{shade.code}</span>
                      </div>
                      <div className="shade-card-content">
                        <div>
                          <div className="shade-card-family">{shade.family}</div>
                          <h4 className="shade-card-name">{shade.name}</h4>
                        </div>
                        <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
                          <button
                            type="button"
                            className={`shade-card-action${isJustAdded ? " added" : ""}`}
                            style={{ flex: 1 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(
                                {
                                  id: `shade-${shade.code.replace(/\s+/g, "-")}`,
                                  type: "shade",
                                  title: shade.name,
                                  meta: `Code: ${shade.code} · Family: ${shade.family}`,
                                  colourHex: shade.digitalColor,
                                },
                                false
                              );
                              setAddedShadeCode(shade.code);
                              setTimeout(() => setAddedShadeCode(null), 1800);
                            }}
                          >
                            {isJustAdded ? (
                              <>
                                <Check size={12} /> Added
                              </>
                            ) : (
                              "+ Add to Enquiry"
                            )}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {filteredVerifiedShadesList.length > SHADES_PER_PAGE && (
              <div className="shade-pagination-bar">
                <span className="shade-pagination-info">
                  Showing {(currentVerifiedShadePage - 1) * SHADES_PER_PAGE + 1}–
                  {Math.min(currentVerifiedShadePage * SHADES_PER_PAGE, filteredVerifiedShadesList.length)} of {filteredVerifiedShadesList.length} shades
                </span>
                <div className="shade-pagination-controls">
                  <button
                    type="button"
                    className="shade-page-btn"
                    onClick={() => {
                      setShadePage((p) => Math.max(1, p - 1));
                      document.getElementById("shade-explorer")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    disabled={currentVerifiedShadePage <= 1}
                    aria-label="Previous shades page"
                  >
                    ← Prev
                  </button>
                  <span style={{ display: "inline-flex", alignItems: "center", padding: "0 10px", fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text-secondary)" }}>
                    Page {currentVerifiedShadePage} of {totalVerifiedShadePages}
                  </span>
                  <button
                    type="button"
                    className="shade-page-btn"
                    onClick={() => {
                      setShadePage((p) => Math.min(totalVerifiedShadePages, p + 1));
                      document.getElementById("shade-explorer")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    disabled={currentVerifiedShadePage >= totalVerifiedShadePages}
                    aria-label="Next shades page"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Mandatory Fan Deck Disclaimer Banner */}
            <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--line)" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                <strong style={{ color: "var(--text-secondary)" }}>Verification Notice:</strong> {SHADE_VARIATION_DISCLAIMER}
              </p>
            </div>
          </div>

          <div className="colour-family-explorer">
            <div
              className="colour-family-focus colour-family-focus-new"
              style={{ "--family-tone": activeColourFamily.tone, "--family-text": activeColourFamily.text } as React.CSSProperties}
            >
              <span>Selected family</span>
              <strong>{activeColourFamily.name}</strong>
              <em>Explore calibrated directions curated for Indian architecture and daylight.</em>
              <a href="#enquiry">Consult at showroom desk <ArrowRight size={14} /></a>
            </div>
            <div className="colour-family-list" role="list" aria-label="Colour families">
              {colourFamilies.map((family) => (
                <button
                  className={family.name === colourFamily ? "active" : ""}
                  onClick={() => setColourFamily(family.name)}
                  key={family.name}
                  role="listitem"
                >
                  <span style={{ background: family.tone }} />
                  <strong>{family.name}</strong>
                  <em>{family.name === colourFamily ? "Selected" : "Select family"}</em>
                </button>
              ))}
            </div>
            <figure
              className="colour-reference-card colour-reference-room room-shade-catalogue"
              style={{ "--room-shade": activeRoomShade.colour } as React.CSSProperties}
            >
              <img
                key={activeRoomShade.code}
                src={colourRoomAsset.imageUrl}
                alt="The same room visualised in different colour directions"
                width={600}
                height={400}
                loading="lazy"
                decoding="async"
              />
              <div className="room-shade-catalogue-wash" aria-hidden="true" />
              <figcaption>
                <span>Same room · new mood · changes every 5 seconds</span>
                <strong>{activeRoomShade.name} · {activeRoomShade.code}</strong>
              </figcaption>
            </figure>
          </div>

          {/* Selected Shade Detail Stage & Fan Deck Disclaimer */}
          <div className="colour-finder-stage">
            <div className="colour-finder-preview">
              <div className="colour-finder-swatch-large" style={{ background: activeShade.hex }}>
                <span>{activeShade.code}</span>
              </div>
              <div className="colour-finder-info">
                <span className="eyebrow" style={{ color: "var(--color-highlight)", marginBottom: "4px" }}>Selected Specimen</span>
                <h3>{activeShade.name}</h3>
                <p>Curated architectural shade formulation. Calibrated for interior emulsions, washable sheens, and exterior architectural surfaces.</p>
                <div className="colour-finder-actions">
                  <button
                    type="button"
                    className="button-primary"
                    onClick={() =>
                      addToCart({
                        id: `shade-${activeShade.code}`,
                        type: "shade",
                        title: activeShade.name,
                        meta: `Code: ${activeShade.code} · Hex: ${activeShade.hex}`,
                        colourHex: activeShade.hex,
                      })
                    }
                  >
                    + Add to Enquiry
                  </button>
                  <a
                    className="button-ghost"
                    href={`https://wa.me/918756659035?text=${encodeURIComponent(
                      `Hello Jaymurti Traders, I am interested in Birla Opus shade: ${activeShade.name} (${activeShade.code}). Please confirm availability and recommended finish.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={15} style={{ marginRight: "6px" }} />
                    WhatsApp This Shade
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div style={{ background: "rgba(0,0,0,0.03)", padding: "16px", borderRadius: "6px", border: "1px solid var(--line)" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                  Shade Verification Protocol
                </span>
                <p style={{ fontSize: "12.5px", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
                  1. Note the shade code ({activeShade.code})<br />
                  2. Verify the physical swatch under natural room lighting<br />
                  3. Select appropriate sheen level (Matt, Silk, High-Sheen) at our showroom counter
                </p>
              </div>
              <p className="colour-disclaimer-note">
                <strong>Physical Fan-Deck Disclaimer:</strong> On-screen colour representations may vary significantly based on display calibration, ambient room lighting, and device panel technology. Please refer to physical Birla Opus fandecks and sample pots at Jaymurti Traders before finalizing tinting formulation.
              </p>
            </div>
          </div>

          <div className="colour-swatch-studio visual-swatch-studio">
            <div className="colour-swatch-heading">
              <div>
                <div className="eyebrow">Signature Tone Directions</div>
                <h3>
                  Sample curated
                  <br />
                  shades in living light.
                </h3>
              </div>
              <p>These signature architectural directions anchor the ambiance of your space. Compare depth and undertones in room daylight before finalizing formulation.</p>
            </div>
            <BorderGlow className="colour-gallery-glow" animated>
              <CircularGallery items={circularColourItems} activeCode={selectedSwatchCode} onSelect={setSelectedSwatchCode} />
            </BorderGlow>
          </div>
        </section>

        {/* =========================================================================
            04 — COLOUR STORIES
            ========================================================================= */}
        <section className="scroll-chapter" id="stories" data-scroll-section data-section-label="Stories" style={{ background: "var(--surface-paper)", padding: "80px var(--shell-gutter)" }}>
          <div style={{ maxWidth: "var(--shell-max)", margin: "0 auto" }}>
            <div className="section-header">
              <div>
                <div className="eyebrow">India Iconic Series · Mood & Palette Discovery</div>
                <h2 className="section-title">
                  Colour Stories Rooted in
                  <br />
                  <em>Atmosphere & Heritage.</em>
                </h2>
                <p className="section-lead">
                  Move beyond solitary shades into evocative room moods. Discover 8 architectural palette stories that harmonize light, earthen tones, and living textures.
                </p>
              </div>
            </div>

            <MotionCursorLight tint="butter" radius={260}>
              <div className="colour-stories-grid">
                {paletteStories.map((story) => (
                  <article className="colour-story-card" key={story.title}>
                    <div className="colour-story-image">
                      <img 
                        src={story.imageUrl} 
                        alt={`${story.title} mood inspiration`} 
                        loading="lazy" 
                        decoding="async" 
                        width={400}
                        height={250}
                      />
                    </div>
                  <div className="colour-story-content">
                    <span className="colour-story-eyebrow">{story.subtitle}</span>
                    <h3 className="colour-story-title">{story.title}</h3>
                    <p className="colour-story-text">{story.description}</p>
                    <div className="colour-story-palette" title="Curated palette swatches">
                      {story.palette.map((hex, sIdx) => (
                        <span key={sIdx} className="colour-story-swatch" style={{ background: hex }} />
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)" }}>
                        Lead: {story.leadShade}
                      </span>
                      <button
                        type="button"
                        style={{ background: "none", border: 0, padding: 0, color: "var(--color-highlight)", fontWeight: 700, fontSize: "12px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
                        onClick={() =>
                          addToCart({
                            id: `story-${story.title.toLowerCase().replace(/\s+/g, "-")}`,
                            type: "shade",
                            title: `${story.title} Palette`,
                            meta: `Lead: ${story.leadShade} (${story.leadCode})`,
                          })
                        }
                      >
                        + Add Palette <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </MotionCursorLight>
        </div>
      </section>

        {/* =========================================================================
            PART 2 EXPERIENCE 01: THE COLOUR CAPSULE (50 SCANNED PAGES)
            ========================================================================= */}
        <ColourCapsule
          onSelectShadeTone={(hex) => {
            const el = document.getElementById("colours");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          onEnquire={(title, details) => {
            addToCart({
              id: `capsule-${Date.now()}`,
              type: "shade",
              title,
              meta: details,
            });
            setIsCartOpen(true);
          }}
        />

        {/* =========================================================================
            PART 2 EXPERIENCE 02: ROOM SHADE STUDIO (173 VARIANTS ACROSS 8 ROOMS)
            ========================================================================= */}
        <RoomShadeStudio
          onEnquire={(title, details) => {
            addToCart({
              id: `room-shade-${Date.now()}`,
              type: "shade",
              title,
              meta: details,
            });
            setIsCartOpen(true);
          }}
          onExploreShades={() => {
            const el = document.getElementById("colours");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* =========================================================================
            STAGE 3: THE ROOM LIBRARY (102 SCANNED ARCHITECTURAL SPACES)
            ========================================================================= */}
        <RoomLibrary
          onEnquire={(title, details) => {
            addToCart({
              id: `room-lib-${Date.now()}`,
              type: "product",
              title,
              meta: details,
            });
            setIsCartOpen(true);
          }}
          onExploreProducts={() => {
            const el = document.getElementById("products");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* =========================================================================
            05 — PRODUCT COLLECTION
            ========================================================================= */}
        <section className="catalogue visual-catalogue-refinement reveal scroll-chapter" id="products" data-scroll-section data-section-label="Products" data-reveal>
          {/* Product Universe Intro */}
          <div style={{ marginBottom: "24px" }}>
            <span className="eyebrow" style={{ color: "var(--color-highlight)", marginBottom: "10px", display: "inline-block" }}>Explore Formulation Universes</span>
            <div className="product-universe-strip" role="tablist" aria-label="Product universe categories">
              {productUniverses.map((uni) => (
                <button
                  type="button"
                  key={uni.name}
                  className={`product-universe-item ${filter === uni.query ? "active" : ""}`}
                  onClick={() => {
                    setFilter(uni.query);
                    setProductPage(1);
                  }}
                  title={uni.desc}
                >
                  <span className="product-universe-title">{uni.name}</span>
                  <span className="product-universe-count">{uni.count} products</span>
                </button>
              ))}
            </div>
          </div>

          <div className="catalogue-header visual-catalogue-header">
            <div>
              <div className="eyebrow">Master Formulation Catalogue</div>
              <h2 className="section-title">
                Formulations Engineered
                <br />
                for Distinction.
              </h2>
              <p className="section-lead">
                Explore {birlaOpusProductCount} mastercrafted Birla Opus formulations spanning Ultra-Luxury Interior Emulsions, All-Weather Exterior Shields, Waterproofing Barriers, and Designer Enamels.
              </p>
            </div>
            <div className="filter-pills" aria-label="Filter products">
              {["All products", ...birlaOpusCategories].map((item) => (
                <button
                  onClick={() => {
                    setFilter(item);
                    setProductPage(1);
                  }}
                  className={filter === item ? "active" : ""}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="catalogue-summary">
            <span>{filter === "All products" ? "All official master formulations" : filter}</span>
            <span>{filteredProducts.length} products</span>
          </div>

          <div className="catalogue-tools">
            <span>
              <SlidersHorizontal size={14} /> Sort formulations
            </span>
            <select
              value={productSort}
              onChange={(event) => {
                setProductSort(event.target.value as "featured" | "az");
                setProductPage(1);
              }}
              aria-label="Sort products"
            >
              <option value="featured">Featured curation</option>
              <option value="az">A–Z Alphabetical</option>
            </select>
            <em>Direct dealer supply from Shukul Bazar, Baskhari.</em>
          </div>

          {comparisonProducts.length > 0 && (
            <aside className="comparison-tray" aria-label="Selected product comparison">
              <div className="comparison-heading">
                <div>
                  <span>Compare formulations</span>
                  <strong>
                    {comparisonProducts.length} of {maxComparisonProducts} selected
                  </strong>
                </div>
                <p>
                  {comparisonProducts.length < 2
                    ? "Select one more product to compare specifications side by side."
                    : "Review the selected formulations at a glance."}
                </p>
                <button onClick={clearProductComparison}>Clear selection</button>
              </div>
              <div className="comparison-grid">
                {comparisonProducts.map((product) => (
                  <article key={product.slug}>
                    <div className="comparison-product-image">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={`${product.name} product pack`} width={120} height={96} loading="lazy" decoding="async" />
                      ) : (
                        <span>Birla<br />Opus</span>
                      )}
                    </div>
                    <div>
                      <span>{product.category}</span>
                      <h3>{product.name}</h3>
                      <p>{product.family} range</p>
                      <button
                        type="button"
                        style={{ fontSize: "11px", fontWeight: 700, color: "var(--moss)", background: "none", border: 0, padding: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
                        onClick={() =>
                          addToCart({
                            id: `prod-${product.slug}`,
                            type: "product",
                            title: product.name,
                            meta: product.category,
                            quantity: 1,
                          })
                        }
                      >
                        + Add to Enquiry
                      </button>
                    </div>
                    <button className="comparison-remove" onClick={() => toggleProductComparison(product.slug)} aria-label={`Remove ${product.name} from comparison`}>
                      <X size={15} />
                    </button>
                  </article>
                ))}
              </div>
            </aside>
          )}

          {comparisonLimitMessage && <p className="comparison-message" role="status">{comparisonLimitMessage}</p>}

          <div className="products-grid">
            {visibleProducts.map((product, index) => {
              const prevProduct = index > 0 ? visibleProducts[index - 1] : null;
              const isNewFamily = !prevProduct || prevProduct.family !== product.family;
              return (
                <Fragment key={product.sourceUrl}>
                  {isNewFamily && (
                    <div className="product-family-divider" role="presentation">
                      <span className="product-family-divider-label">
                        <span className="family-badge-dot" /> {product.family} Series · {product.category}
                      </span>
                      <span className="product-family-divider-line" />
                    </div>
                  )}
                  <ProductCard
                    product={product}
                    index={index}
                    isImageLoaded={Boolean(loadedProductImages[product.slug])}
                    isCompared={comparisonSlugs.includes(product.slug)}
                    onImageLoad={markProductImageLoaded}
                    onCompare={toggleProductComparison}
                    onQuickView={setQuickViewProduct}
                    onAddCart={addToCart}
                    onPointerMove={handleProductTilt}
                    onPointerLeave={resetProductTilt}
                  />
                </Fragment>
              );
            })}
          </div>

          {productPagination.pageCount > 1 && (
            <nav className="catalogue-pagination" aria-label="Product pages">
              <button type="button" onClick={() => setProductPage((current) => Math.max(1, current - 1))} disabled={productPagination.page === 1}>
                <ArrowLeft size={14} />Previous page
              </button>
              <span>
                <strong>Page {productPagination.page} of {productPagination.pageCount}</strong>
                <em>Showing {productPagination.startIndex + 1}–{productPagination.endIndex} of {sortedProducts.length}</em>
              </span>
              <button
                type="button"
                onClick={() => setProductPage((current) => Math.min(productPagination.pageCount, current + 1))}
                disabled={productPagination.page === productPagination.pageCount}
              >
                Next page<ArrowRight size={14} />
              </button>
            </nav>
          )}

          <div className="supplementary-products visual-supplementary visual-coral-discovery">
            <div className="supplementary-heading">
              <div className="eyebrow">Substrate & Specialized Systems</div>
              <h3>Beyond wall paint.</h3>
              <div className="supplementary-rail-tools">
                <p className="supplementary-scroll-cue"> <ArrowRight size={14} aria-hidden="true" /></p>
                <div className="supplementary-rail-controls" aria-label="Discovery path controls">
                  <button type="button" onClick={() => scrollSupplementaryRail(-1)} aria-label="Show previous discovery path">
                    <ArrowLeft size={16} aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => scrollSupplementaryRail(1)} aria-label="Show next discovery path">
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
            <div className="supplementary-grid" ref={supplementaryRailRef} role="list" aria-label="Explore more Birla Opus product categories" tabIndex={0}>
              {supplementaryProductCategories.map((category) => (
                <a href="https://www.birlaopus.com/paint-products" target="_blank" rel="noopener noreferrer" className="supplementary-card" key={category.name} role="listitem">
                  <span>{category.name}</span>
                  <p>{category.note}</p>
                  <ArrowRight size={16} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Product Quick View Modal */}
        {quickViewProduct && (
          <div className="enquiry-drawer-overlay" onClick={() => setQuickViewProduct(null)}>
            <div className="enquiry-drawer" style={{ maxWidth: "540px" }} onClick={(e) => e.stopPropagation()}>
              <div className="enquiry-drawer-header">
                <div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "10px", textTransform: "uppercase", color: "var(--saffron)", display: "block" }}>
                    {quickViewProduct.category}
                  </span>
                  <h3>{quickViewProduct.name}</h3>
                </div>
                <button type="button" className="enquiry-drawer-close" onClick={() => setQuickViewProduct(null)} aria-label="Close Quick View">
                  <X size={20} />
                </button>
              </div>
              <div className="enquiry-drawer-body">
                <div style={{ textAlign: "center", background: "var(--surface-soft)", padding: "24px", borderRadius: "8px", marginBottom: "20px" }}>
                  {quickViewProduct.imageUrl ? (
                    <img src={quickViewProduct.imageUrl} alt={quickViewProduct.name} style={{ maxHeight: "220px", objectFit: "contain", margin: "0 auto" }} />
                  ) : (
                    <span>Birla Opus</span>
                  )}
                </div>
                <h4 style={{ fontFamily: "var(--serif)", fontSize: "18px", margin: "0 0 8px" }}>Formulation Overview</h4>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 16px" }}>
                  {quickViewProduct.copy}
                </p>
                <div style={{ background: "var(--surface-paper)", padding: "14px", border: "1px solid var(--line)", borderRadius: "6px", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "12.5px" }}>
                    <span>Product Family:</span>
                    <strong>{quickViewProduct.family}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px" }}>
                    <span>Showroom Location:</span>
                    <strong>Jaymurti Traders, Baskhari</strong>
                  </div>
                </div>
              </div>
              <div className="enquiry-drawer-footer" style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  className="button-primary"
                  style={{ flex: 1 }}
                  onClick={() => {
                    addToCart({
                      id: `prod-${quickViewProduct.slug}`,
                      type: "product",
                      title: quickViewProduct.name,
                      meta: `${quickViewProduct.category} · ${quickViewProduct.family}`,
                      quantity: 1,
                    });
                    setQuickViewProduct(null);
                  }}
                >
                  + Add to Enquiry
                </button>
                <a className="button-ghost" href={quickViewProduct.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  Official Details <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            PART 2 EXPERIENCES 06, 07, 08: PRODUCT WORLDS
            (Interior Paint World, Exterior & Protection World, Wood & Finishes World)
            ========================================================================= */}
        <ProductWorlds
          onEnquire={(title, details) => {
            addToCart({
              id: `world-prod-${Date.now()}`,
              type: "product",
              title,
              meta: details,
            });
            setIsCartOpen(true);
          }}
          onExploreCatalogue={(category) => {
            if (category) {
              setFilter(category);
              setProductPage(1);
            }
            const el = document.getElementById("products");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* =========================================================================
            06 — IDEAS (FEATURED INSPIRATION)
            ========================================================================= */}
        <section className="ideas visual-ideas-compact reveal scroll-chapter" id="ideas" data-scroll-section data-section-label="Ideas" data-reveal>
          <div className="section-header visual-ideas-header">
            <div>
              <div className="eyebrow">Featured Inspiration & Decor Concepts</div>
              <h2 className="section-title">
                Spaces designed
                <br />
                for living art.
              </h2>
              <p className="section-lead">
                Explore curated architectural ideas, dopamine home aesthetics, and Scandinavian minimalism from Birla Opus design studios.
              </p>
            </div>
            <a className="arrow-link" href="https://www.birlaopus.com/blog" target="_blank" rel="noopener noreferrer">
              Open official ideas <ArrowRight size={16} />
            </a>
          </div>

          <div className="ideas-archive-toolbar">
            <p>
              <strong>{matchingIdeas.length}</strong> {matchingIdeas.length === 1 ? "concept" : "concepts"} available
            </p>
            <label className="ideas-search">
              <Search size={16} aria-hidden="true" />
              <input
                value={ideaQuery}
                onChange={(event) => {
                  setIdeaQuery(event.target.value);
                  setIdeaLimit(12);
                }}
                placeholder="Search design concepts and decor themes"
                aria-label="Search the Ideas archive"
              />
            </label>
          </div>

          {visibleIdeas.length > 0 ? (
            <>
              <div className="ideas-archive-grid" role="list" aria-label="Ideas archive">
                {visibleIdeas.map((idea, index) => (
                  <article className="ideas-archive-card" role="listitem" key={idea.name}>
                    <a href={idea.sourceUrl} target="_blank" rel="noopener noreferrer">
                      <img src={idea.imageUrl} alt={idea.name} loading={index < 8 ? "eager" : "lazy"} decoding="async" width={300} height={220} />
                      <div>
                        <span>Curated concept · {String(index + 1).padStart(2, "0")}</span>
                        <h3>{idea.name}</h3>
                        <em>
                          View original <ArrowRight size={14} aria-hidden="true" />
                        </em>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: "32px" }}>
                <p style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text-muted)", marginBottom: "12px" }}>
                  Curated sample of our visual inspiration archive. Comprehensive 102-space room library coming in Part 2.
                </p>
                {ideaLimit < matchingIdeas.length && (
                  <button
                    type="button"
                    className="button-ghost"
                    style={{ border: "1px solid var(--line)", color: "var(--text-primary)" }}
                    onClick={() => setIdeaLimit((current) => Math.min(current + 12, matchingIdeas.length))}
                  >
                    Show {Math.min(12, matchingIdeas.length - ideaLimit)} more concepts <ArrowRight size={15} />
                  </button>
                )}
              </div>
            </>
          ) : (
            <p className="ideas-empty">No archive items match “{ideaQuery}”. Try another search term.</p>
          )}

          <aside className="ideas-visit-guide visual-ideas-visit-compact" aria-label="Plan your colour visit">
            <div className="ideas-visit-copy">
              <div className="eyebrow">From Creative Vision to Reality</div>
              <h3>
                Bring your floor plans.
                <br />
                <em>Leave with a complete specification.</em>
              </h3>
              <p>Bring your saved swatches, fabric samples, or room photographs. Jaymurti Traders will align your aesthetic direction with the exact Birla Opus formulation, finish, and sheen.</p>
              <div className="ideas-visit-actions">
                <a className="ideas-primary-action" href="#finder">
                  <MapPin size={16} />Plan your showroom visit <ArrowRight size={15} />
                </a>
                <a className="ideas-phone-action" href={`tel:${businessProfile.phoneHref}`}>
                  <PhoneCall size={15} />Call the showroom
                </a>
              </div>
            </div>
            <div className="ideas-visit-facts">
              <div>
                <span>Showroom point</span>
                <strong>{businessProfile.landmark}</strong>
                <em>Shukul Bazar · Baskhari</em>
              </div>
              <div>
                <span>Open for visits</span>
                <strong>{businessProfile.hours}</strong>
                <em>Pincode {businessProfile.pincode}</em>
              </div>
              <div>
                <span>Colour Advisory Desk</span>
                <a href={`tel:${businessProfile.phoneHref}`}>{businessProfile.phoneDisplay}</a>
                <em>Bespoke formulation & finish guidance</em>
              </div>
            </div>
          </aside>
        </section>

        {/* Existing Video Section: ProductStories */}
        <ProductStories />

        {/* =========================================================================
            07 — SURFACE STUDIO (21 TEXTURES)
            ========================================================================= */}
        <section className="texture-studio visual-texture-refinement visual-texture-compact reveal scroll-chapter" id="textures" data-scroll-section data-section-label="Textures" data-reveal>
          <div className="texture-studio-header visual-texture-header">
            <div className="texture-studio-intro">
              <div className="eyebrow">Surface Studio · Architectural Relief</div>
              <h2 className="section-title">
                Texture gives colour
                <br />
                sculptural depth.
              </h2>
              <p className="section-lead">
                Explore 21 bespoke tactile surfaces—from raw mineral stone and fluid clay to pearl marmorino. Visit Jaymurti Traders to touch and examine physical sample panels in person.
              </p>
            </div>
            <div className="texture-studio-note">
              <span>Curated tactile library</span>
              <strong>{textureLibrary.length} surface studies</strong>
              <p>Save a design reference, bring a room photo, and touch physical sample panels at Jaymurti Traders.</p>
              <a className="arrow-link" href="#enquiry">
                Consult on texture systems <ArrowRight size={15} />
              </a>
            </div>
          </div>

          <div className="texture-tabs visual-texture-tabs" role="tablist" aria-label="Texture groups">
            {textureGroups.map((group) => (
              <button
                role="tab"
                aria-selected={group.name === textureGroup}
                className={group.name === textureGroup ? "active" : ""}
                onClick={() => setTextureGroup(group.name)}
                key={group.name}
              >
                {group.name}
              </button>
            ))}
          </div>

          <div className="texture-selection-heading">
            <div>
              <span className="texture-kicker">{activeTextureGroup.name} collection</span>
              <h3>{activeTextureGroup.description}</h3>
            </div>
            <p aria-live="polite">Auto-rotates to the next texture world every 10 seconds</p>
          </div>

          <MotionCursorLight tint="coral" radius={280}>
            <div className="texture-gallery" aria-live="polite">
              {activeTextureEntries.map((texture, index) => (
                <MotionTilt maxTilt={4} scaleHover={1.02} key={texture.name}>
                  <article className="texture-card h-full" onClick={() => setSelectedTextureDetail(texture)}>
                    <GlareHover className="texture-glare" glareColor="#fff6de" glareOpacity={0.24} glareAngle={-30} glareSize={270} transitionDuration={520}>
                      <div className="texture-card-image">
                        <img src={texture.imageUrl} alt={texture.name} loading={index < 2 ? "eager" : "lazy"} decoding="async" width={600} height={index === 0 ? 468 : 571} />
                      </div>
                    </GlareHover>
                  <div className="texture-card-copy">
                    <span>{activeTextureGroup.name} · {String(index + 1).padStart(2, "0")}</span>
                    <h4>{texture.name}</h4>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                      <button
                        type="button"
                        style={{ background: "none", border: 0, padding: 0, color: "var(--saffron)", fontSize: "12px", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            id: `tex-${texture.name.toLowerCase().replace(/\s+/g, "-")}`,
                            type: "texture",
                            title: texture.name,
                            meta: `${activeTextureGroup.name} Finish Series`,
                          });
                        }}
                      >
                        + Add to Enquiry
                      </button>
                      <span style={{ fontSize: "11px", color: "var(--text-on-dark-muted)" }}>Inspect &rarr;</span>
                    </div>
                  </div>
                </article>
              </MotionTilt>
            ))}
          </div>
        </MotionCursorLight>

          <aside className="texture-visit-guide">
            <div>
              <span className="texture-kicker">From Substrate to Sculpture</span>
              <h3>
                Feel the surface.
                <br />
                Master the system.
              </h3>
            </div>
            <p>Texture imagery reflects creative possibilities. Visit Jaymurti Traders with your room dimensions for precise guidance on surface preparation, primer application, and Birla Opus texture artisans.</p>
            <a className="button-primary" href="#finder">
              Schedule showroom visit <ArrowRight size={15} />
            </a>
          </aside>
        </section>

        {/* Texture Modal Detail */}
        {selectedTextureDetail && (
          <div className="enquiry-drawer-overlay" onClick={() => setSelectedTextureDetail(null)}>
            <div className="enquiry-drawer" style={{ maxWidth: "540px" }} onClick={(e) => e.stopPropagation()}>
              <div className="enquiry-drawer-header">
                <div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "10px", textTransform: "uppercase", color: "var(--saffron)", display: "block" }}>
                    {selectedTextureDetail.group} Finish Series
                  </span>
                  <h3>{selectedTextureDetail.name}</h3>
                </div>
                <button type="button" className="enquiry-drawer-close" onClick={() => setSelectedTextureDetail(null)} aria-label="Close Texture Detail">
                  <X size={20} />
                </button>
              </div>
              <div className="enquiry-drawer-body">
                <img
                  src={selectedTextureDetail.imageUrl}
                  alt={selectedTextureDetail.name}
                  style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "8px", marginBottom: "20px" }}
                />
                <h4 style={{ fontFamily: "var(--serif)", fontSize: "20px", margin: "0 0 8px" }}>Tactile Specifications</h4>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 16px" }}>
                  Bespoke wall finish engineered with high-grade mineral aggregates and specialized trowel techniques. Requires calibrated primer coat and certified artisanal application.
                </p>
                <div style={{ background: "var(--surface-paper)", padding: "14px", border: "1px solid var(--line)", borderRadius: "6px" }}>
                  <p style={{ margin: 0, fontSize: "12.5px", color: "var(--text-secondary)" }}>
                    Physical sample panels for <strong>{selectedTextureDetail.name}</strong> are available to touch and inspect in natural daylight at our Baskhari showroom.
                  </p>
                </div>
              </div>
              <div className="enquiry-drawer-footer" style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  className="button-primary"
                  style={{ flex: 1 }}
                  onClick={() => {
                    addToCart({
                      id: `tex-${selectedTextureDetail.name.toLowerCase().replace(/\s+/g, "-")}`,
                      type: "texture",
                      title: selectedTextureDetail.name,
                      meta: `${selectedTextureDetail.group} Finish Series`,
                    });
                    setSelectedTextureDetail(null);
                  }}
                >
                  + Add to Enquiry
                </button>
                <a
                  className="button-ghost"
                  href={`https://wa.me/918756659035?text=${encodeURIComponent(`Hello Jaymurti Traders, I am enquiring about the ${selectedTextureDetail.name} texture finish.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Query
                </a>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            PART 2 EXPERIENCE 04: WALLPAPER GALLERY (13 DESIGN FAMILIES)
            ========================================================================= */}
        <WallpaperGallery
          onEnquire={(title, details) => {
            addToCart({
              id: `wallpaper-${Date.now()}`,
              type: "product",
              title,
              meta: details,
            });
            setIsCartOpen(true);
          }}
        />

        {/* =========================================================================
            PART 2 EXPERIENCE 05: EXTENDED TEXTURE COLLECTIONS (17 SENSORY STUDIES)
            ========================================================================= */}
        <ExtendedTextures
          onEnquire={(title, details) => {
            addToCart({
              id: `ext-tex-${Date.now()}`,
              type: "texture",
              title,
              meta: details,
            });
            setIsCartOpen(true);
          }}
          onExploreSurfaceStudio={() => {
            const el = document.getElementById("textures");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* =========================================================================
            08 — PAINT ESTIMATOR
            ========================================================================= */}
        <section className="calculator reveal scroll-chapter" id="budget" data-scroll-section data-section-label="Plan" data-reveal>
          <div className="calculator-intro">
            <div>
              <div className="eyebrow">Precision Paint Estimator</div>
              <h2 className="section-title">
                Calculate Paint & Material
                <br />
                Requirements.
              </h2>
              <p className="section-lead">
                Plan your project with clarity. Calculate required litres of topcoat, primer, and kilograms of putty either by total carpet area or standard home configuration.
              </p>
            </div>
            <div className="calculator-stat">
              <strong>100%</strong>
              <span>Transparent engineering formulas</span>
            </div>
          </div>

          <div className="estimator-container">
            <div className="calculator-form visual-calculator-form-compact">
              <div className="estimator-mode-toggle">
                <button
                  type="button"
                  className={`estimator-mode-btn ${estimatorMode === "carpet" ? "active" : ""}`}
                  onClick={() => setEstimatorMode("carpet")}
                >
                  Carpet Area Mode
                </button>
                <button
                  type="button"
                  className={`estimator-mode-btn ${estimatorMode === "bhk" ? "active" : ""}`}
                  onClick={() => setEstimatorMode("bhk")}
                >
                  Configuration (BHK) Mode
                </button>
              </div>

              {estimatorMode === "carpet" ? (
                <>
                  <label className="selection-label">Property Type</label>
                  <div className="option-grid">
                    {[
                      ["apartment", "Apartment"],
                      ["villa", "Villa / House"],
                      ["studio", "Studio"],
                      ["commercial", "Commercial"],
                    ].map(([val, lbl]) => (
                      <button className={space === val ? "active" : ""} onClick={() => setSpace(val)} key={val} type="button">
                        {lbl}
                      </button>
                    ))}
                  </div>

                  <label className="selection-label">Surface Scope</label>
                  <div className="finish-toggle">
                    <button className={finish === "interior" ? "active" : ""} onClick={() => setFinish("interior")} type="button">
                      Interior
                    </button>
                    <button className={finish === "exterior" ? "active" : ""} onClick={() => setFinish("exterior")} type="button">
                      Exterior
                    </button>
                  </div>

                  <div className="calc-inputs">
                    <input
                      value={area}
                      onChange={(e) => setArea(e.target.value.replace(/\D/g, ""))}
                      inputMode="numeric"
                      placeholder="Carpet area (sq ft)"
                      aria-label="Carpet area in square feet"
                    />
                    <input
                      value={budgetPin}
                      onChange={(e) => setBudgetPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      inputMode="numeric"
                      placeholder="Pincode"
                      aria-label="6-digit Pincode"
                    />
                  </div>
                </>
              ) : (
                <>
                  <label className="selection-label">Select Home Configuration</label>
                  <div className="option-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                    {[
                      ["1bhk", "1 BHK (~450 sq ft)"],
                      ["2bhk", "2 BHK (~850 sq ft)"],
                      ["3bhk", "3 BHK (~1350 sq ft)"],
                    ].map(([val, lbl]) => (
                      <button
                        className={selectedBhk === val ? "active" : ""}
                        onClick={() => setSelectedBhk(val as any)}
                        key={val}
                        type="button"
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>

                  <label className="selection-label">Surface Condition</label>
                  <div className="finish-toggle">
                    <button className={!isFreshPlaster ? "active" : ""} onClick={() => setIsFreshPlaster(false)} type="button">
                      Repainting / Existing Wall
                    </button>
                    <button className={isFreshPlaster ? "active" : ""} onClick={() => setIsFreshPlaster(true)} type="button">
                      Fresh Plaster / New Wall
                    </button>
                  </div>
                </>
              )}

              <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  className="button-primary"
                  onClick={() => {
                    calculateBudget();
                    addToCart({
                      id: `estimate-${estimatorMode}-${Date.now()}`,
                      type: "estimate",
                      title: estimatorMode === "bhk" ? `Paint Estimate: ${PRESET_HOME_CONFIGS[selectedBhk].label}` : `Paint Estimate: ${area || 0} sq ft`,
                      meta: `Paint: ~${activeEstimatorResult.paintLiters2Coats}L · Primer: ~${activeEstimatorResult.primerLiters}L · Putty: ~${activeEstimatorResult.puttyKg}kg`,
                      notes: `Estimated material range: ₹${activeEstimatorResult.styleCostEstimate.min.toLocaleString("en-IN")} – ₹${activeEstimatorResult.oneCostEstimate.max.toLocaleString("en-IN")}`,
                    });
                  }}
                >
                  + Add Estimate to Enquiry
                </button>
              </div>
            </div>

            {/* Output Panel */}
            <div className="estimator-output-panel">
              <div>
                <span className="eyebrow" style={{ color: "var(--color-accent)" }}>Estimated Material Volumes</span>
                <div className="estimator-output-metrics">
                  <div className="estimator-metric-col">
                    <span>Topcoat (2 Coats)</span>
                    <strong>
                      <AnimatedCounter value={activeEstimatorResult.paintLiters2Coats} suffix=" Litres" />
                    </strong>
                  </div>
                  <div className="estimator-metric-col">
                    <span>Primer</span>
                    <strong>
                      <AnimatedCounter value={activeEstimatorResult.primerLiters} suffix=" Litres" />
                    </strong>
                  </div>
                  <div className="estimator-metric-col">
                    <span>Wall Putty</span>
                    <strong>
                      <AnimatedCounter value={activeEstimatorResult.puttyKg} suffix=" kg" />
                    </strong>
                  </div>
                </div>

                <div className="estimator-tiers">
                  <div className="estimator-tier-row">
                    <span>Style Economy Range:</span>
                    <strong>₹{activeEstimatorResult.styleCostEstimate.min.toLocaleString("en-IN")} – ₹{activeEstimatorResult.styleCostEstimate.max.toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="estimator-tier-row">
                    <span>Calista Premium Range:</span>
                    <strong>₹{activeEstimatorResult.calistaCostEstimate.min.toLocaleString("en-IN")} – ₹{activeEstimatorResult.calistaCostEstimate.max.toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="estimator-tier-row">
                    <span>One Ultra-Luxury Range:</span>
                    <strong>₹{activeEstimatorResult.oneCostEstimate.min.toLocaleString("en-IN")} – ₹{activeEstimatorResult.oneCostEstimate.max.toLocaleString("en-IN")}</strong>
                  </div>
                </div>
              </div>

              <div>
                <p className="estimator-disclaimer">
                  <strong>Important Note:</strong> This is an estimate, not a quotation. Final paint quantities and material costs depend on actual wall condition, absorption rates, primer application, and contractor technique.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            09 — SERVICES / CONSULTATION
            ========================================================================= */}
        <section className="services visual-services-compact reveal scroll-chapter" id="services" data-scroll-section data-section-label="Services" data-reveal>
          <div className="services-showcase visual-services-showcase-compact">
            <div className="eyebrow">Practical Showroom Advisory</div>
            <h2 className="section-title">Clear guidance from swatch to finish coat.</h2>
            <p className="section-lead">
              We focus directly on genuine customer needs: selecting harmonious colours, calculating precise material quantities, recommending right-fit paint systems, and direct dealer assistance.
            </p>
            <a className="arrow-link" href="#enquiry">
              Request guidance session <ArrowRight size={16} />
            </a>
            <ServiceScrollStack className="service-steps">
              <ServiceScrollStackItem className="service-step">
                <span>01. Colour Guidance</span>
                <span>Lighting & Undertones</span>
              </ServiceScrollStackItem>
              <ServiceScrollStackItem className="service-step">
                <span>02. Product Guidance</span>
                <span>Interior / Exterior / Waterproofing</span>
              </ServiceScrollStackItem>
              <ServiceScrollStackItem className="service-step">
                <span>03. Quantity Estimation</span>
                <span>Transparent Material Litres</span>
              </ServiceScrollStackItem>
              <ServiceScrollStackItem className="service-step">
                <span>04. Showroom Assistance</span>
                <span>Direct Dealer Desk</span>
              </ServiceScrollStackItem>
            </ServiceScrollStack>
          </div>

          <div className="enquiry-panel visual-enquiry-compact" id="enquiry-form">
            <h3>Schedule consultation with our desk.</h3>
            <p>Share your requirement to discuss colour curation, primer systems, and formulation options with the team at Jaymurti Traders.</p>
            <form onSubmit={submitEnquiry} noValidate>
              <div className="enquiry-grid">
                <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" aria-label="Your name" />
                <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Phone number" aria-label="Phone number" />
                <input className="full" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email address" aria-label="Email address" />
                <select value={form.serviceType} onChange={(event) => setForm({ ...form, serviceType: event.target.value })} aria-label="Service type">
                  <option>Colour consultation</option>
                  <option>Product guidance</option>
                  <option>Quantity estimation</option>
                  <option>Waterproofing guidance</option>
                </select>
                <input value={form.pincode} onChange={(event) => setForm({ ...form, pincode: event.target.value.replace(/\D/g, "").slice(0, 6) })} inputMode="numeric" placeholder="Pincode (e.g. 224129)" aria-label="Pincode" />
              </div>
              <button className="enquiry-submit" type="submit" disabled={enquiry.isPending}>
                {enquiry.isPending ? "Sending…" : "Submit Consultation Request"}
              </button>
              {formValidationMessage && <p className="form-message" role="alert">{formValidationMessage}</p>}
              {enquiry.isSuccess && <p className="form-message">Thank you — your consultation request has been received by our showroom desk.</p>}
              {enquiry.error && <p className="form-message" role="alert">{enquiry.error.message}</p>}
            </form>
          </div>
        </section>

        {/* =========================================================================
            LEADERSHIP & SHOWROOM TEAM: FOUNDER & SPECIALISTS
            ========================================================================= */}
        <OwnerAndTeam />

        {/* =========================================================================
            10 — ENQUIRY (ANCHOR SECTION & SLIDE-OVER TRIGGER)
            ========================================================================= */}
        <section className="scroll-chapter" id="enquiry" data-scroll-section data-section-label="Enquire" style={{ background: "var(--color-brand-primary)", color: "var(--color-text-on-dark)", padding: "80px var(--shell-gutter)" }}>
          <div style={{ maxWidth: "var(--shell-max)", margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "48px", alignItems: "center" }}>
            <div>
              <div className="eyebrow" style={{ color: "var(--color-accent)" }}>Direct Dealer Conversion</div>
              <h2 className="section-title" style={{ color: "#ffffff" }}>
                Connected Enquiry Desk:
                <br />
                <em>Explore &rarr; Select &rarr; Enquire.</em>
              </h2>
              <p className="section-lead" style={{ color: "rgba(255,255,255,0.8)" }}>
                Whether you have selected specific Birla Opus formulations, shades, textures, or require a comprehensive quantity consultation, our direct WhatsApp desk is ready to assist.
              </p>
              <div style={{ marginTop: "28px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="button-primary"
                  onClick={() => setIsCartOpen(true)}
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <ShoppingBag size={16} />
                  Open Enquiry Cart ({cartItems.length} items)
                </button>
                <a
                  className="button-ghost"
                  href={generateWhatsAppCartUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <MessageCircle size={16} />
                  WhatsApp Showroom (+91 8756659035)
                </a>
                <a
                  className="button-ghost"
                  href={businessProfile.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <Instagram size={16} />
                  Instagram (@paintwalebhaiya45)
                </a>
                <a
                  className="button-ghost"
                  href={businessProfile.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <Facebook size={16} />
                  Facebook Page
                </a>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", padding: "32px", borderRadius: "8px" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Enquiry Summary
              </span>
              <p style={{ fontSize: "15px", margin: "12px 0 20px", color: "#ffffff", lineHeight: 1.5 }}>
                {cartItems.length === 0
                  ? "Your enquiry cart is empty. Browse products, shades, or the estimator above to add items."
                  : `You have ${cartItems.length} ${cartItems.length === 1 ? "item" : "items"} queued in your enquiry specification.`}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {cartItems.slice(0, 3).map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "8px 10px", background: "rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                    <span>{item.title}</span>
                    <span style={{ color: "var(--color-accent)" }}>{item.type}</span>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", textAlign: "center" }}>
                    + {cartItems.length - 3} more items in drawer
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            11 — WHY JAYMURTI
            ========================================================================= */}
        <section className="why-jaymurti scroll-chapter" id="why-jaymurti" data-scroll-section data-section-label="Why Us">
          <div className="section-header" style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Authentic Local Showroom</div>
            <h2 className="section-title">
              Why Homeowners Trust
              <br />
              <em>Jaymurti Traders.</em>
            </h2>
            <p className="section-lead" style={{ margin: "16px auto 0" }}>
              Serving Baskhari and Ambedkar Nagar with verified Birla Opus paints, physical sampling, and genuine dealer-backed product guidance.
            </p>
          </div>

          <MotionStagger className="why-grid" stagger={0.1}>
            <MotionStaggerItem className="why-card">
              <div className="why-card-icon">
                <BadgeCheck size={24} />
              </div>
              <h3>Real Physical Showroom</h3>
              <p>Walk in to examine physical paint swatch panels, textured boards, and full product ranges under natural daylight at Shukul Bazar, Baskhari.</p>
            </MotionStaggerItem>
            <MotionStaggerItem className="why-card">
              <div className="why-card-icon">
                <ShieldCheck size={24} />
              </div>
              <h3>Birla Opus Products</h3>
              <p>100% genuine Birla Opus paints, primers, putties, and waterproofing systems sourced through official manufacturer distribution channels.</p>
            </MotionStaggerItem>
            <MotionStaggerItem className="why-card">
              <div className="why-card-icon">
                <Palette size={24} />
              </div>
              <h3>Colour & Sheen Guidance</h3>
              <p>Hands-on assistance in matching colour directions to room orientation, lighting conditions, and architectural substrate requirements.</p>
            </MotionStaggerItem>
            <MotionStaggerItem className="why-card">
              <div className="why-card-icon">
                <PhoneCall size={24} />
              </div>
              <h3>Direct Local Contact</h3>
              <p>Speak directly with our knowledgeable showroom team without automated call centers or intermediary markups.</p>
            </MotionStaggerItem>
          </MotionStagger>
        </section>

        {/* =========================================================================
            12 — VISIT JAYMURTI
            ========================================================================= */}
        <section className="finder visual-finder-refinement visual-finder-compact reveal scroll-chapter" id="finder" data-scroll-section data-section-label="Visit" data-reveal>
          <div className="finder-layout">
            <div>
              <div className="eyebrow">Physical Showroom Destination</div>
              <h2 className="section-title">Experience colour in person.</h2>
              <p className="section-lead">
                Visit Jaymurti Traders at Shukul Bazar, Baskhari. Inspect physical fandecks, feel physical texture panels, and consult directly with our desk.
              </p>
              <form
                className="store-lookup"
                onSubmit={(event) => {
                  event.preventDefault();
                  findStore();
                }}
              >
                <input
                  value={storePin}
                  onChange={(event) => setStorePin(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  inputMode="numeric"
                  placeholder="Enter 224129 to locate us"
                  aria-label="Store finder pincode"
                />
                <button type="submit">Verify Pincode</button>
              </form>
            </div>
            <div className="store-result">
              <div className="store-result-content">
                {storeLookup.store ? (
                  <>
                    <span className="store-result-label">Birla Opus Paint Dealer</span>
                    <h3>{businessProfile.name}</h3>
                    <div className="store-meta">
                      <span>
                        {businessProfile.address}
                        <br />
                        Landmark: {businessProfile.landmark}
                      </span>
                      <span>
                        Hours: {businessProfile.hours}
                        <br />
                        <a href={`tel:${businessProfile.phoneHref}`}>{businessProfile.phoneDisplay}</a>
                        <br />
                        Instagram: {businessProfile.instagramHandle}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="store-result-label">{storeLookup.status === "invalid" ? "Pincode required" : "Not in this immediate area"}</span>
                    <h3>{storeLookup.status === "invalid" ? "Enter a valid 6-digit pincode." : "Visit Jaymurti Traders in Baskhari."}</h3>
                    <div className="store-meta">
                      <span>Our verified showroom pincode is 224129.</span>
                      <span>Call +91 87566 59035 for direct route assistance.</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Showroom Map & Directions */}
        <section className="location-map visual-location-refinement visual-map-compact reveal" data-reveal>
          <div className="location-map-copy">
            <div className="eyebrow">Showroom Location & Route</div>
            <h2 className="section-title">
              Your showroom visit,
              <br />
              made effortless.
            </h2>
            <p className="section-lead">
              Located at Shukul Bazar, Baskhari, Ambedkar Nagar. Bring your floor plans, room photos, or fabric references, and we will formulate the perfect paint system.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="map-directions">
                <MapPin size={16} />Get Google Map Directions <ArrowRight size={15} />
              </a>
              <a href={businessProfile.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="button-ghost" style={{ border: "1px solid var(--ink)", color: "var(--ink)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <ExternalLink size={14} /> Open in Google Maps
              </a>
            </div>
          </div>
          <div className="shop-map">
            <iframe
              className="shop-map-canvas"
              title="Jaymurti Traders location map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?output=embed&q=${encodeURIComponent(businessProfile.address)}`}
            />
            <div className="shop-map-overlay">
              <MapPin size={16} />
              <span>{businessProfile.landmark} · 224129</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            13 — REVIEWS
            ========================================================================= */}
        <section className="shop-reviews visual-reviews-compact reveal scroll-chapter" id="reviews" data-scroll-section data-section-label="Reviews" data-reveal>
          <div className="review-intro">
            <div>
              <div className="eyebrow">Verified Client Experiences</div>
              <h2 className="section-title">
                Voices of transformed
                <br />
                living spaces.
              </h2>
              <p className="section-lead">
                Discover feedback from homeowners and painters across Baskhari and Ambedkar Nagar. Reviews rated 3 stars or higher appear here automatically.
              </p>
            </div>
            <a className="google-review-placeholder" href="https://share.google/Nyju9PoRuINGGoD83" target="_blank" rel="noopener noreferrer" aria-label="Review Jaymurti Traders on Google">
              <div>
                <span>Google Business Profile</span>
                <strong>Review us on Google</strong>
                <p className="google-review-sub">See verified showroom listing & directions</p>
              </div>
              <ArrowRight size={15} />
            </a>
          </div>

          <div className="review-layout">
            <div className="approved-reviews visual-review-summary-card" aria-live="polite">
              <div className="review-summary">
                <div>
                  <span className="review-summary-label">Showroom reviews</span>
                  <strong>{publishedReviewsQuery.data?.averageRating ? publishedReviewsQuery.data.averageRating.toFixed(1) : "—"}</strong>
                  <div className="review-stars" role="img" aria-label={publishedReviewsQuery.data?.averageRating ? `${publishedReviewsQuery.data.averageRating.toFixed(1)} out of 5 stars` : "No public rating yet"}>
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        size={17}
                        fill={publishedReviewsQuery.data?.averageRating && index < Math.round(publishedReviewsQuery.data.averageRating) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>
                <div className="review-summary-side">
                  <p>
                    {publishedReviewsQuery.data?.reviews.length
                      ? `${publishedReviewsQuery.data.reviews.length} public ${publishedReviewsQuery.data.reviews.length === 1 ? "review" : "reviews"}`
                      : "3–5 star reviews will appear here automatically."}
                  </p>
                  <a href={googleBusinessProfileUrl} target="_blank" rel="noopener noreferrer" className="review-summary-google-link">
                    View on Google <ArrowRight size={12} />
                  </a>
                </div>
              </div>

              {publishedReviewsQuery.isLoading ? (
                <p className="review-empty">Loading showroom reviews…</p>
              ) : publishedReviewsQuery.data?.reviews.length ? (
                <div className="approved-review-list" role="list">
                  {publishedReviewsQuery.data.reviews.map((review) => (
                    <article className="approved-review-card" key={review.id} role="listitem">
                      <div className="review-card-top">
                        <strong>{review.displayName}</strong>
                        <div className="review-stars" role="img" aria-label={`${review.rating} out of 5 stars`}>
                          {Array.from({ length: 5 }, (_, index) => (
                            <Star key={index} size={14} fill={index < review.rating ? "currentColor" : "none"} />
                          ))}
                        </div>
                      </div>
                      <p>“{review.reviewText}”</p>
                      <div className="review-card-bottom">
                        <span>{new Date(review.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
                        <span className="review-source-tag">Website review</span>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="review-empty">Be the first to share a showroom visit, colour choice, or product experience with Jaymurti Traders.</p>
              )}
            </div>

            <form className="review-form" onSubmit={submitShopReview} noValidate>
              <div className="review-form-heading">
                <span className="review-summary-label">Leave a review</span>
                <h3>Share your project experience</h3>
                <p>Let future homeowners know how Jaymurti Traders and Birla Opus elevated your space. Ratings of 3 stars or higher appear on this page automatically. Lower ratings are received privately.</p>
              </div>
              <label className="review-name-label">
                Your name
                <input
                  value={reviewForm.displayName}
                  onChange={(event) => setReviewForm({ ...reviewForm, displayName: event.target.value })}
                  maxLength={80}
                  placeholder="Name to display"
                  aria-label="Your name"
                />
              </label>
              <fieldset className="review-rating">
                <legend>Your rating</legend>
                <div>
                  {Array.from({ length: 5 }, (_, index) => {
                    const rating = index + 1;
                    return (
                      <button
                        type="button"
                        className={reviewForm.rating >= rating ? "active" : ""}
                        onClick={() => setReviewForm({ ...reviewForm, rating })}
                        aria-label={`Rate ${rating} out of 5 stars`}
                        aria-pressed={reviewForm.rating === rating}
                        key={rating}
                      >
                        <Star size={23} fill={reviewForm.rating >= rating ? "currentColor" : "none"} />
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <label className="review-copy-label">
                Your experience
                <textarea
                  value={reviewForm.reviewText}
                  onChange={(event) => setReviewForm({ ...reviewForm, reviewText: event.target.value })}
                  maxLength={800}
                  placeholder="Tell future visitors about your colour curation, product quality, or service experience."
                  aria-label="Your review"
                />
              </label>
              <button className="review-submit" type="submit" disabled={reviewSubmission.isPending}>
                {reviewSubmission.isPending ? "Submitting…" : "Submit review"}
                <ArrowRight size={15} />
              </button>
              {reviewFormMessage && (
                <div className="review-form-feedback" role="status">
                  <p className="review-form-message">{reviewFormMessage}</p>
                  {reviewSubmission.isSuccess && (
                    <div className="review-google-prompt">
                      <p>Would you like to share it on Google too?</p>
                      <a href={googleBusinessProfileUrl} target="_blank" rel="noopener noreferrer" className="button-google-share">
                        Review us on Google <ArrowRight size={13} />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </section>

        {/* =========================================================================
            14 — FAQ
            ========================================================================= */}
        <section className="faq visual-faq-refinement visual-faq-compact reveal scroll-chapter" id="faq" data-scroll-section data-section-label="FAQ" data-reveal>
          <div className="faq-header">
            <div className="eyebrow">Technical & Practical Clarity</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-lead">Answers to common queries regarding shades, product selection, store visits, and paint estimation.</p>
          </div>
          <Accordion type="single" collapsible>
            {faqs.map(([question, answer], index) => (
              <AccordionItem className="faq-item" value={`faq-${index}`} key={question}>
                <AccordionTrigger className="faq-trigger">
                  <span>{question}</span>
                </AccordionTrigger>
                <AccordionContent className="faq-answer">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* =========================================================================
            15 — FINAL CTA
            ========================================================================= */}
        <section className="final-cta scroll-chapter" id="final-cta" data-scroll-section data-section-label="Contact">
          <div className="final-cta-inner">
            <div className="eyebrow" style={{ color: "var(--saffron)", justifyContent: "center", marginBottom: "14px" }}>
              Next Step in Your Transformation
            </div>
            <h2>FOUND YOUR COLOUR?</h2>
            <p>
              Explore our spectral shades, select the ideal Birla Opus formulation, submit your enquiry, or visit our showroom counter in Baskhari.
            </p>
            <div className="final-cta-actions">
              <a href="#colours" className="button-primary">
                Explore Colours <ArrowRight size={15} />
              </a>
              <a href="#products" className="button-ghost">
                Explore Products
              </a>
              <a
                href="https://wa.me/918756659035?text=Hello%20Jaymurti%20Traders%2C%20I%20would%20like%20to%20enquire%20about%20Birla%20Opus%20paints."
                target="_blank"
                rel="noopener noreferrer"
                className="button-ghost"
                style={{ borderColor: "var(--saffron)", color: "var(--saffron)" }}
              >
                <MessageCircle size={15} style={{ marginRight: "6px" }} />
                WhatsApp Jaymurti
              </a>
            </div>
            <div className="final-cta-steps">
              <span>01. Explore</span>
              <span>&rarr;</span>
              <span>02. Select</span>
              <span>&rarr;</span>
              <span>03. Enquire</span>
              <span>&rarr;</span>
              <span>04. Visit</span>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          16 — FOOTER
          ========================================================================= */}
      <footer className="footer visual-footer-compact scroll-chapter" id="footer" data-scroll-section data-section-label="Footer">
        <div className="footer-top">
          <div className="footer-intro">
            <a className="brand" href="#top" aria-label="Birla Opus Paint Jaymurti Traders">
              <img src="/storage/logo.png" alt="Jaymurti Traders Logo" width={48} height={48} className="brand-logo" />
              <span className="brand-name-text">JAYMURTI TRADERS</span>
            </a>
            <p>
              <strong>JAYMURTI TRADERS (जयमूर्ति ट्रेडर्स)</strong>
              <br />
              Authorised Birla Opus Paint Dealer &amp; Experience Showroom
              <br />
              Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh - 224129, India.
              <br />
              Hours: 8:00 AM – 9:00 PM (Monday – Sunday)
            </p>
            <p>
              For authentic Birla Opus paints, automated shade tinting, and consultation: <a href="tel:+918756659035">+91 87566 59035</a>
            </p>
            <div className="footer-quick-actions">
              <a href={`tel:${businessProfile.phoneHref}`} className="footer-action-btn footer-action-btn--call" aria-label="Call Jaymurti Traders">
                <PhoneCall size={14} /> Call Showroom
              </a>
              <a
                href={`https://wa.me/${businessProfile.whatsappHref}?text=${encodeURIComponent("Hello Jaymurti Traders, I would like to enquire about Birla Opus paints.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-action-btn footer-action-btn--whatsapp"
                aria-label="WhatsApp Showroom Desk"
              >
                <MessageCircle size={14} /> WhatsApp Desk
              </a>
              <a href={googleBusinessProfileUrl} target="_blank" rel="noopener noreferrer" className="footer-action-btn footer-action-btn--maps" aria-label="Directions on Google Maps">
                <MapPin size={14} /> Google Directions
              </a>
            </div>
            <div className="footer-social-links">
              <a href={businessProfile.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer-social-pill">
                Instagram @paintwalebhaiya45
              </a>
              <a href={googleBusinessProfileUrl} target="_blank" rel="noopener noreferrer" className="footer-social-pill">
                Google Business Profile
              </a>
            </div>
          </div>
          <div className="footer-nav">
            <div>
              <h4>Explore</h4>
              <a href="#colours">Colours</a>
              <a href="#stories">Colour Stories</a>
              <a href="#products">Product Collection</a>
              <a href="#ideas">Ideas</a>
              <a href="#textures">Surface Studio</a>
            </div>
            <div>
              <h4>Visual Archives</h4>
              <a href="#colour-capsule">Colour Capsule (50)</a>
              <a href="#room-shade-studio">Room Shade Studio</a>
              <a href="#room-library">Room Library (102)</a>
              <a href="#wallpaper-gallery">Wallpaper Gallery</a>
              <a href="#extended-textures">Extended Textures</a>
              <a href="#interior-paint-world">Paint Worlds</a>
            </div>
            <div>
              <h4>Showroom</h4>
              <a href="#inside-jaymurti">Inside Jaymurti</a>
              <a href="#step-inside">Step Inside (Video)</a>
              <a href="#services">Services &amp; Guidance</a>
              <a href="#budget">Paint Estimator</a>
              <a href="#finder">Visit Showroom</a>
              <a href="#reviews">Customer Reviews</a>
            </div>
            <div>
              <h4>Contact &amp; Legal</h4>
              <a href="tel:+918756659035">+91 87566 59035</a>
              <a href="https://wa.me/918756659035" target="_blank" rel="noopener noreferrer">WhatsApp Desk</a>
              <a href={businessProfile.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram (@paintwalebhaiya45)</a>
              <a href={businessProfile.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook Page</a>
              <a href="#finder">Shukul Bazar, Baskhari</a>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-brand">
            JAYMURTI TRADERS · जयमूर्ति ट्रेडर्स
            <span style={{ fontWeight: 400, marginLeft: "8px", opacity: 0.85 }}>
              · Shukul Bazar, Baskhari, Ambedkar Nagar, UP - 224129
            </span>
          </div>
          <div className="socials">
            <a href={businessProfile.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={businessProfile.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href={businessProfile.googleMapsUrl} target="_blank" rel="noopener noreferrer">Google Maps</a>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
      </footer>

      {/* Slide-over Enquiry Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="enquiry-drawer-overlay"
            onClick={() => setIsCartOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="enquiry-drawer"
              onClick={(e) => e.stopPropagation()}
              aria-label="Enquiry Drawer"
            >
              <div className="enquiry-drawer-header">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <ShoppingBag size={20} />
                  <h3>Enquiry Cart ({cartItems.length})</h3>
                </div>
                <button type="button" className="enquiry-drawer-close" onClick={() => setIsCartOpen(false)} aria-label="Close Enquiry Drawer">
                  <X size={20} />
                </button>
              </div>

              <div className="enquiry-drawer-body">
                {cartItems.length === 0 ? (
                  <div className="enquiry-cart-empty">
                    <ShoppingBag size={44} style={{ margin: "0 auto 16px", opacity: 0.35, color: "var(--moss)" }} />
                    <h4 style={{ fontFamily: "var(--serif)", fontSize: "20px", color: "var(--text-primary)", marginBottom: "8px" }}>Your enquiry cart is empty</h4>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5, maxWidth: "340px", margin: "0 auto 20px" }}>
                      Add Birla Opus shades from the Explorer, products from the catalogue, or finishes from Surface Studio.
                    </p>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                      <a
                        href="#colours"
                        className="button-primary"
                        onClick={() => setIsCartOpen(false)}
                        style={{ fontSize: "11px", padding: "8px 14px" }}
                      >
                        Browse Shades
                      </a>
                      <a
                        href="#products"
                        className="button-ghost"
                        onClick={() => setIsCartOpen(false)}
                        style={{ fontSize: "11px", padding: "8px 14px" }}
                      >
                        Browse Products
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="enquiry-cart-items">
                    <AnimatePresence initial={false}>
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, height: 0, scale: 0.95 }}
                          animate={{ opacity: 1, height: "auto", scale: 1 }}
                          exit={{ opacity: 0, height: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="enquiry-cart-item"
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: 0 }}>
                            {item.colourHex ? (
                              <span style={{ width: "28px", height: "28px", borderRadius: "5px", background: item.colourHex, display: "inline-block", flexShrink: 0, border: "1px solid rgba(0,0,0,0.12)", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }} />
                            ) : (
                              <span className="enquiry-item-type-badge">
                                {item.type === "product" ? "Product" : item.type === "texture" ? "Finish" : "Estimate"}
                              </span>
                            )}
                            <div style={{ minWidth: 0 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <span className="enquiry-item-tag">{item.type}</span>
                                <div className="enquiry-cart-item-title">{item.title}</div>
                              </div>
                              <div className="enquiry-cart-item-meta">{item.meta}</div>
                              {item.notes && <div style={{ fontSize: "11px", color: "var(--moss)", marginTop: "2px" }}>{item.notes}</div>}
                            </div>
                          </div>

                          {item.type === "product" && (
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", margin: "0 10px", background: "var(--surface-paper)", border: "1px solid var(--line)", borderRadius: "4px", padding: "2px 6px" }}>
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(item.id, -1)}
                                style={{ background: "none", border: 0, cursor: "pointer", fontWeight: 700, fontSize: "14px", color: "var(--text-secondary)", padding: "0 4px" }}
                                aria-label={`Decrease quantity of ${item.title}`}
                              >
                                –
                              </button>
                              <span style={{ fontSize: "12px", fontFamily: "var(--mono)", minWidth: "16px", textAlign: "center" }}>
                                {item.quantity ?? 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(item.id, 1)}
                                style={{ background: "none", border: 0, cursor: "pointer", fontWeight: 700, fontSize: "14px", color: "var(--text-secondary)", padding: "0 4px" }}
                                aria-label={`Increase quantity of ${item.title}`}
                              >
                                +
                              </button>
                            </div>
                          )}

                          <button type="button" className="enquiry-cart-item-remove" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.title}`}>
                            <Trash2 size={16} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                  {/* Customer Information Panel */}
                  <div style={{ marginTop: "18px", padding: "16px", background: "var(--surface-soft)", border: "1px solid var(--line)", borderRadius: "6px" }}>
                    <div style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "var(--moss)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700, marginBottom: "10px" }}>
                      Customer Details (Required for Enquiry)
                    </div>
                    {cartCustomerError && (
                      <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "8px 12px", borderRadius: "4px", fontSize: "12px", marginBottom: "10px", lineHeight: 1.4 }}>
                        {cartCustomerError}
                      </div>
                    )}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
                      <input
                        type="text"
                        placeholder="Your name *"
                        value={cartCustomer.name}
                        onChange={(e) => {
                          setCartCustomer({ ...cartCustomer, name: e.target.value });
                          if (cartCustomerError) setCartCustomerError("");
                        }}
                        style={{ background: "#ffffff", border: "1px solid var(--line)", padding: "8px 10px", fontSize: "12px", borderRadius: "4px", outline: "none", borderColor: "var(--color-border)", width: "100%" }}
                        aria-label="Your name"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Phone number *"
                        value={cartCustomer.phone}
                        onChange={(e) => {
                          setCartCustomer({ ...cartCustomer, phone: e.target.value });
                          if (cartCustomerError) setCartCustomerError("");
                        }}
                        style={{ background: "#ffffff", border: "1px solid var(--line)", padding: "8px 10px", fontSize: "12px", borderRadius: "4px", outline: "none", borderColor: "var(--color-border)", width: "100%" }}
                        aria-label="Phone number"
                        required
                      />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr", gap: "8px" }}>
                      <input
                        type="text"
                        placeholder="Area / Locality (e.g. Baskhari) *"
                        value={cartCustomer.areaLocation}
                        onChange={(e) => {
                          setCartCustomer({ ...cartCustomer, areaLocation: e.target.value });
                          if (cartCustomerError) setCartCustomerError("");
                        }}
                        style={{ background: "#ffffff", border: "1px solid var(--line)", padding: "8px 10px", fontSize: "12px", borderRadius: "4px", outline: "none", borderColor: "var(--color-border)", width: "100%" }}
                        aria-label="Area or locality"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Pincode *"
                        maxLength={6}
                        value={cartCustomer.pincode}
                        onChange={(e) => {
                          setCartCustomer({ ...cartCustomer, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) });
                          if (cartCustomerError) setCartCustomerError("");
                        }}
                        style={{ background: "#ffffff", border: "1px solid var(--line)", padding: "8px 10px", fontSize: "12px", borderRadius: "4px", outline: "none", borderColor: "var(--color-border)", width: "100%" }}
                        aria-label="Pincode"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="enquiry-drawer-footer">
              <a
                href={cartItems.length > 0 && cartCustomer.name.trim() && cartCustomer.phone.trim() && cartCustomer.areaLocation.trim() && /^\d{6}$/.test(cartCustomer.pincode.trim()) ? generateWhatsAppCartUrl() : "#"}
                onClick={handleSendWhatsAppEnquiry}
                target={cartItems.length > 0 && cartCustomer.name.trim() && cartCustomer.phone.trim() && cartCustomer.areaLocation.trim() && /^\d{6}$/.test(cartCustomer.pincode.trim()) ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="button-primary"
                style={{ width: "100%", textAlign: "center", justifyContent: "center", display: "inline-flex", gap: "8px" }}
              >
                <MessageCircle size={16} />
                Send Enquiry on WhatsApp
              </a>
              <p style={{ fontSize: "11px", textAlign: "center", color: "var(--text-muted)", marginTop: "10px" }}>
                Directly connects with Jaymurti Traders (+91 8756659035) with formatted specifications.
              </p>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>

      {/* Floating Desktop Contact Bar */}
      <div className="floating-contact" aria-label="Quick contact actions">
        <a className="floating-call" href={`tel:${businessProfile.phoneHref}`} aria-label="Call now">
          <PhoneCall size={17} aria-hidden="true" />
          <span>Call</span>
        </a>
        <a
          className="floating-whatsapp"
          href={`https://wa.me/${businessProfile.whatsappHref}?text=${encodeURIComponent("Hello Jaymurti Traders, I would like to enquire about Birla Opus paints.")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Official WhatsApp Support"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.36 7.35 9.08 7.41 8.84 7.67C8.6 7.93 7.92 8.57 7.92 9.87C7.92 11.17 8.87 12.43 9 12.6C9.13 12.78 10.84 15.42 13.45 16.55C14.07 16.82 14.56 16.98 14.93 17.1C15.56 17.3 16.12 17.27 16.57 17.2C17.07 17.13 18.12 16.56 18.34 15.95C18.56 15.33 18.56 14.81 18.49 14.7C18.43 14.59 18.26 14.53 18 14.4C17.74 14.27 16.44 13.63 16.2 13.54C15.96 13.45 15.79 13.41 15.62 13.67C15.45 13.93 14.95 14.53 14.8 14.7C14.65 14.87 14.5 14.9 14.24 14.77C13.98 14.64 12.89 14.28 11.6 13.13C10.59 12.23 9.91 11.12 9.71 10.78C9.51 10.43 9.69 10.25 9.82 10.12C9.94 10 10.08 9.81 10.22 9.65C10.36 9.49 10.4 9.36 10.5 9.19C10.6 9.01 10.55 8.87 10.48 8.74C10.41 8.61 9.84 7.22 9.61 6.66C9.38 6.13 9.15 6.2 8.98 6.19C8.82 6.19 8.63 6.19 8.44 6.19" />
          </svg>
          <span>WhatsApp</span>
        </a>
        <a
          className="floating-instagram"
          href={businessProfile.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Official Instagram Account"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span>Instagram</span>
        </a>
        <a
          className="floating-facebook"
          href={businessProfile.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Official Facebook Account"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span>Facebook</span>
        </a>
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          style={{ background: "var(--color-brand-primary)", color: "var(--color-text-on-dark)", border: "1px solid var(--color-brand-secondary)", padding: "0 16px", borderRadius: "999px", display: "inline-flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" }}
        >
          <ShoppingBag size={16} />
          <span>Cart ({cartItems.length})</span>
        </button>
      </div>

      {/* Mobile Bottom Fixed Bar */}
      <div className="mobile-sticky-bar" aria-label="Mobile quick actions">
        <a href={`tel:${businessProfile.phoneHref}`} className="button-ghost" style={{ flex: 1, minHeight: "42px", fontSize: "11px", padding: 0 }}>
          <PhoneCall size={14} style={{ marginRight: "4px" }} /> Call
        </a>
        <a
          href={`https://wa.me/${businessProfile.whatsappHref}?text=${encodeURIComponent("Hello Jaymurti Traders, I would like to enquire about Birla Opus paints.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="button-primary"
          style={{ flex: 1.2, minHeight: "42px", fontSize: "11px", padding: 0, background: "#25d366", color: "#082b18" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "4px" }} aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.36 7.35 9.08 7.41 8.84 7.67C8.6 7.93 7.92 8.57 7.92 9.87C7.92 11.17 8.87 12.43 9 12.6C9.13 12.78 10.84 15.42 13.45 16.55C14.07 16.82 14.56 16.98 14.93 17.1C15.56 17.3 16.12 17.27 16.57 17.2C17.07 17.13 18.12 16.56 18.34 15.95C18.56 15.33 18.56 14.81 18.49 14.7C18.43 14.59 18.26 14.53 18 14.4C17.74 14.27 16.44 13.63 16.2 13.54C15.96 13.45 15.79 13.41 15.62 13.67C15.45 13.93 14.95 14.53 14.8 14.7C14.65 14.87 14.5 14.9 14.24 14.77C13.98 14.64 12.89 14.28 11.6 13.13C10.59 12.23 9.91 11.12 9.71 10.78C9.51 10.43 9.69 10.25 9.82 10.12C9.94 10 10.08 9.81 10.22 9.65C10.36 9.49 10.4 9.36 10.5 9.19C10.6 9.01 10.55 8.87 10.48 8.74C10.41 8.61 9.84 7.22 9.61 6.66C9.38 6.13 9.15 6.2 8.98 6.19C8.82 6.19 8.63 6.19 8.44 6.19" />
          </svg>
          WhatsApp
        </a>
        <a
          href={businessProfile.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button-ghost"
          style={{ minWidth: "42px", width: "42px", minHeight: "42px", padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
          aria-label="Official Instagram Account"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
        <a
          href={businessProfile.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button-ghost"
          style={{ minWidth: "42px", width: "42px", minHeight: "42px", padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
          aria-label="Official Facebook Account"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="button-primary"
          style={{ flex: 1, minHeight: "42px", fontSize: "11px", padding: 0 }}
        >
          <ShoppingBag size={14} style={{ marginRight: "4px" }} /> Cart ({cartItems.length})
        </button>
      </div>

      {/* In-Site Birla Opus Shade Detail Modal */}
      <AnimatePresence>
        {selectedModalShade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="shade-modal-overlay"
            onClick={() => setSelectedModalShade(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedModalShade.name} Shade Details`}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 8 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="shade-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="shade-modal-close"
                onClick={() => setSelectedModalShade(null)}
                aria-label="Close shade details"
              >
                <X size={18} />
              </button>

              <div className="shade-modal-swatch" style={{ background: selectedModalShade.digitalColor }}>
                <span className="shade-modal-swatch-badge">{selectedModalShade.code}</span>
              </div>

              <div className="shade-modal-body">
                <div className="shade-modal-family">
                  Birla Opus · {selectedModalShade.family}
                </div>
                <h3 className="shade-modal-title">{selectedModalShade.name}</h3>

                <div className="shade-modal-disclaimer">
                  <strong>Verification Notice:</strong> {SHADE_VARIATION_DISCLAIMER}
                </div>

                <div className="shade-modal-actions">
                  <button
                    type="button"
                    className="button-primary"
                    style={{ flex: 1.4, justifyContent: "center" }}
                    onClick={() => {
                      addToCart({
                        id: `shade-${selectedModalShade.code.replace(/\s+/g, "-")}`,
                        type: "shade",
                        title: selectedModalShade.name,
                        meta: `Code: ${selectedModalShade.code} · Family: ${selectedModalShade.family}`,
                        colourHex: selectedModalShade.digitalColor,
                      });
                      setSelectedModalShade(null);
                    }}
                  >
                    + Add to Enquiry Cart
                  </button>
                  <a
                    className="button-ghost"
                    href={`https://wa.me/918756659035?text=${encodeURIComponent(
                      `Hello Jaymurti Traders, I am enquiring about Birla Opus shade: ${selectedModalShade.name} (${selectedModalShade.code}) in the ${selectedModalShade.family} colour family. Please confirm availability at Baskhari showroom.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ flex: 1, justifyContent: "center", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <MessageCircle size={15} />
                    WhatsApp Shade
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
