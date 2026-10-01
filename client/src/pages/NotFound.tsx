import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { usePageSEO } from "@/hooks/usePageSEO";
import {
  Home,
  Palette,
  ShoppingBag,
  MessageCircle,
  ArrowLeft,
  Compass,
  MapPin,
  PhoneCall
} from "lucide-react";

export default function NotFound() {
  usePageSEO({
    title: "Page Not Found | Jaymurti Traders",
    description: "The page you are looking for does not exist. Return to Jaymurti Traders showroom in Baskhari, Ambedkar Nagar to explore Birla Opus paints, colour finder, and room shade studio.",
    canonicalPath: "/404",
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0C292F] via-[#123F46] to-[#0C292F] text-[#F7F6F1] flex flex-col justify-between relative overflow-hidden font-sans selection:bg-accent/30 selection:text-white">
      {/* Decorative ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <header className="p-6 sm:p-8 flex items-center justify-between border-b border-[#176B73]/40 relative z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/storage/logo.webp"
            alt="Jaymurti Traders Logo"
            width={38}
            height={38}
            className="rounded-full border border-[#F3D36B]/60 p-0.5 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-serif tracking-wider text-sm sm:text-base font-bold text-[#F7F6F1] group-hover:text-accent transition-colors">
              JAYMURTI TRADERS
            </span>
            <span className="text-[10px] text-accent tracking-widest uppercase font-mono" lang="hi">
              जयमूर्ति ट्रेडर्स · Baskhari
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-on-dark-muted hover:text-accent transition-colors border border-border-teal/60 px-3.5 py-1.5 rounded-full bg-dark-surface/60 hover:bg-dark-surface hover:border-accent/40"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Showroom</span>
        </Link>
      </header>

      {/* Main 404 Hero */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 flex-1 flex items-center justify-center relative z-10">
        <div className="max-w-2xl w-full text-center space-y-8">
          
          {/* 404 Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-surface/90 text-accent text-xs font-semibold uppercase tracking-wider border border-border-teal/60 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-accent animate-spin" style={{ animationDuration: "12s" }} />
            <span>Error 404 · Uncharted Surface</span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-tight">
              Page Not Found
            </h1>
            <p className="text-base sm:text-lg text-on-dark-muted max-w-xl mx-auto leading-relaxed">
              The architectural space or colour shade page you are looking for may have been relocated, renamed, or is unavailable.
            </p>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            <Link
              href="/"
              className="p-5 rounded-2xl bg-dark-surface/80 border border-border-teal/50 hover:border-accent hover:bg-dark-surface transition-all group flex flex-col justify-between space-y-3"
            >
              <div className="w-9 h-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-dark transition-colors">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                  Showroom Home
                </h2>
                <p className="text-xs text-on-dark-muted mt-1 leading-relaxed">
                  Return to main showroom, campaigns, and store discovery.
                </p>
              </div>
            </Link>

            <Link
              href="/#shades-explorer"
              className="p-5 rounded-2xl bg-dark-surface/80 border border-border-teal/50 hover:border-accent hover:bg-dark-surface transition-all group flex flex-col justify-between space-y-3"
            >
              <div className="w-9 h-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-dark transition-colors">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                  Colour Finder
                </h2>
                <p className="text-xs text-on-dark-muted mt-1 leading-relaxed">
                  Browse 159 verified Birla Opus architectural shades.
                </p>
              </div>
            </Link>

            <Link
              href="/#catalogue"
              className="p-5 rounded-2xl bg-dark-surface/80 border border-border-teal/50 hover:border-accent hover:bg-dark-surface transition-all group flex flex-col justify-between space-y-3"
            >
              <div className="w-9 h-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-dark transition-colors">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                  Product Catalogue
                </h2>
                <p className="text-xs text-on-dark-muted mt-1 leading-relaxed">
                  Interior & exterior emulsions, enamels, waterproofing.
                </p>
              </div>
            </Link>
          </div>

          {/* Action CTA Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              className="bg-accent text-dark font-bold hover:bg-accent/90 text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-accent/20 w-full sm:w-auto"
            >
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Link>
            </Button>

            <a
              href="https://wa.me/918756659035?text=Hi%20Jaymurti%20Traders,%20I%20was%20browsing%20your%20website%20and%20needed%20assistance."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-border-teal/80 hover:border-accent text-white hover:bg-teal-900/60 hover:text-accent text-xs px-5 py-2.5 rounded-xl transition-all w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Contact via WhatsApp</span>
            </a>
          </div>

        </div>
      </main>

      {/* Footer info bar */}
      <footer className="p-6 border-t border-white/5 text-center text-xs text-on-dark-muted relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            Shukul Bazar, Baskhari, Ambedkar Nagar, UP 224129
          </span>
          <span className="flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-accent" />
            +91 87566 59035 (8 AM – 9 PM)
          </span>
        </div>
      </footer>
    </div>
  );
}
