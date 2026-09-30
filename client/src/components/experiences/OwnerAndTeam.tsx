import React, { useState, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  MapPin,
  Sparkles,
  Award,
  Users,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { businessProfile } from "@shared/businessProfile";

const OWNER_IMAGES = [
  {
    id: "owner-front",
    src: "/storage/owner2.webp",
    label: "Showroom Desk",
    caption: "At the primary consultation counter with illuminated Birla Opus insignia",
  },
  {
    id: "owner-wide",
    src: "/storage/owner3.webp",
    label: "Full Showroom",
    caption: "Overview of complete Birla Opus formulation and color galleries",
  },
  {
    id: "owner-portrait",
    src: "/storage/owner4.webp",
    label: "Customer Reception",
    caption: "Welcoming homeowners, architects, and painting contractors in Baskhari",
  },
];

export const OwnerAndTeam: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const activePhoto = OWNER_IMAGES[activeImageIndex] || OWNER_IMAGES[0];

  return (
    <section
      id="leadership"
      className="py-12 sm:py-16 lg:py-24 bg-[#0a0f11] text-white border-t border-teal-900/40 relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111a1d] text-[var(--saffron,#e8a338)] text-xs font-semibold uppercase tracking-wider mb-4 border border-teal-800/50 backdrop-blur-md">
            <Users className="w-3.5 h-3.5" />
            Founder & Showroom Leadership · Baskhari
          </div>
          <h2
            style={{ fontFamily: "var(--serif)" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight"
          >
            Behind the Colours:
            <br />
            <em className="text-[var(--saffron,#e8a338)] font-normal italic">
              Our Founder & Showroom Team.
            </em>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-2xl">
            Jaymurti Traders was built on a foundational promise to homeowners and contractors across Baskhari and Ambedkar Nagar: 100% genuine Birla Opus paint systems, computerized tinting precision, transparent pricing, and trusted personal guidance.
          </p>
        </div>

        {/* =========================================================================
            PART 1: THE FOUNDER & SHOWROOM VIDEO SHOWCASE
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 sm:mb-24">
          {/* Left Column: Owner Profile & Photos */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="relative rounded-2xl overflow-hidden border border-teal-800/40 bg-[#101719] shadow-2xl group">
              {/* Main Owner Photo Display */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={activePhoto.src}
                  alt="Founder & Dealer Principal, Jaymurti Traders"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f11] via-transparent to-black/20 pointer-events-none" />

                {/* Floating Authenticity Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 inline-flex items-center gap-1.5 sm:gap-2 bg-[#0c1417]/85 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-teal-700/50 text-[11px] sm:text-xs font-semibold text-white">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--saffron,#e8a338)]" />
                  <span>Authorized Birla Opus Dealer Principal</span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 sm:p-5 bg-gradient-to-t from-[#0c1417] via-[#0c1417]/90 to-transparent pt-12 sm:pt-16">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--saffron,#e8a338)] font-mono font-bold block mb-0.5 sm:mb-1">
                    Showroom Desk · Shukul Bazar, Baskhari
                  </span>
                  <h3
                    style={{ fontFamily: "var(--serif)" }}
                    className="text-lg sm:text-2xl text-white font-medium mb-0.5 sm:mb-1"
                  >
                    Jaymurti Traders Leadership
                  </h3>
                  <p className="text-[11px] sm:text-sm text-slate-300 leading-snug sm:leading-relaxed font-sans">
                    {activePhoto.caption}
                  </p>
                </div>
              </div>

              {/* Photo Selector Thumbnails */}
              <div className="p-3 bg-[#0d1416] border-t border-teal-900/40 flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-slate-400 pl-2">
                  Select View ({activeImageIndex + 1}/{OWNER_IMAGES.length})
                </span>
                <div className="flex gap-2">
                  {OWNER_IMAGES.map((photo, idx) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? "border-[var(--color-accent,#e05a2b)] scale-105 shadow-md"
                          : "border-teal-900/60 opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`View photo ${idx + 1}: ${photo.label}`}
                    >
                      <img
                        src={photo.src}
                        alt={photo.label}
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Founder Note / Quote */}
            <div className="mt-6 p-6 rounded-2xl bg-[#0e1619] border border-teal-800/30">
              <blockquote
                style={{ fontFamily: "var(--serif)" }}
                className="text-lg sm:text-xl text-slate-200 font-normal italic leading-relaxed mb-4"
              >
                “Every home in Ambedkar Nagar deserves authentic, factory-calibrated finishes that endure through summer sun and monsoon rains. When you walk into our showroom, we personally guide you through every swatch, every formulation, and every litre calculation.”
              </blockquote>
              <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-white/10">
                <div>
                  <strong className="text-sm text-white block font-sans font-semibold">
                    Direct Showroom Desk
                  </strong>
                  <span className="text-xs text-slate-400 font-mono">
                    +91 87566 59035 · Baskhari (224129)
                  </span>
                </div>
                <a
                  href="https://wa.me/918756659035?text=Hello%20Jaymurti%20Traders%2C%20I%20would%20like%20to%20consult%20directly%20with%20your%20showroom%20desk."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-accent,#e05a2b)] hover:bg-[var(--coral,#e05a2b)] text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Connect on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Video Showcase */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-teal-800/40 bg-[#0d1315] shadow-2xl">
              {/* Video Player */}
              <div className="relative aspect-[9/16] sm:aspect-[4/5] lg:aspect-[3/4] w-full bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  src="/storage/jay-murti-traders-v4.mp4"
                  poster="/storage/storefront/shopreception.webp"
                  preload="none"
                  className="w-full h-full object-cover"
                  playsInline
                  loop
                  muted={isMuted}
                  onClick={togglePlay}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Ambient Video Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                {/* Big Centered Play Trigger when paused */}
                {!isPlaying && (
                  <div
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.muted = false;
                        setIsMuted(false);
                        videoRef.current
                          .play()
                          .then(() => setIsPlaying(true))
                          .catch(() => {
                            if (videoRef.current) {
                              videoRef.current.muted = true;
                              setIsMuted(true);
                              videoRef.current.play().then(() => setIsPlaying(true));
                            }
                          });
                      }
                    }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer bg-black/30 hover:bg-black/20 transition-colors"
                  >
                    <button
                      type="button"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--color-accent,#e05a2b)] hover:scale-110 active:scale-95 text-white flex items-center justify-center shadow-2xl transition-all duration-300 border-2 border-white/40"
                      aria-label="Play Showroom Tour Video"
                    >
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                    </button>
                    <span className="mt-3 text-xs text-white font-mono bg-black/60 px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-[var(--saffron,#e8a338)]" />
                      Tap to play with audio
                    </span>
                  </div>
                )}

                {/* Persistent Audio Indicator Pill when playing muted */}
                {isPlaying && isMuted && (
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="absolute top-16 right-4 z-30 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black/95 backdrop-blur-md border border-amber-400/60 text-amber-300 text-xs font-semibold shadow-lg transition-all animate-pulse cursor-pointer"
                    aria-label="Click to Unmute Audio"
                  >
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Tap for Sound</span>
                  </button>
                )}

                {/* Video Top Status Pill */}
                <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white border border-white/20">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--saffron,#e8a338)]" />
                    Jay Murti Traders V4 · Showroom Film
                  </span>
                  <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-300 border border-white/20">
                    Baskhari, UP
                  </span>
                </div>

                {/* Video Bottom Floating Controls Bar */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-3 rounded-xl bg-[#0c1417]/85 backdrop-blur-md border border-white/15">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                      aria-label={isPlaying ? "Pause Video" : "Play Video"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button
                      type="button"
                      onClick={toggleMute}
                      className={`p-2 rounded-lg text-white transition-colors ${isMuted ? "bg-amber-500/80 text-black hover:bg-amber-400" : "bg-white/10 hover:bg-white/20"}`}
                      aria-label={isMuted ? "Unmute Video" : "Mute Video"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="text-xs font-mono text-slate-300 hidden sm:inline">
                      {isMuted ? "Muted · Tap speaker icon for audio" : "Sound active"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Fullscreen Video"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Video Description Caption */}
            <div className="mt-4 px-2">
              <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                Filmed on-site at Jaymurti Traders, Shukul Bazar, Baskhari · Featuring the Birla Opus Experience Centre.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PART 2: THE SHOWROOM TEAM & SPECIALISTS
            ========================================================================= */}
        <div className="pt-12 border-t border-teal-900/40">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono text-[var(--saffron,#e8a338)] uppercase tracking-widest font-semibold block mb-2">
              Expert Guidance On-Site
            </span>
            <h3
              style={{ fontFamily: "var(--serif)" }}
              className="text-2xl sm:text-3xl lg:text-4xl text-white font-medium"
            >
              Meet Our Showroom Specialist.
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mt-2 font-sans">
              From calculating exact paint litres to demonstrating physical wood and texture panels, our certified team ensures your painting project runs smoothly from start to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#0d1416] border border-teal-800/40 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
            {/* Team Member Photo */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="relative rounded-2xl overflow-hidden border border-teal-700/40 aspect-[9/16] sm:aspect-[3/4] bg-black shadow-xl">
                <img
                  src="/storage/teammember.jpeg"
                  alt="Ravi Madeshiy - Trade Sales Manager"
                  className="w-full h-full object-cover object-[center_18%]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c1417]/90 text-[var(--saffron,#e8a338)] text-xs font-mono font-bold border border-teal-800/50 mb-1">
                    <Award className="w-3.5 h-3.5" /> Team Member
                  </span>
                  <h4 className="text-lg font-serif text-white font-medium">
                    Ravi Madeshiy
                  </h4>
                  <span className="text-xs text-[var(--saffron,#e8a338)] font-mono font-semibold block">
                    Trade Sales Manager
                  </span>
                </div>
              </div>
            </div>

            {/* Team Member Responsibilities & Strengths */}
            <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between">
              <div>
                <h4
                  style={{ fontFamily: "var(--serif)" }}
                  className="text-xl sm:text-2xl text-white font-medium mb-3"
                >
                  Ravi Madeshiy · Trade Sales Manager
                </h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans mb-6">
                  Walk in to our showroom to consult on authentic Birla Opus formulations. Our team member is physically present at the desk to walk you through texture cards, examine your room photos, and calibrate exact tints.
                </p>

                {/* 4 Core Pillars of Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-[#111c1f] border border-teal-900/50">
                    <div className="flex items-center gap-2 text-[var(--saffron,#e8a338)] font-semibold text-xs uppercase tracking-wider mb-1 font-mono">
                      <Layers className="w-4 h-4" />
                      1. Formulation Guidance
                    </div>
                    <p className="text-xs text-slate-300 leading-normal font-sans">
                      Choosing between One, Calista, and Style emulsions tailored to room light and washable durability.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#111c1f] border border-teal-900/50">
                    <div className="flex items-center gap-2 text-[var(--saffron,#e8a338)] font-semibold text-xs uppercase tracking-wider mb-1 font-mono">
                      <Sparkles className="w-4 h-4" />
                      2. Texture & Wood Panels
                    </div>
                    <p className="text-xs text-slate-300 leading-normal font-sans">
                      Touch physical samples of Allwood PU finishes, metallic textures, and designer wallpaper books.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#111c1f] border border-teal-900/50">
                    <div className="flex items-center gap-2 text-[var(--saffron,#e8a338)] font-semibold text-xs uppercase tracking-wider mb-1 font-mono">
                      <CheckCircle2 className="w-4 h-4" />
                      3. Computerized Tinting
                    </div>
                    <p className="text-xs text-slate-300 leading-normal font-sans">
                      Precision color tinting for all 159 Birla Opus verified shades right in front of your eyes.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#111c1f] border border-teal-900/50">
                    <div className="flex items-center gap-2 text-[var(--saffron,#e8a338)] font-semibold text-xs uppercase tracking-wider mb-1 font-mono">
                      <Award className="w-4 h-4" />
                      4. Accurate Quantity Estimates
                    </div>
                    <p className="text-xs text-slate-300 leading-normal font-sans">
                      Clear estimates of topcoats, primer liters, and putty kilograms to avoid costly over-purchasing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action Footer */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-teal-900/40">
                <a
                  href="#finder"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-brand-primary,#0c292f)] hover:bg-[#113a42] text-white text-xs font-semibold tracking-wider uppercase border border-teal-700/40 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[var(--saffron,#e8a338)]" />
                  Visit Showroom Counter
                </a>
                <a
                  href={`tel:${businessProfile.phoneHref}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  Call {businessProfile.phoneDisplay}
                </a>
                <span className="text-xs text-slate-400 font-mono ml-auto">
                  Open Daily · 8:00 AM – 9:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
