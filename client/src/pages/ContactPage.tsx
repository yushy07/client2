import React, { useState } from "react";
import { SEOPageLayout } from "@/components/seo/SEOPageLayout";
import { getRouteSEO } from "@shared/seoKeywordMap";
import { businessProfile } from "@shared/businessProfile";
import { trpc } from "@/lib/trpc";
import {
  MapPin,
  Clock,
  PhoneCall,
  MessageCircle,
  Compass,
  Instagram,
  Send,
  CheckCircle2,
  AlertCircle,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SlingButton, ShinyText } from "@/components/reactbits";
import { ShowroomLocationCard } from "@/components/common/ShowroomLocationCard";

export const ContactPage: React.FC = () => {
  const seo = getRouteSEO("/contact");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "Colour consultation",
    pincode: "224129",
  });
  const [statusMessage, setStatusMessage] = useState("");

  const enquiry = trpc.enquiries.create.useMutation({
    onSuccess: () => {
      setForm({
        name: "",
        phone: "",
        email: "",
        serviceType: "Colour consultation",
        pincode: "224129",
      });
      setStatusMessage("Thank you! Your enquiry has been received. Our showroom team will contact you shortly.");
    },
    onError: (err) => {
      setStatusMessage(`Error: ${err.message || "Failed to submit enquiry. Please call or WhatsApp us directly."}`);
    }
  });

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setStatusMessage("Please provide your name and phone number.");
      return;
    }
    enquiry.mutate(form);
  };

  return (
    <SEOPageLayout seo={seo}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Col: Contact Info & Showroom Cards */}
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-surface border border-border-teal text-xs">
              <Compass className="w-3.5 h-3.5 text-accent" />
              <ShinyText text="DIRECT FACTORY & DEALER ADVICE" speed={3} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white">
              Get in Touch with Our Showroom Team
            </h2>
            <p className="text-xs sm:text-sm text-on-dark-muted leading-relaxed">
              Whether you need shade advice, bulk project pricing, or on-site moisture testing in Baskhari and Ambedkar Nagar, we are here to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Address */}
            <div className="p-5 rounded-2xl bg-dark-surface border border-border-teal/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Showroom Address</h3>
              <p className="text-xs text-on-dark-muted leading-relaxed">
                Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh - 224129, India
              </p>
            </div>

            {/* Operating Hours */}
            <div className="p-5 rounded-2xl bg-dark-surface border border-border-teal/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Opening Hours</h3>
              <p className="text-xs text-on-dark-muted leading-relaxed">
                Monday – Sunday<br />8:00 AM – 9:00 PM (7 Days Open)
              </p>
            </div>

            {/* Phone */}
            <div className="p-5 rounded-2xl bg-dark-surface border border-border-teal/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                <PhoneCall className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Phone Enquiries</h3>
              <p className="text-xs text-on-dark-muted leading-relaxed">
                <a href="tel:+918756659035" className="text-accent hover:underline font-mono">
                  +91 87566 59035
                </a>
              </p>
            </div>

            {/* WhatsApp */}
            <div className="p-5 rounded-2xl bg-dark-surface border border-border-teal/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">WhatsApp Showroom</h3>
              <p className="text-xs text-on-dark-muted leading-relaxed">
                <a
                  href={`https://wa.me/${businessProfile.whatsappHref}?text=Hello%20Jaymurti%20Traders,%20I%20have%20an%20enquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-mono"
                >
                  Chat on WhatsApp
                </a>
              </p>
            </div>
          </div>

          <ShowroomLocationCard />

            {/* External Links & Google Review CTA */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-accent text-dark font-bold hover:bg-accent/90 text-xs px-5 py-2.5 rounded-xl"
                >
                  <a href={businessProfile.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    <Compass className="w-4 h-4 mr-1.5" /> Open Google Maps Directions
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-border-teal text-white hover:bg-teal-900/60 hover:text-accent hover:border-accent/40 text-xs px-5 py-2.5 rounded-xl transition-all"
                >
                  <a href={businessProfile.googleProfileUrl} target="_blank" rel="noopener noreferrer">
                    View Google Profile
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-border-teal text-white hover:bg-teal-900/60 hover:text-accent hover:border-accent/40 text-xs px-5 py-2.5 rounded-xl transition-all"
                >
                  <a href={businessProfile.instagramUrl} target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4 mr-1.5 text-pink-400" /> Instagram
                  </a>
                </Button>
              </div>

              {/* Customer Review Invitation Card */}
              <div className="p-4 rounded-2xl bg-dark/60 border border-border-teal/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/15 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Visited our showroom?</h4>
                    <p className="text-[11px] text-on-dark-muted">Share your genuine experience on Google Business Profile.</p>
                  </div>
                </div>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-amber-400/40 text-amber-300 hover:bg-amber-400/10 text-xs rounded-lg whitespace-nowrap w-full sm:w-auto"
                >
                  <a href={businessProfile.googleProfileUrl} target="_blank" rel="noopener noreferrer">
                    Leave a Review
                  </a>
                </Button>
              </div>
            </div>
          </div>

        {/* Right Col: Consultation Booking Form */}
        <div className="bg-dark-surface/90 border border-border-teal/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] text-accent font-semibold uppercase tracking-wider font-mono">
              Direct Showroom Enquiry
            </span>
            <h3 className="text-xl font-serif text-white">Book an In-Person Colour Consultation</h3>
            <p className="text-xs text-on-dark-muted">
              Submit your project details and our certified paint advisors will assist you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="text-xs text-white font-medium">Your Name *</label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="e.g. Ramesh Yadav"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-dark/80 border border-border-teal/60 rounded-xl text-xs text-white placeholder:text-on-dark-muted focus:outline-none focus:border-accent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="contact-phone" className="text-xs text-white font-medium">Phone Number *</label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark/80 border border-border-teal/60 rounded-xl text-xs text-white placeholder:text-on-dark-muted focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-pincode" className="text-xs text-white font-medium">Pincode</label>
                <input
                  id="contact-pincode"
                  type="text"
                  placeholder="224129"
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark/80 border border-border-teal/60 rounded-xl text-xs text-white placeholder:text-on-dark-muted focus:outline-none focus:border-accent font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-service" className="text-xs text-white font-medium">Service Required</label>
              <select
                id="contact-service"
                value={form.serviceType}
                onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                className="w-full px-4 py-2.5 bg-dark/80 border border-border-teal/60 rounded-xl text-xs text-white focus:outline-none focus:border-accent"
              >
                <option value="Colour consultation">Colour Consultation & Daylight Sampling</option>
                <option value="Waterproofing assessment">Waterproofing & Moisture Assessment</option>
                <option value="Whole home painting">Whole Home / New Construction Painting</option>
                <option value="Texture & wallpaper">Wall Texture & Designer Wallpaper</option>
                <option value="Bulk contractor supply">Contractor / Bulk Order Supply</option>
              </select>
            </div>

            {statusMessage && (
              <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                statusMessage.startsWith("Thank you")
                  ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                  : "bg-red-950/80 text-red-300 border border-red-500/40"
              }`}>
                {statusMessage.startsWith("Thank you") ? (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                )}
                <span>{statusMessage}</span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="submit"
                disabled={enquiry.isPending}
                className="flex-1 bg-accent text-dark font-bold hover:bg-accent/90 text-xs py-3 rounded-xl shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{enquiry.isPending ? "Submitting..." : "Submit Consultation Request"}</span>
              </Button>
              
              <div title="Tactile Slingshot Launch: Drag back and release to submit">
                <SlingButton
                  onSend={() => handleSubmit()}
                  disabled={enquiry.isPending}
                  padColor="#d97706"
                  iconColor="#0f172a"
                  accentColor="#f59e0b"
                  wellColor="rgba(217, 119, 6, 0.15)"
                  bandColor="rgba(217, 119, 6, 0.6)"
                  size={46}
                  tapSends={true}
                  ariaLabel="Sling launch enquiry"
                />
              </div>
            </div>
            <p className="text-[10px] text-center text-on-dark-muted">
              Tip: Click button or pull back the slingshot handle to launch your enquiry!
            </p>
          </form>
        </div>

      </div>
    </SEOPageLayout>
  );
};
