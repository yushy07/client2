import { useEffect } from "react";
import { Link } from "wouter";
import { usePageSEO } from "@/hooks/usePageSEO";
import { businessProfile } from "../../../shared/businessProfile";

export default function Terms() {
  usePageSEO({
    title: "Terms & Conditions | Jaymurti Traders",
    description: "Terms and conditions for Jaymurti Traders website — Birla Opus paint dealer and showroom in Baskhari, Ambedkar Nagar, Uttar Pradesh.",
    canonicalPath: "/terms",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="legal-page">
      <div className="legal-page-inner">
        <Link className="legal-back-link" href="/">
          Jaymurti Traders <span>Back to showroom</span>
        </Link>
        <div className="eyebrow">Website Terms</div>
        <h1>Terms &amp; Conditions</h1>
        <p className="legal-intro">
          These terms explain how to use the Jaymurti Traders website and its showroom, product, shade, and enquiry
          features. They do not replace any consumer rights that apply to you under law.
        </p>

        {/* 1. WEBSITE PURPOSE */}
        <section>
          <h2>1. Website Purpose</h2>
          <p>
            The Jaymurti Traders website is designed primarily as an informational and enquiry platform for homeowners,
            painters, contractors, and architects in and around Baskhari and Ambedkar Nagar. The website enables visitors to:
          </p>
          <ul>
            <li>Discover the authentic Birla Opus paint portfolio (interior emulsions, exterior paints, waterproofing, enamels, and primers).</li>
            <li>Explore curated colour palettes, curated shade codes, and trending designer colour stories.</li>
            <li>Inspect textures, metallic effects, and specialized wall finishes.</li>
            <li>View architectural room inspiration and visualize room transformations.</li>
            <li>View product video previews, showroom photographs, and map directions.</li>
            <li>Prepare a project enquiry and send it to our showroom through WhatsApp after reviewing the message.</li>
            <li>Access showroom operating hours, phone numbers, and physical location directions.</li>
          </ul>
        </section>

        {/* 2. ENQUIRIES ARE NOT AUTOMATIC PURCHASES */}
        <section>
          <h2>2. Enquiries Are Not Automatic Purchases</h2>
          <div className="legal-callout">
            <strong>Important Notice:</strong> This website does not offer an online e-commerce checkout. Adding paint
            products or shades to your enquiry cart does not constitute a completed order, financial transaction,
            guaranteed inventory reservation, or confirmed delivery contract.
          </div>
          <p>
            The enquiry cart helps you compile your requirements. Sending an enquiry or contact form is a request for
            information, not a confirmed order, appointment, inventory reservation, or delivery contract. Final pricing,
            stock availability, batch quantities, tinting specifications, physical sample verification, delivery logistics,
            and payment terms are confirmed separately with our showroom.
          </p>
        </section>

        {/* 3. WHATSAPP ENQUIRY PROCESS */}
        <section>
          <h2>3. WhatsApp Enquiry Process</h2>
          <p>
            When you select &ldquo;Send Enquiry on WhatsApp&rdquo;, the website compiles your chosen shades, product categories,
            and supplied details into an easy-to-read draft message and opens your device&rsquo;s WhatsApp client.
          </p>
          <p>
            You have full visibility to review and edit the draft message before sending it to our showroom desk. Jaymurti Traders
            does not guarantee that third-party messaging services will deliver without interruption, nor can we guarantee
            immediate replies outside of regular showroom operating hours (8:00 AM – 9:00 PM).
          </p>
          <p>
            The website does not submit the WhatsApp message for you. A sale is not agreed until the showroom confirms the
            product, price, availability, and any delivery or payment arrangements with you.
          </p>
        </section>

        {/* 4. PRODUCT INFORMATION & AVAILABILITY */}
        <section>
          <h2>4. Products &amp; Showroom Availability</h2>
          <p>
            Product descriptions, pack sizes, imagery, video previews, application guidance, and category listings are provided
            for general information. Product range, pack design, formulation, pricing, and stock can change. Confirm current
            availability and product instructions with the showroom and the product label before purchase or use.
          </p>
        </section>

        {/* 5. DIGITAL SHADE INFORMATION & DISCLAIMER */}
        <section>
          <h2>5. Digital Shade Information &amp; Fan Deck Confirmation</h2>
          <p>
            Our website provides extensive digital colour exploration tools to inspire your painting project.
          </p>
          <div className="legal-callout">
            <strong>Colour Disclaimer:</strong> Colours shown digitally may vary slightly from the actual paint shade.
            Please confirm against the physical fan deck.
          </div>
          <p>
            Screen technologies, display colour profiles, ambient room illumination, substrate porosity, and sheen levels
            can alter visual appearance. We strongly recommend viewing the physical Birla Opus colour fandeck or swatch sample
            under natural and artificial lighting at our showroom prior to computerized tinting.
          </p>
        </section>

        {/* 6. USER-PROVIDED INFORMATION */}
        <section>
          <h2>6. User-Provided Information</h2>
          <p>
            When preparing an enquiry, please provide accurate details so the showroom can respond. You choose whether to
            send the prepared message through WhatsApp.
          </p>
          <p>
            Please review our <Link href="/privacy" className="underline text-accent hover:text-white">Privacy Policy</Link>
            {" "}to understand how enquiry details and browser storage are handled.
          </p>
        </section>

        {/* 7. CUSTOMER REVIEWS & FEEDBACK */}
        <section>
          <h2>7. Customer Reviews</h2>
          <p>
            The website does not collect or publish reviews. Visitors may choose to view or write a review on the external
            Google Business Profile, which is governed by Google&rsquo;s own terms and privacy notices.
          </p>
        </section>

        {/* 8. INTELLECTUAL PROPERTY */}
        <section>
          <h2>8. Intellectual Property</h2>
          <p>
            Website text, photographs, and other original materials created for Jaymurti Traders may not be copied or reused
            commercially without permission. Third-party software, fonts, media, and brand materials remain subject to their
            respective licences and rights.
          </p>
          <p>
            Birla Opus, its brand marks, product names, and associated brand imagery are registered trademarks and property of
            Grasim Industries Limited / Aditya Birla Group. Jaymurti Traders displays these marks as an authorised retail dealer
            for identification and commercial dealership purposes.
          </p>
        </section>

        {/* 9. EXTERNAL SERVICES & LINKS */}
        <section>
          <h2>9. External Services &amp; Third-Party Links</h2>
          <p>
            Our site links to and embeds services such as Google Maps and links to WhatsApp, Google Business Profile,
            Instagram, and Facebook. Their availability, content, and handling of information are controlled by those providers
            under their own terms and privacy notices. You choose whether to use those services.
          </p>
        </section>

        {/* 10. WEBSITE AVAILABILITY */}
        <section>
          <h2>10. Website Availability</h2>
          <p>
            We strive to provide continuous, dependable access to our digital catalogue and colour tools. However, the website is
            provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. Access may occasionally be interrupted or restricted
            due to scheduled maintenance, software updates, server conditions, or telecommunication issues beyond our control.
          </p>
        </section>

        {/* 11. GENERAL INFORMATION */}
        <section>
          <h2>11. General Information</h2>
          <p>
            Product information, specifications, and guidance presented on this website are intended for general consumer information.
            Before purchasing paint, applying specialty textures, or commencing large painting projects, customers should verify
            surface preparation instructions, batch codes, and primer compatibility with our showroom technical staff.
          </p>
          <p>
            The site and its tools are provided for general assistance and may be temporarily unavailable or contain errors.
            Nothing in these terms excludes or limits a consumer right or liability that cannot legally be excluded or limited.
          </p>
        </section>

        {/* 12. CHANGES TO TERMS */}
        <section>
          <h2>12. Changes to These Terms</h2>
          <p>
            Jaymurti Traders reserves the right to amend these Terms &amp; Conditions at any time to reflect updates to our showroom
            services, catalogue features, or applicable legal standards. Any revisions will be published on this page with an updated date.
          </p>
        </section>

        {/* 13. GOVERNING LAW */}
        <section>
          <h2>13. Governing Law</h2>
          <p>
            These Terms &amp; Conditions are governed by applicable laws of India, subject to any mandatory consumer protections
            and legal rights that apply to your use of the site or dealings with the showroom.
          </p>
        </section>

        {/* 14. CONTACT US */}
        <section>
          <h2>14. Contact Us</h2>
          <p>
            For any questions regarding these Terms &amp; Conditions, product enquiries, or our showroom policies, please get in touch:
          </p>
          <ul>
            <li>
              <strong>Business:</strong> JAYMURTI TRADERS · जयमूर्ति ट्रेडर्स
            </li>
            <li>
              <strong>Address:</strong> Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh - 224129, India
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a href={`tel:${businessProfile.phoneHref}`}>{businessProfile.phoneDisplay}</a>
            </li>
            <li>
              <strong>Hours:</strong> {businessProfile.hours}
            </li>
          </ul>
        </section>

        <p className="legal-updated">Last updated: 6 October 2026</p>
      </div>
    </main>
  );
}
