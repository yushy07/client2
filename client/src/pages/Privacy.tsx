import { useEffect } from "react";
import { Link } from "wouter";
import { businessProfile } from "../../../shared/businessProfile";

export default function Privacy() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Privacy Policy | Jaymurti Traders";

    const metaDesc = document.querySelector('meta[name="description"]');
    const previousDesc = metaDesc?.getAttribute("content") ?? "";
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Privacy policy and data handling practices for Jaymurti Traders, authorized Birla Opus paint dealer in Baskhari, Uttar Pradesh."
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute("href") ?? "";
    if (canonical) {
      canonical.setAttribute("href", "https://kumarhardware.vercel.app/privacy");
    }

    window.scrollTo(0, 0);

    return () => {
      document.title = previousTitle || "Jaymurti Traders | Birla Opus Paints in Baskhari";
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
        <div className="eyebrow">Website Policy</div>
        <h1>Privacy Policy</h1>
        <p className="legal-intro">
          This privacy policy outlines how Jaymurti Traders collects, uses, and safeguards the
          information you provide when using our website or communicating with our paint showroom in Baskhari.
        </p>

        <section>
          <h2>Information We Collect</h2>
          <p>
            As an independent paint showroom and authorized Birla Opus dealer, we collect only the details
            necessary to assist you with your paint selection, colour curation, and project planning. Information
            is collected when you interact with us across the website through:
          </p>
          <ul>
            <li>
              <strong>Consultation Forms:</strong> Name, phone number, email address, service type (such as interior
              painting, colour consultation, exterior renewal, or waterproofing), and project pincode when requesting
              a priority colour consultation or paint estimation.
            </li>
            <li>
              <strong>Contact Forms &amp; Direct Enquiries:</strong> Name, contact details, and project notes submitted
              when requesting product guidance, contractor recommendations, or showroom assistance.
            </li>
            <li>
              <strong>Review Submissions:</strong> Display name, star rating, and written project experience submitted to
              share showroom feedback. Reviews rated 3 stars and above are published on the website to assist fellow homeowners.
            </li>
            <li>
              <strong>Newsletter &amp; Colour Journal Submissions:</strong> Email address provided when signing up for our
              seasonal colour palettes, finish guides, and architectural inspiration updates.
            </li>
          </ul>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>We use the information you share exclusively for practical showroom service and customer support:</p>
          <ul>
            <li>Responding directly to your paint enquiries and technical questions.</li>
            <li>Providing personalised paint recommendations, finish specifications, and colour consultation.</li>
            <li>Scheduling priority showroom visits and product guidance at our Baskhari store.</li>
            <li>Improving our customer service, product availability, and showroom consultation experience.</li>
          </ul>
          <p>
            We do not sell, rent, trade, or share your personal information with third-party marketers or advertisers.
          </p>
        </section>

        <section>
          <h2>Cookies and Local Analytics</h2>
          <p>
            Our website uses standard browser cookies and local storage tokens to ensure core functionality, maintain your
            active session preferences (such as theme and selected colour swatches), and understand general traffic patterns.
            You can configure your browser to block or alert you about cookies; however, some interactive features may not
            function as smoothly without them.
          </p>
        </section>

        <section>
          <h2>Google Analytics Disclosure</h2>
          <p>
            We may use Google Analytics to monitor aggregated, non-personally identifiable website metrics such as page
            views, visitor duration, and device types. This data helps us understand how visitors discover our showroom and
            ensures the website loads quickly and reliably across all devices. Google Analytics processes data in accordance
            with Google’s privacy practices.
          </p>
        </section>

        <section>
          <h2>External Links &amp; Third-Party Services</h2>
          <p>
            Our website provides direct links to external services to help you connect with our showroom and explore
            architectural resources:
          </p>
          <ul>
            <li>
              <strong>Google Maps &amp; Google Business Profile:</strong> To view verified showroom listings, operating
              hours, customer reviews, and step-by-step driving directions to our store at Shukul Bazar, Baskhari.
            </li>
            <li>
              <strong>WhatsApp:</strong> To enable direct messaging with our showroom desk for instant enquiries and photos.
            </li>
            <li>
              <strong>Instagram:</strong> To view our project gallery, video reels, and recent colour transformations.
            </li>
            <li>
              <strong>Birla Opus:</strong> To access official colour tools, technical product datasheets, and design inspiration articles.
            </li>
          </ul>
          <p>
            When you follow an external link, third-party platforms govern any interactions under their respective privacy policies.
          </p>
        </section>

        <section>
          <h2>Data Retention and Security</h2>
          <p>
            We retain customer enquiry information only for as long as necessary to fulfill your consultation request, maintain
            project correspondence, and provide ongoing paint service support.
          </p>
          <p>
            While no internet transmission is completely invulnerable, we apply reasonable technical and organizational safeguards
            to protect your personal details from unauthorized access, loss, or misuse.
          </p>
        </section>

        <section>
          <h2>Your Rights and Choices</h2>
          <p>
            You have the right to request access to the information we hold about you, request corrections to any outdated or
            incorrect details, or ask us to delete your consultation submission or email from our records. To exercise any of
            these choices, simply contact us by email or phone.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions regarding this Privacy Policy or how your information is handled, please get in touch with our showroom team:
          </p>
          <ul>
            <li>
              <strong>Phone:</strong> <a href={`tel:${businessProfile.phoneHref}`}>{businessProfile.phoneDisplay}</a>
            </li>
            <li>
              <strong>Showroom Address:</strong> {businessProfile.address}
            </li>
            <li>
              <strong>Hours:</strong> {businessProfile.hours}
            </li>
          </ul>
        </section>

        <p className="legal-updated">Last updated: 19 August 2026</p>
      </div>
    </main>
  );
}
