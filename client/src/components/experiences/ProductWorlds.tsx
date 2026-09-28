import React from "react";
import { 
  INTERIOR_PAINT_WORLD, 
  EXTERIOR_PROTECTION_WORLD, 
  WOOD_FINISHES_WORLD, 
  type ProductWorldStory 
} from "@shared/productWorldsData";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Sparkles, ShoppingBag, ArrowUpRight, CheckCircle2, Trees, Home } from "lucide-react";

interface ProductWorldsProps {
  onEnquire?: (title: string, details: string) => void;
  onExploreCatalogue?: (category?: string) => void;
}

export const ProductWorlds: React.FC<ProductWorldsProps> = ({ onEnquire, onExploreCatalogue }) => {
  return (
    <div className="space-y-0">
      {/* 06 — INTERIOR PAINT WORLD */}
      <section id="interior-paint-world" className="py-24 bg-dark text-on-dark border-t border-border-teal relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-surface text-accent text-xs font-semibold uppercase tracking-wider border border-border-teal">
                <Home className="w-3.5 h-3.5" />
                Living Atmosphere Solutions
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-on-dark tracking-tight leading-tight">
                Interior Paint World
              </h2>
              <p className="text-xl font-serif text-surface italic">
                &ldquo;{INTERIOR_PAINT_WORLD.headline}&rdquo;
              </p>
              <p className="text-sm sm:text-base text-on-dark-muted leading-relaxed">
                {INTERIOR_PAINT_WORLD.description}
              </p>
              <ul className="space-y-2.5 pt-2">
                {INTERIOR_PAINT_WORLD.keyAspects.map((aspect, i) => (
                  <li key={i} className="text-xs sm:text-sm text-surface flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{aspect}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 flex flex-wrap gap-4">
                <Button
                  onClick={() => onExploreCatalogue?.("Interior")}
                  className="bg-dark-surface hover:bg-dark text-on-dark border border-brand-secondary font-medium px-6 py-2.5 rounded-xl flex items-center gap-2"
                >
                  Explore 124-Product Interior Range <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border-teal shadow-2xl bg-dark-surface">
                <img
                  src={INTERIOR_PAINT_WORLD.heroImage}
                  alt={INTERIOR_PAINT_WORLD.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-accent font-semibold block mb-1">
                      Interior Luxury Emulsion
                    </span>
                    <h3 className="text-2xl font-serif text-white">One Pure Elegance</h3>
                    <p className="text-xs text-surface mt-1">Available in Velvet Matt, Soft Sheen, and Radiant Glow finishes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Interior Solution Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {INTERIOR_PAINT_WORLD.featuredProducts.map((p, idx) => (
              <div
                key={idx}
                className="bg-dark-surface border border-border-teal rounded-2xl p-5 flex flex-col justify-between hover:border-accent transition-all group"
              >
                <div>
                  <div className="aspect-square w-full rounded-xl overflow-hidden bg-dark-surface mb-4">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-accent tracking-wider block mb-1">
                    {p.tier}
                  </span>
                  <h4 className="text-sm font-serif font-medium text-on-dark leading-snug">
                    {p.name}
                  </h4>
                  <p className="text-xs text-on-dark-muted mt-1">Finish: {p.finishType}</p>
                  <p className="text-[11px] text-on-dark-muted mt-2 italic">Ideal: {p.idealFor}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEnquire?.(p.name, `I want an estimate and availability for ${p.name} (${p.finishType}).`)}
                  className="mt-4 w-full bg-dark-surface hover:bg-brand-secondary text-accent text-xs py-2 rounded-lg flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Enquire
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — EXTERIOR & PROTECTION WORLD */}
      <section id="exterior-protection-world" className="py-24 bg-dark text-on-dark border-t border-border-teal relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 relative order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border-teal shadow-2xl bg-dark-surface">
                <img
                  src={EXTERIOR_PROTECTION_WORLD.heroImage}
                  alt={EXTERIOR_PROTECTION_WORLD.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-accent font-semibold block mb-1">
                      Exterior Wall Emulsion
                    </span>
                    <h3 className="text-2xl font-serif text-white">One True Life &amp; Flex</h3>
                    <p className="text-xs text-surface mt-1">Exterior emulsion formulations for building facades and outer walls</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-surface text-accent text-xs font-semibold uppercase tracking-wider border border-border-teal">
                <ShieldCheck className="w-3.5 h-3.5" />
                Weather Resistance &amp; Waterproofing
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-on-dark tracking-tight leading-tight">
                Exterior &amp; Protection World
              </h2>
              <p className="text-xl font-serif text-surface italic">
                &ldquo;{EXTERIOR_PROTECTION_WORLD.headline}&rdquo;
              </p>
              <p className="text-sm sm:text-base text-on-dark-muted leading-relaxed">
                {EXTERIOR_PROTECTION_WORLD.description}
              </p>
              <ul className="space-y-2.5 pt-2">
                {EXTERIOR_PROTECTION_WORLD.keyAspects.map((aspect, i) => (
                  <li key={i} className="text-xs sm:text-sm text-surface flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{aspect}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 flex flex-wrap gap-4">
                <Button
                  onClick={() => onExploreCatalogue?.("Exterior")}
                  className="bg-brand-secondary hover:bg-dark-surface text-on-dark font-medium px-6 py-2.5 rounded-xl flex items-center gap-2"
                >
                  Explore Exterior &amp; Waterproofing Products <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Exterior Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {EXTERIOR_PROTECTION_WORLD.featuredProducts.map((p, idx) => (
              <div
                key={idx}
                className="bg-dark-surface border border-border-teal rounded-2xl p-5 flex flex-col justify-between hover:border-accent transition-all group"
              >
                <div>
                  <div className="aspect-square w-full rounded-xl overflow-hidden bg-dark-surface mb-4">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-accent tracking-wider block mb-1">
                    {p.tier}
                  </span>
                  <h4 className="text-sm font-serif font-medium text-on-dark leading-snug">
                    {p.name}
                  </h4>
                  <p className="text-xs text-on-dark-muted mt-1">Finish: {p.finishType}</p>
                  <p className="text-[11px] text-on-dark-muted mt-2 italic">Ideal: {p.idealFor}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEnquire?.(p.name, `I want an estimate and waterproofing assessment for ${p.name}.`)}
                  className="mt-4 w-full bg-dark-surface hover:bg-brand-secondary text-accent text-xs py-2 rounded-lg flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Enquire
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — WOOD & FINISHES WORLD */}
      <section id="wood-finishes-world" className="py-24 bg-dark text-on-dark border-t border-border-teal relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-surface text-highlight text-xs font-semibold uppercase tracking-wider border border-border-teal">
                <Trees className="w-3.5 h-3.5" />
                Timber Grains &amp; Italian Polishes
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-on-dark tracking-tight leading-tight">
                Wood &amp; Finishes World
              </h2>
              <p className="text-xl font-serif text-surface italic">
                &ldquo;{WOOD_FINISHES_WORLD.headline}&rdquo;
              </p>
              <p className="text-sm sm:text-base text-on-dark-muted leading-relaxed">
                {WOOD_FINISHES_WORLD.description}
              </p>
              <ul className="space-y-2.5 pt-2">
                {WOOD_FINISHES_WORLD.keyAspects.map((aspect, i) => (
                  <li key={i} className="text-xs sm:text-sm text-surface flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-highlight mt-0.5 flex-shrink-0" />
                    <span>{aspect}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 flex flex-wrap gap-4">
                <Button
                  onClick={() => onExploreCatalogue?.("Wood Finishes")}
                  className="bg-dark-surface hover:bg-dark text-on-dark border border-highlight/40 font-medium px-6 py-2.5 rounded-xl flex items-center gap-2"
                >
                  Explore Allwood Polish &amp; PU Range <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border-teal shadow-2xl bg-dark-surface">
                <img
                  src={WOOD_FINISHES_WORLD.heroImage}
                  alt={WOOD_FINISHES_WORLD.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-highlight font-semibold block mb-1">
                      Polyurethane Wood Finish
                    </span>
                    <h3 className="text-2xl font-serif text-white">Allwood Italian PU Clear</h3>
                    <p className="text-xs text-surface mt-1">Clear wood coating designed for interior and exterior timber surfaces</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Wood Solution Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WOOD_FINISHES_WORLD.featuredProducts.map((p, idx) => (
              <div
                key={idx}
                className="bg-dark-surface border border-border-teal rounded-2xl p-5 flex flex-col justify-between hover:border-highlight transition-all group"
              >
                <div>
                  <div className="aspect-square w-full rounded-xl overflow-hidden bg-dark-surface mb-4">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-highlight tracking-wider block mb-1">
                    {p.tier}
                  </span>
                  <h4 className="text-sm font-serif font-medium text-on-dark leading-snug">
                    {p.name}
                  </h4>
                  <p className="text-xs text-on-dark-muted mt-1">Finish: {p.finishType}</p>
                  <p className="text-[11px] text-on-dark-muted mt-2 italic">Ideal: {p.idealFor}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEnquire?.(p.name, `I want an estimate and application advice for ${p.name}.`)}
                  className="mt-4 w-full bg-dark-surface hover:bg-brand-secondary text-highlight text-xs py-2 rounded-lg flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Enquire
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
