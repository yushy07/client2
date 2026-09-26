import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import GlareHover from "@/components/GlareHover";
import CircularGallery, { type CircularGalleryItem } from "@/components/CircularGallery";
import BorderGlow from "@/components/BorderGlow";
import ServiceScrollStack, { ServiceScrollStackItem } from "@/components/ServiceScrollStack";
import { ProductStories } from "@/components/ProductStories";
import { ArrowLeft, ArrowRight, BadgeCheck, Copy, Heart, Instagram, MapPin, MessageCircle, PhoneCall, Search, ShieldCheck, SlidersHorizontal, Sparkles, Star, X } from "lucide-react";
import { FormEvent, memo, PointerEvent as ReactPointerEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { calculatePaintEstimate, findStoreByPincode, storeDirectory, type SpaceType, type SurfaceType } from "../../../shared/paintTools";
import { businessProfile } from "../../../shared/businessProfile";
import { birlaOpusCategories, birlaOpusProductCount, birlaOpusProducts } from "../../../shared/birlaOpusCatalogue";
import { colourArchiveAssets, colourCollections, colourFamilies, supplementaryProductCategories, textureGroups, textureLibrary } from "../../../shared/discoveryContent";
import { ideaArchive } from "../../../shared/ideaArchive";
import { maxComparisonProducts, toggleComparisonProduct } from "../../../shared/productComparison";
import { paginateProducts } from "../../../shared/productPagination";
import { colourTickerShades } from "../../../shared/colourDirections";
import { birlaOpusDisclaimer, birlaOpusShades, searchBirlaOpusShades, type BirlaOpusShade } from "../../../shared/birlaOpusShades";

type CatalogueProduct = (typeof birlaOpusProducts)[number];
type ProductCardProps = {
  product: CatalogueProduct;
  index: number;
  isImageLoaded: boolean;
  isCompared: boolean;
  onImageLoad: (slug: string) => void;
  onCompare: (slug: string) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerLeave: (event: ReactPointerEvent<HTMLElement>) => void;
};

const ProductCard = memo(function ProductCard({ product, index, isImageLoaded, isCompared, onImageLoad, onCompare, onPointerMove, onPointerLeave }: ProductCardProps) {
  return <article className="product-card" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}><div className="product-image-stage"><div className="product-topline"><span>{product.category}</span><span>{String(index + 1).padStart(2, "0")}</span></div><div className={`product-can ${product.imageUrl ? "with-image" : ""} ${isImageLoaded ? "image-ready" : ""}`} style={{ "--can-colour": product.colour, "--can-text": product.text } as React.CSSProperties}>{product.imageUrl ? <><span className="product-image-skeleton" aria-hidden="true" /><img src={product.imageUrl} alt={`${product.name} product pack`} width={248} height={226} loading={index < 2 ? "eager" : "lazy"} fetchPriority={index < 2 ? "high" : "auto"} decoding="async" onLoad={() => onImageLoad(product.slug)} onError={() => onImageLoad(product.slug)} /></> : <span className="can-label">Birla<br />Opus</span>}</div></div><div className="product-utility" aria-label="Product utilities"><button type="button" aria-label={`Save ${product.name} to favourites`}><Heart size={18} aria-hidden="true" />Favourite</button><button type="button" className={isCompared ? "active" : ""} aria-pressed={isCompared} onClick={() => onCompare(product.slug)}><Copy size={17} aria-hidden="true" />{isCompared ? "Added" : "Compare"}</button></div><div className="product-card-copy"><h3>{product.name}</h3><p>{product.copy}</p><a className="product-card-action" href={product.sourceUrl} target="_blank" rel="noreferrer">Official details <ArrowRight size={12} /></a></div></article>;
});

const getInitialProductFilter = () => {
  const requestedCategory = new URLSearchParams(window.location.search).get("category");
  return requestedCategory && birlaOpusCategories.includes(requestedCategory as (typeof birlaOpusCategories)[number])
    ? requestedCategory
    : "All products";
};

const campaigns = [
  { eyebrow: "Aditya Birla Opus · Authorized Dealer", title: <>Paint your space<br />for <em>better living.</em></>, text: "Explore premium interior and exterior paints, finishes, and practical guidance for your next home project in Baskhari, Ambedkar Nagar.", note: "Colour consultation · Technical guidance", imageUrl: "/storage/storefront/jaymurti-storefront-wide.webp", imageAlt: "Jaymurti Traders Birla Opus paint showroom in Baskhari" },
  { eyebrow: "Colour, Light & Finish", title: <>Where light<br />finds its <em>character.</em></>, text: "Compare calm neutrals, rich colour, and durable finishes chosen to work beautifully in your space and its natural light.", note: "Shukul Bazar · Baskhari · Ambedkar Nagar", imageUrl: "/storage/storefront/jaymurti-counter-straight.webp", imageAlt: "Jaymurti Traders showroom counter with Birla Opus Paints gallery display" },
  { eyebrow: "Paint Systems & Expert Advice", title: <>Surfaces made<br />to <em>last well.</em></>, text: "Find authentic Birla Opus interior, exterior, and specialty finishes with clear advice from the Jaymurti Traders team.", note: "Direct dealer desk · +91 8756659035", imageUrl: "/storage/storefront/jaymurti-finishes-angled.webp", imageAlt: "Jaymurti Traders showroom display board and authorized dealer branding" },
];

const swatches = [
  ["Linen story", "NN 1004", "#D9D1BD", "#171817"],
  ["Sunlit clay", "YR 2078", "#D68D4D", "#171817"],
  ["Quiet moss", "YG 8083", "#55725E", "#FFFFFF"],
  ["Walled garden", "GG 5036", "#304B3E", "#FFFFFF"],
  ["After rain", "BB 5087", "#7889A9", "#FFFFFF"],
  ["Perfectly honest", "RR 3076", "#B84D4A", "#FFFFFF"],
];

const circularColourItems: CircularGalleryItem[] = swatches.map(([label, code, color, textColor]) => ({ label, code, color, textColor }));

function getColourArchiveAsset(role: (typeof colourArchiveAssets)[number]["role"]) {
  const asset = colourArchiveAssets.find((item) => item.role === role);
  if (!asset) throw new Error(`Missing Colours archive asset: ${role}`);
  return asset;
}

const colourCollectionAsset = getColourArchiveAsset("collection");
const colourRoomAsset = getColourArchiveAsset("room-reference");
const colourSwatchAsset = getColourArchiveAsset("swatch-reference");
const colourCollectionStoryAsset = ideaArchive.find((asset) => asset.name === "Personal Colour Testing: Colour Quiz | Birla Opus ") ?? colourCollectionAsset;
const colourTickerLoop = [...colourTickerShades, ...colourTickerShades, ...colourTickerShades];
const roomShadeCatalogue = swatches.map(([name, code, colour, text]) => ({ name, code, colour, text }));
const findIdeaArchiveAsset = (name: string) => ideaArchive.find((asset) => asset.name === name) ?? colourCollectionAsset;
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

const faqs = [
  ["How do I choose the right colour for my room?", "Start with the light the room receives, then choose the mood you want to create. Visit Jaymurti Traders in Shukul Bazar, Baskhari to explore physical shade cards and compare Birla Opus formulations in person."],
  ["Can I get guidance on product quantities and systems?", "Yes. Bring your room dimensions or floor plan to Jaymurti Traders or contact us via WhatsApp (+91 8756659035) for recommendations on primers, putties, and Birla Opus topcoats."],
  ["What is included in a painting estimate?", "Your estimate considers area, surface condition, recommended system, preparation, material quantity, and application. It is a transparent starting point for planning your paint purchase."],
  ["Are your interior paints safe for family homes?", "Our premium interior range is made for comfortable everyday living, with low odour formulations and easy-care finishes. Product-specific details are available on request."],
];

const directionsUrl = businessProfile.googleMapsUrl;
const googleBusinessProfileUrl = businessProfile.googleProfileUrl;
const scrollSections = [
  { id: "top", label: "Home" },
  { id: "shop", label: "Shop" },
  { id: "colours", label: "Colours" },
  { id: "products", label: "Products" },
  { id: "budget", label: "Plan" },
  { id: "product-stories", label: "Stories" },
  { id: "textures", label: "Textures" },
  { id: "services", label: "Services" },
  { id: "finder", label: "Visit" },
  { id: "ideas", label: "Ideas" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
  { id: "footer", label: "Contact" },
] as const;
const primaryNavigationSections = ["shop", "colours", "products", "textures", "services", "finder", "ideas"] as const;
type ScrollSectionId = (typeof scrollSections)[number]["id"];

export default function Home() {
  const [campaign, setCampaign] = useState(0);
  const [filter, setFilter] = useState(getInitialProductFilter);
  const [productPage, setProductPage] = useState(1);
  const [productSort, setProductSort] = useState<"featured" | "az">("featured");
  const [colourFamily, setColourFamily] = useState<string>(colourFamilies[0].name);
  const [colourCollection, setColourCollection] = useState<string>(colourCollections[0].name);
  const [textureGroup, setTextureGroup] = useState<string>(textureGroups[0].name);
  const [ideaQuery, setIdeaQuery] = useState("");
  const [ideaLimit, setIdeaLimit] = useState(12);
  const [space, setSpace] = useState("apartment");
  const [finish, setFinish] = useState("interior");
  const [area, setArea] = useState("");
  const [budgetPin, setBudgetPin] = useState("");
  const [estimate, setEstimate] = useState("");
  const [storePin, setStorePin] = useState("");
  const [storeLookup, setStoreLookup] = useState<{ status: "featured" | "found" | "invalid" | "none"; store: typeof storeDirectory[number] | null }>({ status: "featured", store: storeDirectory[0] });
  const [form, setForm] = useState({ name: "", phone: "", email: "", serviceType: "Premium home painting", pincode: "" });
  const [formValidationMessage, setFormValidationMessage] = useState("");
  const [reviewForm, setReviewForm] = useState({ displayName: "", rating: 0, reviewText: "" });
  const [reviewFormMessage, setReviewFormMessage] = useState("");
  const [loadedProductImages, setLoadedProductImages] = useState<Record<string, boolean>>({});
  const [selectedSwatchCode, setSelectedSwatchCode] = useState(swatches[0][1]);
  const [shadeQuery, setShadeQuery] = useState("");
  const [shadeFamilyFilter, setShadeFamilyFilter] = useState("All");
  const [shadePage, setShadePage] = useState(1);
  const [selectedOpusShade, setSelectedOpusShade] = useState<BirlaOpusShade>(birlaOpusShades[0]);
  const [bannerShadeStep, setBannerShadeStep] = useState(colourTickerShades.length);
  const [isBannerShadeResetting, setIsBannerShadeResetting] = useState(false);
  const [activeScrollSection, setActiveScrollSection] = useState<ScrollSectionId>("top");
  const [roomShadeIndex, setRoomShadeIndex] = useState(0);
  const [colourContextFrameIndex, setColourContextFrameIndex] = useState(0);
  const [collectionStoryFrameIndex, setCollectionStoryFrameIndex] = useState(0);
  const [comparisonSlugs, setComparisonSlugs] = useState<string[]>([]);
  const [comparisonLimitMessage, setComparisonLimitMessage] = useState("");
  const comparisonSlugsRef = useRef<string[]>([]);
  const supplementaryRailRef = useRef<HTMLDivElement>(null);
  const imageLoadQueue = useRef<Set<string>>(new Set());
  const imageLoadFrame = useRef<number | null>(null);
  const enquiry = trpc.enquiries.create.useMutation({
    onSuccess: () => {
      setForm({ name: "", phone: "", email: "", serviceType: "Premium home painting", pincode: "" });
      setFormValidationMessage("");
    },
  });
  const reviewUtils = trpc.useUtils();
  const publishedReviewsQuery = trpc.shopReviews.listPublished.useQuery();
  const reviewSubmission = trpc.shopReviews.create.useMutation({
    onSuccess: (result) => {
      setReviewForm({ displayName: "", rating: 0, reviewText: "" });
      setReviewFormMessage(result.published ? "Thank you. Your review is now visible in the shop reviews." : "Thank you. Your feedback has been submitted successfully.");
      if (result.published) void reviewUtils.shopReviews.listPublished.invalidate();
    },
    onError: (error) => setReviewFormMessage(error.message),
  });
  const activeBannerShade = colourTickerShades[((bannerShadeStep % colourTickerShades.length) + colourTickerShades.length) % colourTickerShades.length];
  const selectBannerShade = (tickerIndex: number) => {
    setBannerShadeStep((current) => {
      const shadeCount = colourTickerShades.length;
      const currentIndex = ((current % shadeCount) + shadeCount) % shadeCount;
      const targetIndex = tickerIndex % shadeCount;
      const forwardDistance = (targetIndex - currentIndex + shadeCount) % shadeCount;
      const backwardDistance = forwardDistance - shadeCount;
      return current + (Math.abs(backwardDistance) < forwardDistance ? backwardDistance : forwardDistance);
    });
  };

  useEffect(() => {
    document.title = "Jaymurti Traders | Birla Opus Paints in Baskhari";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Jaymurti Traders is an authorized Birla Opus paint dealer in Baskhari, Ambedkar Nagar, offering interior and exterior paints, waterproofing, colour consultation, and painting supplies."
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", "https://kumarhardware.vercel.app/");
    }
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setCampaign((current) => (current + 1) % campaigns.length), 6800);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setBannerShadeStep((current) => current + 1), 5000);
    return () => window.clearInterval(interval);
  }, []);

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

  useEffect(() => {
    if (bannerShadeStep >= colourTickerShades.length * 2 || bannerShadeStep < colourTickerShades.length) {
    const resetTimer = window.setTimeout(() => {
      setIsBannerShadeResetting(true);
        setBannerShadeStep(colourTickerShades.length + ((bannerShadeStep % colourTickerShades.length) + colourTickerShades.length) % colourTickerShades.length);
      window.requestAnimationFrame(() => setIsBannerShadeResetting(false));
    }, 820);
    return () => window.clearTimeout(resetTimer);
    }
  }, [bannerShadeStep]);

  useEffect(() => () => {
    if (imageLoadFrame.current !== null) window.cancelAnimationFrame(imageLoadFrame.current);
  }, []);

  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      reveals.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.01, rootMargin: "0px 0px 80px 0px" },
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
      const currentChapter = chapters.reduce<HTMLElement>((current, chapter) => chapter.getBoundingClientRect().top <= marker ? chapter : current, chapters[0]);
      setActiveScrollSection((current) => current === currentChapter.id ? current : currentChapter.id as ScrollSectionId);
    };
    const observer = new IntersectionObserver(
      updateActiveScrollSection,
      { rootMargin: "-24% 0px -58% 0px", threshold: [0.14, 0.32, 0.56] },
    );
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
  const filteredProducts = useMemo(() => filter === "All products" ? birlaOpusProducts : birlaOpusProducts.filter((product) => product.category === filter), [filter]);
  const sortedProducts = useMemo(() => productSort === "az" ? [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name)) : filteredProducts, [filteredProducts, productSort]);
  const productPagination = useMemo(() => paginateProducts(sortedProducts, productPage), [sortedProducts, productPage]);
  const visibleProducts = productPagination.items;
  const activeColourFamily = colourFamilies.find((family) => family.name === colourFamily) ?? colourFamilies[0];
  const activeColourCollection = colourCollections.find((collection) => collection.name === colourCollection) ?? colourCollections[0];
  const activeTextureGroup = textureGroups.find((group) => group.name === textureGroup) ?? textureGroups[0];
  const activeTextureEntries = textureLibrary.filter((entry) => entry.group === activeTextureGroup.name);
  const activeRoomShade = roomShadeCatalogue[roomShadeIndex];
  const activeColourContextFrame = colourContextFrames[colourContextFrameIndex];
  const activeCollectionStoryFrame = collectionStoryFrames[collectionStoryFrameIndex];
  const matchingIdeas = useMemo(() => {
    const normalizedQuery = ideaQuery.trim().toLocaleLowerCase();
    return normalizedQuery ? ideaArchive.filter((idea) => idea.name.toLocaleLowerCase().includes(normalizedQuery)) : ideaArchive;
  }, [ideaQuery]);
  const visibleIdeas = useMemo(() => matchingIdeas.slice(0, ideaLimit), [ideaLimit, matchingIdeas]);
  const matchingShades = useMemo(() => {
    return searchBirlaOpusShades(shadeQuery, shadeFamilyFilter);
  }, [shadeQuery, shadeFamilyFilter]);
  const shadesPerPage = 12;
  const totalShadePages = Math.max(1, Math.ceil(matchingShades.length / shadesPerPage));
  const visibleShades = useMemo(() => {
    const start = (shadePage - 1) * shadesPerPage;
    return matchingShades.slice(start, start + shadesPerPage);
  }, [matchingShades, shadePage]);
  const comparisonProducts = useMemo(() => comparisonSlugs.map((slug) => birlaOpusProducts.find((product) => product.slug === slug)).filter((product): product is CatalogueProduct => Boolean(product)), [comparisonSlugs]);
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
        completedSlugs.forEach((completedSlug) => { next[completedSlug] = true; });
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

  return (
    <div className="site-shell">
      <div className="utility-bar"><span>Official Birla Opus Dealer · <strong className="brand-name-text">JAYMURTI TRADERS</strong> <span className="brand-name-hindi">जयमूर्ति ट्रेडर्स</span></span><span>Shukul Bazar, Baskhari · Call +91 8756659035</span></div>
      <header className="nav">
        <a className="brand" href="#top" aria-label="Birla Opus Paint Jaymurti Traders जयमूर्ति ट्रेडर्स"><img src="/storage/kumar-hardware-logo.png" alt="Jaymurti Traders Logo" width={36} height={36} className="brand-logo" /><span className="brand-bilingual"><span className="brand-name-text">JAYMURTI TRADERS</span><span className="brand-name-hindi">जयमूर्ति ट्रेडर्स</span></span></a>
        <nav className="nav-links" aria-label="Primary navigation">
          {primaryNavigationSections.map((sectionId) => {
            const section = scrollSections.find((item) => item.id === sectionId);
            return <a href={`#${sectionId}`} className={activeScrollSection === sectionId ? "active" : ""} aria-current={activeScrollSection === sectionId ? "page" : undefined} key={sectionId}>{section?.label}</a>;
          })}
        </nav>
      </header>

      <main>
        <section className="hero scroll-chapter" id="top" data-scroll-section data-section-label="Home" aria-label="Featured colour collection">
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="slide-fade" key={`copy-${campaign}`}>
                <div className="hero-brand-lockup"><img src="/storage/kumar-hardware-logo.png" alt="Jaymurti Traders Logo" width={28} height={28} className="hero-brand-logo" /><div className="brand-bilingual"><span className="hero-brand-title">JAYMURTI TRADERS</span><span className="brand-name-hindi">जयमूर्ति ट्रेडर्स</span></div></div>
                <div className="eyebrow">{activeCampaign.eyebrow}</div>
                <h1 className="hero-headline">{activeCampaign.title}</h1>
                <p className="hero-description">{activeCampaign.text}</p>
                <div className="hero-actions"><a href="#colours" className="button-primary">Explore curated palettes <ArrowRight size={15} /></a><a href="#services" className="button-ghost">Schedule design consultation</a></div>
              </div>
              <div className="hero-notes"><span>{activeCampaign.note}</span><span>Scroll to explore ↓</span></div>
            </div>
            <div className="hero-visual slide-fade" key={`visual-${campaign}`}>
              <img src={activeCampaign.imageUrl} alt={activeCampaign.imageAlt} className="hero-image hero-image-ambient" loading="eager" fetchPriority="high" decoding="async" width={720} height={480} />
              <div className="hero-image-shade" /><div className="hero-tile"><img src="/storage/kumar-hardware-logo.png" alt="Official Jaymurti Traders Logo" width={32} height={32} className="hero-tile-logo" /></div>
            </div>
          </div>
        </section>

        <section className="journey-bar" id="journey"><p>Find your signature shade or explore mastercrafted wall systems.</p><form className="journey-search" onSubmit={(event) => event.preventDefault()}><input aria-label="Search colours and products" placeholder="Search by shade code (e.g. NN 1004), tone, or luxury finish..." /><button type="submit" aria-label="Discover shade or wall system">Discover</button></form></section>

        <section className="business-profile reveal scroll-chapter" id="shop" data-scroll-section data-section-label="Shop" data-reveal>
          <div className="business-profile-intro"><div className="eyebrow">Authorized Birla Opus Paint Dealer</div><h2>The Art of Living,<br /><em>Painted to Perfection.</em></h2><p>Visit Jaymurti Traders in Shukul Bazar, Baskhari for Birla Opus interior and exterior paints, waterproofing systems, colour consultation, and dependable technical guidance from first swatch to final coat.</p><div className="business-profile-actions"><a className="business-call" href={`tel:${businessProfile.phoneHref}`}><PhoneCall size={15} />Call the showroom</a><a className="business-visit-link" href="#finder">Plan your visit <ArrowRight size={15} /></a></div><div className="business-profile-note"><span>Open {businessProfile.hours}</span><span>·</span><span>Baskhari · {businessProfile.pincode}</span></div></div>
          <div className="business-visit-card"><div className="business-card-top"><span className="detail-label">Authorized Dealer Credentials</span><span className="business-card-kicker">Jaymurti Traders · जयमूर्ति ट्रेडर्स</span></div><div className="business-address"><MapPin size={20} aria-hidden="true" /><div><span className="detail-label">Showroom address</span><p>{businessProfile.address}</p><span className="detail-caption">{businessProfile.landmark}</span></div></div><div className="business-profile-details"><div><span className="detail-label">Personal consultation desk</span><strong>Jaymurti Traders <span className="brand-name-hindi" style={{ fontSize: "12px", display: "inline-block", marginLeft: "4px" }}>जयमूर्ति ट्रेडर्स</span></strong><a className="detail-phone" href={`tel:${businessProfile.phoneHref}`}>{businessProfile.phoneDisplay}</a></div><div><span className="detail-label">Showroom hours</span><strong>{businessProfile.hours}</strong><span className="detail-caption">Pincode {businessProfile.pincode}</span></div><div className="business-social"><span className="detail-label">Showroom journal</span><a href={businessProfile.instagramUrl} target="_blank" rel="noopener noreferrer">{businessProfile.instagramHandle} <ArrowRight size={14} /></a><span className="detail-caption">Instagram</span></div></div></div>
        </section>

        <section className="colours visual-colours-refinement reveal scroll-chapter" id="colours" data-scroll-section data-section-label="Colours" data-reveal>
          <div className="colour-archive-hero visual-archive-hero visual-archive-compact" style={{ "--active-banner-shade": activeBannerShade.hex } as React.CSSProperties}>
            <div className="colour-archive-shade" />
            <div className="colour-archive-hero-copy"><div className="eyebrow">The Spectral Archive</div><p className="colour-archive-label">Now showing · {activeBannerShade.name}</p><h2>Find the shade<br />that anchors the architecture.</h2><p>Curate a harmonious palette designed around your space’s natural daylight, material textures, and living rhythm.</p><div className="colour-archive-actions"><a className="button-primary" href="#enquiry">Schedule colour consultation <ArrowRight size={15} /></a><a className="colour-archive-link" href="https://www.birlaopus.com/colour-catalogue" target="_blank" rel="noopener noreferrer">Official Birla Opus shade guide <ArrowRight size={14} /></a></div></div>
            <div className="colour-archive-specimen" aria-live="polite"><span className="specimen-eyebrow">Now Showing</span><strong className="specimen-name">{activeBannerShade.name}</strong><span className="specimen-code">{activeBannerShade.code}</span></div>
            <div className="colour-archive-ticker" aria-label="Shade ticker. Select any shade to display it in the banner."><div className={`colour-archive-ticker-track${isBannerShadeResetting ? " is-resetting" : ""}`} style={{ "--shade-step": bannerShadeStep } as React.CSSProperties}>{colourTickerLoop.map((shade, index) => <button type="button" className={`colour-archive-ticker-swatch${index === bannerShadeStep ? " active" : ""}`} style={{ "--ticker-shade": shade.hex } as React.CSSProperties} key={`${shade.code}-${index}`} onClick={() => selectBannerShade(index)} aria-pressed={index === bannerShadeStep} aria-label={`Display ${shade.name}, ${shade.code}`}><span>{String(shade.position).padStart(3, "0")}</span><i aria-hidden="true" /><strong>{shade.name}</strong><em>{shade.code}</em></button>)}</div></div>
          </div>

          <div className="colour-section-intro visual-colour-intro"><div><div className="eyebrow">Atmospheric Hues, Tailored by Family</div><h3>Colour, made<br />more personal.</h3></div><p>Select a tonal family, then bring your interior floor plans or material swatches to Jaymurti Traders for expert lighting harmonization.</p></div>
          <div className="colour-family-explorer">
            <div className="colour-family-focus colour-family-focus-new" style={{ "--family-tone": activeColourFamily.tone, "--family-text": activeColourFamily.text } as React.CSSProperties}><span>Selected family</span><strong>{activeColourFamily.name}</strong><em>Explore colour directions that suit your room.</em><a href="#enquiry">Ask about this family <ArrowRight size={14} /></a></div>
            <div className="colour-family-list" role="list" aria-label="Colour families">{colourFamilies.map((family) => <button className={family.name === colourFamily ? "active" : ""} onClick={() => setColourFamily(family.name)} key={family.name} role="listitem"><span style={{ background: family.tone }} /><strong>{family.name}</strong><em>{family.name === colourFamily ? "Selected" : "Select family"}</em></button>)}</div>
            <figure className="colour-reference-card colour-reference-room room-shade-catalogue" style={{ "--room-shade": activeRoomShade.colour } as React.CSSProperties}><img key={activeRoomShade.code} src={colourRoomAsset.imageUrl} alt="The same room visualised in different colour directions" width={600} height={400} loading="lazy" decoding="async" /><div className="room-shade-catalogue-wash" aria-hidden="true" /><figcaption><span>Same room · new mood · changes every 5 seconds</span><strong>{activeRoomShade.name} · {activeRoomShade.code}</strong></figcaption></figure>
          </div>

          <div className="colour-swatch-studio visual-swatch-studio">
            <div className="colour-swatch-heading"><div><div className="eyebrow">Signature Tone Directions</div><h3>Sample curated<br />shades in living light.</h3></div><p>These signature architectural directions anchor the ambiance of your space. Compare depth and undertones in room daylight before finalizing formulation.</p></div>
            <BorderGlow className="colour-gallery-glow" animated><CircularGallery items={circularColourItems} activeCode={selectedSwatchCode} onSelect={setSelectedSwatchCode} /></BorderGlow>
            <div className="colour-swatch-layout"><div className="swatches swatches-new" role="list" aria-label="Colour swatch picker">{swatches.map(([name, code, colour, text], index) => <button className={`swatch ${selectedSwatchCode === code ? "active" : ""}`} style={{ "--swatch": colour, "--text": text } as React.CSSProperties} onClick={() => setSelectedSwatchCode(code)} aria-pressed={selectedSwatchCode === code} key={code} role="listitem"><span className="swatch-code">{code}</span><span className="swatch-name">{name}</span><span className="swatch-index">0{index + 1} / 06</span></button>)}</div><figure className="colour-reference-card colour-reference-swatches colour-context-catalogue"><img key={activeColourContextFrame.label} src={activeColourContextFrame.asset.imageUrl} alt={activeColourContextFrame.asset.name} width={600} height={400} loading="lazy" decoding="async" /><figcaption><span>Moving inspiration catalogue · {activeColourContextFrame.label}</span><strong>{activeColourContextFrame.asset.name}</strong></figcaption></figure></div>
            <p className="swatch-selection" aria-live="polite">Selected shade: <strong>{swatches.find((swatch) => swatch[1] === selectedSwatchCode)?.[0]}</strong> · {selectedSwatchCode}</p>
            <aside className="colour-guidance-strip visual-guidance-strip"><div><span className="eyebrow">From Inspiration to Impeccable Execution</span><h4>Use the spectral ticker above for shades. Use this 3-step protocol to perfect your room ambiance.</h4></div><ol><li><span>01</span><p>Curate your foundational tone direction.</p></li><li><span>02</span><p>Test swatch depth under morning, midday, and warm evening light.</p></li><li><span>03</span><p>Verify formulation and sheen level at Jaymurti Traders.</p></li></ol></aside>
          </div>

          {/* Native Birla Opus Shade Browser Studio */}
          <div className="shade-explorer-studio" id="shade-browser">
            <div className="shade-explorer-header">
              <div className="shade-explorer-title">
                <div className="eyebrow" style={{ color: "var(--saffron)" }}>Official Birla Opus Shade Catalogue</div>
                <h3>Explore Birla Opus Shades</h3>
                <p>Search over 150 official shades by shade code (e.g. <strong>NN 9084</strong>, <strong>WW 0034</strong>) or name (e.g. <em>A Camel Called Rani</em>), filter by colour family, and enquire directly with our showroom team.</p>
              </div>

              <div className="shade-search-box">
                <Search size={16} aria-hidden="true" style={{ color: "rgba(255,255,255,0.6)" }} />
                <input
                  type="text"
                  value={shadeQuery}
                  onChange={(e) => {
                    setShadeQuery(e.target.value);
                    setShadePage(1);
                  }}
                  placeholder="Search code (NN 9084) or name..."
                  aria-label="Search Birla Opus shades by code or name"
                />
                {shadeQuery && (
                  <button
                    type="button"
                    className="shade-search-clear"
                    onClick={() => {
                      setShadeQuery("");
                      setShadePage(1);
                    }}
                    aria-label="Clear shade search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Colour family filter pills */}
            <div className="shade-family-filter-pills" role="tablist" aria-label="Filter shades by colour family">
              <button
                type="button"
                className={`shade-family-pill ${shadeFamilyFilter === "All" ? "active" : ""}`}
                onClick={() => {
                  setShadeFamilyFilter("All");
                  setShadePage(1);
                }}
                role="tab"
                aria-selected={shadeFamilyFilter === "All"}
              >
                All Families ({birlaOpusShades.length})
              </button>
              {colourFamilies.map((fam) => {
                const count = birlaOpusShades.filter((s) => s.family === fam.name || (fam.name === "Greens" && (s.family === "Greens" || s.family === "Yellow-Greens" || s.family === "Blue-Greens")) || (fam.name === "Blues" && (s.family === "Blues" || s.family === "Blue-Greens"))).length;
                return (
                  <button
                    type="button"
                    key={fam.name}
                    className={`shade-family-pill ${shadeFamilyFilter === fam.name ? "active" : ""}`}
                    onClick={() => {
                      setShadeFamilyFilter(fam.name);
                      setShadePage(1);
                    }}
                    role="tab"
                    aria-selected={shadeFamilyFilter === fam.name}
                  >
                    <span className="shade-family-pill-dot" style={{ background: fam.tone }} />
                    {fam.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* Shade cards grid */}
            {visibleShades.length > 0 ? (
              <div className="shade-grid" role="list" aria-label="Birla Opus shades">
                {visibleShades.map((shade) => {
                  const isSelected = selectedOpusShade.code === shade.code;
                  return (
                    <article
                      key={shade.code}
                      className={`shade-card ${isSelected ? "active" : ""}`}
                      onClick={() => setSelectedOpusShade(shade)}
                      role="listitem"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedOpusShade(shade);
                        }
                      }}
                      aria-label={`${shade.name}, code ${shade.code}, family ${shade.family}`}
                    >
                      <div className="shade-card-swatch" style={{ background: shade.color }} />
                      <div className="shade-card-meta">
                        <div>
                          <div className="shade-card-code">{shade.code}</div>
                          <div className="shade-card-name">{shade.name}</div>
                        </div>
                        <div className="shade-card-footer">
                          <span>{shade.family}</span>
                          <span className="shade-card-enquire-btn">Select</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="shade-empty-result">
                <p>No shades match &ldquo;{shadeQuery}&rdquo; in {shadeFamilyFilter === "All" ? "any family" : shadeFamilyFilter}.</p>
                <button
                  type="button"
                  className="button-ghost"
                  style={{ marginTop: "12px", display: "inline-block" }}
                  onClick={() => {
                    setShadeQuery("");
                    setShadeFamilyFilter("All");
                    setShadePage(1);
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {matchingShades.length > shadesPerPage && (
              <div className="shade-browser-pagination">
                <div className="shade-browser-status">
                  Showing {(shadePage - 1) * shadesPerPage + 1}–{Math.min(shadePage * shadesPerPage, matchingShades.length)} of {matchingShades.length} shades (Page {shadePage} of {totalShadePages})
                </div>
                <div className="shade-browser-actions">
                  <button
                    type="button"
                    onClick={() => setShadePage((p) => Math.max(1, p - 1))}
                    disabled={shadePage <= 1}
                    aria-label="Previous page of shades"
                  >
                    <ArrowLeft size={14} /> Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setShadePage((p) => Math.min(totalShadePages, p + 1))}
                    disabled={shadePage >= totalShadePages}
                    aria-label="Next page of shades"
                  >
                    Next <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Selected Shade Full Preview Card with WhatsApp enquiry */}
            {selectedOpusShade && (
              <div className="shade-selected-preview" aria-live="polite">
                <div className="shade-preview-swatch-large" style={{ background: selectedOpusShade.color }} />
                <div className="shade-preview-details">
                  <span className="shade-preview-kicker">Selected Birla Opus Shade · {selectedOpusShade.family}</span>
                  <h4 className="shade-preview-name">{selectedOpusShade.name}</h4>
                  <div className="shade-preview-code">Shade Code: {selectedOpusShade.code}</div>
                  <p className="shade-preview-meta">
                    Source: {selectedOpusShade.source}. To see physical swatch depth, sheen formulation (Gloss, Shyne, Matt, or Satin), and interior/exterior base recommendations, enquire directly with Jaymurti Traders.
                  </p>
                  <div className="shade-preview-actions">
                    <a
                      className="shade-preview-whatsapp-btn"
                      href={`https://wa.me/${businessProfile.whatsappHref}?text=${encodeURIComponent(
                        `Hello Jaymurti Traders,\nI would like to enquire about the Birla Opus shade:\n${selectedOpusShade.name} (${selectedOpusShade.code}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Enquire on WhatsApp about ${selectedOpusShade.name} (${selectedOpusShade.code})`}
                    >
                      <MessageCircle size={15} aria-hidden="true" />
                      <span>Enquire about this shade on WhatsApp</span>
                    </a>
                    <a
                      className="shade-preview-call-btn"
                      href={`tel:${businessProfile.phoneHref}`}
                      aria-label="Call showroom for shade guidance"
                    >
                      <PhoneCall size={14} aria-hidden="true" />
                      <span>Call showroom desk</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Official Disclaimer */}
            <p className="shade-disclaimer">
              {birlaOpusDisclaimer}
            </p>
          </div>

          <div className="colour-collection-story visual-collection-story">
            <figure className="colour-collection-image colour-collection-catalogue"><img key={activeCollectionStoryFrame.label} src={activeCollectionStoryFrame.asset.imageUrl} alt={activeCollectionStoryFrame.asset.name} width={600} height={400} loading="lazy" decoding="async" /><figcaption>Moving collections catalogue · {activeCollectionStoryFrame.label}</figcaption></figure>
            <div className="colour-collection-copy"><div className="eyebrow">The India Iconic Series</div><h3>Narrative palettes rooted in<br />heritage, earth, and design.</h3><div className="collection-tabs" role="tablist" aria-label="Colour collections">{colourCollections.map((collection) => <button role="tab" aria-selected={collection.name === colourCollection} className={collection.name === colourCollection ? "active" : ""} onClick={() => setColourCollection(collection.name)} key={collection.name}>{collection.name}</button>)}</div><article className="collection-focus" style={{ "--collection-tone": activeColourCollection.tone, "--collection-text": activeColourCollection.text } as React.CSSProperties}><span>India Iconic</span><h4>{activeColourCollection.name}</h4><p>{activeColourCollection.descriptor}</p><a href={`https://www.birlaopus.com/colour-catalogue/collection/${activeColourCollection.slug}`} target="_blank" rel="noopener noreferrer">View official collection <ArrowRight size={14} /></a></article></div>
          </div>
        </section>

        <section className="catalogue visual-catalogue-refinement reveal scroll-chapter" id="products" data-scroll-section data-section-label="Products" data-reveal>
          <div className="catalogue-header visual-catalogue-header"><div><div className="eyebrow">Master Formulation Catalogue</div><h2 className="section-title">Formulations Engineered<br />for Distinction.</h2><p className="section-lead">Explore {birlaOpusProductCount} mastercrafted Birla Opus formulations spanning Ultra-Luxury Interior Emulsions, All-Weather Exterior Shields, Waterproofing Barriers, and Designer Enamels.</p></div><div className="filter-pills" aria-label="Filter products">{["All products", ...birlaOpusCategories].map((item) => <button onClick={() => { setFilter(item); setProductPage(1); }} className={filter === item ? "active" : ""} key={item}>{item}</button>)}</div></div>
          <div className="catalogue-summary"><span>{filter === "All products" ? "All official master formulations" : filter}</span><span>{filteredProducts.length} products</span></div>
          <div className="catalogue-tools"><span><SlidersHorizontal size={14} /> Sort formulations</span><select value={productSort} onChange={(event) => { setProductSort(event.target.value as "featured" | "az"); setProductPage(1); }} aria-label="Sort products"><option value="featured">Featured curation</option><option value="az">A–Z Alphabetical</option></select><em>Price sorting becomes available when pricing is added.</em></div>
          {comparisonProducts.length > 0 && <aside className="comparison-tray" aria-label="Selected product comparison"><div className="comparison-heading"><div><span>Compare formulations</span><strong>{comparisonProducts.length} of {maxComparisonProducts} selected</strong></div><p>{comparisonProducts.length < 2 ? "Select one more product to compare specifications side by side." : "Review the selected formulations at a glance."}</p><button onClick={clearProductComparison}>Clear selection</button></div><div className="comparison-grid">{comparisonProducts.map((product) => <article key={product.slug}><div className="comparison-product-image">{product.imageUrl ? <img src={product.imageUrl} alt={`${product.name} product pack`} width={120} height={96} loading="lazy" decoding="async" /> : <span>Birla<br />Opus</span>}</div><div><span>{product.category}</span><h3>{product.name}</h3><p>{product.family} range</p><a href={product.sourceUrl} target="_blank" rel="noopener noreferrer">Official details <ArrowRight size={12} /></a></div><button className="comparison-remove" onClick={() => toggleProductComparison(product.slug)} aria-label={`Remove ${product.name} from comparison`}><X size={15} /></button></article>)}</div></aside>}
          {comparisonLimitMessage && <p className="comparison-message" role="status">{comparisonLimitMessage}</p>}
          <div className="products-grid">{visibleProducts.map((product, index) => <ProductCard product={product} index={index} isImageLoaded={Boolean(loadedProductImages[product.slug])} isCompared={comparisonSlugs.includes(product.slug)} onImageLoad={markProductImageLoaded} onCompare={toggleProductComparison} onPointerMove={handleProductTilt} onPointerLeave={resetProductTilt} key={product.sourceUrl} />)}</div>
          {productPagination.pageCount > 1 && <nav className="catalogue-pagination" aria-label="Product pages"><button type="button" onClick={() => setProductPage((current) => Math.max(1, current - 1))} disabled={productPagination.page === 1}><ArrowLeft size={14} />Previous page</button><span><strong>Page {productPagination.page} of {productPagination.pageCount}</strong><em>Showing {productPagination.startIndex + 1}–{productPagination.endIndex} of {sortedProducts.length}</em></span><button type="button" onClick={() => setProductPage((current) => Math.min(productPagination.pageCount, current + 1))} disabled={productPagination.page === productPagination.pageCount}>Next page<ArrowRight size={14} /></button></nav>}
          <div className="supplementary-products visual-supplementary visual-coral-discovery"><div className="supplementary-heading"><div className="eyebrow">Substrate & Specialized Systems</div><h3>Beyond wall paint.</h3><div className="supplementary-rail-tools"><p className="supplementary-scroll-cue"> <ArrowRight size={14} aria-hidden="true" /></p><div className="supplementary-rail-controls" aria-label="Discovery path controls"><button type="button" onClick={() => scrollSupplementaryRail(-1)} aria-label="Show previous discovery path"><ArrowLeft size={16} aria-hidden="true" /></button><button type="button" onClick={() => scrollSupplementaryRail(1)} aria-label="Show next discovery path"><ArrowRight size={16} aria-hidden="true" /></button></div></div></div><div className="supplementary-grid" ref={supplementaryRailRef} role="list" aria-label="Explore more Birla Opus product categories" tabIndex={0}>{supplementaryProductCategories.map((category) => <a href="https://www.birlaopus.com/paint-products" target="_blank" rel="noopener noreferrer" className="supplementary-card" key={category.name} role="listitem"><span>{category.name}</span><p>{category.note}</p><ArrowRight size={16} /></a>)}</div></div>
        </section>

        <section className="calculator reveal scroll-chapter" id="budget" data-scroll-section data-section-label="Plan" data-reveal>
          <div className="calculator-intro"><div><div className="eyebrow">Precision Material Estimator</div><h2 className="section-title">Calculate your room transformation with mathematical precision.</h2><p className="section-lead">A transparent estimate is the cornerstone of great design. Input your carpet area and architectural parameters to receive an instant planning range for primers, putties, and Birla Opus topcoats.</p></div><div className="calculator-stat"><strong>Birla Opus</strong><span>Authorized Dealer Guidance</span></div></div>
          <div className="calculator-form visual-calculator-form-compact"><div className="form-kicker">Your paint budget</div><label className="selection-label">What are you painting?</label><div className="option-grid">{[["apartment", "Apartment"], ["villa", "Villa / Bungalow"], ["studio", "Studio"], ["commercial", "Commercial" ]].map(([value, label]) => <button className={space === value ? "active" : ""} onClick={() => setSpace(value)} key={value}>{label}</button>)}</div><label className="selection-label">Surface</label><div className="finish-toggle"><button className={finish === "interior" ? "active" : ""} onClick={() => setFinish("interior")}>Interior</button><button className={finish === "exterior" ? "active" : ""} onClick={() => setFinish("exterior")}>Exterior</button></div><div className="calc-inputs"><input value={area} onChange={(event) => setArea(event.target.value)} inputMode="numeric" placeholder="Carpet area (sq ft)" aria-label="Carpet area in square feet" /><input value={budgetPin} onChange={(event) => setBudgetPin(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" placeholder="Pincode" aria-label="6-digit Pincode" /></div><div className="calculate-action"><button className="button-primary" onClick={calculateBudget}>Calculate estimate <ArrowRight size={14} /></button>{estimate && <output className="calc-result">{estimate}</output>}</div></div>
        </section>

        <ProductStories />

        <section className="texture-studio visual-texture-refinement visual-texture-compact reveal scroll-chapter" id="textures" data-scroll-section data-section-label="Textures" data-reveal>
          <div className="texture-studio-header visual-texture-header"><div className="texture-studio-intro"><div className="eyebrow">Architectural Tactility & Relief</div><h2 className="section-title">Texture gives colour<br />sculptural depth.</h2><p className="section-lead">Explore 21 bespoke tactile surfaces—from raw mineral stone and fluid clay to pearl marmorino. Visit Jaymurti Traders to touch and examine physical sample panels in person.</p></div><div className="texture-studio-note"><span>Curated tactile library</span><strong>{textureLibrary.length} surface studies</strong><p>Save a design reference, bring a room photo, and touch physical sample panels at Jaymurti Traders.</p><a className="arrow-link" href="#enquiry">Consult on texture systems <ArrowRight size={15} /></a></div></div>
          <div className="texture-tabs visual-texture-tabs" role="tablist" aria-label="Texture groups">{textureGroups.map((group) => <button role="tab" aria-selected={group.name === textureGroup} className={group.name === textureGroup ? "active" : ""} onClick={() => setTextureGroup(group.name)} key={group.name}>{group.name}</button>)}</div>
          <div className="texture-selection-heading"><div><span className="texture-kicker">{activeTextureGroup.name} collection</span><h3>{activeTextureGroup.description}</h3></div><p aria-live="polite">Auto-rotates to the next texture world every 10 seconds</p></div>
          <div className="texture-gallery" aria-live="polite">{activeTextureEntries.map((texture, index) => <article className="texture-card" key={texture.name}><GlareHover className="texture-glare" glareColor="#fff6de" glareOpacity={0.24} glareAngle={-30} glareSize={270} transitionDuration={520}><div className="texture-card-image"><img src={texture.imageUrl} alt={texture.name} loading={index < 2 ? "eager" : "lazy"} decoding="async" width={600} height={index === 0 ? 468 : 571} /></div></GlareHover><div className="texture-card-copy"><span>{activeTextureGroup.name} · {String(index + 1).padStart(2, "0")}</span><h4>{texture.name}</h4><a href="#enquiry">Consult on application system <ArrowRight size={13} /></a></div></article>)}</div>
          <aside className="texture-visit-guide"><div><span className="texture-kicker">From Substrate to Sculpture</span><h3>Feel the surface.<br />Master the system.</h3></div><p>Texture imagery reflects creative possibilities. Visit Jaymurti Traders with your room dimensions for precise guidance on surface preparation, primer application, and Birla Opus texture artisans.</p><a className="button-primary" href="#shop">Schedule showroom visit <ArrowRight size={15} /></a></aside>
        </section>

        <section className="services visual-services-compact reveal scroll-chapter" id="services" data-scroll-section data-section-label="Services" data-reveal><div className="services-showcase visual-services-showcase-compact"><div className="eyebrow">Bespoke Paintcraft & Advisory</div><h2 className="section-title">Flawless execution from foundation to finish.</h2><p className="section-lead">Whether designing a contemporary home or refreshing an interior residence, Jaymurti Traders delivers authentic Birla Opus product recommendations, shade selection, and technical substrate guidance.</p><a className="arrow-link" href="#enquiry">Request a bespoke quote <ArrowRight size={16} /></a><ServiceScrollStack className="service-steps"><ServiceScrollStackItem className="service-step"><span>01. The colour visit</span><span>Personal</span></ServiceScrollStackItem><ServiceScrollStackItem className="service-step"><span>02. Product guidance</span><span>Practical</span></ServiceScrollStackItem><ServiceScrollStackItem className="service-step"><span>03. Project finish</span><span>Beautiful</span></ServiceScrollStackItem></ServiceScrollStack></div>
          <div className="enquiry-panel visual-enquiry-compact" id="enquiry"><h3>Begin your architectural<br />transformation.</h3><p>Share your project details and our paint advisors will connect to curate your personalized palette and specification.</p><form onSubmit={submitEnquiry} noValidate><div className="enquiry-grid"><input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" aria-label="Your name" /><input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Phone number" aria-label="Phone number" /><input className="full" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email address" aria-label="Email address" /><select value={form.serviceType} onChange={(event) => setForm({ ...form, serviceType: event.target.value })} aria-label="Service type"><option>Premium home painting</option><option>Colour consultation</option><option>Exterior renewal</option><option>Waterproofing consultation</option></select><input value={form.pincode} onChange={(event) => setForm({ ...form, pincode: event.target.value.replace(/\D/g, "").slice(0, 6) })} inputMode="numeric" placeholder="Pincode" aria-label="Pincode" /></div><button className="enquiry-submit" type="submit" disabled={enquiry.isPending}>{enquiry.isPending ? "Sending…" : "Schedule priority consultation"}</button>{formValidationMessage && <p className="form-message" role="alert">{formValidationMessage}</p>}{enquiry.isSuccess && <p className="form-message">Thank you — your consultation request is with our showroom team.</p>}{enquiry.error && <p className="form-message" role="alert">{enquiry.error.message}</p>}</form></div>
        </section>

        <section className="trust-strip reveal" data-reveal aria-label="Why choose Jaymurti Traders"><div><BadgeCheck size={20} /><span>Authorized Birla Opus Paint Dealer</span></div><div><ShieldCheck size={20} /><span>Substrate & moisture diagnostics for every surface</span></div><div><Sparkles size={20} /><span>Bespoke colour curation & sheen consultation</span></div></section>

        <section className="finder visual-finder-refinement visual-finder-compact reveal scroll-chapter" id="finder" data-scroll-section data-section-label="Visit" data-reveal><div className="finder-layout"><div><div className="eyebrow">Showroom Destination</div><h2 className="section-title">Experience colour in person.</h2><p className="section-lead">Visit Jaymurti Traders at Shukul Bazar, Baskhari, Ambedkar Nagar. View live tinting, feel physical finish panels, and consult directly with our paint specialists.</p><form className="store-lookup" onSubmit={(event) => { event.preventDefault(); findStore(); }}><input value={storePin} onChange={(event) => setStorePin(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" placeholder="Enter 224129 to locate us" aria-label="Store finder pincode" /><button type="submit">Find the showroom</button></form></div><div className="store-result"><div className="store-result-content">{storeLookup.store ? <><span className="store-result-label">{storeLookup.status === "found" ? "Your Authorized Birla Opus Dealer" : "Authorized Birla Opus Dealer"}</span><h3>{storeLookup.store.name}</h3><div className="store-meta"><span>{storeLookup.store.address}<br />{storeLookup.store.city}</span><span>{storeLookup.store.hours}<br /><a href={`tel:${storeLookup.store.phone.replace(/\s/g, "")}`}>{storeLookup.store.phone}</a>{storeLookup.store.instagram && <><br /><a href={businessProfile.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram {storeLookup.store.instagram}</a></>}</span></div></> : <><span className="store-result-label">{storeLookup.status === "invalid" ? "Pincode required" : "Not in this service area"}</span><h3>{storeLookup.status === "invalid" ? "Enter a valid 6-digit pincode." : "Visit Jaymurti Traders in Baskhari."}</h3><div className="store-meta"><span>{storeLookup.status === "invalid" ? "Use the pincode for your planned visit." : "Our verified shop pincode is 224129."}</span><span>Call +91 8756659035 for help.</span></div></>}</div></div></div></section>

        <section className="location-map visual-location-refinement visual-map-compact reveal" data-reveal><div className="location-map-copy"><div className="eyebrow">Showroom Location</div><h2 className="section-title">Your showroom visit,<br />made effortless.</h2><p className="section-lead">Located at Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh. Bring your floor plans, room photos, or fabric references, and we will formulate the perfect paint system.</p><a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="map-directions"><MapPin size={16} />Get directions <ArrowRight size={15} /></a></div><div className="shop-map"><iframe className="shop-map-canvas" title="Jaymurti Traders location map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?output=embed&q=${encodeURIComponent(businessProfile.address)}`} /><div className="shop-map-overlay"><MapPin size={16} /><span>{businessProfile.landmark}</span></div></div></section>

        <section className="ideas visual-ideas-compact reveal scroll-chapter" id="ideas" data-scroll-section data-section-label="Ideas" data-reveal>
          <div className="section-header visual-ideas-header"><div><div className="eyebrow">Curated Architectural Concepts</div><h2 className="section-title">Spaces designed<br />for living art.</h2><p className="section-lead">Explore high-concept interior decor, dopamine home aesthetics, and timeless Scandinavian minimalism curated by Birla Opus design studios.</p></div><a className="arrow-link" href="https://www.birlaopus.com/blog" target="_blank" rel="noopener noreferrer">Open official ideas <ArrowRight size={16} /></a></div>
          <div className="ideas-archive-toolbar"><p><strong>{matchingIdeas.length}</strong> {matchingIdeas.length === 1 ? "concept" : "concepts"} available</p><label className="ideas-search"><Search size={16} aria-hidden="true" /><input value={ideaQuery} onChange={(event) => { setIdeaQuery(event.target.value); setIdeaLimit(12); }} placeholder="Search design concepts and decor themes" aria-label="Search the Ideas archive" /></label></div>
          {visibleIdeas.length > 0 ? <><div className="ideas-archive-grid" role="list" aria-label="Ideas archive">{visibleIdeas.map((idea, index) => <article className="ideas-archive-card" role="listitem" key={idea.name}><a href={idea.sourceUrl} target="_blank" rel="noopener noreferrer"><img src={idea.imageUrl} alt={idea.name} loading={index < 8 ? "eager" : "lazy"} decoding="async" width={300} height={220} /><div><span>Curated concept · {String(index + 1).padStart(2, "0")}</span><h3>{idea.name}</h3><em>View original <ArrowRight size={14} aria-hidden="true" /></em></div></a></article>)}</div>{ideaLimit < matchingIdeas.length && <div className="ideas-archive-actions"><button type="button" onClick={() => setIdeaLimit((current) => Math.min(current + 12, matchingIdeas.length))}>Show {Math.min(12, matchingIdeas.length - ideaLimit)} more concepts <ArrowRight size={15} /></button></div>}</> : <p className="ideas-empty">No archive items match “{ideaQuery}”. Try another search term.</p>}
          <aside className="ideas-visit-guide visual-ideas-visit-compact" aria-label="Plan your colour visit"><div className="ideas-visit-copy"><div className="eyebrow">From Creative Vision to Reality</div><h3>Bring your floor plans.<br /><em>Leave with a complete specification.</em></h3><p>Bring your saved swatches, fabric samples, or room photographs. Jaymurti Traders will align your aesthetic direction with the exact Birla Opus formulation, finish, and sheen.</p><div className="ideas-visit-actions"><a className="ideas-primary-action" href="#shop"><MapPin size={16} />Plan your showroom visit <ArrowRight size={15} /></a><a className="ideas-phone-action" href={`tel:${businessProfile.phoneHref}`}><PhoneCall size={15} />Call the showroom</a></div></div><div className="ideas-visit-facts"><div><span>Showroom point</span><strong>{businessProfile.landmark}</strong><em>Shukul Bazar · Baskhari</em></div><div><span>Open for visits</span><strong>{businessProfile.hours}</strong><em>Pincode {businessProfile.pincode}</em></div><div><span>Consultation Desk</span><a href={`tel:${businessProfile.phoneHref}`}>{businessProfile.phoneDisplay}</a><em>Formulation & finish guidance</em></div></div></aside>
        </section>

        <section className="shop-reviews visual-reviews-compact reveal scroll-chapter" id="reviews" data-scroll-section data-section-label="Reviews" data-reveal>
          <div className="review-intro"><div><div className="eyebrow">Verified Client Experiences</div><h2 className="section-title">Voices of transformed<br />living spaces.</h2><p className="section-lead">Discover how homeowners, architects, and interior designers elevated their spaces. Reviews rated 3 stars or higher appear here automatically.</p></div><a className="google-review-placeholder" href={googleBusinessProfileUrl} target="_blank" rel="noopener noreferrer" aria-label="Review Jaymurti Traders on Google"><div><span>Google Business Profile</span><strong>Review us on Google</strong><p className="google-review-sub">See verified showroom listing & directions</p></div><ArrowRight size={15} /></a></div>
          <div className="review-layout">
            <div className="approved-reviews visual-review-summary-card" aria-live="polite"><div className="review-summary"><div><span className="review-summary-label">Showroom reviews</span><strong>{publishedReviewsQuery.data?.averageRating ? publishedReviewsQuery.data.averageRating.toFixed(1) : "—"}</strong><div className="review-stars" role="img" aria-label={publishedReviewsQuery.data?.averageRating ? `${publishedReviewsQuery.data.averageRating.toFixed(1)} out of 5 stars` : "No public rating yet"}>{Array.from({ length: 5 }, (_, index) => <Star key={index} size={17} fill={publishedReviewsQuery.data?.averageRating && index < Math.round(publishedReviewsQuery.data.averageRating) ? "currentColor" : "none"} />)}</div></div><div className="review-summary-side"><p>{publishedReviewsQuery.data?.reviews.length ? `${publishedReviewsQuery.data.reviews.length} public ${publishedReviewsQuery.data.reviews.length === 1 ? "review" : "reviews"}` : "3–5 star reviews will appear here automatically."}</p><a href={googleBusinessProfileUrl} target="_blank" rel="noopener noreferrer" className="review-summary-google-link">View on Google <ArrowRight size={12} /></a></div></div>{publishedReviewsQuery.isLoading ? <p className="review-empty">Loading showroom reviews…</p> : publishedReviewsQuery.data?.reviews.length ? <div className="approved-review-list" role="list">{publishedReviewsQuery.data.reviews.map((review) => <article className="approved-review-card" key={review.id} role="listitem"><div className="review-card-top"><strong>{review.displayName}</strong><div className="review-stars" role="img" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} size={14} fill={index < review.rating ? "currentColor" : "none"} />)}</div></div><p>“{review.reviewText}”</p><div className="review-card-bottom"><span>{new Date(review.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span><span className="review-source-tag">Website review</span></div></article>)}</div> : <p className="review-empty">Be the first to share a showroom visit, colour choice, or product experience with Jaymurti Traders.</p>}</div>
            <form className="review-form" onSubmit={submitShopReview} noValidate><div className="review-form-heading"><span className="review-summary-label">Leave a review</span><h3>Share your project experience</h3><p>Let future homeowners know how Jaymurti Traders and Birla Opus elevated your space. Ratings of 3 stars or higher appear on this page automatically. Lower ratings are received privately.</p></div><label className="review-name-label">Your name<input value={reviewForm.displayName} onChange={(event) => setReviewForm({ ...reviewForm, displayName: event.target.value })} maxLength={80} placeholder="Name to display" aria-label="Your name" /></label><fieldset className="review-rating"><legend>Your rating</legend><div>{Array.from({ length: 5 }, (_, index) => { const rating = index + 1; return <button type="button" className={reviewForm.rating >= rating ? "active" : ""} onClick={() => setReviewForm({ ...reviewForm, rating })} aria-label={`Rate ${rating} out of 5 stars`} aria-pressed={reviewForm.rating === rating} key={rating}><Star size={23} fill={reviewForm.rating >= rating ? "currentColor" : "none"} /></button>; })}</div></fieldset><label className="review-copy-label">Your experience<textarea value={reviewForm.reviewText} onChange={(event) => setReviewForm({ ...reviewForm, reviewText: event.target.value })} maxLength={800} placeholder="Tell future visitors about your colour curation, product quality, or service experience." aria-label="Your review" /></label><button className="review-submit" type="submit" disabled={reviewSubmission.isPending}>{reviewSubmission.isPending ? "Submitting…" : "Submit review"}<ArrowRight size={15} /></button>{reviewFormMessage && <div className="review-form-feedback" role="status"><p className="review-form-message">{reviewFormMessage}</p>{reviewSubmission.isSuccess && <div className="review-google-prompt"><p>Would you like to share it on Google too?</p><a href={googleBusinessProfileUrl} target="_blank" rel="noopener noreferrer" className="button-google-share">Review us on Google <ArrowRight size={13} /></a></div>}</div>}</form>
          </div>
        </section>

        <section className="faq visual-faq-refinement visual-faq-compact reveal scroll-chapter" id="faq" data-scroll-section data-section-label="FAQ" data-reveal><div className="faq-header"><div className="eyebrow">Technical & Design Clarity</div><h2 className="section-title">Questions, beautifully answered.</h2><p className="section-lead">Everything you need to feel completely confident about bringing a new Birla Opus colour story to life.</p></div><Accordion type="single" collapsible>{faqs.map(([question, answer], index) => <AccordionItem className="faq-item" value={`faq-${index}`} key={question}><AccordionTrigger className="faq-trigger"><span>{question}</span></AccordionTrigger><AccordionContent className="faq-answer">{answer}</AccordionContent></AccordionItem>)}</Accordion></section>
      </main>

      <div className="floating-contact" aria-label="Quick contact actions"><a className="floating-call" href={`tel:${businessProfile.phoneHref}`} aria-label="Call now"><PhoneCall size={17} aria-hidden="true" /><span>Call now</span></a><a className="floating-whatsapp" href={`https://wa.me/${businessProfile.whatsappHref}?text=${encodeURIComponent("Hello Jaymurti Traders, I would like to enquire about Birla Opus paints.")}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={17} aria-hidden="true" /><span>WhatsApp</span></a><a className="floating-instagram" href={businessProfile.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={17} aria-hidden="true" /><span>Instagram</span></a></div>

      <footer className="footer visual-footer-compact scroll-chapter" id="footer" data-scroll-section data-section-label="Contact"><div className="footer-top"><div className="footer-intro"><a className="brand" href="#top" aria-label="Birla Opus Paint Jaymurti Traders जयमूर्ति ट्रेडर्स"><img src="/storage/kumar-hardware-logo.png" alt="Jaymurti Traders Logo" width={36} height={36} className="brand-logo" /><span className="brand-bilingual"><span className="brand-name-text">JAYMURTI TRADERS</span><span className="brand-name-hindi">जयमूर्ति ट्रेडर्स</span></span></a><p><strong>Jaymurti Traders (जयमूर्ति ट्रेडर्स)</strong><br />Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh - 224129.<br />Open daily, 8:00 AM – 9:00 PM.</p><p>For authentic Birla Opus paints and painting essentials, call <a href={`tel:${businessProfile.phoneHref}`}>{businessProfile.phoneDisplay}</a>.</p><form className="newsletter" onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Your email address" aria-label="Newsletter email address" /><button type="submit" aria-label="Join the colour journal">Join the colour journal <ArrowRight size={13} aria-hidden="true" /></button></form></div><div className="footer-nav"><div><h4>Explore</h4><a href="#colours">Colours</a><a href="#ideas">Ideas</a><a href="#textures">Textures</a><a href="#products">Products</a><a href="#services">Services</a></div><div><h4>Visit</h4><a href="#enquiry">Ask for product guidance</a><a href="#services">Painting essentials</a><a href="#products">Birla Opus range</a><a href="#ideas">Colour inspiration</a></div><div><h4>Contact</h4><a href={`tel:${businessProfile.phoneHref}`}>{businessProfile.phoneDisplay}</a><a href={businessProfile.instagramUrl} target="_blank" rel="noopener noreferrer">{businessProfile.instagramHandle}</a><a href={directionsUrl} target="_blank" rel="noopener noreferrer">Shukul Bazar, Baskhari</a><a href={directionsUrl} target="_blank" rel="noopener noreferrer">Ambedkar Nagar · 224129</a><Link href="/privacy">Privacy Policy</Link></div></div></div><div className="footer-bottom"><span>Jaymurti Traders · जयमूर्ति ट्रेडर्स</span><span>Baskhari · Ambedkar Nagar · Uttar Pradesh</span><div className="socials"><a href={businessProfile.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a><Link href="/privacy">Privacy Policy</Link></div></div></footer>
    </div>
  );
}
