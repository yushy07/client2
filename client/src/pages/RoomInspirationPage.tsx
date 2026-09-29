import React from "react";
import { Link } from "wouter";
import { SEOPageLayout } from "@/components/seo/SEOPageLayout";
import { SITE_ROUTES_SEO } from "@shared/seoKeywordMap";
import { RoomShadeStudio } from "@/components/experiences/RoomShadeStudio";
import { ColourCapsule } from "@/components/experiences/ColourCapsule";
import { Sparkles, Layers, Palette, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const RoomInspirationPage: React.FC = () => {
  const seo = SITE_ROUTES_SEO["/room-inspiration"];

  return (
    <SEOPageLayout seo={seo}>
      {/* Introduction Banner */}
      <div className="bg-dark-surface/80 p-6 sm:p-8 rounded-3xl border border-border-teal/50 mb-12 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
          <Layers className="w-4 h-4" /> Spatial Colour Science & Daylight Simulation
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-white">
          Visualise 166 Real Wall Shades in 12 Physical Architectural Spaces
        </h2>
        <p className="text-xs sm:text-sm text-on-dark-muted leading-relaxed max-w-3xl">
          Wall color fundamentally shifts the perceived dimensions, temperature, and mood of any room. Use our Room Shade Studio below to compare two shades side-by-side or explore the lookbook grid.
        </p>
      </div>

      {/* 1. Room Shade Studio Component */}
      <div className="rounded-3xl overflow-hidden mb-16 border border-border-teal/40">
        <RoomShadeStudio />
      </div>

      {/* 2. Colour Capsule Lookbook Spreads */}
      <div className="space-y-6 pt-10 border-t border-border-teal/40">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs text-accent font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Editorial Curation
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">
            Colour Capsule — 50 Curated Tonal Spreads
          </h2>
          <p className="text-xs sm:text-sm text-on-dark-muted max-w-2xl">
            Explore editorial interior concepts paired with verified Birla Opus color codes, acoustic swatches, and lighting dynamics.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden border border-border-teal/40">
          <ColourCapsule />
        </div>
      </div>
    </SEOPageLayout>
  );
};
