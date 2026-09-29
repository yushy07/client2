import { useEffect } from "react";
import { Link } from "wouter";
import { usePageSEO } from "@/hooks/usePageSEO";
import { businessProfile } from "../../../shared/businessProfile";

export default function Privacy() {
  usePageSEO({
    title: "Privacy Policy | Jaymurti Traders",
    description: "Privacy policy and data handling practices for Jaymurti Traders, Birla Opus paint dealer and showroom in Baskhari, Ambedkar Nagar, Uttar Pradesh.",
    canonicalPath: "/privacy",
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
        <div className="eyebrow">Website Policy</div>
        <h1>Privacy Policy</h1>
        <p className="legal-intro">
          This Privacy Policy outlines how Jaymurti Traders collects, uses, and safeguards the
          information you provide when using our website or communicating with our paint showroom in
          Baskhari, Ambedkar Nagar.
        </p>

        {/* 1. WHO WE ARE */}
        <section>
          <h2>1. Who We Are</h2>
          <p>
            <strong>JAYMURTI TRADERS (जयमूर्ति ट्रेडर्स)</strong> is an independent paint and colour
            showroom and authorised Birla Opus Paint Dealer based in Ambedkar Nagar, Uttar Pradesh.
          </p>
          <ul>
            <li>
              <strong>Business Name:</strong> JAYMURTI TRADERS (जयमूर्ति ट्रेडर्स)
            </li>
            <li>
              <strong>Business Type:</strong> Birla Opus Paint Dealer / Paint &amp; Colour Showroom
            </li>
            <li>
              <strong>Address:</strong> Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh - 224129, India
            </li>
            <li>
              <strong>Contact Phone:</strong>{" "}
              <a href={`tel:${businessProfile.phoneHref}`}>{businessProfile.phoneDisplay}</a>
            </li>
            <li>
              <strong>Showroom Hours:</strong> {businessProfile.hours}
            </li>
          </ul>
        </section>

        {/* 2. INFORMATION WE COLLECT */}
        <section>
          <h2>2. Information We Collect</h2>
          <p>
            As an independent paint showroom and enquiry platform, we collect only the personal information
            that customers voluntarily submit through the forms and interactive features on our website:
          </p>
          <ul>
            <li>
              <strong>Enquiry Cart:</strong> When preparing a product or shade enquiry, customers may provide their
              Name, Phone number, Area / Locality, and Pincode to coordinate showroom availability and delivery assistance.
            </li>
            <li>
              <strong>Service &amp; Consultation Form:</strong> When requesting a colour consultation, interior/exterior
              guidance, or waterproofing advice, customers may provide their Name, Phone number, Email address, Service type,
              and Project Pincode.
            </li>
            <li>
              <strong>Shop Reviews:</strong> When submitting feedback about their experience at our showroom, customers may
              provide a Display name, Star rating, and Review text.
            </li>
          </ul>
          <p>
            We collect only the details listed above. We do not ask for or collect sensitive personal credentials such as
            Aadhaar, PAN, payment card details, bank account information, account passwords, exact GPS coordinates, or biometric information.
          </p>
        </section>

        {/* 3. WHY WE COLLECT IT */}
        <section>
          <h2>3. Why We Collect It</h2>
          <p>We use customer-provided details strictly for practical showroom assistance, including:</p>
          <ul>
            <li>Responding to paint product enquiries and shade requests.</li>
            <li>Responding to service, surface, and colour consultation requests.</li>
            <li>Understanding project requirements and project locations within Baskhari and nearby regions.</li>
            <li>Contacting customers directly regarding stock availability, tinting details, or showroom assistance.</li>
            <li>Reviewing and publishing helpful customer testimonials to guide fellow homeowners.</li>
          </ul>
          <p>
            We do not sell, rent, or trade customer information, nor do we use submitted personal details for advertising networks or profiling.
          </p>
        </section>

        {/* 4. WHATSAPP ENQUIRIES */}
        <section>
          <h2>4. WhatsApp Enquiries</h2>
          <p>
            Our website allows customers to conveniently prepare an enquiry list and choose{" "}
            <strong>&ldquo;Send Enquiry on WhatsApp&rdquo;</strong>.
          </p>
          <p>
            When you click this option, your device opens WhatsApp with a pre-formatted message containing your selected items
            and the contact details you entered. You retain full control: you can inspect, edit, or cancel the message before
            choosing to send it directly to Jaymurti Traders.
          </p>
          <p>
            WhatsApp is an external, third-party messaging service operated by Meta Platforms, Inc. The transmission, storage,
            and handling of messages inside WhatsApp are governed entirely by WhatsApp&rsquo;s own Terms of Service and Privacy Policy.
            Jaymurti Traders does not secretly transmit messages on your behalf.
          </p>
        </section>

        {/* 5. THIRD-PARTY SERVICES & EXTERNAL LINKS */}
        <section>
          <h2>5. Third-Party Services &amp; External Links</h2>
          <p>
            To help visitors connect with our showroom and explore authentic colour and map resources, our website includes
            links to reputable third-party platforms:
          </p>
          <ul>
            <li>
              <strong>WhatsApp:</strong> For direct two-way messaging with our showroom desk.
            </li>
            <li>
              <strong>Google Maps:</strong> For step-by-step driving directions to our showroom in Baskhari.
            </li>
            <li>
              <strong>Google Business Profile:</strong> For verified showroom listings, operating hours, and customer reviews.
            </li>
            <li>
              <strong>Instagram (@paintwalebhaiya45):</strong> For showroom video walkthroughs, project finishes, and shade demos.
            </li>
          </ul>
          <p>
            When you follow an external link, you leave our website. We do not control and are not responsible for the privacy
            practices, policies, or content of these external third-party platforms.
          </p>
        </section>

        {/* 6. DIGITAL SHADE INFORMATION */}
        <section>
          <h2>6. Digital Shade Information &amp; Colour Disclaimer</h2>
          <p>
            Digital paint colours, swatches, room visualisations, and finish previews displayed on this website are visual
            representations created to assist with colour exploration and design inspiration.
          </p>
          <div className="legal-callout">
            <strong>Important Colour Disclaimer:</strong> Colours shown digitally may vary slightly from the actual paint
            shade due to differences in screen calibration, device displays, surface texture, and ambient room lighting.
            Please confirm your shade selection against the physical Birla Opus fan deck at our showroom before tinting.
          </div>
          <p>
            Digital HEX codes and on-screen swatches are indicative guides and are not guaranteed physical paint matches.
          </p>
        </section>

        {/* 7. PAINT ESTIMATOR */}
        <section>
          <h2>7. Paint Estimator Tool</h2>
          <p>
            The Paint Estimator tool provides an approximate, indicative material estimate based on the room dimensions,
            carpet area, coats, and paint category entered by the customer.
          </p>
          <p>
            Estimates generated by this tool are indicative and for preliminary planning purposes only. Actual paint consumption
            may vary depending on surface porosity, wall condition, primer coat application, application technique (brush, roller, spray),
            painter skill, and unavoidable site wastage. Customers should confirm exact litre requirements and surface preparation steps
            with our showroom experts prior to ordering.
          </p>
        </section>

        {/* 8. DATA SHARING */}
        <section>
          <h2>8. Data Sharing</h2>
          <p>
            Personal information submitted to Jaymurti Traders is used solely for the customer service and enquiry purposes described
            in this policy. We do not sell, rent, or monetize your personal information.
          </p>
          <p>
            Information may only be processed through essential technical infrastructure providers (such as hosting servers, database hosting,
            and telecommunication services like WhatsApp when initiated by you) necessary to deliver our website and communicate with you.
          </p>
        </section>

        {/* 9. DATA RETENTION */}
        <section>
          <h2>9. Data Retention</h2>
          <p>
            We retain customer enquiry submissions, consultation requests, and review records only for as long as reasonably
            necessary to address your project needs, maintain business correspondence, manage showroom records, handle disputes,
            and satisfy legitimate operational or legal requirements under applicable law.
          </p>
        </section>

        {/* 10. DATA SECURITY */}
        <section>
          <h2>10. Data Security</h2>
          <p>
            We take reasonable technical and organizational measures designed to protect personal information from unauthorized access,
            misuse, alteration, disclosure, or loss. However, no internet transmission or electronic storage method can ever be guaranteed
            to be completely invulnerable, and we encourage customers to exercise good judgment when sharing information online.
          </p>
        </section>

        {/* 11. USER REQUESTS & PRIVACY CONTACT */}
        <section>
          <h2>11. User Requests &amp; Privacy Contact</h2>
          <p>
            If you have questions about your personal information, wish to update or correct details you have submitted, or wish to
            request the removal of an enquiry or review submission, please contact us directly:
          </p>
          <ul>
            <li>
              <strong>Showroom Phone:</strong>{" "}
              <a href={`tel:${businessProfile.phoneHref}`}>{businessProfile.phoneDisplay}</a>
            </li>
            <li>
              <strong>In-Person Showroom:</strong> JAYMURTI TRADERS, Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh - 224129
            </li>
          </ul>
        </section>

        {/* 12. CHILDREN'S PRIVACY */}
        <section>
          <h2>12. Children&rsquo;s Privacy</h2>
          <p>
            Our website is designed for adult homeowners, contractors, architects, and trade professionals seeking paint products
            and architectural finishes. We do not knowingly solicit or collect personal information from children under the age of 18.
          </p>
        </section>

        {/* 13. POLICY DATE & LEGAL CONTEXT */}
        <section>
          <h2>13. Governing Legal Context &amp; Updates</h2>
          <p>
            This Privacy Policy is formulated in accordance with applicable laws of India. Jaymurti Traders may revise this policy
            periodically to reflect changes in our showroom offerings, technological improvements, or legal requirements.
          </p>
        </section>

        <p className="legal-updated">Last updated: 28 September 2026</p>
      </div>
    </main>
  );
}
