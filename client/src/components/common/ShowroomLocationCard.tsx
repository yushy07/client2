import React from "react";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { businessProfile } from "@shared/businessProfile";

const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  "Jaymurti Traders, Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh 224129"
)}&output=embed`;

export const ShowroomLocationCard: React.FC = () => (
  <section className="metallic-surface grid grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] overflow-hidden rounded-3xl border border-[#F3D36B]/25 bg-gradient-to-br from-[#123F46] via-[#0E353B] to-[#081F24] shadow-xl shadow-black/20">
    <div className="flex flex-col justify-center gap-5 p-5 sm:p-7 lg:p-9">
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F3D36B]/30 bg-[#F3D36B]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-[#F3D36B]">
        <MapPin className="h-3.5 w-3.5" /> Find our showroom
      </div>
      <div className="space-y-2">
        <h2 className="font-serif text-2xl leading-tight text-[#F7F6F1] sm:text-3xl">Visit us in Baskhari</h2>
        <p className="text-sm leading-relaxed text-[#B9C8C8]">{businessProfile.name} · Birla Opus Paint Showroom</p>
      </div>
      <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/10 p-4">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#F3D36B]" />
        <address className="not-italic text-sm leading-relaxed text-white/90">{businessProfile.address}</address>
      </div>
      <div className="flex items-center gap-2 text-xs text-[#B9C8C8]">
        <Clock3 className="h-4 w-4 text-[#F3D36B]" />
        Open daily · {businessProfile.hours}
      </div>
      <a
        href={businessProfile.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F3D36B] px-5 py-3 text-sm font-bold text-[#0C292F] shadow-lg shadow-[#F3D36B]/15 transition hover:bg-[#ffe38b] sm:w-fit"
      >
        <MapPin className="h-4 w-4" /> Open in Google Maps <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>

    <div className="relative min-h-[250px] border-t border-white/10 md:min-h-[380px] md:border-l md:border-t-0 xl:min-h-[430px]">
      <iframe
        title="Jaymurti Traders showroom location in Baskhari on Google Maps"
        src={mapEmbedUrl}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#08272b]/90 px-3 py-2 text-[11px] font-semibold text-white shadow-lg backdrop-blur sm:left-4 sm:top-4">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]" />
        Shukul Bazar · Baskhari
      </div>
    </div>
  </section>
);
