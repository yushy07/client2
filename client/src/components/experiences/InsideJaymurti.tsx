import React, { useState } from "react";
import { INSIDE_JAYMURTI_PHOTOS, type ShowroomPhoto } from "@shared/insideJaymurtiData";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Building2, Maximize2, MapPin, Phone, Clock } from "lucide-react";
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

        {/* Photo Modal */}
        <Dialog open={!!activePhoto} onOpenChange={(open) => !open && setActivePhoto(null)}>
          <DialogContent className="max-w-4xl bg-dark-surface border-border-teal text-on-dark p-0 overflow-hidden sm:rounded-2xl">
            {activePhoto && (
              <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
                <div className="relative md:w-3/5 bg-black flex items-center justify-center p-4 overflow-auto">
                  <ResponsiveImage
                    src={activePhoto.image}
                    alt={activePhoto.title}
                    className="max-h-[70vh] w-auto object-contain rounded shadow-2xl"
                  />
                </div>
                <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                      Jaymurti Traders Showroom
                    </span>
                    <DialogTitle className="text-2xl font-serif text-on-dark mt-2 mb-2">
                      {activePhoto.title}
                    </DialogTitle>
                    <p className="text-xs text-on-dark-muted font-medium mb-4">
                      {activePhoto.subtitle}
                    </p>
                    <p className="text-sm text-on-dark-muted leading-relaxed">
                      {activePhoto.description}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-border-teal">
                    <a
                      href={businessProfile.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-dark-surface hover:bg-dark text-on-dark border border-brand-secondary font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 text-center text-sm"
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
