import React from "react";
import { Link } from "wouter";
import { ArrowRight, Compass, Eye, Layers, Sparkles } from "lucide-react";

export const HomeInspirationPreview: React.FC = () => {
  const previewSpaces = [
    {
      title: "Regal Living Room",
      tone: "Warm Amber & Royal Ochre",
      image: "/storage/rooms-catalogue/phone-view_compressed_page-0001.webp",
      desc: "Simulate natural north daylight on warm earthen neutrals for welcoming living spaces.",
      tag: "Living Room",
    },
    {
      title: "Tranquil Bedroom",
      tone: "Sage Mist & Soft Linen",
      image: "/storage/rooms-catalogue/phone-view_compressed_page-0026.webp",
      desc: "Calming low-sheen matt textures tailored for restful bedroom retreats.",
      tag: "Bedroom Sanctuary",
    },
    {
      title: "Modern Facade & Exterior",
      tone: "Weather Shield Sandstone",
      image: "/storage/rooms-catalogue/phone-view_compressed_page-0051.webp",
      desc: "High-durability all-weather exterior shields resilient against monsoon humidity.",
      tag: "Exterior Architecture",
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

        <Link href="/room-inspiration" className="arrow-link hidden sm:inline-flex items-center gap-1.5 font-semibold text-accent">
          <span>Explore All 102 Room Archives</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* 3 Spatial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {previewSpaces.map((space) => (
          <article
            key={space.title}
            className="group rounded-3xl overflow-hidden bg-dark-surface border border-border-teal/50 hover:border-accent transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
            style={{ background: "rgba(12, 18, 20, 0.85)" }}
          >
            <div className="aspect-[16/10] w-full bg-dark/80 overflow-hidden relative">
              <img
                src={space.image}
                alt={space.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] text-accent font-semibold uppercase tracking-wider">
                {space.tag}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] text-on-dark-muted font-mono uppercase tracking-wider block mb-1">
                  Palette: {space.tone}
                </span>
                <h3 className="text-base font-semibold text-white group-hover:text-accent transition-colors leading-snug">
                  {space.title}
                </h3>
                <p className="text-xs text-on-dark-muted leading-relaxed mt-1.5">
                  {space.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5">
                <Link
                  href="/room-inspiration"
                  className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-semibold"
                >
                  <Eye size={13} />
                  <span>Try Shades in Studio &rarr;</span>
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
