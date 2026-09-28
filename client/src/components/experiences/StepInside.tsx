import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize2, MapPin, Sparkles } from "lucide-react";
import { businessProfile } from "@shared/businessProfile";
import { MotionImageReveal, MotionParallaxImage } from "@/lib/motion";

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
      }).catch(() => {
        // Autoplay policy or error
      });
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
    <section id="step-inside" className="py-20 lg:py-28 bg-[#0c1417] text-white border-t border-teal-900/40 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111c20] text-[var(--saffron,#e8a338)] text-xs font-semibold uppercase tracking-wider mb-4 border border-teal-800/60 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            Cinematic Showroom Experience · Baskhari
          </div>
          <h2
            style={{ fontFamily: "var(--serif)" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight"
          >
            Step Inside Jaymurti.
            <br />
            <em className="text-[var(--saffron,#e8a338)] font-normal italic">
              Baskhari's Premier Birla Opus Showroom.
            </em>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            Experience the motion, scale, and atmosphere of our authorized Birla Opus Experience Centre in Shukul Bazar, Baskhari before you visit.
          </p>
        </div>

        {/* 2-Column Split Layout: Video on Left, Shop Insights on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 9:16 Portrait Video Player */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[360px] sm:max-w-[400px] relative rounded-3xl overflow-hidden bg-black border border-teal-800/60 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
              <MotionParallaxImage intensity={4}>
                <div className="relative aspect-[9/16] w-full bg-black overflow-hidden flex items-center justify-center">
                  {/* Ambient Backdrop */}
                  <video
                    src="/storage/promo-video.mp4"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
                    aria-hidden="true"
                    muted
                    loop
                    playsInline
                  />

                  {/* Main Crisp 9:16 Video */}
                  <video
                    ref={videoRef}
                    src="/storage/promo-video.mp4"
                    poster="/storage/storefront/shopwide.jpeg"
                    preload="metadata"
                    muted={isMuted}
                    playsInline
                    onEnded={() => setIsPlaying(false)}
                    className="relative z-10 w-full h-full object-contain"
                  />

                  {/* Play Overlay if paused */}
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
                      className="absolute inset-0 bg-black/45 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-black/35 z-20"
                    >
                      <div className="w-20 h-20 rounded-full bg-[var(--color-accent,#e05a2b)] hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-2xl transition-transform border-2 border-white/40 pl-1">
                        <Play className="w-8 h-8 fill-current" />
                      </div>
                      <div className="mt-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs text-white font-medium flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-[var(--saffron,#e8a338)]" />
                        <span>Click to play with sound</span>
                      </div>
                    </div>
                  )}

                  {/* Persistent Sound Pill while muted */}
                  {isPlaying && isMuted && (
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="absolute top-4 right-4 z-30 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black/95 backdrop-blur-md border border-amber-400/60 text-amber-300 text-xs font-semibold shadow-lg transition-all animate-pulse cursor-pointer"
                      aria-label="Click to Unmute Audio"
                    >
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Tap for Sound</span>
                    </button>
                  )}

                  {/* Floating Controls Bar */}
                  <div
                    className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex items-center justify-between z-20 transition-opacity duration-300 ${
                      isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-colors"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current pl-0.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={toggleMute}
                        className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                          isMuted ? "bg-amber-500/80 text-black hover:bg-amber-400" : "bg-white/20 hover:bg-white/30 text-white"
                        }`}
                        aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handleFullscreen}
                      className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-colors"
                      aria-label="Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </MotionParallaxImage>
            </div>
          </div>

          {/* Right Column: Information & Shop Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Showroom Badge */}
            <div className="mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono tracking-widest uppercase text-emerald-400 font-semibold">
                Open Daily · 8:00 AM – 9:00 PM
              </span>
            </div>

            <h3
              style={{ fontFamily: "var(--serif)" }}
              className="text-2xl sm:text-3xl lg:text-4xl text-white font-medium mb-4 leading-snug"
            >
              Where Colour Choices Become
              <br />
              <em className="text-[var(--saffron,#e8a338)] font-normal italic">
                Confident Architectural Decisions.
              </em>
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-8">
              At Jaymurti Traders, you don’t pick colours from a tiny print strip. Walk in to touch physical masonry sample boards, inspect finishes under balanced ambient lighting, and let our Birla Opus computerized tinting machines mix your exact shade code in minutes.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-[#10191c] border border-teal-800/40 hover:border-teal-700 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-teal-900/60 text-[var(--saffron,#e8a338)]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white font-sans">Physical Shade Gallery</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Compare 159+ certified Birla Opus colour swatches and textured wall panels in daylight.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#10191c] border border-teal-800/40 hover:border-teal-700 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-teal-900/60 text-[var(--saffron,#e8a338)]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white font-sans">Automated Tinting Hub</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Digital dispensing machinery ensures 100% batch-to-batch consistency and shade accuracy.
                </p>
              </div>
            </div>

            {/* Quick Fact Strip & Action Buttons */}
            <div className="p-5 rounded-2xl bg-[#0f1719] border border-teal-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                  Showroom Landmark
                </span>
                <strong className="text-sm text-white font-sans block">
                  {businessProfile.landmark} · Shukul Bazar, Baskhari
                </strong>
                <span className="text-xs text-slate-400 font-sans">
                  Pincode 224129 · Ambedkar Nagar, UP
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={businessProfile.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button-primary flex-1 sm:flex-initial text-xs py-2.5 px-4 rounded-xl inline-flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" /> Get Directions
                </a>
                <a
                  href={`tel:${businessProfile.phoneHref}`}
                  className="button-ghost flex-1 sm:flex-initial text-xs py-2.5 px-4 rounded-xl inline-flex items-center justify-center gap-2 border border-slate-700 text-white"
                >
                  Call Showroom
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
