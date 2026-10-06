import React, { useState, useEffect } from "react";
import { INSIDE_JAYMURTI_PHOTOS, type ShowroomPhoto } from "@shared/insideJaymurtiData";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Building2, Maximize2, MapPin, Phone, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { businessProfile } from "@shared/businessProfile";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { ShinyText, PulseHeart } from "@/components/reactbits";

export const InsideJaymurti: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<ShowroomPhoto | null>(null);
  const [photoLikes, setPhotoLikes] = useState<Record<string, number>>({
    "1": 42,
    "2": 38,
    "3": 56,
    "4": 29,
    "5": 61,
    "6": 34
  });

  const activeIndex = INSIDE_JAYMURTI_PHOTOS.findIndex((p) => p.id === activePhoto?.id);

  const handlePrevPhoto = () => {
    if (INSIDE_JAYMURTI_PHOTOS.length === 0) return;
    const prev = activeIndex > 0
      ? INSIDE_JAYMURTI_PHOTOS[activeIndex - 1]
      : INSIDE_JAYMURTI_PHOTOS[INSIDE_JAYMURTI_PHOTOS.length - 1];
    if (prev) setActivePhoto(prev);
  };

  const handleNextPhoto = () => {
    if (INSIDE_JAYMURTI_PHOTOS.length === 0) return;
    const next = (activeIndex >= 0 && activeIndex < INSIDE_JAYMURTI_PHOTOS.length - 1)
      ? INSIDE_JAYMURTI_PHOTOS[activeIndex + 1]
      : INSIDE_JAYMURTI_PHOTOS[0];
    if (next) setActivePhoto(next);
  };

  useEffect(() => {
    if (!activePhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevPhoto();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextPhoto();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, activeIndex]);

  return (
    <section id="inside-jaymurti" className="py-12 sm:py-16 lg:py-24 bg-dark text-on-dark border-t border-border-teal relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Masthead */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-surface text-accent text-xs font-semibold uppercase tracking-wider mb-4 border border-border-teal">
            <Building2 className="w-3.5 h-3.5" />
            <ShinyText text="Baskhari Showroom Gallery · On-Site Photography" color="#d97706" shineColor="#fef08a" speed={2.5} />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-on-dark tracking-tight leading-tight">
            Inside Jaymurti
          </h2>
          <p className="mt-4 text-base sm:text-lg text-on-dark-muted font-sans leading-relaxed">
            Take a look inside the Jaymurti Traders showroom in Shukul Bazar, Baskhari.
            Explore the colour displays, product shelves, and customer consultation counter.
          </p>
        </div>

        {/* Showroom Photo Masonry Flow - Uncropped Full Natural Dimensions */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {INSIDE_JAYMURTI_PHOTOS.map((photo) => (
            <article
              key={photo.id}
              className="break-inside-avoid group rounded-2xl overflow-hidden bg-dark-surface border border-border-teal hover:border-accent transition-all duration-300 flex flex-col shadow-lg hover:shadow-2xl"
            >
              <div
                onClick={() => setActivePhoto(photo)}
                className="relative w-full overflow-hidden bg-dark/40 cursor-pointer"
              >
                <ResponsiveImage
                  src={photo.image}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain block group-hover:scale-102 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                    <Maximize2 className="w-3.5 h-3.5" /> View Full Photo
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      onClick={() => setActivePhoto(photo)}
                      className="text-lg font-serif text-on-dark group-hover:text-accent transition-colors cursor-pointer"
                    >
                      {photo.title}
                    </h3>

                    {/* React Bits PulseHeart Like Interaction */}
                    <div onClick={(e) => e.stopPropagation()}>
                      <PulseHeart
                        size={32}
                        count={photoLikes[photo.id] || 30}
                        showCount={true}
                        likedColor="#f59e0b"
                        idleColor="#71717a"
                        pillColor="rgba(255, 255, 255, 0.05)"
                        textColor="#d4d4d8"
                        onChange={(_liked, count) => {
                          setPhotoLikes((prev) => ({ ...prev, [photo.id]: count }));
                        }}
                      />
                    </div>
                  </div>

                  <span className="text-[11px] text-on-dark-muted block mt-0.5 font-medium">
                    {photo.subtitle}
                  </span>
                  <p className="mt-2 text-xs text-on-dark-muted leading-relaxed">
                    {photo.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Practical Showroom Context Footnote */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-dark-surface border border-border-teal flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs uppercase font-semibold text-accent tracking-wider">
              Visit Jaymurti Traders in Person
            </span>
            <p className="text-sm text-surface">
              {businessProfile.address}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-on-dark-muted">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" /> {businessProfile.hours}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-accent" /> {businessProfile.phoneDisplay}
            </span>
            <a
              href={businessProfile.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline flex items-center gap-1 font-medium"
            >
              <MapPin className="w-4 h-4" /> Open in Google Maps &rarr;
            </a>
          </div>
        </div>

        {/* Photo Modal with Previous/Next Controls */}
        <Dialog open={!!activePhoto} onOpenChange={(open) => !open && setActivePhoto(null)}>
          <DialogContent className="w-[96vw] !max-w-[1100px] sm:!max-w-[1100px] max-h-[92dvh] bg-[#081F24] border-border-teal text-on-dark p-0 overflow-hidden rounded-2xl shadow-[0_32px_100px_rgba(0,0,0,.6)] [&>button]:z-30 [&>button]:rounded-full [&>button]:bg-black/50 [&>button]:text-white [&>button]:opacity-100 [&>button]:hover:bg-black/80">
            {activePhoto && (
              <div className="flex max-h-[92dvh] min-h-0 flex-col md:flex-row">
                <div className="relative flex h-[42dvh] min-h-[240px] items-center justify-center overflow-hidden bg-[#061719] p-2 sm:p-3 md:h-[min(78dvh,760px)] md:min-h-[360px] md:w-[64%]">
                  <img
                    src={activePhoto.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0C292F]/20 via-transparent to-[#061719]/50" />
                  <ResponsiveImage
                    src={activePhoto.image}
                    alt={activePhoto.title}
                    className="relative z-10 h-full w-full rounded-lg object-contain shadow-2xl"
                  />

                  {/* Prev / Next Image Navigation Controls */}
                  <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevPhoto();
                      }}
                      className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#08272b]/85 text-white shadow-lg backdrop-blur-md transition hover:border-accent hover:bg-[#123F46] hover:text-accent"
                      aria-label="Previous Photo"
                      title="Previous Photo (Left Arrow)"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextPhoto();
                      }}
                      className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#08272b]/85 text-white shadow-lg backdrop-blur-md transition hover:border-accent hover:bg-[#123F46] hover:text-accent"
                      aria-label="Next Photo"
                      title="Next Photo (Right Arrow)"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex min-h-0 flex-1 flex-col justify-between gap-6 overflow-y-auto border-t border-border-teal bg-gradient-to-br from-[#123F46] to-[#081F24] p-5 sm:p-7 md:w-[36%] md:flex-none md:border-l md:border-t-0 md:p-8">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3 pr-8">
                      <span className="text-[10px] uppercase tracking-[.16em] text-accent font-semibold">
                        Jaymurti Traders Showroom
                      </span>
                      {activeIndex >= 0 && (
                        <span className="shrink-0 rounded-full border border-teal-300/20 bg-teal-950/60 px-2.5 py-1 text-[10px] font-mono text-teal-200">
                          {activeIndex + 1} of {INSIDE_JAYMURTI_PHOTOS.length}
                        </span>
                      )}
                    </div>
                    <DialogTitle className="mt-1 text-3xl font-serif leading-tight tracking-tight text-on-dark sm:text-4xl">
                      {activePhoto.title}
                    </DialogTitle>
                    <p className="text-sm font-medium leading-relaxed text-teal-100/80">
                      {activePhoto.subtitle}
                    </p>
                    <p className="max-w-prose text-sm leading-relaxed text-on-dark-muted sm:text-base">
                      {activePhoto.description}
                    </p>
                  </div>
                  <div className="space-y-3 border-t border-white/10 pt-4">
                    <div className="grid grid-cols-2 gap-2 text-xs text-on-dark-muted">
                      <button
                        type="button"
                        onClick={handlePrevPhoto}
                        className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[.04] px-3 font-medium transition hover:border-accent/40 hover:bg-white/[.08] hover:text-accent"
                      >
                        <ChevronLeft className="h-4 w-4" /> Previous
                      </button>
                      <button
                        type="button"
                        onClick={handleNextPhoto}
                        className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[.04] px-3 font-medium transition hover:border-accent/40 hover:bg-white/[.08] hover:text-accent"
                      >
                        Next <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                    <a
                      href={businessProfile.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-center text-sm font-bold text-dark shadow-lg shadow-accent/15 transition hover:brightness-105"
                    >
                      <MapPin className="w-4 h-4" /> Get Directions to Showroom
                    </a>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
export default InsideJaymurti;
