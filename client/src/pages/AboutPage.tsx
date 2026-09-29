import React from "react";
import { Link } from "wouter";
import { SEOPageLayout } from "@/components/seo/SEOPageLayout";
import { SITE_ROUTES_SEO } from "@shared/seoKeywordMap";
import { businessProfile } from "@shared/businessProfile";
import {
  MapPin,
  Clock,
  PhoneCall,
  MessageCircle,
  BadgeCheck,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Palette,
  Store
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const AboutPage: React.FC = () => {
  const seo = SITE_ROUTES_SEO["/about"];

  return (
    <SEOPageLayout seo={seo}>
      <div className="space-y-16">
        
        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 text-xs text-accent font-semibold uppercase tracking-wider">
              <BadgeCheck className="w-4 h-4" /> Authorized Dealership · Baskhari
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white leading-tight">
              A Modern Paint & Architectural Colour Showroom in Ambedkar Nagar
            </h2>
            <p className="text-sm sm:text-base text-on-dark-muted leading-relaxed">
              <strong>JAYMURTI TRADERS (जयमूर्ति ट्रेडर्स)</strong> is established in Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh as an authorized Birla Opus paint dealership.
            </p>
            <p className="text-xs sm:text-sm text-on-dark-muted leading-relaxed">
              We bring Aditya Birla Group’s premier paint innovation — Birla Opus — directly to homeowners, architects, painters, and builders. Our mission is to combine authentic formulations, exact computerized tinting machines, and expert colour curation in a welcoming showroom environment.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="bg-accent text-dark font-bold hover:bg-accent/90 text-xs px-5 py-2.5 rounded-xl"
              >
                <Link href="/contact">
                  <MapPin className="w-3.5 h-3.5 mr-1.5" /> Visit Showroom
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-border-teal text-white hover:bg-white/5 text-xs px-5 py-2.5 rounded-xl"
              >
                <a
                  href={`https://wa.me/${businessProfile.whatsappHref}?text=Hello%20Jaymurti%20Traders,%20I%20would%20like%20to%20know%20more%20about%20your%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> WhatsApp Us
                </a>
              </Button>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-border-teal/60 bg-dark shadow-2xl">
            <img
              src="/storage/storefront/shopwide.webp"
              alt="Jaymurti Traders Birla Opus Paint Showroom storefront in Baskhari"
              loading="lazy"
              decoding="async"
              width={800}
              height={500}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-xs">
              <span className="font-semibold text-white">Jaymurti Traders Showroom</span>
              <p className="text-[11px] text-on-dark-muted">Shukul Bazar, Baskhari, Ambedkar Nagar (UP 224129)</p>
            </div>
          </div>
        </section>

        {/* 4 Core Showroom Pillars */}
        <section className="space-y-6">
          <div className="border-b border-border-teal/40 pb-3">
            <h2 className="text-2xl font-serif text-white">Why Homeowners & Painters Choose Jaymurti Traders</h2>
            <p className="text-xs text-on-dark-muted mt-1">Verified offerings and showroom standards in Ambedkar Nagar district.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-dark-surface border border-border-teal/50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">100% Genuine Birla Opus</h3>
              <p className="text-xs text-on-dark-muted leading-relaxed">
                Direct authorized inventory of interior luxury emulsions, exterior all-weather coats, and All Dry waterproofing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-surface border border-border-teal/50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Computerized Tinting</h3>
              <p className="text-xs text-on-dark-muted leading-relaxed">
                Precision automated shade dispensers ensuring consistent batch-to-batch color reproduction for all 159 shades.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-surface border border-border-teal/50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Live Sample Displays</h3>
              <p className="text-xs text-on-dark-muted leading-relaxed">
                Inspect physical fan decks, applied wall texture boards, and wallpaper swatches in person under true lighting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-surface border border-border-teal/50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">On-Site Guidance</h3>
              <p className="text-xs text-on-dark-muted leading-relaxed">
                Expert consultation on moisture proofing, surface preparation, coat estimation, and painter recommendations.
              </p>
            </div>
          </div>
        </section>

      </div>
    </SEOPageLayout>
  );
};
