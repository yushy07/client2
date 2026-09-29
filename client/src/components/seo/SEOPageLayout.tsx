import React from "react";
import { Link } from "wouter";
import { usePageSEO } from "@/hooks/usePageSEO";
import { type RouteSEOConfig, CANONICAL_HOST } from "@shared/seoKeywordMap";
import {
  Home,
  MapPin,
  PhoneCall,
  MessageCircle,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Clock,
  Instagram,
  Compass,
  Layers,
  Palette,
  ShoppingBag,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
    <div className="min-h-screen bg-[#0c1214] text-white flex flex-col justify-between font-sans selection:bg-accent/30 selection:text-white">
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
      <div className="bg-[#080d0e] border-b border-white/5 py-2 px-4 sm:px-8 text-xs text-on-dark-muted flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            Authorized Birla Opus Paint Dealer · <strong className="text-white font-semibold">JAYMURTI TRADERS</strong>
          </span>
          <span className="hidden md:inline text-white/40" lang="hi">(जयमूर्ति ट्रेडर्स)</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-white/70">
            <MapPin className="w-3 h-3 text-accent" /> Shukul Bazar, Baskhari (UP 224129)
          </span>
          <a
            href="tel:+918756659035"
            className="flex items-center gap-1 text-accent hover:underline font-semibold"
          >
            <PhoneCall className="w-3 h-3" /> +91 87566 59035
          </a>
        </div>
      </div>

      {/* 2. Global Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0c1214]/95 backdrop-blur-md border-b border-border-teal/40 py-3.5 px-4 sm:px-8">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/storage/logo.png"
              alt="Jaymurti Traders Logo"
              width={34}
              height={34}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-serif tracking-wider text-sm sm:text-base font-semibold text-white">
                JAYMURTI TRADERS
              </span>
              <span className="text-[10px] text-accent tracking-widest uppercase font-mono" lang="hi">
                जयमूर्ति ट्रेडर्स · Baskhari
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-on-dark-muted" aria-label="Main Navigation">
            <Link href="/" className="hover:text-white transition-colors">Showroom</Link>
            <Link href="/paint-products" className="hover:text-white transition-colors">Products</Link>
            <Link href="/colour-finder" className="hover:text-white transition-colors">Colour Finder</Link>
            <Link href="/room-inspiration" className="hover:text-white transition-colors">Room Studio</Link>
            <Link href="/surface-studio" className="hover:text-white transition-colors">Surface Studio</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/918756659035?text=Hello%20Jaymurti%20Traders,%20I%20am%20enquiring%20about%20Birla%20Opus%20paints%20and%20shades."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Showroom</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero Header with Semantic Breadcrumbs */}
      <section className="bg-gradient-to-b from-[#101b1e] via-[#0c1214] to-[#0c1214] border-b border-border-teal/30 py-8 sm:py-14 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center flex-wrap gap-2 text-xs text-on-dark-muted font-medium">
              {seo.breadcrumb.map((item, idx) => {
                const isLast = idx === seo.breadcrumb.length - 1;
                return (
                  <li key={item.path} className="flex items-center gap-2">
                    {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-white/30" />}
                    {isLast ? (
                      <span className="text-accent font-semibold" aria-current="page">
                        {item.name}
                      </span>
                    ) : (
                      <Link href={item.path} className="hover:text-white transition-colors">
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-surface/90 text-accent text-xs font-semibold uppercase tracking-wider border border-border-teal/60 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>{seo.eyebrow}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
              {seo.h1}
            </h1>

            <p className="text-base sm:text-lg text-on-dark-muted leading-relaxed font-sans">
              {seo.description}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Main Page Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1">
        {children}
      </main>

      {/* 5. FAQs Section (if provided) */}
      {showFAQ && seo.faq && seo.faq.length > 0 && (
        <section className="bg-[#0e1619] border-t border-border-teal/40 py-12 sm:py-16" aria-label="Frequently Asked Questions">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center space-y-3 mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" /> Clear Answers for Your Project
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white">Frequently Asked Questions</h2>
              <p className="text-xs sm:text-sm text-on-dark-muted max-w-xl mx-auto">
                Helpful details about Birla Opus paint products, computerized shade tinting, and showroom services at Baskhari.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {seo.faq.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="bg-dark-surface/80 border border-border-teal/50 rounded-2xl px-5 py-1 overflow-hidden"
                >
                  <AccordionTrigger className="text-sm sm:text-base font-semibold text-white hover:text-accent transition-colors py-4 text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-on-dark-muted leading-relaxed pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* 6. Local Showroom Visit & Direct Contact CTA */}
      <section className="bg-gradient-to-r from-[#0e1c1f] via-[#0f2225] to-[#0e1c1f] border-t border-border-teal/50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-dark-surface/90 border border-accent/40 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs text-accent font-semibold uppercase tracking-wider">
                <MapPin className="w-4 h-4" /> Shukul Bazar, Baskhari Showroom
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-white">
                Visit Jaymurti Traders or Message Us for Expert Shade Sampling
              </h3>
              <p className="text-xs sm:text-sm text-on-dark-muted leading-relaxed">
                Consult our Birla Opus colour experts in person, explore physical fan decks, and receive custom paint estimates for homes across Ambedkar Nagar.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 pt-2">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-accent" /> 8:00 AM – 9:00 PM (Daily)
                </span>
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-accent" /> +91 87566 59035
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto flex-shrink-0">
              <Button
                asChild
                className="bg-accent text-dark font-bold hover:bg-accent/90 text-xs px-6 py-3 rounded-xl shadow-lg shadow-accent/20"
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
                className="border-border-teal text-white hover:bg-white/5 text-xs px-5 py-3 rounded-xl"
              >
                <a
                  href="https://maps.app.goo.gl/V1wvtKAGnH5RUG1cA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 text-accent" />
                  <span>Get Store Directions</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Comprehensive Footer with Internal Linking */}
      <footer className="bg-[#080d0e] border-t border-white/5 py-12 px-4 sm:px-8 text-xs text-on-dark-muted">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/storage/logo.png" alt="Jaymurti Traders" width={28} height={28} />
              <span className="font-serif font-semibold text-white text-sm tracking-wider">JAYMURTI TRADERS</span>
            </Link>
            <p className="text-[11px] leading-relaxed">
              Authorized Birla Opus paint showroom in Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh - 224129.
            </p>
            <p className="text-[10px] text-accent font-mono" lang="hi">
              जयमूर्ति ट्रेडर्स · पेंट की दुकान बस्कहरी
            </p>
          </div>

          {/* Col 2: Paint Products Links */}
          <div className="space-y-2">
            <h4 className="font-serif text-white text-xs uppercase tracking-wider">Paint Portfolio</h4>
            <ul className="space-y-1.5">
              <li><Link href="/paint-products" className="hover:text-white transition-colors">All Paint Products</Link></li>
              <li><Link href="/interior-paints" className="hover:text-white transition-colors">Interior Paints</Link></li>
              <li><Link href="/exterior-paints" className="hover:text-white transition-colors">Exterior Paints</Link></li>
              <li><Link href="/waterproofing" className="hover:text-white transition-colors">Waterproofing Solutions</Link></li>
              <li><Link href="/enamels" className="hover:text-white transition-colors">Enamel Paints</Link></li>
              <li><Link href="/wood-finishes" className="hover:text-white transition-colors">Wood Finishes</Link></li>
            </ul>
          </div>

          {/* Col 3: Inspiration & Studio */}
          <div className="space-y-2">
            <h4 className="font-serif text-white text-xs uppercase tracking-wider">Colour & Finishes</h4>
            <ul className="space-y-1.5">
              <li><Link href="/colour-finder" className="hover:text-white transition-colors">Birla Opus Colour Finder</Link></li>
              <li><Link href="/room-inspiration" className="hover:text-white transition-colors">Room Shade Studio</Link></li>
              <li><Link href="/surface-studio" className="hover:text-white transition-colors">Surface Studio</Link></li>
              <li><Link href="/wall-textures" className="hover:text-white transition-colors">Wall Textures</Link></li>
              <li><Link href="/wallpapers" className="hover:text-white transition-colors">Designer Wallpapers</Link></li>
              <li><Link href="/paint-tools" className="hover:text-white transition-colors">Painting Tools</Link></li>
            </ul>
          </div>

          {/* Col 4: Showroom & Legal */}
          <div className="space-y-2">
            <h4 className="font-serif text-white text-xs uppercase tracking-wider">Showroom & Legal</h4>
            <ul className="space-y-1.5">
              <li><Link href="/about" className="hover:text-white transition-colors">About Jaymurti Traders</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact & Location</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li>
                <a
                  href="https://www.instagram.com/paintwalebhaiya45/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <Instagram className="w-3 h-3 text-pink-400" /> Instagram @paintwalebhaiya45
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <span>© {new Date().getFullYear()} Jaymurti Traders. Authorized Birla Opus Paint Dealer. All rights reserved.</span>
          <span>Shukul Bazar, Baskhari, Ambedkar Nagar, UP 224129</span>
        </div>
      </footer>
    </div>
  );
};
