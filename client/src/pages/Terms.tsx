import { useEffect } from "react";
import { Link } from "wouter";
import { businessProfile } from "../../../shared/businessProfile";

export default function Terms() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Terms & Conditions | Jaymurti Traders";

    const metaDesc = document.querySelector('meta[name="description"]');
    const previousDesc = metaDesc?.getAttribute("content") ?? "";
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Terms and conditions for Jaymurti Traders website — Birla Opus paint dealer and showroom in Baskhari, Ambedkar Nagar, Uttar Pradesh."
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute("href") ?? "";
    if (canonical) {
      canonical.setAttribute("href", "https://jaymurtitraders.com/terms");
    }

    window.scrollTo(0, 0);

    return () => {
      document.title = previousTitle || "Jaymurti Traders | Birla Opus Paints in Baskhari, Ambedkar Nagar";
      if (metaDesc && previousDesc) {
        metaDesc.setAttribute("content", previousDesc);
      }
      if (canonical && previousCanonical) {
        canonical.setAttribute("href", previousCanonical);
      }
    };
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
          Please review these Terms &amp; Conditions carefully before using the Jaymurti Traders website.
          By browsing our catalogue, exploring shades, calculating paint estimates, or submitting enquiries,
          you agree to be guided by these terms.
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
            <li>Generate preliminary material quantities via our interactive Paint Estimator.</li>
            <li>Assemble a project enquiry list and send it directly to our showroom team.</li>
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
            The enquiry cart serves exclusively as an interactive communication tool to help you compile your requirements
            and transmit them to Jaymurti Traders. Final pricing, stock availability, batch quantities, tinting specifications,
            physical sample verification, delivery logistics, and payment terms are confirmed separately and directly with our showroom.
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
        </section>

        {/* 4. PRODUCT INFORMATION & AVAILABILITY */}
        <section>
          <h2>4. Products &amp; Showroom Availability</h2>
          <p>
            Product descriptions, pack sizes, imagery, application guidelines, and category listings are presented for general
            informational purposes. While we maintain a comprehensive inventory of Birla Opus products, stock levels, packaging designs,
            and formulation revisions may change. Customers are advised to confirm current product availability directly with our showroom team.
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

        {/* 6. ESTIMATOR LIMITATIONS */}
        <section>
          <h2>6. Paint Estimator Limitations</h2>
          <p>
            The Paint Estimator provides indicative calculations based on standard theoretical spreading rates and the surface
            dimensions entered by the user. It does not constitute:
          </p>
          <ul>
            <li>A firm contractual quotation or fixed price guarantee.</li>
            <li>A binding guarantee of the exact litres or kilograms needed on site.</li>
            <li>A formal structural or architectural assessment.</li>
          </ul>
          <p>
            Actual paint coverage depends significantly on surface porosity, roughness, drywall vs. plaster substrates, number of coats,
            undercoat primers, applicator tools, and site wastage. Always consult our showroom specialists for a precise bill of quantities.
          </p>
        </section>

        {/* 7. USER-PROVIDED INFORMATION */}
        <section>
          <h2>7. User-Provided Information</h2>
          <p>
            When utilizing enquiry forms, consultation requests, or review submissions, you agree to provide truthful and accurate
            details. You must not submit false contact details or impersonate another individual without appropriate authorization.
          </p>
        </section>

        {/* 8. CUSTOMER REVIEWS & FEEDBACK */}
        <section>
          <h2>8. Customer Reviews &amp; Moderation</h2>
          <p>
            Visitors may submit reviews and ratings reflecting their authentic showroom experiences. Jaymurti Traders reserves
            the right to review, moderate, edit for clarity, or withhold reviews that contain inappropriate language, spam,
            promotional links, or unverified claims. Submission of feedback does not guarantee automatic public display.
          </p>
        </section>

        {/* 9. INTELLECTUAL PROPERTY */}
        <section>
          <h2>9. Intellectual Property</h2>
          <p>
            The design, layout, code, graphics, branding, and original content on this website are the property of Jaymurti Traders
            and are protected by applicable intellectual property and copyright laws.
          </p>
          <p>
            Birla Opus, its brand marks, product names, and associated brand imagery are registered trademarks and property of
            Grasim Industries Limited / Aditya Birla Group. Jaymurti Traders displays these marks as an authorised retail dealer
            for identification and commercial dealership purposes.
          </p>
        </section>

        {/* 10. EXTERNAL SERVICES & LINKS */}
        <section>
          <h2>10. External Services &amp; Third-Party Links</h2>
          <p>
            Our website links to external third-party services including WhatsApp, Google Maps, Google Business Profile, and Instagram.
            Jaymurti Traders does not own or operate these platforms and is not liable for their content, performance, or terms of service.
          </p>
        </section>

        {/* 11. WEBSITE AVAILABILITY */}
        <section>
          <h2>11. Website Availability</h2>
          <p>
            We strive to provide continuous, dependable access to our digital catalogue and colour tools. However, the website is
            provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. Access may occasionally be interrupted or restricted
            due to scheduled maintenance, software updates, server conditions, or telecommunication issues beyond our control.
          </p>
        </section>

        {/* 12. LIMITATION OF ESTIMATES & GENERAL INFORMATION */}
        <section>
          <h2>12. Limitation of Estimates &amp; Information</h2>
          <p>
            All information, specifications, and estimates presented on this website are intended for general consumer guidance.
            Before purchasing paint, applying specialty textures, or commencing large painting projects, customers should verify
            surface preparation instructions, batch codes, and primer compatibility with our showroom technical staff.
          </p>
        </section>

        {/* 13. CHANGES TO TERMS */}
        <section>
          <h2>13. Changes to These Terms</h2>
          <p>
            Jaymurti Traders reserves the right to amend these Terms &amp; Conditions at any time to reflect updates to our showroom
            services, catalogue features, or applicable legal standards. Any revisions will be published on this page with an updated date.
          </p>
        </section>

        {/* 14. GOVERNING LAW */}
        <section>
          <h2>14. Governing Law</h2>
          <p>
            These Terms &amp; Conditions are governed by and construed in accordance with the applicable laws of India.
          </p>
        </section>

        {/* 15. CONTACT US */}
        <section>
          <h2>15. Contact Us</h2>
          <p>
            For any questions regarding these Terms &amp; Conditions, product enquiries, or our showroom policies, please get in touch:
          </p>
          <ul>
            <li>
              <strong>Business:</strong> JAYMURTI TRADERS (जयमूर्ति ट्रेडर्स)
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

        <p className="legal-updated">Last updated: 28 September 2026</p>
      </div>
    </main>
  );
}
