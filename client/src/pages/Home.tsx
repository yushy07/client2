import React, { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { usePageSEO } from "@/hooks/usePageSEO";
import { useCart } from "@/contexts/CartContext";
import { businessProfile } from "@shared/businessProfile";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Facebook,
  Instagram,
  LayoutGrid,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  PhoneCall,
  Play,
  Search,
  ShieldCheck,
  ShoppingBag,
  Store,
  X,
} from "lucide-react";
import {
  RotatingText,
  ShinyText,
  ClickSpark,
  SwipeToast,
} from "@/components/reactbits";
import { ShowroomVideoModal, type VideoModalItem } from "@/components/ShowroomVideoModal";
import {
  MotionMagnetic,
  MotionStagger,
  MotionStaggerItem,
  ScrollProgressBar,
} from "@/lib/motion";
import { HomeShowroomPreview } from "@/components/home/HomeShowroomPreview";
import { HomeProductsPreview } from "@/components/home/HomeProductsPreview";
import { HomeColoursPreview } from "@/components/home/HomeColoursPreview";
import { HomeInspirationPreview } from "@/components/home/HomeInspirationPreview";
import {
  HomeReviewsSection,
  type ReviewSubmissionInput,
} from "@/components/reviews/HomeReviewsSection";

const campaigns = [
  {
    kicker: "Formulation 01 · Ultra-Luxury Emulsion",
    title: "Unrivalled Radiance. Exceptional Washability.",
    text: "Birla Opus One & Calista interior emulsions infuse living rooms and bedchambers with velvety smooth depth, scrub-resistant washability, and true daylight clarity.",
    swatch: "#E8C88B",
    swatchName: "Imperial Saffron",
    swatchCode: "BO-INT-14",
    imageUrl: "/storage/storefront/shopreception.webp",
    mobileUrl: "/storage/storefront/shopreception-mobile.webp",
    imageAlt: "Jaymurti Traders Birla Opus consultation counter and physical fandeck station in Baskhari",
  },
  {
    kicker: "Formulation 02 · All-Weather Protection",
    title: "Shielding Living Spaces Across Baskhari.",
    text: "Engineered exterior barriers and waterproofing systems crafted to endure humid monsoon downpours and intense Uttar Pradesh summers without blistering or efflorescence.",
    swatch: "#2B4C47",
    swatchName: "Forest Canopy",
    swatchCode: "BO-EXT-08",
    imageUrl: "/storage/storefront/shopwide.webp",
    mobileUrl: "/storage/storefront/shopwide-mobile.webp",
    imageAlt: "Jaymurti Traders Birla Opus colour wall and showroom floor in Shukul Bazar, Baskhari",
  },
  {
    kicker: "Formulation 03 · Mineral & Stucco Textures",
    title: "Sculptural Textures with Tactile Depth.",
    text: "Transform plain masonry into artisanal reliefs—from mineral stone and metallic trowel effects to soft fluid clay. Sample panels available to touch at Jaymurti Traders.",
    swatch: "#B86B4B",
    swatchName: "Terracotta Clay",
    swatchCode: "BO-TEX-03",
    imageUrl: "/storage/storefront/shop.webp",
    mobileUrl: "/storage/storefront/shop-mobile.webp",
    imageAlt: "Jaymurti Traders main showroom entrance in Shukul Bazar, Baskhari, Ambedkar Nagar",
  },
  {
    kicker: "Formulation 04 · Pure Spatial Elegance",
    title: "159 Verified Shades. Perfectly Tinted.",
    text: "Automated computerised tinting machines at Shukul Bazar ensure exact batch-to-batch consistency for all 159 verified Birla Opus shades under daylight inspection.",
    swatch: "#E2DDD3",
    swatchName: "Alabaster Mist",
    swatchCode: "BO-NEU-01",
    imageUrl: "/storage/shopproductpyramid.webp",
    mobileUrl: "/storage/shopproductpyramid.webp",
    imageAlt: "Genuine Birla Opus product pyramid and paint cans at Jaymurti Traders showroom",
  },
];

const navLinks = [
  { href: "/paint-products", label: "Products" },
  { href: "/colour-finder", label: "Colours" },
  { href: "/room-inspiration", label: "Inspiration" },
  { href: "/surface-studio", label: "Surfaces" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Home() {
  usePageSEO({
    title: "Birla Opus Paint Dealer Baskhari | Jaymurti Traders · जयमूर्ति ट्रेडर्स",
    description: "Official Birla Opus paint dealer & experience showroom at Shukul Bazar, Baskhari, Ambedkar Nagar. Explore 124 master formulations, 159 verified shades, textures, and computerized tinting.",
    canonicalPath: "/",
  });

  const { cartItems, setIsCartOpen, toastOpen, setToastOpen, toastData, generateWhatsAppCartUrl } = useCart();
  const [campaign, setCampaign] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Rotate hero campaign
  useEffect(() => {
    if (heroPaused) return;
    const interval = window.setInterval(() => {
      setCampaign((prev) => (prev + 1) % campaigns.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, [heroPaused]);

  // Track header scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeCampaign = campaigns[campaign] ?? campaigns[0]!;

  // Fetch published reviews via tRPC
  const publishedReviewsQuery = trpc.shopReviews.listPublished.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const utils = trpc.useUtils();
  const createReview = trpc.shopReviews.create.useMutation({
    onSuccess: () => utils.shopReviews.listPublished.invalidate(),
  });

  const handleReviewSubmit = useCallback(
    async ({ displayName, rating, reviewText }: ReviewSubmissionInput) => {
      await createReview.mutateAsync({ displayName, rating, reviewText });
    },
    [createReview],
  );

  const googleBusinessProfileUrl = "https://share.google/Nyju9PoRuINGGoD83";

  // Video Modal State for Interactive Pillars
  const [videoModalData, setVideoModalData] = useState<{
    isOpen: boolean;
    title: string;
    subtitle: string;
    videos: VideoModalItem[];
    defaultActiveIdx?: number;
  } | null>(null);

  const handleAuthorisedDealershipClick = () => {
    setVideoModalData({
      isOpen: true,
      title: "Authorised Birla Opus Dealership Showcase",
      subtitle: "Official Jaymurti Traders Showroom in Shukul Bazar, Baskhari",
      videos: [
        {
          label: "Showroom Walkthrough V4",
          url: "/storage/jay-murti-traders-v4.mp4",
          desc: "Full authorized Birla Opus showroom showcase at Jaymurti Traders, Baskhari, Ambedkar Nagar.",
        },
      ],
      defaultActiveIdx: 0,
    });
  };

  const handleComputerisedTintingClick = () => {
    setVideoModalData({
      isOpen: true,
      title: "Computerised Tinting & Showroom Inventory",
      subtitle: "Automated Pigment Dispensing & Factory-Sealed Formulations",
      videos: [
        {
          label: "Tinting Machine in Action",
          url: "/storage/tiniting machine.mp4",
          desc: "Watch the computerized automated tinting machine dispense exact pigment formulas for true shade accuracy.",
        },
        {
          label: "Showroom Materials & Stock",
          url: "/storage/shopmaterial2.mp4",
          desc: "Explore authentic factory-sealed Birla Opus paint stock, primers, and finishes at Jaymurti Traders.",
        },
      ],
      defaultActiveIdx: 0,
    });
  };

  const handlePhysicalSamplingClick = () => {
    const coloursSection = document.getElementById("colours") || document.querySelector(".colours");
    if (coloursSection) {
      coloursSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/colour-finder";
    }
  };

  return (
    <ClickSpark sparkColor="rgba(217, 119, 6, 0.75)" sparkSize={10} sparkRadius={16} sparkCount={7} duration={380}>
      <div className="site-shell">
        {/* Global Scroll Progress Indicator */}
        <ScrollProgressBar />

        {/* Top Utility Announcement Bar */}
        <div className="utility-bar">
          <span>
            Authorised Birla Opus Paint Dealer · <strong className="brand-name-text">JAYMURTI TRADERS &nbsp;·&nbsp; जयमूर्ति ट्रेडर्स</strong>
          </span>
          <span>Shukul Bazar, Baskhari · Call +91 87566 59035</span>
        </div>

        {/* =========================================================================
            1. GLOBAL NAVIGATION HEADER
            ========================================================================= */}
        <header
          className={`nav ${isScrolled ? "nav--scrolled shadow-md backdrop-blur-md" : ""}`}
          style={{ transition: "background-color 0.28s ease, backdrop-filter 0.28s ease, box-shadow 0.28s ease" }}
        >
          <Link className="brand group" href="/" aria-label="Birla Opus Paint Jaymurti Traders">
            <img
              src="/storage/logo.webp"
              alt="Jaymurti Traders Logo"
              width={42}
              height={42}
              className="brand-logo"
            />
            <div className="brand-titles">
              <span className="brand-name-text font-serif">Jaymurti Traders</span>
              <span className="brand-sub-text font-mono" lang="hi">
                जयमूर्ति ट्रेडर्स · Baskhari
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links" aria-label="Primary navigation">
            {navLinks.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
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
            <a
              href={generateWhatsAppCartUrl()}
              target="_blank"
              rel="noreferrer"
              className="nav-whatsapp-btn"
              aria-label="Direct WhatsApp Enquiry with Showroom"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Showroom</span>
            </a>
          </nav>

          {/* Mobile Navigation Actions */}
          <div className="nav-mobile-actions">
            <Link href="/colour-finder" className="nav-mobile-search-btn" aria-label="Search and Explore Colours">
              <Search size={20} />
            </Link>
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
                {navLinks.map((item) => (
                  <Link
                    href={item.href}
                    key={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="nav-mobile-divider" />
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="button-primary flex items-center justify-center gap-2"
                  style={{ minHeight: "44px" }}
                >
                  <ShoppingBag size={16} />
                  <span>Enquiry Cart ({cartItems.length})</span>
                </button>
                <a
                  href={generateWhatsAppCartUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-ghost flex items-center justify-center gap-2"
                  style={{ minHeight: "44px" }}
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Showroom</span>
                </a>
              </nav>
            </div>
          )}
        </header>

        <main>
          {/* =========================================================================
              2. HERO SECTION
              ========================================================================= */}
          <section className="hero scroll-chapter" id="top" data-scroll-section data-section-label="Home" aria-label="Featured colour collection">
            <div className="hero-top-accent-decor" aria-hidden="true">
              <img
                src="/storage/hero_paint_accent.webp"
                alt=""
                className="hero-accent-img"
                width={220}
                height={220}
              />
              <span className="hero-accent-script">
                Colours<br />
                <span>for a better</span><br />
                <em>tomorrow</em>
              </span>
            </div>

            <div className="hero-inner relative">
              <div className="hero-copy">
                <div className="slide-fade">
                  <div className="hero-brand-lockup">
                    <img src="/storage/logo.webp" alt="Jaymurti Traders Logo" width={28} height={28} className="hero-brand-logo" />
                    <span className="hero-brand-title">JAYMURTI TRADERS</span>
                    <span style={{ fontSize: "0.85rem", opacity: 0.8, marginLeft: "12px", fontFamily: "var(--sans)" }}>जयमूर्ति ट्रेडर्स</span>
                  </div>

                  <div className="hero-eyebrow-pill">
                    <span className="hero-eyebrow-dash">—</span>{" "}
                    <ShinyText text="AUTHORISED BIRLA OPUS SHOWROOM" color="#71717a" shineColor="#d97706" speed={2.5} />
                  </div>

                  <div className="hero-campaign-fade" key={`campaign-${campaign}`}>
                    <h1 className="hero-headline">{activeCampaign.title}</h1>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-400 font-medium mb-3">
                      <span>Transforming:</span>
                      <RotatingText
                        texts={["Living Rooms", "Exterior Facades", "Designer Textures", "Waterproof Walls", "Bedrooms & Hallways"]}
                        mainClassName="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold border border-amber-500/20 text-xs sm:text-sm"
                      />
                    </div>
                    <p className="hero-description text-base text-zinc-300 leading-relaxed font-sans">
                      {activeCampaign.text}
                    </p>
                  </div>

                  <div className="hero-actions">
                    <MotionMagnetic strength={10}>
                      <Link href="/colour-finder" className="button-primary hero-btn-main">
                        <Palette size={18} className="hero-btn-icon shrink-0" />
                        <span>EXPLORE COLOURS</span>
                        <ArrowRight size={16} className="hero-btn-icon shrink-0" />
                      </Link>
                    </MotionMagnetic>

                    <div className="hero-secondary-actions">
                      <MotionMagnetic strength={8}>
                        <Link href="/paint-products" className="button-ghost hero-btn-sub">
                          <LayoutGrid size={15} className="hero-btn-icon shrink-0" />
                          <span>EXPLORE PRODUCTS</span>
                        </Link>
                      </MotionMagnetic>
                      <MotionMagnetic strength={8}>
                        <Link href="/contact" className="button-ghost hero-btn-sub">
                          <MapPin size={15} className="hero-btn-icon shrink-0" />
                          <span>VISIT SHOWROOM</span>
                        </Link>
                      </MotionMagnetic>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Showroom Carousel Card */}
              <div 
                className="hero-visual relative group" 
                aria-label="Hero Showroom Gallery"
                onMouseEnter={() => setHeroPaused(true)}
                onMouseLeave={() => setHeroPaused(false)}
                style={{
                  position: "relative",
                  width: "100%",
                  minHeight: "520px",
                  height: "100%",
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#0c181c",
                  boxShadow: "0 24px 60px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.12)",
                }}
              >
                {/* Top-Left Floating Live Status Pill */}
                <div 
                  className="hero-floating-badge hero-floating-badge--top-left"
                  style={{
                    position: "absolute",
                    top: "18px",
                    left: "18px",
                    zIndex: 25,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 14px",
                    background: "rgba(12, 41, 47, 0.85)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "999px",
                    border: "1px solid rgba(255, 255, 255, 0.22)",
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  }}
                >
                  <span className="hero-live-dot" />
                  <span>SHOWROOM • BASKHARI</span>
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
                      transition: "opacity 0.75s ease-in-out",
                      zIndex: campaign === idx ? 2 : 1,
                    }}
                  >
                    <picture style={{ display: "block", position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                      <source media="(max-width: 640px)" srcSet={camp.mobileUrl || camp.imageUrl} type="image/webp" />
                      <source srcSet={camp.imageUrl} type="image/webp" />
                      <img
                        src={camp.imageUrl}
                        alt={camp.imageAlt}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center 25%",
                        }}
                        className="hero-image hero-image-ambient transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        loading={idx === 0 ? "eager" : "lazy"}
                        fetchPriority={idx === 0 ? "high" : "auto"}
                        decoding="async"
                        width={720}
                        height={480}
                      />
                    </picture>
                    <div className="hero-image-shade" />

                    {/* Integrated Shade Accent Badge */}
                    <div 
                      className="absolute bottom-16 left-5 z-20 bg-[#0C292F]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#176B73]/40 flex items-center gap-3 shadow-2xl"
                      style={{ pointerEvents: "auto" }}
                    >
                      <span className="w-4 h-4 rounded-full border border-white/40 shrink-0" style={{ background: camp.swatch }} />
                      <span className="text-xs text-teal-200 font-mono tracking-wider">{camp.swatchCode}</span>
                      <strong className="text-xs text-white font-sans font-semibold">{camp.swatchName}</strong>
                    </div>
                  </div>
                ))}

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
                    zIndex: 30,
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "rgba(12, 41, 47, 0.85)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease-out",
                    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.4)",
                  }}
                  aria-label="Previous Slide"
                >
                  <ArrowLeft size={18} />
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
                    zIndex: 30,
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "rgba(12, 41, 47, 0.85)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease-out",
                    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.4)",
                  }}
                  aria-label="Next Slide"
                >
                  <ArrowRight size={18} />
                </button>

                {/* Bottom Integrated Status & Dots Bar */}
                <div 
                  className="hero-carousel-bottom-bar"
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    right: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    zIndex: 30,
                    background: "rgba(12, 41, 47, 0.88)",
                    backdropFilter: "blur(12px)",
                    padding: "6px 16px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  <span className="hero-carousel-counter text-xs text-white/90 font-mono font-semibold">
                    0{campaign + 1} / 0{campaigns.length}
                  </span>

                  <div className="hero-carousel-dots flex items-center gap-1.5">
                    {campaigns.map((_, i) => (
                      <button
                        key={`hero-dot-${i}`}
                        type="button"
                        onClick={() => setCampaign(i)}
                        className={`hero-dot-btn ${campaign === i ? "active" : ""}`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Authorised Birla Opus Showroom Banner across hero base */}
            <div className="hero-authorised-banner flex items-center justify-center gap-3 py-3 border-t border-[#176B73]/30 bg-[#0C292F]/80">
              <span className="w-8 h-[1px] bg-amber-500/50" />
              <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-semibold">
                AUTHORISED BIRLA OPUS SHOWROOM · BASKHARI
              </span>
              <span className="w-8 h-[1px] bg-amber-500/50" />
            </div>
          </section>

          {/* =========================================================================
              3. SHORT JAYMURTI / SHOP INTRODUCTION (INTERACTIVE PILLARS)
              ========================================================================= */}
          <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#176B73]/30 bg-gradient-to-b from-[#0C292F] via-[#0E353B] to-[#0C292F]">
            <div className="max-w-[var(--shell-max)] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Pillar 1: Authorised Dealership -> Plays Showroom Tour V4 Video */}
              <div
                role="button"
                tabIndex={0}
                onClick={handleAuthorisedDealershipClick}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleAuthorisedDealershipClick(); }}
                className="group relative p-7 rounded-2xl bg-gradient-to-br from-[#123F46] via-[#0E353B] to-[#0C292F] border border-[#176B73]/40 hover:border-amber-400/70 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(12,41,47,0.6)] hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#176B73]/30 border border-amber-400/40 text-amber-300 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:bg-[#F3D36B]/20 transition-all">
                      <BadgeCheck size={24} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0C292F]/90 border border-[#176B73]/50 text-teal-200 font-semibold group-hover:border-amber-400/50 group-hover:text-amber-300 transition-colors">
                      Aditya Birla Official
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-medium text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                    <span>Authorised Dealership</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-100/70 leading-relaxed mt-2.5">
                    Official flagship dealer for Aditya Birla Group's premier Birla Opus paints in Shukul Bazar, Baskhari. 100% factory-sealed formulations.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#176B73]/30 flex items-center justify-between text-xs text-amber-300 font-semibold">
                  <span className="flex items-center gap-1.5 group-hover:underline">
                    <Play size={13} className="fill-current" /> Watch Showroom Tour
                  </span>
                  <span className="text-[10px] font-mono text-teal-300/80 uppercase">Tap to Play Video</span>
                </div>
              </div>

              {/* Pillar 2: Computerised Tinting -> Plays Tinting Machine & Materials Videos */}
              <div
                role="button"
                tabIndex={0}
                onClick={handleComputerisedTintingClick}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleComputerisedTintingClick(); }}
                className="group relative p-7 rounded-2xl bg-gradient-to-br from-[#123F46] via-[#0E353B] to-[#0C292F] border border-[#176B73]/40 hover:border-amber-400/70 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(12,41,47,0.6)] hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#176B73]/30 border border-teal-400/40 text-teal-300 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:bg-[#F3D36B]/20 group-hover:text-amber-300 transition-all">
                      <Palette size={24} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0C292F]/90 border border-[#176B73]/50 text-teal-200 font-semibold group-hover:border-amber-400/50 group-hover:text-amber-300 transition-colors">
                      159 Spectral Shades
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-medium text-white group-hover:text-amber-300 transition-colors">
                    Computerised Tinting
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-100/70 leading-relaxed mt-2.5">
                    In-store precision automated tinting dispensing exact pigment formulations for perfect batch-to-batch repeatability and depth.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#176B73]/30 flex items-center justify-between text-xs text-amber-300 font-semibold">
                  <span className="flex items-center gap-1.5 group-hover:underline">
                    <Play size={13} className="fill-current" /> Watch Machine & Stock (2 Videos)
                  </span>
                  <span className="text-[10px] font-mono text-teal-300/80 uppercase">Tap to Play</span>
                </div>
              </div>

              {/* Pillar 3: Physical Sampling -> Scrolls to Shades / Colour Section */}
              <div
                role="button"
                tabIndex={0}
                onClick={handlePhysicalSamplingClick}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handlePhysicalSamplingClick(); }}
                className="group relative p-7 rounded-2xl bg-gradient-to-br from-[#123F46] via-[#0E353B] to-[#0C292F] border border-[#176B73]/40 hover:border-amber-400/70 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(12,41,47,0.6)] hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#176B73]/30 border border-amber-400/40 text-amber-300 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:bg-[#F3D36B]/20 transition-all">
                      <Store size={24} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0C292F]/90 border border-[#176B73]/50 text-teal-200 font-semibold group-hover:border-amber-400/50 group-hover:text-amber-300 transition-colors">
                      Live Experience Studio
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-medium text-white group-hover:text-amber-300 transition-colors">
                    Physical Sampling
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-100/70 leading-relaxed mt-2.5">
                    Inspect authentic large fandecks and feel textured masonry plaster panels under calibrated natural daylight before finalising.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#176B73]/30 flex items-center justify-between text-xs text-amber-300 font-semibold">
                  <span className="flex items-center gap-1.5 group-hover:underline">
                    <span>Explore 159 Verified Shades</span> <ArrowRight size={13} />
                  </span>
                  <span className="text-[10px] font-mono text-teal-300/80 uppercase">Go to Shades</span>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              4. COMPACT SHOWROOM / STEP INSIDE PREVIEW
              ========================================================================= */}
          <HomeShowroomPreview />

          {/* =========================================================================
              5. FEATURED PRODUCTS PREVIEW
              ========================================================================= */}
          <HomeProductsPreview />

          {/* =========================================================================
              6. COMPACT COLOUR PREVIEW / HORIZONTAL SHADE RAIL
              ========================================================================= */}
          <HomeColoursPreview />

          {/* =========================================================================
              7. SMALL INSPIRATION PREVIEW
              ========================================================================= */}
          <HomeInspirationPreview />

          {/* =========================================================================
              8. WHY JAYMURTI / TRUST PILLARS
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
                <h3>100% Genuine Birla Opus</h3>
                <p>Official paints, primers, putties, and waterproofing barriers sourced through authorized Birla Opus manufacturer channels.</p>
              </MotionStaggerItem>
              <MotionStaggerItem className="why-card">
                <div className="why-card-icon">
                  <Palette size={24} />
                </div>
                <h3>Colour & Sheen Guidance</h3>
                <p>Hands-on assistance matching colour directions to room orientation, daylight angles, and substrate conditions.</p>
              </MotionStaggerItem>
              <MotionStaggerItem className="why-card">
                <div className="why-card-icon">
                  <PhoneCall size={24} />
                </div>
                <h3>Direct Local Contact</h3>
                <p>Speak directly with our knowledgeable showroom team without automated call centers or third-party markups.</p>
              </MotionStaggerItem>
            </MotionStagger>
          </section>

          {/* =========================================================================
              9. VISIT SHOWROOM / LOCATION PREVIEW
              ========================================================================= */}
          <section className="finder visual-finder-refinement visual-finder-compact reveal scroll-chapter" id="finder" data-scroll-section data-section-label="Visit">
            <div className="finder-layout">
              <div>
                <div className="eyebrow">Physical Showroom Destination</div>
                <h2 className="section-title">Experience colour in person.</h2>
                <p className="section-lead">
                  Visit Jaymurti Traders at Shukul Bazar, Baskhari. Inspect physical fandecks, feel texture panels, and consult directly with our desk.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link href="/contact" className="button-primary text-xs py-2.5 px-5 flex items-center gap-2">
                    <MapPin size={15} />
                    <span>View Map & Directions</span>
                    <ArrowRight size={14} />
                  </Link>
                  <a href={`tel:${businessProfile.phoneHref}`} className="button-ghost text-xs py-2.5 px-5 flex items-center gap-2">
                    <PhoneCall size={14} />
                    <span>Call +91 87566 59035</span>
                  </a>
                </div>
              </div>
              <div className="store-result">
                <div className="store-result-content">
                  <span className="store-result-label">Authorised Birla Opus Paint Dealer</span>
                  <h3>{businessProfile.name}</h3>
                  <div className="store-meta">
                    <span>
                      {businessProfile.address}
                      <br />
                      Landmark: {businessProfile.landmark}
                    </span>
                    <span>
                      Hours: {businessProfile.hours} (7 Days Open)
                      <br />
                      Pincode: 224129
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              10. CUSTOMER REVIEWS & GOOGLE TESTIMONIALS
              ========================================================================= */}
          <section
            className="shop-reviews visual-reviews-compact reveal scroll-chapter"
            id="reviews"
            data-scroll-section
            data-section-label="Reviews"
          >
            <div className="max-w-[var(--shell-max)] mx-auto px-4 sm:px-6 lg:px-8">
              <HomeReviewsSection
                reviews={publishedReviewsQuery.data?.reviews ?? []}
                averageRating={publishedReviewsQuery.data?.averageRating ?? null}
                isLoading={publishedReviewsQuery.isLoading}
                onSubmit={handleReviewSubmit}
                googleBusinessProfileUrl={googleBusinessProfileUrl}
              />
            </div>
          </section>

          {/* =========================================================================
              11. FINAL WHATSAPP CONSULTATION CTA
              ========================================================================= */}
          <section className="final-cta scroll-chapter" id="final-cta" data-scroll-section data-section-label="Contact">
            <div className="final-cta-inner">
              <div className="eyebrow" style={{ color: "var(--saffron)", justifyContent: "center", marginBottom: "14px" }}>
                Next Step in Your Transformation
              </div>
              <h2>FOUND YOUR COLOUR?</h2>
              <p>
                Explore our 159 spectral shades, select the ideal Birla Opus formulation, submit your enquiry, or visit our showroom counter in Baskhari.
              </p>
              <div className="final-cta-actions">
                <Link href="/colour-finder" className="button-primary">
                  Explore Colours <ArrowRight size={15} />
                </Link>
                <Link href="/paint-products" className="button-ghost">
                  Explore Products
                </Link>
                <a
                  href={generateWhatsAppCartUrl()}
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
            12. GLOBAL FOOTER
            ========================================================================= */}
        <footer className="footer visual-footer-compact scroll-chapter" id="footer" data-scroll-section data-section-label="Footer">
          <div className="footer-top">
            <div className="footer-intro">
              <Link className="brand" href="/" aria-label="Birla Opus Paint Jaymurti Traders">
                <img src="/storage/logo.webp" alt="Jaymurti Traders Logo" width={48} height={48} className="brand-logo" />
                <span className="brand-name-text">JAYMURTI TRADERS</span>
              </Link>
              <p>
                <strong>JAYMURTI TRADERS &nbsp;·&nbsp; जयमूर्ति ट्रेडर्स</strong>
                <br />
                Authorised Birla Opus Paint Dealer &amp; Experience Showroom
                <br />
                Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh - 224129, India.
                <br />
                Hours: 8:00 AM – 9:00 PM (Monday – Sunday)
              </p>
              <p>
                For authentic Birla Opus paints, automated shade tinting, and consultation:{" "}
                <a href="tel:+918756659035">+91 87566 59035</a>
              </p>
              <div className="footer-quick-actions">
                <a href={`tel:${businessProfile.phoneHref}`} className="footer-action-btn footer-action-btn--call" aria-label="Call Jaymurti Traders">
                  <PhoneCall size={14} /> Call Showroom
                </a>
                <a
                  href={generateWhatsAppCartUrl()}
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
                  <Instagram size={13} className="mr-1 text-pink-400" /> Instagram @paintwalebhaiya45
                </a>
                <a href={businessProfile.facebookUrl} target="_blank" rel="noopener noreferrer" className="footer-social-pill">
                  <Facebook size={13} className="mr-1 text-blue-400" /> Facebook Page
                </a>
                <a href={googleBusinessProfileUrl} target="_blank" rel="noopener noreferrer" className="footer-social-pill">
                  <MapPin size={13} className="mr-1 text-accent" /> Google Business Profile
                </a>
              </div>
            </div>

            <div className="footer-nav">
              <div>
                <h4>Products & Paints</h4>
                <Link href="/paint-products">All Formulations</Link>
                <Link href="/interior-paints">Interior Paints</Link>
                <Link href="/exterior-paints">Exterior Paints</Link>
                <Link href="/waterproofing">Waterproofing</Link>
                <Link href="/enamels">Enamel Paints</Link>
                <Link href="/wood-finishes">Wood Finishes</Link>
              </div>
              <div>
                <h4>Colours & Studios</h4>
                <Link href="/colour-finder">Colour Guide &amp; 159 Shades</Link>
                <Link href="/room-inspiration">Room Shade Studio</Link>
                <Link href="/surface-studio">Surface Studio</Link>
                <Link href="/wall-textures">Wall Textures</Link>
                <Link href="/wallpapers">Wallpapers</Link>
              </div>
              <div>
                <h4>Showroom</h4>
                <Link href="/about">About Jaymurti</Link>
                <Link href="/about#step-inside">Showroom Video Tour</Link>
                <Link href="/about#showroom">Showroom Gallery</Link>
                <Link href="/about#team">Founder &amp; Team</Link>
                <Link href="/contact">Visit Showroom</Link>
              </div>
              <div>
                <h4>Contact &amp; Legal</h4>
                <a href="tel:+918756659035">+91 87566 59035</a>
                <a href={generateWhatsAppCartUrl()} target="_blank" rel="noopener noreferrer">WhatsApp Desk</a>
                <Link href="/contact">Shukul Bazar, Baskhari</Link>
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/terms">Terms &amp; Conditions</Link>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-brand">
              JAYMURTI TRADERS · जयमूर्ति ट्रेडर्स
              <span style={{ fontWeight: 400, marginLeft: "8px", opacity: 0.85 }}>
                · Authorised Birla Opus Dealer · Shukul Bazar, Baskhari, Ambedkar Nagar, UP - 224129
              </span>
            </div>
            <div className="socials">
              <a href={businessProfile.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href={businessProfile.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href={googleBusinessProfileUrl} target="_blank" rel="noopener noreferrer">Google Maps</a>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms &amp; Conditions</Link>
            </div>
          </div>
        </footer>

        {/* Floating Desktop Contact Bar */}
        <div className="floating-contact" aria-label="Quick contact actions">
          <a className="floating-call" href={`tel:${businessProfile.phoneHref}`} aria-label="Call now">
            <PhoneCall size={17} aria-hidden="true" />
            <span>Call</span>
          </a>
          <a
            className="floating-whatsapp"
            href={generateWhatsAppCartUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Official WhatsApp Support"
          >
            <MessageCircle size={17} aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
          <a
            className="floating-instagram"
            href={businessProfile.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Official Instagram"
          >
            <Instagram size={17} aria-hidden="true" />
            <span>Instagram</span>
          </a>
          <a
            className="floating-facebook"
            href={businessProfile.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Official Facebook"
          >
            <Facebook size={17} aria-hidden="true" />
            <span>Facebook</span>
          </a>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            style={{
              background: "var(--color-brand-primary)",
              color: "var(--color-text-on-dark)",
              border: "1px solid var(--color-brand-secondary)",
              padding: "0 16px",
              borderRadius: "999px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            <ShoppingBag size={16} />
            <span>Cart ({cartItems.length})</span>
          </button>
        </div>

        {/* Mobile Sticky Bottom Bar */}
        <div className="mobile-sticky-bar" aria-label="Mobile quick actions">
          <a
            href={`tel:${businessProfile.phoneHref}`}
            className="mobile-bar-btn mobile-bar-icon-btn mobile-bar-call"
            aria-label="Call Showroom"
          >
            <PhoneCall size={17} />
          </a>
          <a
            href={generateWhatsAppCartUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-bar-btn mobile-bar-icon-btn mobile-bar-whatsapp"
            aria-label="Official WhatsApp Support"
          >
            <MessageCircle size={18} />
          </a>
          <a
            href={businessProfile.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-bar-btn mobile-bar-icon-btn mobile-bar-instagram"
            aria-label="Official Instagram"
          >
            <Instagram size={17} />
          </a>
          <a
            href={businessProfile.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-bar-btn mobile-bar-icon-btn mobile-bar-facebook"
            aria-label="Official Facebook"
          >
            <Facebook size={17} />
          </a>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="mobile-bar-btn mobile-bar-cart"
            aria-label={`Open Enquiry Drawer with ${cartItems.length} items`}
          >
            <div className="relative flex items-center">
              <ShoppingBag size={16} />
              {cartItems.length > 0 && <span className="mobile-cart-badge">{cartItems.length}</span>}
            </div>
            <span>Cart {cartItems.length > 0 ? `(${cartItems.length})` : ""}</span>
          </button>
        </div>

        {/* Showroom Interactive Video Modal for Dealership & Computerised Tinting */}
        {videoModalData && (
          <ShowroomVideoModal
            isOpen={videoModalData.isOpen}
            onClose={() => setVideoModalData(null)}
            title={videoModalData.title}
            subtitle={videoModalData.subtitle}
            videos={videoModalData.videos}
            defaultActiveIdx={videoModalData.defaultActiveIdx}
          />
        )}

        {/* Live Swipe Toast for Cart updates */}
        <SwipeToast
          open={toastOpen}
          onClose={() => setToastOpen(false)}
          title={toastData.title}
          description={toastData.desc}
          actionLabel="View Cart"
          onAction={() => {
            setToastOpen(false);
            setIsCartOpen(true);
          }}
          background="#18181b"
          color="#f4f4f5"
          fuseColor="#d97706"
          duration={3500}
        />
      </div>
    </ClickSpark>
  );
}
