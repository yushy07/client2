# Birla Opus Paints — Jaymurti Traders (जयमूर्ति ट्रेडर्स)

An immersive digital showroom and paint exploration web platform for **Birla Opus Paints** at **Jaymurti Traders** (जयमूर्ति ट्रेडर्स), authorized paint and hardware retailer located in Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh - 224129.

---

## 🌟 Key Features

- **Birla Opus Native Shade Experience**: Direct on-site shade browser allowing customers to browse and search 159+ authentic Birla Opus shades extracted from official catalogues:
  - Search by shade code (exact or partial, e.g. `NN 9084`, `9084`), shade name (e.g. `A Camel Called Rani`), or token.
  - Multi-family filtering (Whites, Neutrals, Oranges, Reds, Purples, Blues, Greens, Yellows) with real-time count badges.
  - Large selected-shade studio preview with sheen recommendations.
  - Instant WhatsApp enquiry prefilled for Jaymurti Traders (`+91 8756659035`):
    `"Hello Jaymurti Traders, I would like to enquire about the Birla Opus shade: [NAME] ([CODE])."`
  - Clear physical fan deck disclaimer.
- **Architectural Product Catalogue**: 124 Birla Opus formulations categorized into Luxury Interior Emulsions, All-Weather Exterior Shields, Waterproofing Membranes, Designer Enamels, Wood Finishes, and Painter Tools.
- **Texture Studio**: Bespoke tactile textures across designer collections with high-resolution visual previews.
- **Paint Requirement Estimator**: Instant, transparent paint and primer requirement calculator based on carpet area and room parameters.
- **Interactive Showroom Locator & Reviews**: Showroom timings (8:00 AM – 9:00 PM), verified customer reviews, Google Business Profile integration, and one-tap Google Maps directions.
- **Mobile Responsive & High Performance**: Clean layout optimized for mobile screens, fast load times, and lightweight client-side pagination.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4, Lucide Icons, Radix UI
- **Routing & State**: Wouter, TanStack Query
- **Backend & API**: Node.js / Express, tRPC
- **Database & ORM**: Drizzle ORM, MySQL
- **Testing**: Vitest (106 unit & integration tests)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm 10+

### Installation & Development
```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Run full test suite
pnpm run test

# Type-check TypeScript
pnpm run check

# Build for production
pnpm run build
```

---

## 📁 Project Structure

```
├── client/                 # Frontend application
│   ├── index.html          # HTML entry point with metadata & fonts
│   ├── public/             # Static public assets, favicon, logos
│   └── src/
│       ├── components/     # UI components and interactive modules
│       ├── hooks/          # React custom hooks
│       ├── pages/          # Application pages (Home, NotFound, Privacy)
│       └── index.css       # Core design system and styles
├── server/                 # Backend server, API routes, and test suites
│   └── birla-opus-shades.test.ts # Shade experience test suite
├── shared/                 # Shared data modules & schemas
│   ├── birlaOpusShades.ts  # Authoritative Birla Opus shade dataset & search logic
│   ├── birlaOpusCatalogue.ts # Product catalogue dataset
│   └── businessProfile.ts  # Business identity & contact info
├── drizzle/                # Database schema and migrations
├── LICENSE                 # MIT License
└── README.md               # Project documentation
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
