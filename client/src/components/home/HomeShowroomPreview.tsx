import React from "react";
import { Link } from "wouter";
import { businessProfile } from "@shared/businessProfile";
import { ArrowRight, BadgeCheck, MapPin, Play, Store, Video, Clock } from "lucide-react";

export const HomeShowroomPreview: React.FC = () => {
  return (
    <section className="scroll-chapter py-12 px-4 sm:px-6 lg:px-8" id="showroom-preview" data-scroll-section data-section-label="Showroom">
      <div className="max-w-[var(--shell-max)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-dark-surface/90 border border-border-teal/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Left Column: Showroom Info */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider">
              <BadgeCheck size={14} />
              <span>Authorised Birla Opus Showroom · Baskhari</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white leading-tight">
              Experience Colour & Finishes
              <br />
              <em>In Real Daylight.</em>
            </h2>

            <p className="text-xs sm:text-sm text-on-dark-muted leading-relaxed">
              Step inside Jaymurti Traders at Shukul Bazar, Baskhari. Inspect physical fandecks, feel mineral stucco sample boards, and watch precision computerised tinting machines prepare your exact batch in minutes.
            </p>

            <div className="grid grid-cols-2 gap-4 py-2 border-y border-white/10 text-xs">
              <div>
                <span className="text-on-dark-muted block text-[11px]">Showroom Hours</span>
                <strong className="text-white font-semibold">8:00 AM – 9:00 PM (Daily)</strong>
              </div>
              <div>
                <span className="text-on-dark-muted block text-[11px]">Location</span>
                <strong className="text-white font-semibold">Shukul Bazar, Baskhari (UP 224129)</strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/about"
                className="button-primary text-xs py-2.5 px-5 font-semibold flex items-center gap-2"
              >
                <span>Take Showroom Tour & Meet Team</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="button-ghost text-xs py-2.5 px-5 flex items-center gap-2"
              >
                <MapPin size={14} />
                <span>Get Directions</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Showroom Visual Teaser */}
          <div className="lg:col-span-6">
            <Link href="/about#step-inside" className="block relative rounded-2xl overflow-hidden border border-border-teal/60 group shadow-2xl cursor-pointer">
              <img
                src="/storage/storefront/shopwide.webp"
                alt="Jaymurti Traders Birla Opus Paint Showroom storefront in Baskhari"
                loading="lazy"
                decoding="async"
                width={700}
                height={420}
                className="w-full h-[260px] sm:h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-accent/90 text-dark flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play size={22} fill="currentColor" className="ml-1" />
                </div>
              </div>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-semibold flex items-center gap-1.5">
                  <Video size={13} className="text-accent" /> Watch Cinematic Store Tour Video
                </span>
                <span className="text-[11px] bg-black/60 px-2 py-0.5 rounded text-accent">Click to Watch</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
