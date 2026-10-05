import React, { useState } from "react";
import { Link } from "wouter";
import { usePageSEO } from "@/hooks/usePageSEO";
import { type RouteSEOConfig, CANONICAL_HOST } from "@shared/seoKeywordMap";
import { businessProfile } from "@shared/businessProfile";
import { useCart } from "@/contexts/CartContext";
import {
  Home,
  MapPin,
  PhoneCall,
  MessageCircle,
  ChevronRight,
  Sparkles,
  Clock,
  Instagram,
  Facebook,
  Compass,
  Layers,
  Palette,
  ShoppingBag,
  HelpCircle,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PillNav, type PillNavItem } from "@/components/reactbits";

const headerNavItems: PillNavItem[] = [
  { href: "/", label: "Showroom" },
  { href: "/paint-products", label: "Products" },
  { href: "/colour-finder", label: "Colours" },
  { href: "/room-inspiration", label: "Inspiration" },
  { href: "/surface-studio", label: "Surfaces" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

interface SEOPageLayoutProps {
  seo: RouteSEOConfig;
  children: React.ReactNode;
  showFAQ?: boolean;
}

export const SEOPageLayout: React.FC<SEOPageLayoutProps> = ({
  seo,
  children,
  showFAQ = true,
}) => {
  const { cartItems, setIsCartOpen, generateWhatsAppCartUrl } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  usePageSEO({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
  });

  // BreadcrumbList JSON-LD Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": seo.breadcrumb.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": `${CANONICAL_HOST}${item.path === "/" ? "" : item.path}`
    }))
  };

  // FAQPage JSON-LD Schema (if FAQs exist)
  const faqSchema = seo.faq && seo.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": seo.faq.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0C292F] via-[#123F46] to-[#0C292F] text-[#F7F6F1] flex flex-col justify-between font-sans selection:bg-[#F3D36B]/30 selection:text-[#182426]">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* 1. Top Utility Announcement Bar */}
      <div className="bg-[#081F24] border-b border-[#176B73]/40 py-2 px-4 sm:px-8 text-xs text-[#B9C8C8] flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            Authorized Birla Opus Paint Dealer · <strong className="text-[#F7F6F1] font-bold">JAYMURTI TRADERS</strong>
          </span>
          <span className="hidden md:inline text-[#F3D36B] font-medium" lang="hi">· जयमूर्ति ट्रेडर्स</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-[#B9C8C8]">
            <MapPin className="w-3.5 h-3.5 text-[#F3D36B]" /> Shukul Bazar, Baskhari (UP 224129)
          </span>
          <a
            href="tel:+918756659035"
            className="flex items-center gap-1 text-[#F3D36B] hover:text-[#E4C45A] font-bold transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" /> +91 87566 59035
          </a>
        </div>
      </div>

      {/* 2. Global Navigation Header — Bold Eye-Catching Luxury Design */}
      <header className="sticky top-0 z-40 bg-[#0C292F]/95 backdrop-blur-md border-b border-[#F3D36B]/30 py-3.5 px-4 sm:px-8 shadow-xl shadow-black/25">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/storage/logo.webp"
              alt="Jaymurti Traders Logo"
              width={38}
              height={38}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#F3D36B] p-0.5 shadow-md shadow-[#F3D36B]/20 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-serif tracking-wider text-sm sm:text-base font-bold text-[#F7F6F1] group-hover:text-[#F3D36B] transition-colors">
                JAYMURTI TRADERS
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#F3D36B] tracking-widest uppercase font-mono font-semibold" lang="hi">
                जयमूर्ति ट्रेडर्स · Baskhari
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links with React Bits PillNav */}
          <div className="hidden lg:flex items-center">
            <PillNav
              items={headerNavItems}
              baseColor="rgba(8, 28, 32, 0.75)"
              pillColor="transparent"
              pillTextColor="#B5C9CC"
              hoverCircleColor="#F3D36B"
              hoveredPillTextColor="#0C292F"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#F3D36B] hover:bg-[#E4C45A] text-[#0C292F] text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-xl transition-all shadow-md shadow-[#F3D36B]/20 active:scale-95"
              aria-label={`Open Enquiry Drawer with ${cartItems.length} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Enquire</span>
              {cartItems.length > 0 && (
                <span className="bg-[#0C292F] text-[#F3D36B] text-[10px] font-bold px-1.5 py-0.2 rounded-full font-mono">
                  {cartItems.length}
                </span>
              )}
            </button>
            <a
              href="https://wa.me/918756659035?text=Hello%20Jaymurti%20Traders,%20I%20am%20enquiring%20about%20Birla%20Opus%20paints%20and%20shades."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-[#042412] text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-xl transition-all shadow-md shadow-emerald-950/20 active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden w-9 h-9 rounded-xl bg-[#123F46] hover:bg-[#176B73] border border-[#F3D36B]/30 text-[#F7F6F1] flex items-center justify-center transition-all shadow-sm"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#F3D36B]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#176B73]/60 bg-[#081F24]/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl space-y-2">
            <nav className="grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-wider" aria-label="Mobile Navigation">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl bg-[#0C292F] text-[#E7ECEA] hover:text-[#F3D36B] hover:bg-[#123F46] border border-[#176B73]/40 flex items-center gap-2"
              >
                <Home className="w-3.5 h-3.5 text-[#F3D36B]" /> Showroom
              </Link>
              <Link
                href="/paint-products"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl bg-[#0C292F] text-[#E7ECEA] hover:text-[#F3D36B] hover:bg-[#123F46] border border-[#176B73]/40 flex items-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#F3D36B]" /> Products
              </Link>
              <Link
                href="/colour-finder"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl bg-[#0C292F] text-[#E7ECEA] hover:text-[#F3D36B] hover:bg-[#123F46] border border-[#176B73]/40 flex items-center gap-2"
              >
                <Palette className="w-3.5 h-3.5 text-[#F3D36B]" /> Colours
              </Link>
              <Link
                href="/room-inspiration"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl bg-[#0C292F] text-[#E7ECEA] hover:text-[#F3D36B] hover:bg-[#123F46] border border-[#176B73]/40 flex items-center gap-2"
              >
                <Layers className="w-3.5 h-3.5 text-[#F3D36B]" /> Inspiration
              </Link>
              <Link
                href="/surface-studio"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl bg-[#0C292F] text-[#E7ECEA] hover:text-[#F3D36B] hover:bg-[#123F46] border border-[#176B73]/40 flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F3D36B]" /> Surfaces
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl bg-[#0C292F] text-[#E7ECEA] hover:text-[#F3D36B] hover:bg-[#123F46] border border-[#176B73]/40 flex items-center gap-2"
              >
                <Compass className="w-3.5 h-3.5 text-[#F3D36B]" /> About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="col-span-2 px-3 py-2.5 rounded-xl bg-[#0C292F] text-[#E7ECEA] hover:text-[#F3D36B] hover:bg-[#123F46] border border-[#176B73]/40 flex items-center justify-center gap-2 text-center"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#F3D36B]" /> Contact Showroom
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* 3. Hero Header with Semantic Breadcrumbs & Architectural Teal Theme */}
      <section className="bg-gradient-to-r from-[#0C292F] via-[#123F46] to-[#176B73] border-b border-[#F3D36B]/30 py-10 sm:py-16 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#176B73]/35 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute -bottom-10 left-1/4 w-[400px] h-[400px] bg-[#F3D36B]/12 rounded-full blur-[90px] pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 inline-block bg-[#081F24]/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#176B73]/50 shadow-inner">
            <ol className="flex items-center flex-wrap gap-2 text-xs text-[#B9C8C8] font-medium">
              {seo.breadcrumb.map((item, idx) => {
                const isLast = idx === seo.breadcrumb.length - 1;
                return (
                  <li key={item.path} className="flex items-center gap-2">
                    {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#176B73]" />}
                    {isLast ? (
                      <span className="text-[#F3D36B] font-bold" aria-current="page">
                        {item.name}
                      </span>
                    ) : (
                      <Link href={item.path} className="hover:text-[#F3D36B] transition-colors">
                        {item.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Page Headline & Description */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0C292F]/90 text-[#F3D36B] text-xs font-bold uppercase tracking-wider border border-[#F3D36B]/50 backdrop-blur-md shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#F3D36B]" />
              <span>{seo.eyebrow}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F7F6F1] font-medium tracking-tight leading-tight drop-shadow-md">
              {seo.h1}
            </h1>

            <p className="text-base sm:text-lg text-[#E7ECEA]/95 leading-relaxed font-sans max-w-3xl">
              {seo.description}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Main Page Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 relative">
        {children}
      </main>

      {/* 5. FAQs Section (if provided) */}
      {showFAQ && seo.faq && seo.faq.length > 0 && (
        <section className="bg-gradient-to-b from-[#0C292F] via-[#0E333B] to-[#081F24] border-t border-[#176B73]/50 py-14 sm:py-20" aria-label="Frequently Asked Questions">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center space-y-3 mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F3D36B] uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" /> Clear Answers for Your Project
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#F7F6F1]">Frequently Asked Questions</h2>
              <p className="text-xs sm:text-sm text-[#B9C8C8] max-w-xl mx-auto">
                Helpful details about Birla Opus paint products, computerized shade tinting, and showroom services at Baskhari.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {seo.faq.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="bg-[#123F46] border border-[#176B73]/70 hover:border-[#F3D36B]/40 rounded-2xl px-6 py-1 overflow-hidden transition-all shadow-md"
                >
                  <AccordionTrigger className="text-sm sm:text-base font-semibold text-[#F7F6F1] hover:text-[#F3D36B] transition-colors py-4 text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-[#B9C8C8] leading-relaxed pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* 6. Local Showroom Visit & Direct Contact CTA */}
      <section className="bg-gradient-to-b from-[#0C292F] to-[#081F24] border-t border-[#176B73]/50 py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#123F46] via-[#176B73]/90 to-[#0C292F] border-2 border-[#F3D36B]/50 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs text-[#F3D36B] font-semibold uppercase tracking-wider">
                <MapPin className="w-4 h-4" /> Shukul Bazar, Baskhari Showroom
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#F7F6F1]">
                Visit Jaymurti Traders or Message Us for Expert Shade Sampling
              </h3>
              <p className="text-xs sm:text-sm text-[#B9C8C8] leading-relaxed">
                Consult our Birla Opus colour experts in person, explore physical fan decks, and receive custom paint estimates for homes across Ambedkar Nagar.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#E7ECEA] pt-2">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#F3D36B]" /> 8:00 AM – 9:00 PM (Daily)
                </span>
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-[#F3D36B]" /> +91 87566 59035
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto flex-shrink-0">
              <Button
                asChild
                className="bg-[#F3D36B] text-[#0C292F] font-bold hover:bg-[#E4C45A] text-xs px-6 py-3 rounded-xl shadow-lg shadow-[#F3D36B]/20"
              >
                <a
                  href="https://wa.me/918756659035?text=Hello%20Jaymurti%20Traders,%20I%20would%20like%20to%20consult%20about%20paint%20shades."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire via WhatsApp</span>
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-[#176B73] text-[#F7F6F1] hover:border-[#F3D36B] hover:text-[#F3D36B] hover:bg-[#123F46]/50 text-xs px-5 py-3 rounded-xl"
              >
                <a
                  href="https://maps.app.goo.gl/V1wvtKAGnH5RUG1cA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 text-[#F3D36B]" />
                  <span>Get Store Directions</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Comprehensive Footer with Internal Linking */}
      <footer className="bg-[#081F24] border-t border-[#176B73]/40 py-12 px-4 sm:px-8 text-xs text-[#B9C8C8]">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <img src="/storage/logo.webp" alt="Jaymurti Traders" width={30} height={30} className="rounded-full border border-[#F3D36B]/60 p-0.5" />
              <span className="font-serif font-bold text-[#F7F6F1] group-hover:text-[#F3D36B] text-sm tracking-wider transition-colors">JAYMURTI TRADERS</span>
            </Link>
            <p className="text-[11px] leading-relaxed">
              Authorized Birla Opus paint showroom in Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh - 224129.
            </p>
            <p className="text-[11px] text-[#F3D36B] font-mono font-semibold" lang="hi">
              जयमूर्ति ट्रेडर्स · पेंट की दुकान बस्कहरी
            </p>
          </div>

          {/* Col 2: Paint Products Links */}
          <div className="space-y-2">
            <h4 className="font-serif text-[#F7F6F1] text-xs uppercase tracking-wider font-bold">Paint Portfolio</h4>
            <ul className="space-y-1.5">
              <li><Link href="/paint-products" className="hover:text-[#F3D36B] transition-colors">All Paint Products</Link></li>
              <li><Link href="/interior-paints" className="hover:text-[#F3D36B] transition-colors">Interior Paints</Link></li>
              <li><Link href="/exterior-paints" className="hover:text-[#F3D36B] transition-colors">Exterior Paints</Link></li>
              <li><Link href="/waterproofing" className="hover:text-[#F3D36B] transition-colors">Waterproofing Solutions</Link></li>
              <li><Link href="/enamels" className="hover:text-[#F3D36B] transition-colors">Enamel Paints</Link></li>
              <li><Link href="/wood-finishes" className="hover:text-[#F3D36B] transition-colors">Wood Finishes</Link></li>
            </ul>
          </div>

          {/* Col 3: Inspiration & Studio */}
          <div className="space-y-2">
            <h4 className="font-serif text-[#F7F6F1] text-xs uppercase tracking-wider font-bold">Colour &amp; Finishes</h4>
            <ul className="space-y-1.5">
              <li><Link href="/colour-finder" className="hover:text-[#F3D36B] transition-colors">Colour Guide &amp; Shade Finder</Link></li>
              <li><Link href="/room-inspiration" className="hover:text-[#F3D36B] transition-colors">Room Shade Studio</Link></li>
              <li><Link href="/surface-studio" className="hover:text-[#F3D36B] transition-colors">Surface Studio</Link></li>
              <li><Link href="/wall-textures" className="hover:text-[#F3D36B] transition-colors">Wall Textures</Link></li>
              <li><Link href="/wallpapers" className="hover:text-[#F3D36B] transition-colors">Designer Wallpapers</Link></li>
              <li><Link href="/paint-tools" className="hover:text-[#F3D36B] transition-colors">Painting Tools</Link></li>
            </ul>
          </div>

          {/* Col 4: Showroom & Legal */}
          <div className="space-y-2">
            <h4 className="font-serif text-[#F7F6F1] text-xs uppercase tracking-wider font-bold">Showroom &amp; Legal</h4>
            <ul className="space-y-1.5">
              <li><Link href="/about" className="hover:text-[#F3D36B] transition-colors">About Jaymurti Traders</Link></li>
              <li><Link href="/contact" className="hover:text-[#F3D36B] transition-colors">Contact &amp; Location</Link></li>
              <li><Link href="/privacy" className="hover:text-[#F3D36B] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#F3D36B] transition-colors">Terms &amp; Conditions</Link></li>
              <li>
                <a
                  href="https://www.instagram.com/paintwalebhaiya45/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F3D36B] transition-colors inline-flex items-center gap-1"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" /> Instagram @paintwalebhaiya45
                </a>
              </li>
              <li>
                <a
                  href={businessProfile.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F3D36B] transition-colors inline-flex items-center gap-1"
                >
                  <Facebook className="w-3.5 h-3.5 text-blue-400" /> Facebook Page
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto pt-6 border-t border-[#176B73]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <span>© {new Date().getFullYear()} Jaymurti Traders. Authorized Birla Opus Paint Dealer. All rights reserved.</span>
          <span>Shukul Bazar, Baskhari, Ambedkar Nagar, UP 224129</span>
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
          className="floating-cart"
          aria-label={`Open Enquiry Drawer with ${cartItems.length} items`}
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
    </div>
  );
};
