import React, { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
import { colourTickerShades } from "@shared/colourDirections";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, ArrowRight, Palette } from "lucide-react";

export const HomeColoursPreview: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedShadeIndex, setSelectedShadeIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSelectedShadeIndex((current) => (current + 1) % colourTickerShades.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeShade = useMemo(() => {
    return colourTickerShades[selectedShadeIndex] ?? colourTickerShades[0]!;
  }, [selectedShadeIndex]);

  const colourTickerLoop = useMemo(() => {
    return [...colourTickerShades, ...colourTickerShades, ...colourTickerShades];
  }, []);

  return (
    <section className="colours visual-colours-refinement reveal scroll-chapter" id="colours" data-scroll-section data-section-label="Colours">
      <div className="colour-archive-hero visual-archive-hero visual-archive-compact" style={{ "--active-banner-shade": activeShade.hex } as React.CSSProperties}>
        <div className="colour-archive-shade" />

        {/* Mobile-First Active Shade Stage */}
        <div className="colour-archive-mobile-stage">
          <div className="mobile-stage-topbar">
            <span className="mobile-stage-pill">
              <span className="mobile-stage-live-dot" />
              Birla Opus Shade
            </span>
            <span className="mobile-stage-counter">
              {String(activeShade.position).padStart(2, "0")} / {String(colourTickerShades.length).padStart(2, "0")}
            </span>
          </div>

          <div className="mobile-stage-body">
            <div className="mobile-stage-headings">
              <span className="mobile-stage-eyebrow">Active Curated Selection</span>
              <h3 className="mobile-stage-shade-name">{activeShade.name}</h3>
            </div>
            <span className="mobile-stage-shade-code">{activeShade.code}</span>
          </div>

          <button
            type="button"
            className="mobile-stage-nav-btn prev"
            onClick={() => setSelectedShadeIndex((current) => (current - 1 + colourTickerShades.length) % colourTickerShades.length)}
            aria-label="Previous curated shade"
          >
            ‹
          </button>
          <button
            type="button"
            className="mobile-stage-nav-btn next"
            onClick={() => setSelectedShadeIndex((current) => (current + 1) % colourTickerShades.length)}
            aria-label="Next curated shade"
          >
            ›
          </button>
        </div>

        {/* Hero Copy */}
        <div className="colour-archive-hero-copy">
          <div className="eyebrow">Curated Spectral Directions</div>
          <p className="colour-archive-label">Selected · {activeShade.name} ({activeShade.code})</p>
          <h2>
            Spectral Depth,
            <br />
            Architectural Balance.
          </h2>
          <p>
            Preview signature tonal directions anchor living room ambiance and natural daylight. Inspect undertones or launch the complete 159-shade library.
          </p>

          <div className="colour-archive-actions">
            <button
              type="button"
              className="button-primary"
              onClick={() =>
                addToCart({
                  id: `shade-${activeShade.code.replace(/\s+/g, "-")}`,
                  type: "shade",
                  title: activeShade.name,
                  meta: `Shade Code: ${activeShade.code}`,
                  colourHex: activeShade.hex,
                }, true)
              }
            >
              <ShoppingBag size={15} />
              <span>+ Add {activeShade.name} to Enquiry</span>
            </button>
            <Link className="colour-archive-link" href="/colour-finder">
              <span>Open Colour Guide & 159 Verified Shades</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Specimen Tag */}
        <div className="colour-archive-specimen" aria-live="polite">
          <span className="specimen-swatch-dot" style={{ background: activeShade.hex }} aria-hidden="true" />
          <div className="specimen-info">
            <span className="specimen-eyebrow">Active Selection</span>
            <strong className="specimen-name">{activeShade.name}</strong>
          </div>
          <span className="specimen-code">{activeShade.code}</span>
        </div>

        {/* Smooth Shade Ticker Track */}
        <div
          className="colour-archive-ticker"
          aria-label="Curated shade ticker"
        >
          <div
            className="colour-archive-ticker-track"
            style={{ "--shade-step": colourTickerShades.length + selectedShadeIndex } as React.CSSProperties}
          >
            {colourTickerLoop.map((shade, idx) => {
              const isActive = idx % colourTickerShades.length === selectedShadeIndex;
              return (
                <button
                  type="button"
                  className={`colour-archive-ticker-swatch${isActive ? " active" : ""}`}
                  style={{ "--ticker-shade": shade.hex } as React.CSSProperties}
                  key={`${shade.code}-${idx}`}
                  onClick={() => setSelectedShadeIndex(idx % colourTickerShades.length)}
                  aria-label={`Select shade ${shade.name}, ${shade.code}`}
                >
                  <span>{String(shade.position).padStart(3, "0")}</span>
                  <i aria-hidden="true" />
                  <strong>{shade.name}</strong>
                  <em>{shade.code}</em>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Colour Guide & Shade Finder Invitation Footer */}
      <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950/30 via-dark-surface to-dark-surface border border-border-teal/40 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs uppercase font-mono text-accent font-semibold tracking-wider">
            Verified Birla Opus Spectral Library
          </span>
          <h3 className="text-lg sm:text-xl font-serif text-white">
            Official Birla Opus Colour Guide & 159 Verified Shades
          </h3>
          <p className="text-xs text-on-dark-muted max-w-xl">
            Search by code or tone, copy exact hex codes, and filter across Whites, Warm Neutrals, Regal Blues, and Forest Greens.
          </p>
        </div>

        <Link
          href="/colour-finder"
          className="button-primary whitespace-nowrap px-5 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-accent/20"
        >
          <Palette size={15} />
          <span>Launch Colour Guide</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
};
