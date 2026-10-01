import React from "react";
import { Link } from "wouter";
import { ArrowRight, Compass, Eye } from "lucide-react";

export const HomeInspirationPreview: React.FC = () => {
  const previewSpaces = [
    {
      title: "Regal Living Room Lounge",
      tone: "Warm Cashmere",
      shadeCode: "BO-1240",
      hex: "#BEAD9D",
      image: "/storage/same-room-shades/img22.webp",
      desc: "Simulate natural north daylight on warm earthen neutrals for welcoming living spaces.",
      tag: "Living Room Studio",
    },
    {
      title: "Tranquil Master Sanctuary",
      tone: "Sage Mist & Soft Linen",
      shadeCode: "BO-0891",
      hex: "#8A9A86",
      image: "/storage/same-room-shades/img104.webp",
      desc: "Calming low-sheen matt textures tailored for restful bedroom retreats with soft morning light.",
      tag: "Bedroom Sanctuary",
    },
    {
      title: "Contemporary Dining & Gallery",
      tone: "Terracotta Glow",
      shadeCode: "BO-1422",
      hex: "#C06E52",
      image: "/storage/same-room-shades/img101.webp",
      desc: "Warm ambient evening lighting enhancing architectural depth, masonry arches, and feature walls.",
      tag: "Dining & Accent Hall",
    },
  ];

  return (
    <section className="ideas visual-ideas-compact reveal scroll-chapter" id="inspiration" data-scroll-section data-section-label="Inspiration">
      <div className="section-header visual-ideas-header">
        <div>
          <div className="eyebrow" style={{ color: "var(--color-accent)" }}>Spatial Colour Visualisation</div>
          <h2 className="section-title">
            Visualise Shades in Real
            <br />
            Architectural Spaces.
          </h2>
          <p className="section-lead">
            Wall color changes completely under natural daylight versus evening warm lights. Explore room previews below or open our interactive Room Studio.
          </p>
        </div>

        <Link href="/room-inspiration" className="arrow-link hidden sm:inline-flex items-center gap-1.5 font-semibold text-accent hover:text-amber-300 transition-colors">
          <span>Explore All 102 Room Archives</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* 3 Spatial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {previewSpaces.map((space) => (
          <article
            key={space.title}
            className="group rounded-3xl overflow-hidden bg-gradient-to-b from-[#123F46] via-[#0E353B] to-[#0C292F] border border-[#176B73]/40 hover:border-accent/60 transition-all duration-300 hover:shadow-[0_16px_36px_rgba(12,41,47,0.6)] hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div className="aspect-[16/10] w-full bg-[#0C292F] overflow-hidden relative">
              <img
                src={space.image}
                alt={space.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C292F]/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Category Tag */}
              <span className="absolute top-3 left-3 bg-[#0C292F]/85 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-accent font-mono font-semibold uppercase tracking-wider border border-[#176B73]/50 shadow-md">
                {space.tag}
              </span>

              {/* Swatch Pill */}
              <div className="absolute bottom-3 right-3 bg-[#0C292F]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#176B73]/50 flex items-center gap-2 shadow-lg">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-inner"
                  style={{ backgroundColor: space.hex }}
                />
                <span className="text-[10px] text-teal-100 font-mono font-medium">
                  {space.shadeCode}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] text-amber-300 font-mono uppercase tracking-widest font-semibold">
                    Shade: {space.tone}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-medium text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {space.title}
                </h3>
                <p className="text-xs text-teal-100/70 leading-relaxed mt-2">
                  {space.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#176B73]/30 flex items-center justify-between">
                <Link
                  href="/room-inspiration"
                  className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-amber-300 font-semibold transition-colors"
                >
                  <Eye size={14} />
                  <span>Try Shades in Room Studio &rarr;</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Room Inspiration Invitation Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-950/40 via-dark-surface to-dark-surface border border-border-teal/50 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs uppercase font-mono text-accent font-semibold tracking-wider">
            Interactive Visualisation Tools
          </span>
          <h3 className="text-xl sm:text-2xl font-serif text-white">
            173 Room Variants & 50 Lookbook Spreads
          </h3>
          <p className="text-xs sm:text-sm text-on-dark-muted max-w-xl">
            Switch daylight simulations, compare before/after shades, and browse editorial interior spreads paired with verified Birla Opus codes.
          </p>
        </div>

        <Link
          href="/room-inspiration"
          className="button-primary whitespace-nowrap px-6 py-3 text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-accent/20"
        >
          <Compass size={16} />
          <span>Launch Room Studio</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};
