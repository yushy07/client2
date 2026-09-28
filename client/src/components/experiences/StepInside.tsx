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
    <section id="step-inside" className="py-24 bg-dark text-on-dark border-t border-border-teal relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-surface text-accent text-xs font-semibold uppercase tracking-wider mb-4 border border-border-teal">
            <Sparkles className="w-3.5 h-3.5" />
            Cinematic Showroom Experience
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-on-dark tracking-tight leading-tight">
            Step Inside Jaymurti
          </h2>
          <p className="mt-4 text-base sm:text-lg text-on-dark-muted font-sans leading-relaxed">
            Experience the motion, scale, and atmosphere of our Birla Opus paint showroom in Baskhari before visiting.
          </p>
        </div>

        {/* Video Player Card */}
        <div className="max-w-md sm:max-w-lg lg:max-w-xl mx-auto relative rounded-3xl overflow-hidden bg-black border border-border-teal shadow-2xl group">
          <MotionParallaxImage intensity={6}>
            <div className="relative aspect-[9/16] w-full bg-black overflow-hidden flex items-center justify-center">
              {/* Blurred Ambient Backdrop so there are never harsh black bars */}
              <video
                src="/storage/promo-video.mp4"
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
                aria-hidden="true"
                muted
                loop
                playsInline
              />

              {/* Main Crisp Video in Full Uncropped 9:16 Frame */}
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

            {/* Play Overlay if not playing */}
            {!isPlaying && (
              <div
                onClick={() => {
                  if (videoRef.current) {
                    // Browsers allow unmuted audio on explicit user click gesture!
                    videoRef.current.muted = false;
                    setIsMuted(false);
                    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
                      // Fallback to muted if browser blocks
                      if (videoRef.current) {
                        videoRef.current.muted = true;
                        setIsMuted(true);
                        videoRef.current.play().then(() => setIsPlaying(true));
                      }
                    });
                  }
                }}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-colors hover:bg-black/30 z-20"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[var(--color-accent,#e05a2b)] hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-2xl transition-transform border-2 border-white/40 pl-1">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
                </div>
                <div className="absolute bottom-6 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs text-white font-medium flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[var(--saffron,#e8a338)]" />
                  <span>Click to play with sound</span>
                </div>
              </div>
            )}

            {/* Persistent Audio Indicator Pill (visible when playing) */}
            {isPlaying && isMuted && (
              <button
                type="button"
                onClick={toggleMute}
                className="absolute top-4 right-4 z-30 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-amber-400/50 text-amber-300 text-xs font-semibold shadow-lg transition-all animate-pulse cursor-pointer"
                aria-label="Click to Unmute Audio"
              >
                <VolumeX className="w-4 h-4" />
                <span>Tap for Sound</span>
              </button>
            )}

            {/* Video Control Bar */}
            <div className={`absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between z-20 transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current pl-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${isMuted ? "bg-amber-500/80 text-black hover:bg-amber-400" : "bg-white/20 hover:bg-white/30 text-white"}`}
                  aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <span className="text-xs text-white/90 font-medium hidden sm:inline">
                  {isMuted ? "Audio muted · click speaker or badge to hear sound" : "Sound active"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-colors"
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </MotionParallaxImage>

          {/* Bottom Banner */}
          <div className="p-6 bg-dark-surface border-t border-border-teal flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="text-base font-serif text-on-dark">
                Experience Physical Shade Swatches in Baskhari
              </h4>
              <p className="text-xs text-on-dark-muted mt-0.5">
                Shukul Bazar, Baskhari, Ambedkar Nagar · Open 8:00 AM – 9:00 PM
              </p>
            </div>
            <a
              href={businessProfile.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-dark-surface hover:bg-dark text-on-dark border border-brand-secondary text-xs font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 flex-shrink-0"
            >
              <MapPin className="w-4 h-4" /> Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
