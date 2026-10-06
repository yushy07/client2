import React, { useState } from "react";
import { Link } from "wouter";
import { SEOPageLayout } from "@/components/seo/SEOPageLayout";
import { getRouteSEO } from "@shared/seoKeywordMap";
import { businessProfile } from "@shared/businessProfile";
import { InsideJaymurti } from "@/components/experiences/InsideJaymurti";
import { StepInside } from "@/components/experiences/StepInside";
import { OwnerAndTeam } from "@/components/experiences/OwnerAndTeam";
import { ShowroomVideoModal, VideoModalItem } from "@/components/ShowroomVideoModal";
import { ShowroomLocationCard } from "@/components/common/ShowroomLocationCard";
import {
  MapPin,
  MessageCircle,
  BadgeCheck,
  ShieldCheck,
  Layers,
  Palette,
  Store,
  Video,
  Play,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const AboutPage: React.FC = () => {
  const seo = getRouteSEO("/about");

  const [videoModalData, setVideoModalData] = useState<{
    isOpen: boolean;
    title: string;
    subtitle: string;
    videos: VideoModalItem[];
  }>({
    isOpen: false,
    title: "",
    subtitle: "",
    videos: []
  });

  const handleAuthorisedDealershipClick = () => {
    setVideoModalData({
      isOpen: true,
      title: "Authorised Birla Opus Dealership · Jaymurti Traders",
      subtitle: "Official showroom walkthrough & genuine paint inventory in Baskhari, Ambedkar Nagar",
      videos: [
        {
          title: "Authorised Dealership Showroom Tour",
          src: "/storage/jay-murti-traders-v4.mp4",
          badge: "Full Tour"
        }
      ]
    });
  };

  const handleComputerisedTintingClick = () => {
    setVideoModalData({
      isOpen: true,
      title: "Computerized Tinting & Showroom Stock",
      subtitle: "Automated high-precision shade dispensing & 100% genuine Birla Opus paint formulations",
      videos: [
        {
          title: "Computerized Tinting Machine",
          src: "/storage/tiniting machine.mp4",
          badge: "Tinting Unit"
        },
        {
          title: "Showroom Materials & Formulations",
          src: "/storage/shopmaterial2.mp4",
          badge: "Inventory & Stock"
        }
      ]
    });
  };

  return (
    <SEOPageLayout seo={seo}>
      <div className="space-y-16">
        
        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 text-xs text-accent font-semibold uppercase tracking-wider">
              <BadgeCheck className="w-4 h-4" /> Authorised Dealership · Baskhari
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white leading-tight">
              A Modern Paint & Architectural Colour Showroom in Ambedkar Nagar
            </h2>
            <p className="text-sm sm:text-base text-on-dark-muted leading-relaxed">
              <strong>JAYMURTI TRADERS · जयमूर्ति ट्रेडर्स</strong> is established in Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh as an authorised Birla Opus paint dealership.
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
                className="border-border-teal text-white hover:bg-teal-900/60 hover:text-accent hover:border-accent/40 text-xs px-5 py-2.5 rounded-xl transition-all"
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

        <ShowroomLocationCard />

        {/* 4 Core Showroom Pillars */}
        <section className="space-y-6">
          <div className="border-b border-border-teal/40 pb-3">
            <h2 className="text-2xl font-serif text-white">Why Homeowners & Painters Choose Jaymurti Traders</h2>
            <p className="text-xs text-on-dark-muted mt-1">Verified offerings and showroom standards in Ambedkar Nagar district. Tap to explore videos and shade galleries.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: 100% Genuine Birla Opus / Authorised Dealership -> Plays Showroom Tour Video */}
            <div
              role="button"
              tabIndex={0}
              onClick={handleAuthorisedDealershipClick}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleAuthorisedDealershipClick(); }}
              className="p-6 rounded-2xl bg-dark-surface border border-border-teal/50 hover:border-accent/70 hover:shadow-xl transition-all space-y-3 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Store className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-accent transition-colors">
                  100% Genuine Birla Opus
                </h3>
                <p className="text-xs text-on-dark-muted leading-relaxed">
                  Direct authorized inventory of interior luxury emulsions, exterior all-weather coats, and All Dry waterproofing.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-accent font-semibold">
                <span className="flex items-center gap-1.5 group-hover:underline">
                  <Play className="w-3.5 h-3.5 fill-current" /> Watch Tour Video
                </span>
                <span className="text-[10px] font-mono text-teal-300/80 uppercase">Play</span>
              </div>
            </div>

            {/* Card 2: Computerized Tinting -> Plays Tinting Machine & Materials Videos */}
            <div
              role="button"
              tabIndex={0}
              onClick={handleComputerisedTintingClick}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleComputerisedTintingClick(); }}
              className="p-6 rounded-2xl bg-dark-surface border border-border-teal/50 hover:border-accent/70 hover:shadow-xl transition-all space-y-3 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Palette className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-accent transition-colors">
                  Computerized Tinting
                </h3>
                <p className="text-xs text-on-dark-muted leading-relaxed">
                  Precision automated shade dispensers ensuring consistent batch-to-batch color reproduction for all 159 shades.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-accent font-semibold">
                <span className="flex items-center gap-1.5 group-hover:underline">
                  <Play className="w-3.5 h-3.5 fill-current" /> Watch Machine & Stock
                </span>
                <span className="text-[10px] font-mono text-teal-300/80 uppercase">2 Videos</span>
              </div>
            </div>

            {/* Card 3: Live Sample Displays / Physical Sampling -> Navigates to Colour Finder */}
            <Link
              href="/colour-finder"
              className="p-6 rounded-2xl bg-dark-surface border border-border-teal/50 hover:border-accent/70 hover:shadow-xl transition-all space-y-3 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-accent transition-colors">
                  Live Sample Displays
                </h3>
                <p className="text-xs text-on-dark-muted leading-relaxed">
                  Inspect physical fan decks, applied wall texture boards, and wallpaper swatches in person under true lighting.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-accent font-semibold">
                <span className="flex items-center gap-1.5 group-hover:underline">
                  <span>Explore 159 Shades</span> <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] font-mono text-teal-300/80 uppercase">Explore</span>
              </div>
            </Link>

            {/* Card 4: On-Site Guidance */}
            <Link
              href="/contact"
              className="p-6 rounded-2xl bg-dark-surface border border-border-teal/50 hover:border-accent/70 hover:shadow-xl transition-all space-y-3 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-accent transition-colors">
                  On-Site Guidance
                </h3>
                <p className="text-xs text-on-dark-muted leading-relaxed">
                  Expert consultation on moisture proofing, surface preparation, coat estimation, and painter recommendations.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-accent font-semibold">
                <span className="flex items-center gap-1.5 group-hover:underline">
                  <span>Contact Showroom</span> <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] font-mono text-teal-300/80 uppercase">Visit</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Step Inside: Cinematic Showroom Video Experience */}
        <section id="step-inside" className="space-y-6 pt-4">
          <div className="border-b border-border-teal/40 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-serif text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-accent" /> Step Inside: Cinematic Showroom Tour
              </h2>
              <p className="text-xs text-on-dark-muted mt-1">
                Experience our Baskhari store environment, color fandeck counter, and automated tinting bar.
              </p>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-border-teal/40">
            <StepInside />
          </div>
        </section>

        {/* Inside Jaymurti: Photographic Gallery */}
        <section id="showroom" className="space-y-6 pt-4">
          <div className="border-b border-border-teal/40 pb-3">
            <h2 className="text-2xl font-serif text-white">Inside Our Showroom (Photo Gallery)</h2>
            <p className="text-xs text-on-dark-muted mt-1">
              Explore high-resolution captures of our paint stock, display walls, and consultation area.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-border-teal/40">
            <InsideJaymurti />
          </div>
        </section>

        {/* Founder & Showroom Team Section */}
        <section id="team" className="space-y-6 pt-4">
          <div className="rounded-3xl overflow-hidden border border-border-teal/40">
            <OwnerAndTeam />
          </div>
        </section>

      </div>

      {/* Showroom Video Modal for Dealership & Tinting Videos */}
      <ShowroomVideoModal
        isOpen={videoModalData.isOpen}
        onClose={() => setVideoModalData(prev => ({ ...prev, isOpen: false }))}
        title={videoModalData.title}
        subtitle={videoModalData.subtitle}
        videos={videoModalData.videos}
      />
    </SEOPageLayout>
  );
};
