import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, MapPin, Sparkles, Navigation, Phone, Clock, ShieldCheck, SunMedium, Layers, Cpu } from "lucide-react";
import { businessProfile } from "@shared/businessProfile";

export const StepInside: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
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

  return (
    <section
      id="step-inside"
      className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#061417] via-[#0b2227] to-[#061417] text-white border-t border-b border-border-teal/60"
    >
      {/* Rich Multi-Layered Ambient Light & Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[480px] h-[480px] bg-teal-500/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-amber-500/5 via-teal-500/10 to-amber-500/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Subtle Architectural Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-20 pb-8 border-b border-white/10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-surface/90 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 border border-border-teal shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Cinematic Showroom Tour · Baskhari</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-medium tracking-tight text-white leading-[1.05]">
              Step Inside <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">Jaymurti.</span>
              <br />
              <span className="italic font-light text-white/90">Baskhari's Premier Birla Opus Showroom.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-on-dark-muted font-sans leading-relaxed">
            Experience the motion, lighting, and physical scale of our authorized Birla Opus Experience Centre in Shukul Bazar, Baskhari before your visit.
          </p>
        </div>

        {/* Main 2-Column Luxury Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Premium Flagship Video Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] p-2 sm:p-2.5 rounded-[36px] bg-gradient-to-b from-white/20 via-white/5 to-white/10 border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_40px_rgba(232,163,56,0.15)] group">
              {/* Device Notch & Live Tour Pill */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 shadow-md">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/90 font-semibold">
                  Live Showroom Walkthrough
                </span>
              </div>

              {/* Video Screen Container */}
              <div className="relative aspect-[9/16] w-full rounded-[28px] overflow-hidden bg-black flex items-center justify-center border border-black/40">
                {/* Ambient Blurred Backdrop */}
                <img
                  src="/storage/storefront/shopwide.webp"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Main 9:16 Video Player */}
                <video
                  ref={videoRef}
                  src="/storage/promo-video.mp4"
                  poster="/storage/storefront/shopwide.webp"
                  preload="none"
                  muted={isMuted}
                  playsInline
                  loop
                  onEnded={() => setIsPlaying(false)}
                  className="relative z-10 w-full h-full object-contain"
                />

                {/* Play Trigger Overlay */}
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
                    className="absolute inset-0 bg-black/40 backdrop-blur-[3px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/25 z-20"
                  >
                    <div className="relative group/play flex items-center justify-center">
                      <div className="absolute -inset-3 rounded-full bg-amber-400/30 blur-md animate-pulse" />
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-slate-950 flex items-center justify-center shadow-[0_10px_30px_rgba(245,158,11,0.5)] transition-transform group-hover/play:scale-110 active:scale-95 pl-1">
                        <Play className="w-8 h-8 fill-current text-slate-950" />
                      </div>
                    </div>
                    <div className="mt-5 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs text-white font-medium flex items-center gap-2 shadow-lg">
                      <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Tap to play with full sound</span>
                    </div>
                  </div>
                )}

                {/* Floating Sound Toggle Pill */}
                {isPlaying && isMuted && (
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="absolute top-14 right-3.5 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 hover:bg-black backdrop-blur-md border border-amber-400/80 text-amber-300 text-xs font-semibold shadow-lg transition-all animate-bounce cursor-pointer"
                    aria-label="Click to Unmute Audio"
                  >
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Unmute</span>
                  </button>
                )}

                {/* Floating Bottom Media Bar */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-center justify-between z-20 transition-opacity duration-300 ${
                    isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="w-9 h-9 rounded-full bg-teal-900/80 hover:bg-teal-850 hover:text-amber-300 backdrop-blur-md text-teal-100 border border-teal-700/40 hover:border-amber-400/50 flex items-center justify-center transition-all"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current pl-0.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={toggleMute}
                      className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                        isMuted ? "bg-amber-500 text-teal-950 font-bold hover:bg-amber-400" : "bg-teal-900/80 hover:bg-teal-850 hover:text-amber-300 text-teal-100 border border-teal-700/40 hover:border-amber-400/50"
                      }`}
                      aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="w-9 h-9 rounded-full bg-teal-900/80 hover:bg-teal-850 hover:text-amber-300 backdrop-blur-md text-teal-100 border border-teal-700/40 hover:border-amber-400/50 flex items-center justify-center transition-all"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Experience Highlights & Action Hub */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Header Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Open Daily · 8:00 AM – 9:00 PM</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-mono font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Direct Authorized Dealer</span>
              </div>
            </div>

            {/* Main Catchphrase */}
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl text-white font-serif font-medium leading-snug">
                Where Colour Choices Become
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-300 font-serif italic">
                  Confident Architectural Decisions.
                </span>
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                At Jaymurti Traders, you don’t pick colours from a tiny print strip. Walk in to inspect physical masonry boards, compare finishes under calibrated lighting, and watch our computerized tinting machines mix your exact shade code in minutes.
              </p>
            </div>

            {/* 4 Feature Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-[#081e22]/85 border border-border-teal/80 hover:border-amber-400/50 transition-all duration-300 backdrop-blur-sm group/card">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center transition-colors group-hover/card:bg-amber-400 group-hover/card:text-slate-950">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white font-sans">159+ Physical Swatches</h4>
                </div>
                <p className="text-xs text-on-dark-muted leading-relaxed font-sans">
                  Touch real masonry sample panels, metallic stuccos, and luxury matte finishes in genuine daylight.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#081e22]/85 border border-border-teal/80 hover:border-amber-400/50 transition-all duration-300 backdrop-blur-sm group/card">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center transition-colors group-hover/card:bg-amber-400 group-hover/card:text-slate-950">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white font-sans">Automated Tinting Hub</h4>
                </div>
                <p className="text-xs text-on-dark-muted leading-relaxed font-sans">
                  Digital optical dispensing guarantees 100% batch-to-batch accuracy for every Birla Opus formulation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#081e22]/85 border border-border-teal/80 hover:border-amber-400/50 transition-all duration-300 backdrop-blur-sm group/card">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center transition-colors group-hover/card:bg-amber-400 group-hover/card:text-slate-950">
                    <SunMedium className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white font-sans">Ambient Lighting Studio</h4>
                </div>
                <p className="text-xs text-on-dark-muted leading-relaxed font-sans">
                  Inspect undertones under warm 3000K, neutral 4000K, and cool 6500K daylight before application.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#081e22]/85 border border-border-teal/80 hover:border-amber-400/50 transition-all duration-300 backdrop-blur-sm group/card">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center transition-colors group-hover/card:bg-amber-400 group-hover/card:text-slate-950">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white font-sans">Master Applicator Match</h4>
                </div>
                <p className="text-xs text-on-dark-muted leading-relaxed font-sans">
                  Get paired with trained, certified painters and receive bespoke substrate preparation advice.
                </p>
              </div>
            </div>

            {/* Quick Action & Location Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#081e22] via-[#0d2d34] to-[#081e22] border border-amber-400/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Showroom Location</span>
                </div>
                <strong className="text-sm sm:text-base text-white font-sans block">
                  {businessProfile.landmark} · Shukul Bazar, Baskhari
                </strong>
                <span className="text-xs text-slate-300 font-sans block">
                  Ambedkar Nagar, UP 224129
                </span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={businessProfile.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-semibold py-3 px-5 rounded-xl shadow-lg transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-mono"
                >
                  <Navigation className="w-3.5 h-3.5 fill-current" />
                  <span>Directions</span>
                </a>
                <a
                  href={`tel:${businessProfile.phoneHref}`}
                  className="flex-1 sm:flex-initial bg-dark-surface hover:bg-brand-secondary/40 text-white/90 hover:text-accent border border-border-teal hover:border-accent/40 py-3 px-4 rounded-xl transition-all inline-flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Store</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

