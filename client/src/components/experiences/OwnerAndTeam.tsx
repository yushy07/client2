import React, { useState, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  Award,
  Users,
  CheckCircle2,
} from "lucide-react";

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

  const activePhoto = OWNER_IMAGES[activeImageIndex] ?? OWNER_IMAGES[0]!;

  return (
    <section
      id="leadership"
      className="py-10 sm:py-14 lg:py-16 bg-[#0a0f11] text-white border-t border-teal-900/40 relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
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
            FOUNDER & SHOWROOM SHOWCASE WITH INTEGRATED TEAM SUPPORT
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Owner Profile & Photos + Secondary Team Support */}
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
            <div className="mt-5 p-5 sm:p-6 rounded-2xl bg-[#0e1619] border border-teal-800/30">
              <blockquote
                style={{ fontFamily: "var(--serif)" }}
                className="text-base sm:text-lg text-slate-200 font-normal italic leading-relaxed mb-4"
              >
                “Every home in Ambedkar Nagar deserves authentic, factory-calibrated finishes that endure through summer sun and monsoon rains. When you walk into our showroom, we personally guide you through every swatch, every formulation, and every litre calculation.”
              </blockquote>
              <div className="flex items-center justify-between flex-wrap gap-4 pt-3.5 border-t border-white/10">
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

          {/* Right Column: Featured Video Showcase + Shifted Team Support */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
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
                        className="p-2 rounded-lg bg-teal-900/70 hover:bg-teal-800 hover:text-amber-300 text-teal-100 border border-teal-700/40 hover:border-amber-400/40 transition-all"
                        aria-label={isPlaying ? "Pause Video" : "Play Video"}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>
                      <button
                        type="button"
                        onClick={toggleMute}
                        className={`p-2 rounded-lg transition-all ${isMuted ? "bg-amber-500 text-teal-950 font-bold hover:bg-amber-400" : "bg-teal-900/70 hover:bg-teal-800 hover:text-amber-300 text-teal-100 border border-teal-700/40 hover:border-amber-400/40"}`}
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
                      className="p-2 rounded-lg bg-teal-900/70 hover:bg-teal-800 hover:text-amber-300 text-teal-100 border border-teal-700/40 hover:border-amber-400/40 transition-all"
                      aria-label="Fullscreen Video"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Description Caption */}
              <div className="mt-3 px-2">
                <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  Filmed on-site at Jaymurti Traders, Shukul Bazar, Baskhari · Featuring the Birla Opus Experience Centre.
                </p>
              </div>
            </div>

            {/* Integrated Team Support Profile (Ravi Madeshiy) - Expanded Showcase */}
            <div className="mt-5 p-5 sm:p-6 rounded-2xl bg-[#0e1619] border border-teal-800/40 shadow-2xl flex flex-col justify-between space-y-4">
              {/* Profile Header & Bio */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-teal-700/60 flex-shrink-0 bg-black shadow-lg group">
                  <img
                    src="/storage/teammember.webp"
                    alt="Ravi Madeshiy - Trade Sales Manager"
                    className="w-full h-full object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-950/80 text-[var(--saffron,#e8a338)] text-[10px] font-mono uppercase tracking-wider font-semibold border border-teal-800/60">
                    <Award className="w-3 h-3 text-[var(--saffron,#e8a338)]" /> Trade & Contractor Specialist
                  </div>
                  <h3 style={{ fontFamily: "var(--serif)" }} className="text-xl sm:text-2xl font-medium text-white leading-tight">
                    Ravi Madeshiy
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-300 font-sans font-medium">
                    Trade Sales Manager · Contractor & Painter Desk
                  </p>
                </div>
              </div>

              {/* Scope & Role Note */}
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Dedicated point of contact for painting contractors, builders, and bulk project estimations in Baskhari. Providing computerized shade verification, batch matching, and priority dispatch.
              </p>

              {/* Service Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                <div className="px-2.5 py-1.5 rounded-lg bg-[#0a1214] border border-teal-900/60 text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span>Trade Pricing</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-[#0a1214] border border-teal-900/60 text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span>Bulk Estimates</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-[#0a1214] border border-teal-900/60 text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span>On-Site Support</span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-between flex-wrap gap-4 pt-3.5 border-t border-white/10">
                <div>
                  <strong className="text-sm text-white block font-sans font-semibold">
                    Direct Trade & Contractor Line
                  </strong>
                  <span className="text-xs text-slate-400 font-mono">
                    +91 87566 59035 · Shukul Bazar, Baskhari
                  </span>
                </div>
                <a
                  href="https://wa.me/918756659035?text=Hello%20Ravi%20ji%2C%20I%20would%20like%20to%20consult%20regarding%20Birla%20Opus%20trade%20pricing%20and%20contractor%20orders."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-900/70 hover:bg-teal-800 text-[var(--saffron,#e8a338)] hover:text-amber-300 border border-teal-700/50 hover:border-amber-400/40 text-xs font-semibold tracking-wider uppercase transition-all shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Connect with Trade Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
