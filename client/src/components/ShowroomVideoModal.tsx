import React, { useEffect, useRef, useState } from "react";
import { X, Play, Sparkles, MessageCircle } from "lucide-react";
import { businessProfile } from "@shared/businessProfile";

export interface VideoModalItem {
  label?: string;
  url?: string;
  desc?: string;
  title?: string;
  src?: string;
  badge?: string;
}

export interface ShowroomVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  videos: VideoModalItem[];
  defaultActiveIdx?: number;
}

export const ShowroomVideoModal: React.FC<ShowroomVideoModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  videos,
  defaultActiveIdx = 0,
}) => {
  const [activeIdx, setActiveIdx] = useState(defaultActiveIdx);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setActiveIdx(defaultActiveIdx);
  }, [defaultActiveIdx, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || videos.length === 0) return null;

  const currentVideo = videos[activeIdx] ?? videos[0];
  if (!currentVideo) return null;

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0C292F] border border-[#F3D36B]/40 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#176B73]/50 bg-gradient-to-r from-[#081F24] via-[#0C292F] to-[#123F46] flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#F3D36B] uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Birla Opus Showroom Video
            </div>
            <h3 className="text-base sm:text-xl font-serif text-[#F7F6F1] leading-tight">
              {title}
            </h3>
            <p className="text-xs text-[#B9C8C8]">{subtitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#123F46] hover:bg-[#176B73] text-[#F3D36B] border border-[#F3D36B]/30 flex items-center justify-center transition-all flex-shrink-0 active:scale-95"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-video switcher tabs if more than 1 video */}
        {videos.length > 1 && (
          <div className="flex items-center gap-2 p-2.5 bg-[#081F24] border-b border-[#176B73]/40 overflow-x-auto no-scrollbar">
            {videos.map((vid, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeIdx === idx
                    ? "bg-[#F3D36B] text-[#0C292F] shadow-md shadow-[#F3D36B]/20"
                    : "bg-[#123F46]/70 text-[#B9C8C8] hover:text-[#F3D36B] hover:bg-[#123F46] border border-[#176B73]/50"
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{vid.label || vid.title || `Video ${idx + 1}`}</span>
              </button>
            ))}
          </div>
        )}

        {/* Video Player Container */}
        <div className="relative bg-black flex-1 min-h-[260px] sm:min-h-[420px] max-h-[60vh] flex items-center justify-center overflow-hidden">
          <video
            key={currentVideo.url || currentVideo.src}
            ref={videoRef}
            src={currentVideo.url || currentVideo.src}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain max-h-[60vh]"
          >
            Your browser does not support HTML5 video playback.
          </video>
        </div>

        {/* Footer & Details */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0C292F] via-[#123F46] to-[#0C292F] border-t border-[#176B73]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-xs text-[#DCE5E2] leading-relaxed max-w-xl">
            {currentVideo.desc || "Verified in-store video recording at Jaymurti Traders Birla Opus Paint Showroom, Shukul Bazar, Baskhari."}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`https://wa.me/${businessProfile.whatsappHref}?text=Hello%20Jaymurti%20Traders,%20I%20saw%20your%20${encodeURIComponent(title)}%20video%20and%20wanted%20to%20enquire.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-[#042412] text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Showroom</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
