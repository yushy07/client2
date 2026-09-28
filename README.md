# Birla Opus Paints — Jaymurti Traders Experience Platform

An immersive digital showroom and interactive product platform for **Birla Opus Paints** at **Jaymurti Traders (जयमूर्ति ट्रेडर्स)**, authorized dealer and premier colour & paint showroom located in Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh.

---

## 📍 Showroom & Business Details

- **Business Name**: Jaymurti Traders (जयमूर्ति ट्रेडर्स)
- **Authorized Dealership**: Birla Opus Paints (Aditya Birla Group)
- **Location**: Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh — 224129, India
- **Showroom Timings**: Open Daily · 8:00 AM – 9:00 PM
- **Direct Phone**: [+91 87566 59035](tel:+918756659035)
- **WhatsApp Desk**: [+91 87566 59035](https://wa.me/918756659035)
- **Social & Media**: [@paintwalebhaiya45](https://www.instagram.com/paintwalebhaiya45) · [Google Maps Location](https://maps.app.goo.gl/V1wvtKAGnH5RUG1cA)
- **Online Platform**: [https://jaymurtitraders.com/](https://jaymurtitraders.com/)

---

## 🌟 Key Features & Interactive Experiences

### 🎨 Colour & Design Studios
- **Dynamic Spectral Archive & Colour Ticker**: 10 Birla Opus colour families featuring curated shade directions, real-time contrast checking, and fluid looping tickers.
- **Colour Capsule Experience**: High-fashion curated palettes organized by moods, seasons, and architectural styles.
- **Room Shade Studio**: Real-time room visualizer allowing users to preview wall shades dynamically under daylight and artificial lighting conditions.
- **Room Library & Inspiration Archive**: Comprehensive gallery of living rooms, bedrooms, dining areas, and exteriors styled with authentic Birla Opus paints.
- **Wallpaper Gallery**: Luxury designer wall coverings and accent prints complementing the paint palettes.

### 🧱 Full Architectural Catalogue & Texture Studio
- **Mastercrafted Formulation Catalogue**: Complete collection of 120+ authentic Birla Opus products covering:
  - Luxury Interior Emulsions & Primers
  - All-Weather Exterior Weather Shields
  - Waterproofing Membranes & Damp Treatments
  - Designer Enamels, Wood Finishes, & Clear Coats
  - Precision Painting Tools & Application Supplies
- **Tactile Texture Studio**: 21 bespoke designer textures with interactive lighting and high-resolution swatch inspection.
- **Product Comparison Studio**: Side-by-side technical evaluation across finish, washability, coverage, sheen levels, and warranty periods.

### 📐 Planning, Calculation & Project Advisory
- **Precision Paint Requirement Calculator**: Instant calculation of primer and topcoat requirements with support for carpet area, room configurations, and surface types.
- **Unified Enquiry Cart**: Collect shades, textures, and product recommendations into a consolidated enquiry list with 1-click WhatsApp checkout to Jaymurti Traders.
- **Step Inside & Inside Jaymurti**: Virtual showroom tour showcasing actual showroom photography, tinting station capabilities, and owner/team consultation desk.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion, Lucide React, Radix UI primitives.
- **Routing & State**: Wouter, TanStack React Query.
- **Backend & API**: Node.js / Express, tRPC (end-to-end type safety).
- **Database & Schema**: Drizzle ORM, MySQL.
- **Testing**: Vitest (SEO assertions, privacy checks, pricing calculator, and media validation).

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm 10+

### Installation & Development
```bash
# Install dependencies
pnpm install

# Start local development server (Express backend + Vite HMR)
pnpm run dev

# Run unit and integration test suite
pnpm run test

# Type check codebase
pnpm run check

# Build production bundle
pnpm run build

# Start production server
pnpm run start
```

---

## 🌐 Deployment & SEO

- **Canonical URL**: `https://jaymurtitraders.com/`
- **Sitemap**: `https://jaymurtitraders.com/sitemap.xml`
- **Robots**: `https://jaymurtitraders.com/robots.txt`
- **Structured Data**: JSON-LD `LocalBusiness` / `PaintStore` schema with accurate geolocation, opening hours, and authorized Birla Opus brand affiliation.

---

## 📁 Project Structure

```
├── client/                     # Frontend client application
│   ├── index.html              # HTML entry point, SEO meta, schema, & fonts
│   ├── public/                 # Favicons, webmanifest, robots.txt, sitemap.xml
│   │   └── storage/            # High-resolution showroom photos, logos, textures
│   └── src/
│       ├── components/         # Core UI & experience components
│       │   ├── experiences/    # ColourCapsule, RoomShadeStudio, TextureStudio, etc.
│       │   ├── ui/             # Reusable design system primitives
│       │   └── ProductStories.tsx
│       ├── lib/                # Paint calculator algorithms, motion utilities, tRPC client
│       ├── pages/              # Home and Privacy showroom views
│       └── index.css           # Design tokens, custom animations, typography
├── server/                     # Backend API & Express service
├── shared/                     # Shared models (Birla Opus catalogue, business profile, shades)
└── drizzle/                    # Database migrations and schema definitions
```

---

## 📄 License
MIT
