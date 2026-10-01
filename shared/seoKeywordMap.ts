export interface RouteSEOConfig {
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  category?: string;
  breadcrumb: Array<{ name: string; path: string }>;
  primaryKeywords: string[];
  supportingKeywords: string[];
  hindiKeywords: string[];
  faq: Array<{ question: string; answer: string }>;
}

export const CANONICAL_HOST = "https://jaymurtitraders.com";

export const SITE_ROUTES_SEO: Record<string, RouteSEOConfig> = {
  "/": {
    path: "/",
    title: "Jaymurti Traders | Birla Opus Paint Dealer in Baskhari, Ambedkar Nagar",
    description: "Jaymurti Traders is an authorized Birla Opus paint dealer and showroom in Baskhari, Shukul Bazar, Ambedkar Nagar. Explore 159 verified shades, interior & exterior paints, waterproofing, and expert colour consultation.",
    h1: "Birla Opus Paints & Architectural Colour Showroom in Baskhari",
    eyebrow: "Authorized Birla Opus Dealer · Baskhari, Ambedkar Nagar",
    breadcrumb: [{ name: "Home", path: "/" }],
    primaryKeywords: ["Jaymurti Traders", "Birla Opus dealer in Baskhari", "paint shop in Baskhari", "paint dealer in Ambedkar Nagar"],
    supportingKeywords: ["Birla Opus paints Baskhari", "wall paint shop in Baskhari", "paint store Shukul Bazar", "waterproofing Baskhari"],
    hindiKeywords: ["जयमूर्ति ट्रेडर्स", "पेंट की दुकान बस्कहरी", "बिड़ला ओपस पेंट डीलर", "दीवार का पेंट"],
    faq: [
      {
        question: "Where is Jaymurti Traders located in Ambedkar Nagar?",
        answer: "Jaymurti Traders is located in Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh (Pincode: 224129). We are an authorized Birla Opus paint dealership serving homeowners, painters, and contractors across the district."
      },
      {
        question: "What paint products and services are available at Jaymurti Traders?",
        answer: "We offer the complete Birla Opus paint portfolio: interior luxury emulsions, exterior weather-guard coatings, waterproofing solutions, wood finishes, enamels, wallpapers, textures, and computerized tinting with in-person daylight colour consultation."
      },
      {
        question: "What are the showroom opening hours?",
        answer: "Our showroom is open 7 days a week from 8:00 AM to 9:00 PM. You can visit in person or contact us directly on +91 87566 59035 for shade inquiries and product availability."
      }
    ]
  },
  "/paint-products": {
    path: "/paint-products",
    title: "Paint Products — Birla Opus Interior, Exterior & Waterproofing | Jaymurti Traders",
    description: "Browse the complete Birla Opus paint catalogue at Jaymurti Traders, Baskhari. Interior emulsions, exterior paints, waterproofing sealants, enamels, and wood finishes.",
    h1: "Complete Birla Opus Paint Portfolio & Product Catalogue",
    eyebrow: "Product Catalogue · Jaymurti Traders Baskhari",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Paint Products", path: "/paint-products" }],
    primaryKeywords: ["paint products Baskhari", "Birla Opus product catalogue", "wall paints Ambedkar Nagar"],
    supportingKeywords: ["interior paints", "exterior paints", "waterproofing products", "enamel paint"],
    hindiKeywords: ["पेंट प्रोडक्ट्स", "दीवार का रंग", "बिड़ला ओपस कैटलॉग"],
    faq: [
      {
        question: "Which Birla Opus product lines do you stock at the Baskhari showroom?",
        answer: "We stock all genuine Birla Opus ranges including Calista, Alpha, One Pure Gold, One Wonder Luxury, All Dry waterproofing, Torus enamels, and specialty architectural primers."
      },
      {
        question: "Can I enquire about bulk paint orders for new home construction?",
        answer: "Yes, we cater to individual homeowners, painting contractors, and builders. You can add items to your enquiry cart or message us on WhatsApp (+91 87566 59035) for customized project quotes."
      }
    ]
  },
  "/interior-paints": {
    path: "/interior-paints",
    title: "Interior Paints & Luxury Wall Emulsions | Jaymurti Traders Baskhari",
    description: "Explore Birla Opus interior paints and luxury wall emulsions at Jaymurti Traders, Baskhari. Washable, stain-resistant, anti-bacterial emulsions for living rooms and bedrooms.",
    h1: "Interior Wall Paints & Luxury Living Emulsions",
    eyebrow: "Interior Wall Solutions · Birla Opus",
    category: "Interior Paints",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Paint Products", path: "/paint-products" }, { name: "Interior Paints", path: "/interior-paints" }],
    primaryKeywords: ["interior wall paint Baskhari", "interior paints Ambedkar Nagar", "Birla Opus interior emulsion"],
    supportingKeywords: ["washable wall paint", "matte interior emulsion", "luxury sheen paint", "bedroom wall colours"],
    hindiKeywords: ["कमरे का पेंट", "इंटीरियर पेंट", "दीवार का इमल्शन"],
    faq: [
      {
        question: "What is the best washable interior paint for family living rooms?",
        answer: "Birla Opus Calista Ever Clear and One Pure Gold offer superior scrub resistance and rich opacity, making them ideal for high-traffic living rooms and hallways."
      }
    ]
  },
  "/exterior-paints": {
    path: "/exterior-paints",
    title: "Exterior Paints & Weatherproof Wall Coatings | Jaymurti Traders",
    description: "Protect and beautify your home exterior with Birla Opus all-weather exterior paints from Jaymurti Traders, Baskhari, Ambedkar Nagar. Anti-algal and UV resistant.",
    h1: "Exterior Paints & Weatherproof Facade Coatings",
    eyebrow: "Exterior Wall Defense · Birla Opus",
    category: "Exterior Paints",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Paint Products", path: "/paint-products" }, { name: "Exterior Paints", path: "/exterior-paints" }],
    primaryKeywords: ["exterior wall paint Baskhari", "exterior paints Ambedkar Nagar", "weatherproof paint Baskhari"],
    supportingKeywords: ["sun-proof exterior emulsion", "anti-algal exterior paint", "home facade paint"],
    hindiKeywords: ["बाहरी दीवार का पेंट", "एक्सटीरियर पेंट", "वेदरप्रूफ पेंट"],
    faq: [
      {
        question: "How long do Birla Opus exterior paints protect against monsoon and heat in UP?",
        answer: "Birla Opus exterior formulations are engineered with advanced cross-linking polymers and UV stabilizers that provide robust weather defense, crack bridging, and anti-fungal protection for multi-year longevity."
      }
    ]
  },
  "/waterproofing": {
    path: "/waterproofing",
    title: "Waterproofing Products & Roof Sealants | Jaymurti Traders Baskhari",
    description: "High-grade waterproofing solutions, terrace coatings, and damp-proof sealants from Birla Opus at Jaymurti Traders, Baskhari, Ambedkar Nagar.",
    h1: "Waterproofing Solutions, Terrace Sealants & Damp Proofing",
    eyebrow: "Moisture Defense · Birla Opus All Dry",
    category: "Waterproofing",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Paint Products", path: "/paint-products" }, { name: "Waterproofing", path: "/waterproofing" }],
    primaryKeywords: ["waterproofing products Baskhari", "roof waterproofing Ambedkar Nagar", "damp proof paint Baskhari"],
    supportingKeywords: ["terrace waterproofing", "bathroom waterproofing", "wall seepage solution"],
    hindiKeywords: ["वाटरप्रूफिंग", "सीलन का इलाज", "छत का वाटरप्रूफ पेंट"],
    faq: [
      {
        question: "How do I fix damp walls and peeling paint before repainting?",
        answer: "We recommend applying Birla Opus All Dry damp-lock primer and elastomeric waterproofing membrane to treat the underlying moisture source before applying the topcoat emulsion."
      }
    ]
  },
  "/enamels": {
    path: "/enamels",
    title: "Enamel Paints for Wood & Metal | Jaymurti Traders Baskhari",
    description: "High-gloss and satin enamel paints for metal grills, doors, windows, and trims. Available at Jaymurti Traders, authorized Birla Opus dealer in Baskhari.",
    h1: "High-Gloss & Satin Enamel Paints for Metal & Wood",
    eyebrow: "Protective Gloss & Trim · Birla Opus",
    category: "Enamels",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Paint Products", path: "/paint-products" }, { name: "Enamels", path: "/enamels" }],
    primaryKeywords: ["enamel paint Baskhari", "metal paint Ambedkar Nagar", "door window enamel"],
    supportingKeywords: ["gloss enamel", "satin enamel", "anti-rust metal paint"],
    hindiKeywords: ["एनेमल पेंट", "लोहे और लकड़ी का पेंट", "दरवाजे का रंग"],
    faq: [
      {
        question: "Can enamel paints be applied on exterior metal gates and window railings?",
        answer: "Yes, Birla Opus synthetic enamels offer anti-rust protection, high mirror gloss, and weather resistance suitable for exterior metal grills, gates, and wooden doors."
      }
    ]
  },
  "/wood-finishes": {
    path: "/wood-finishes",
    title: "Wood Finishes & Clear Polishes | Jaymurti Traders Baskhari",
    description: "Premium wood coatings, PU sealers, and clear polyurethane polishes from Birla Opus. Visit Jaymurti Traders showroom in Baskhari, Ambedkar Nagar.",
    h1: "Architectural Wood Finishes, PU Polishes & Sealers",
    eyebrow: "Timber Craft & Luster · Birla Opus",
    category: "Wood Finishes",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Paint Products", path: "/paint-products" }, { name: "Wood Finishes", path: "/wood-finishes" }],
    primaryKeywords: ["wood finishes Baskhari", "wood polish Ambedkar Nagar", "PU wood sealer"],
    supportingKeywords: ["timber coating", "clear wood polish", "furniture polish Baskhari"],
    hindiKeywords: ["लकड़ी की पॉलिश", "वुड फिनिश", "फर्नीचर पॉलिश"],
    faq: [
      {
        question: "What is the difference between PU polish and standard wood varnish?",
        answer: "PU (Polyurethane) wood coatings create a much harder, scratch-resistant, and water-repellent layer that preserves natural wood grains for years without yellowing."
      }
    ]
  },
  "/wall-textures": {
    path: "/wall-textures",
    title: "Wall Textures & Decorative Metallic Finishes | Jaymurti Traders",
    description: "Explore designer wall textures, metallic finishes, stucco patterns, and rustic stone textures at Jaymurti Traders, Baskhari, Ambedkar Nagar.",
    h1: "Wall Textures, Metallic Accents & Designer Finishes",
    eyebrow: "Tactile Artistry · Surface Studio",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Paint Products", path: "/paint-products" }, { name: "Wall Textures", path: "/wall-textures" }],
    primaryKeywords: ["wall textures Baskhari", "decorative wall finishes Ambedkar Nagar", "metallic wall paint"],
    supportingKeywords: ["stucco texture", "living room accent wall", "designer texture paint"],
    hindiKeywords: ["वॉल टेक्सचर", "दीवार की डिजाइन", "मेटैलिक पेंट"],
    faq: [
      {
        question: "Can texture paint be applied on a single feature wall in a bedroom or living room?",
        answer: "Yes, accent texture walls are very popular. Our showroom in Baskhari features live texture samples in metallic, concrete, and stucco effects so you can choose the ideal accent."
      }
    ]
  },
  "/wallpapers": {
    path: "/wallpapers",
    title: "Designer Wallpapers & Wallcoverings | Jaymurti Traders Baskhari",
    description: "Curated designer wallpapers, botanical patterns, and geometric wallcoverings available at Jaymurti Traders, Baskhari, Ambedkar Nagar.",
    h1: "Designer Wallpapers & Curated Wallcoverings",
    eyebrow: "Pattern & Elegance · Jaymurti Traders",
    category: "Wallpapers",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Paint Products", path: "/paint-products" }, { name: "Wallpapers", path: "/wallpapers" }],
    primaryKeywords: ["wallpapers Baskhari", "designer wallcoverings Ambedkar Nagar", "bedroom wallpaper"],
    supportingKeywords: ["botanical wallpaper", "luxury wallpaper Baskhari", "accent wall wallpaper"],
    hindiKeywords: ["वॉलपेपर", "दीवार का वॉलपेपर", "डिजाइनर वॉलपेपर"],
    faq: [
      {
        question: "Do you supply wallpaper application adhesive and installer recommendations?",
        answer: "Yes, we guide you on surface preparation, supply required adhesives, and connect you with experienced wallpaper installers in the Baskhari area."
      }
    ]
  },
  "/paint-tools": {
    path: "/paint-tools",
    title: "Paint Tools, Rollers & Application Equipment | Jaymurti Traders",
    description: "Professional paint brushes, roller kits, masking tapes, sanding paper, and application accessories at Jaymurti Traders, Baskhari, Ambedkar Nagar.",
    h1: "Professional Painting Tools, Rollers & Application Supplies",
    eyebrow: "Precision Application · Jaymurti Traders",
    category: "Tools",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Paint Products", path: "/paint-products" }, { name: "Paint Tools", path: "/paint-tools" }],
    primaryKeywords: ["paint tools Baskhari", "paint brushes Ambedkar Nagar", "roller kit Baskhari"],
    supportingKeywords: ["masking tape", "sanding paper", "paint tray", "applicator supplies"],
    hindiKeywords: ["पेंटिंग टूल्स", "पेंट ब्रश", "रोलर"],
    faq: [
      {
        question: "Which roller nap size is best for smooth interior emulsion walls?",
        answer: "For smooth interior walls, a short to medium nap roller (8mm to 12mm) ensures an even, splatter-free stipple finish without texture buildup."
      }
    ]
  },
  "/colour-finder": {
    path: "/colour-finder",
    title: "Birla Opus Colour Guide, Finder & 159 Verified Shades | Jaymurti Traders",
    description: "Official Birla Opus Colour Guide: search and explore 159 verified paint shades by tone family, name, and hex codes at Jaymurti Traders, Baskhari.",
    h1: "Birla Opus Colour Guide & 159 Verified Architectural Shades",
    eyebrow: "Official Colour Guide & Spectral Library · Jaymurti Traders",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Colour Guide", path: "/colour-finder" }],
    primaryKeywords: ["Birla Opus colour shades", "Birla Opus shade catalogue", "paint colour finder Baskhari", "Birla Opus shade card"],
    supportingKeywords: ["159 Birla Opus shades", "wall paint colours", "interior colour catalogue", "paint hex codes"],
    hindiKeywords: ["पेंट कलर शेड्स", "बिड़ला ओपस शेड कार्ड", "रंगों की सूची"],
    faq: [
      {
        question: "Are the colours in this online finder verified Birla Opus shades?",
        answer: "Yes, our database contains 159 verified canonical Birla Opus shades with exact hex codes, tone classifications, and shade codes for precise computerized showroom tinting."
      },
      {
        question: "How can I test a shade on my walls before buying full paint cans?",
        answer: "You can enquire for a sample pot directly through WhatsApp or visit our Baskhari showroom to view physical fan decks under natural and warm lighting."
      }
    ]
  },
  "/room-inspiration": {
    path: "/room-inspiration",
    title: "Room Colour & Paint Inspiration — Room Shade Studio | Jaymurti Traders",
    description: "Experience how paint shades transform the same room across 12 architectural spaces in our Room Shade Studio. Jaymurti Traders, Baskhari.",
    h1: "Room Colour & Shade Studio — Same Space, Different Tones",
    eyebrow: "Spatial Lookbook & Comparison · Jaymurti Traders",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Room Inspiration", path: "/room-inspiration" }],
    primaryKeywords: ["room colour ideas Baskhari", "paint colour inspiration Ambedkar Nagar", "same room different shades"],
    supportingKeywords: ["living room colours", "bedroom paint ideas", "dual shade comparison"],
    hindiKeywords: ["कमरे के रंगों के आइडिया", "दीवार के रंग की प्रेरणा", "लिविंग रूम पेंट"],
    faq: [
      {
        question: "How does wall paint color impact perceived room size and daylight?",
        answer: "Lighter tones with high Light Reflectance Values (LRV) reflect daylight to make rooms feel expansive, while deeper tones create acoustic warmth, drama, and intimacy."
      }
    ]
  },
  "/surface-studio": {
    path: "/surface-studio",
    title: "Surface Studio & Architectural Texture Inspiration | Jaymurti Traders",
    description: "Discover bespoke wall textures, metallic finishes, and surface treatments at Jaymurti Traders, authorized Birla Opus showroom in Baskhari.",
    h1: "Surface Studio — Tactile Textures & Architectural Finishes",
    eyebrow: "Material Expressions · Jaymurti Traders",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Surface Studio", path: "/surface-studio" }],
    primaryKeywords: ["surface studio Baskhari", "wall texture inspiration Ambedkar Nagar", "architectural paint finishes"],
    supportingKeywords: ["stucco finishes", "metallic wall accents", "stone wash textures"],
    hindiKeywords: ["सरफेस स्टूडियो", "टेक्सचर डिजाइन", "दीवार फिनिश"],
    faq: [
      {
        question: "Can I inspect physical texture swatches at the Baskhari showroom?",
        answer: "Yes, our showroom features actual applied texture boards under various lighting angles to help you evaluate depth, sheen, and touch before application."
      }
    ]
  },
  "/about": {
    path: "/about",
    title: "About Jaymurti Traders | Authorized Birla Opus Paint Dealer in Baskhari",
    description: "Learn about Jaymurti Traders (जयमूर्ति ट्रेडर्स), authorized Birla Opus paint dealer and showroom in Shukul Bazar, Baskhari, Ambedkar Nagar, UP.",
    h1: "About Jaymurti Traders — Premium Paint Showroom in Baskhari",
    eyebrow: "Authorized Birla Opus Dealership · Ambedkar Nagar",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "About", path: "/about" }],
    primaryKeywords: ["About Jaymurti Traders", "Jaymurti Traders Baskhari", "paint dealer Ambedkar Nagar profile"],
    supportingKeywords: ["Birla Opus authorised shop", "paint showroom Baskhari team", "Shukul Bazar paint store"],
    hindiKeywords: ["जयमूर्ति ट्रेडर्स के बारे में", "पेंट डीलर बस्कहरी"],
    faq: [
      {
        question: "Who is Jaymurti Traders and what is your relationship with Birla Opus?",
        answer: "Jaymurti Traders is an authorized Birla Opus paint dealership and colour showroom established in Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh."
      }
    ]
  },
  "/contact": {
    path: "/contact",
    title: "Contact & Visit Jaymurti Traders | Paint Showroom in Baskhari, UP",
    description: "Contact Jaymurti Traders in Shukul Bazar, Baskhari, Ambedkar Nagar (UP 224129). Phone/WhatsApp: +91 87566 59035. Open 8:00 AM – 9:00 PM daily.",
    h1: "Contact & Visit Jaymurti Traders Showroom in Baskhari",
    eyebrow: "Showroom Directions & Direct Enquiries",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }],
    primaryKeywords: ["Contact Jaymurti Traders", "Jaymurti Traders phone number", "Jaymurti Traders address Baskhari", "paint shop Baskhari contact"],
    supportingKeywords: ["Shukul Bazar paint shop location", "WhatsApp paint dealer Baskhari", "Ambedkar Nagar paint store phone"],
    hindiKeywords: ["जयमूर्ति ट्रेडर्स संपर्क", "दुकान का पता बस्कहरी", "फोन नंबर"],
    faq: [
      {
        question: "What is the exact address of Jaymurti Traders?",
        answer: "Jaymurti Traders is located at Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh - 224129, India."
      },
      {
        question: "How can I order paints or request on-site shade testing via WhatsApp?",
        answer: "You can click any WhatsApp link on our website or message directly at +91 87566 59035. Our team responds promptly during shop hours (8 AM – 9 PM)."
      }
    ]
  },
  "/privacy": {
    path: "/privacy",
    title: "Privacy Policy | Jaymurti Traders",
    description: "Privacy policy and data handling practices for Jaymurti Traders, Birla Opus paint dealer and showroom in Baskhari, Ambedkar Nagar, Uttar Pradesh.",
    h1: "Privacy Policy",
    eyebrow: "Website Policy",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }],
    primaryKeywords: ["Privacy Policy Jaymurti Traders"],
    supportingKeywords: ["data handling Baskhari paint shop"],
    hindiKeywords: ["प्राइवेसी पॉलिसी"],
    faq: []
  },
  "/terms": {
    path: "/terms",
    title: "Terms & Conditions | Jaymurti Traders",
    description: "Terms and conditions for Jaymurti Traders website — Birla Opus paint dealer and showroom in Baskhari, Ambedkar Nagar, Uttar Pradesh.",
    h1: "Terms & Conditions",
    eyebrow: "Website Terms",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Terms & Conditions", path: "/terms" }],
    primaryKeywords: ["Terms & Conditions Jaymurti Traders"],
    supportingKeywords: ["website terms paint showroom Baskhari"],
    hindiKeywords: ["नियम एवं शर्तें"],
    faq: []
  },
  "/404": {
    path: "/404",
    title: "Page Not Found | Jaymurti Traders",
    description: "The page you are looking for does not exist. Return to Jaymurti Traders showroom in Baskhari, Ambedkar Nagar to explore Birla Opus paints and colour finder.",
    h1: "Page Not Found",
    eyebrow: "Error 404",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "404", path: "/404" }],
    primaryKeywords: ["Page Not Found Jaymurti Traders"],
    supportingKeywords: [],
    hindiKeywords: ["पेज नहीं मिला"],
    faq: []
  }
};
