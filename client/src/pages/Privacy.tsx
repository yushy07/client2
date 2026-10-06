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
          This policy explains what information is handled when you browse our catalogue, save an enquiry,
          contact the showroom, use the colour tools, or submit a review. It applies to this website and
          related communications with Jaymurti Traders in Baskhari, India.
        </p>

        {/* 1. WHO WE ARE */}
        <section>
          <h2>1. Who We Are</h2>
          <p>
            <strong>JAYMURTI TRADERS · जयमूर्ति ट्रेडर्स</strong> is an independent paint and colour
            showroom and authorised Birla Opus Paint Dealer based in Ambedkar Nagar, Uttar Pradesh.
          </p>
          <ul>
            <li>
              <strong>Business Name:</strong> JAYMURTI TRADERS · जयमूर्ति ट्रेडर्स
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
          <p>Depending on the features you use, information may include:</p>
          <ul>
            <li>
              <strong>Contact request details:</strong> The contact form prepares a WhatsApp message containing your
              name, phone number, requested service, and pincode. Jaymurti Traders receives it only if you choose to
              send the message.
            </li>
            <li>
              <strong>Saved enquiry cart:</strong> Product, shade, texture, and other selection details or notes you add.
              These selections are saved in your browser so the cart remains available when you return.
            </li>
            <li>
              <strong>Reviews:</strong> Display name, star rating, and review text. Reviews are checked before they
              may appear publicly on the website; an approved review can show the display name and review text you submitted.
            </li>
            <li>
              <strong>Authorised sign-in:</strong> If an administrator signs in, the identity service may provide an
              account identifier, name, email address, and sign-in method for authentication and review moderation.
            </li>
            <li>
              <strong>Basic technical information:</strong> Requests to load pages and media may be processed by our
              hosting and security providers, which can involve IP address, browser/device details, and request logs.
            </li>
          </ul>
          <p>
            The website does not have an online payment checkout and does not ask for card or bank details. Please do
            not include Aadhaar, PAN, passwords, or other sensitive information in enquiry notes or review text.
          </p>
        </section>

        {/* 3. WHY WE COLLECT IT */}
        <section>
          <h2>3. Why We Collect It</h2>
          <p>We use information to operate the website and respond to the actions you choose, including:</p>
          <ul>
            <li>Responding to paint product enquiries and shade requests.</li>
            <li>Responding to service, surface, and colour consultation requests.</li>
            <li>Contacting customers directly regarding stock availability, tinting details, or showroom assistance.</li>
            <li>Saving cart selections on your device and showing approved reviews to other visitors.</li>
            <li>Maintaining, protecting, and troubleshooting the website and its forms.</li>
          </ul>
          <p>
            We do not sell personal information. We do not currently use this website to build advertising profiles
            from enquiry details.
          </p>
        </section>

        <section>
          <h2>4. Information Saved in Your Browser</h2>
          <p>
            The site uses browser storage to remember your enquiry cart. If you enter contact details in the cart,
            those details are saved on your device for up to 30 days to make a later enquiry easier. The selected
            theme may also be saved where that setting is available. This is browser storage, not an account; it is
            not available to us until you choose to send an enquiry.
          </p>
          <p>
            You can remove saved details using the cart&rsquo;s clear-details option where available, or clear this
            site&rsquo;s storage in your browser settings. Removing browser data may also clear saved cart selections.
          </p>
          <p>
            If you use sign-in features, essential cookies support the sign-in security check and session. The sign-in
            check cookie is short-lived; a successful account session cookie may remain for up to one year. These
            cookies support authentication and are not used by us for advertising.
          </p>
        </section>

        {/* 5. WHATSAPP ENQUIRIES */}
        <section>
          <h2>5. WhatsApp Enquiries</h2>
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

        {/* 6. THIRD-PARTY SERVICES & EXTERNAL LINKS */}
        <section>
          <h2>6. Third-Party Services, Maps &amp; External Links</h2>
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
              <strong>Google Fonts:</strong> The website loads fonts from Google to display its typography.
              Your browser may connect to Google when those fonts are requested.
            </li>
            <li>
              <strong>Google Business Profile:</strong> For verified showroom listings, operating hours, and customer reviews.
            </li>
            <li>
              <strong>Instagram (@paintwalebhaiya45):</strong> For showroom video walkthroughs, project finishes, and shade demos.
            </li>
          </ul>
          <p>
            The map is embedded on our About and Contact pages. Loading the map or following an external link can
            allow that provider to receive technical information from your browser and apply its own privacy terms.
            We do not receive your precise device location through the map embed. Review the provider&rsquo;s privacy
            information before using its services.
          </p>
        </section>

        {/* 7. DIGITAL SHADE INFORMATION */}
        <section>
          <h2>7. Digital Shade Information &amp; Colour Disclaimer</h2>
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

        {/* 8. ENQUIRY SUBMISSIONS &amp; DATA SHARING */}
        <section>
          <h2>8. Enquiry Submissions &amp; Data Sharing</h2>
          <p>
            The contact form creates a WhatsApp message draft on your device. Selecting the WhatsApp button opens that
            draft with WhatsApp; Jaymurti Traders receives your details only if you review and send the message. The
            website does not save contact-form details to its database. Review submissions are transmitted to our service
            and may be stored in the site&rsquo;s database so they can be moderated.
          </p>
          <p>
            We may share information with hosting, database, and technical service providers that support the site,
            and where necessary to respond to you, protect the service, or meet legal obligations. WhatsApp processes
            the draft when you choose to open it, and we do not control that third-party service.
          </p>
        </section>

        {/* 9. DATA RETENTION */}
        <section>
          <h2>9. Data Retention</h2>
          <p>
            Cart contact details are stored in your browser for up to 30 days. Cart selections remain in browser storage
            until removed or cleared. Reviews held in the site database are kept for as long as reasonably needed to
            moderate reviews, resolve disputes, and meet applicable legal requirements. Retention may depend on the
            hosting and database configuration in use.
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
          <h2>11. Your Requests &amp; Privacy Contact</h2>
          <p>
            You may contact us to ask about, correct, or request deletion of information you submitted, or to raise a
            privacy concern. We may need to verify the request before acting and may retain information where required
            for legitimate business or legal reasons. Contact us by phone or WhatsApp:
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
          <h2>13. Applicable Law &amp; Updates</h2>
          <p>
            We handle personal information subject to applicable Indian law, including data-protection requirements as
            they come into force. Jaymurti Traders may revise this policy when the website, our practices, or applicable
            requirements change. The latest version and date will appear on this page.
          </p>
        </section>

        <p className="legal-updated">Last updated: 6 October 2026</p>
      </div>
    </main>
  );
}
