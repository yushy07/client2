import React, { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { SEOPageLayout } from "@/components/seo/SEOPageLayout";
import { getRouteSEO } from "@shared/seoKeywordMap";
import { RoomShadeStudio } from "@/components/experiences/RoomShadeStudio";
import { RoomLibrary } from "@/components/experiences/RoomLibrary";
import { ColourCapsule } from "@/components/experiences/ColourCapsule";
import { useCart } from "@/contexts/CartContext";
import { Sparkles, Layers, BookOpen, Eye, Palette, ShoppingBag } from "lucide-react";

export const RoomInspirationPage: React.FC = () => {
  const seo = getRouteSEO("/room-inspiration");
  const { addToCart, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState<"studio" | "library" | "capsule">("studio");

  // Deep-link support: parse ?tab=studio&scene=0&shade=BO-1240 from URL
  const urlParams = useMemo(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search);
  }, []);

  const initialSceneIndex = useMemo(() => {
    const s = urlParams?.get("scene");
    if (s != null) {
      const n = parseInt(s, 10);
      if (!isNaN(n) && n >= 0) return n;
    }
    return undefined;
  }, [urlParams]);

  const initialShadeCode = useMemo(() => {
    return urlParams?.get("shade") || undefined;
  }, [urlParams]);

  useEffect(() => {
    const tab = urlParams?.get("tab");
    if (tab === "studio" || tab === "library" || tab === "capsule") {
      setActiveTab(tab);
    }
    // Scroll to the studio section if hash is present
    if (window.location.hash === "#room-shade-studio") {
      setTimeout(() => {
        document.getElementById("room-shade-studio")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }, [urlParams]);

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
                : "bg-dark/60 text-on-dark-muted border-border-teal/50 hover:text-accent hover:border-accent/50"
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
                : "bg-dark/60 text-on-dark-muted border-border-teal/50 hover:text-accent hover:border-accent/50"
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
                : "bg-dark/60 text-on-dark-muted border-border-teal/50 hover:text-accent hover:border-accent/50"
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
            initialSceneIndex={initialSceneIndex}
            initialShadeCode={initialShadeCode}
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

      {/* Cross-linking navigation cards to prevent dead ends */}
      <div className="mt-14 pt-8 border-t border-border-teal/40">
        <h3 className="text-lg font-serif text-white mb-4">Explore More Inspiration &amp; Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/colour-finder"
            className="p-5 rounded-2xl bg-dark-surface border border-border-teal/50 hover:border-accent transition-all group flex flex-col justify-between"
          >
            <Palette className="w-5 h-5 text-accent mb-2" />
            <h4 className="text-sm font-semibold text-white group-hover:text-accent">Birla Opus Colour Finder</h4>
            <p className="text-xs text-on-dark-muted mt-1">159 verified shades with exact hex codes and tone groupings.</p>
          </Link>

          <Link
            href="/surface-studio"
            className="p-5 rounded-2xl bg-dark-surface border border-border-teal/50 hover:border-accent transition-all group flex flex-col justify-between"
          >
            <Sparkles className="w-5 h-5 text-accent mb-2" />
            <h4 className="text-sm font-semibold text-white group-hover:text-accent">Surface Studio</h4>
            <p className="text-xs text-on-dark-muted mt-1">Metallic finishes, stucco textures, and tactile swatches.</p>
          </Link>

          <Link
            href="/paint-products"
            className="p-5 rounded-2xl bg-dark-surface border border-border-teal/50 hover:border-accent transition-all group flex flex-col justify-between"
          >
            <ShoppingBag className="w-5 h-5 text-accent mb-2" />
            <h4 className="text-sm font-semibold text-white group-hover:text-accent">Paint Products Catalog</h4>
            <p className="text-xs text-on-dark-muted mt-1">Interior, exterior, waterproofing, enamels &amp; wood finishes.</p>
          </Link>
        </div>
      </div>
    </SEOPageLayout>
  );
};
