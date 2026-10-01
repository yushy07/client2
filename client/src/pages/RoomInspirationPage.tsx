import React, { useState } from "react";
import { Link } from "wouter";
import { SEOPageLayout } from "@/components/seo/SEOPageLayout";
import { SITE_ROUTES_SEO } from "@shared/seoKeywordMap";
import { RoomShadeStudio } from "@/components/experiences/RoomShadeStudio";
import { RoomLibrary } from "@/components/experiences/RoomLibrary";
import { ColourCapsule } from "@/components/experiences/ColourCapsule";
import { useCart } from "@/contexts/CartContext";
import { Sparkles, Layers, BookOpen, Eye } from "lucide-react";

export const RoomInspirationPage: React.FC = () => {
  const seo = SITE_ROUTES_SEO["/room-inspiration"];
  const { addToCart, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState<"studio" | "library" | "capsule">("studio");

  return (
    <SEOPageLayout seo={seo}>
      {/* Introduction Banner */}
      <div className="bg-dark-surface/80 p-6 sm:p-8 rounded-3xl border border-border-teal/50 mb-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
          <Layers className="w-4 h-4" /> Spatial Colour Science & Daylight Simulation
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-white">
          Visualise Real Wall Shades in Physical Architectural Spaces
        </h2>
        <p className="text-xs sm:text-sm text-on-dark-muted leading-relaxed max-w-3xl">
          Wall color fundamentally shifts perceived dimensions, light temperature, and mood. Switch between our interactive Room Studio, the 102-space architectural room archive, and the 50-spread Colour Capsule lookbook below.
        </p>

        {/* Section Navigation Tabs to Avoid Endless Continuous Scroll */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab("studio")}
            className={`text-xs px-4 py-2 rounded-xl border transition-all font-semibold flex items-center gap-2 ${
              activeTab === "studio"
                ? "bg-accent text-dark border-accent shadow-md"
                : "bg-dark/60 text-on-dark-muted border-border-teal/50 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Room Shade Studio (Interactive)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("library")}
            className={`text-xs px-4 py-2 rounded-xl border transition-all font-semibold flex items-center gap-2 ${
              activeTab === "library"
                ? "bg-accent text-dark border-accent shadow-md"
                : "bg-dark/60 text-on-dark-muted border-border-teal/50 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Room Library (102 Spaces)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("capsule")}
            className={`text-xs px-4 py-2 rounded-xl border transition-all font-semibold flex items-center gap-2 ${
              activeTab === "capsule"
                ? "bg-accent text-dark border-accent shadow-md"
                : "bg-dark/60 text-on-dark-muted border-border-teal/50 hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Colour Capsule (50 Spreads)</span>
          </button>
        </div>
      </div>

      {/* Experience Display Area */}
      {activeTab === "studio" && (
        <section aria-label="Room Shade Studio Interactive" className="rounded-3xl overflow-hidden border border-border-teal/40">
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
          />
        </section>
      )}

      {activeTab === "library" && (
        <section aria-label="Room Library Archive" className="rounded-3xl overflow-hidden border border-border-teal/40">
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
          />
        </section>
      )}

      {activeTab === "capsule" && (
        <section aria-label="Colour Capsule Lookbook" className="rounded-3xl overflow-hidden border border-border-teal/40">
          <ColourCapsule
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
        </section>
      )}
    </SEOPageLayout>
  );
};
