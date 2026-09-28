# Birla Opus Paints — Jaymurti Traders Digital Showroom Platform

An immersive, full-stack architectural paint platform and digital showroom for **Jaymurti Traders (जयमूर्ति ट्रेडर्स)** — premier authorized **Birla Opus Paints** dealer located in Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh.

[![Birla Opus Authorized Dealer](https://img.shields.io/badge/Birla%20Opus-Authorized%20Dealer-e8a338?style=flat-square)](https://www.birlaopus.com/)
[![React 19](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![tRPC](https://img.shields.io/badge/tRPC-v11-2596be?style=flat-square&logo=trpc)](https://trpc.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

---

## 📍 Showroom & Business Profile

- **Business Name**: Jaymurti Traders (जयमूर्ति ट्रेडर्स)
- **Authorized Brand**: Birla Opus Paints (Aditya Birla Group)
- **Showroom Address**: Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh — 224129, India
- **Landmark**: Shukul Bazar, Baskhari
- **Opening Hours**: Open Daily · 8:00 AM – 9:00 PM
- **Direct Desk / Phone**: [+91 87566 59035](tel:+918756659035)
- **WhatsApp Consultation**: [+91 87566 59035](https://wa.me/918756659035)
- **Instagram**: [@paintwalebhaiya45](https://www.instagram.com/paintwalebhaiya45)
- **Facebook**: [Jaymurti Traders Facebook](https://www.facebook.com/ayush.yadav.334540)
- **Google Maps Showroom Location**: [View on Google Maps](https://maps.app.goo.gl/V1wvtKAGnH5RUG1cA)
- **Google Business Profile**: [Share Profile](https://share.google/Nyju9PoRuINGGoD83)
- **Production Domain**: [https://jaymurtitraders.com/](https://jaymurtitraders.com/)

---

## 🌟 Interactive Experience Architecture

The platform follows a 5-stage retail conversion arc:

### 1. Hook, Authenticity & Visual Discovery
- **Hero Showcase**: Dynamic multi-campaign banner with live showroom status pill, WhatsApp quick-actions, and spectral brand lockup.
- **Inside Jaymurti**: Photographic showroom gallery showcasing real store interiors, computerized mixing counters, and physical display panels in Baskhari.
- **Step Inside Jaymurti (Split Showroom Video)**: High-definition 9:16 portrait showroom tour with ambient glow, one-tap sound unmute, and on-site feature highlights.
- **Visual Discovery Index**: Architectural quick-navigation cards directing users straight to colours, textures, products, or store visits.

### 2. The Colour World
- **Verified Shades Explorer (159 Shades)**: Official Birla Opus catalogue categorized into 10 families (*Whites & Off-Whites, Yellows & Ochres, Reds & Terracottas, Blues & Teals, Greens & Olives, etc.*) with real-time RGB hex matching and enquiry cart integration.
- **Colour Capsule (50 Curated Shades)**: Emotional mood-driven swatches for fast aesthetic alignment.
- **India Architectural Palette Stories**: Localized palettes (*Varanasi Morning, Awadh Heritage, Terracotta Earth*) celebrating regional lighting and materials.

### 3. Virtual Try-On Studio
- **Room Shade Studio**: Real-time room visualizer enabling homeowners to preview any of the 159 verified shades on actual room surfaces under Daylight, Warm Golden, and Evening ambient lighting.
- **Room Inspiration Library (102 Spaces)**: Curated living rooms, bedrooms, facades, and dining zones with exact paint specification lists.

### 4. Paints, Textures & Finishes
- **Birla Opus Master Product Catalogue**: 120+ authentic formulations spanning:
  - *Interiors* (One, Calista, Style luxury emulsions)
  - *Exteriors* (All-weather anti-fungal shields)
  - *Waterproofing* (Moisture barriers & damp treatments)
  - *Wood Finishes & Enamels* (Satin, PU, high-gloss metals)
  - *Tools & Supplies* (Professional rollers, brushes, masking tapes)
- **Surface Studio & Extended Textures**: 21 tactile texture finishes and 17 sensory relief studies.
- **Wallpaper Gallery**: 13 curated Birla Opus wallpaper designer series.

### 5. Planning, Human Trust & Action
- **Precision Paint Estimator**: Instant engineering-grade calculation of topcoat litres, primer litres, and putty kg by either carpet area or standard home configuration (1 BHK, 2 BHK, 3 BHK, Villa).
- **Practical Services / Consultation**: Guidance for lighting undertones, substrate prep, and contractor recommendations.
- **Founder & Showroom Leadership Section**:
  - Showroom film running `jay-murti-traders-v4.mp4` with audio controls.
  - Curated dealer principal portraits at the illuminated Birla Opus counter (`owner2.png`, `owner3.png`, `owner4.png`).
  - Showroom team profile featuring certified specialists (`teammember.jpeg`).
- **Connected Enquiry Desk & Cart**: Consolidated multi-item enquiry cart with direct pre-filled WhatsApp checkout.
- **Showroom Finder & Live Map**: Interactive pincode verification for `224129` and Google route directions.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend UI** | React 19, TypeScript 5.9, Vite 6, Tailwind CSS 4, Framer Motion, Lucide React, Radix UI |
| **Routing & Querying** | Wouter, TanStack React Query v5 |
| **Backend & API** | Node.js (ESM), Express, tRPC v11 (full end-to-end type safety) |
| **Database & ORM** | MySQL, Drizzle ORM, Drizzle Kit |
| **Build & Tooling** | esbuild, pnpm, Biome / Prettier, Vitest |
| **Media & Audio** | Native HTML5 video with user-gesture unmute fallback & ambient blurred canvases |

---

## 📁 Repository & Directory Structure

```text
client2/
├── client/                               # Frontend single-page application
│   ├── index.html                        # HTML entry point, Google Fonts, JSON-LD Schema
│   ├── public/
│   │   ├── favicon.ico                   # Brand favicon
│   │   ├── robots.txt                    # Search crawler rules
│   │   ├── sitemap.xml                   # Complete URL sitemap
│   │   └── storage/                      # Production media assets
│   │       ├── logo.png                  # Jaymurti Traders brand insignia
│   │       ├── promo-video.mp4           # 9:16 Baskhari showroom video tour
│   │       ├── jay-murti-traders-v4.mp4  # Founder & showroom leadership film
│   │       ├── owner2.png                # Founder portrait at consultation desk
│   │       ├── owner3.png                # Full showroom view
│   │       ├── owner4.png                # Customer reception portrait
│   │       ├── teammember.jpeg           # Certified colour specialist
│   │       ├── storefront/               # Showroom exterior & interior photos
│   │       ├── extracted/                # Official Birla Opus inspiration & wallpaper assets
│   │       └── same-room-shades/         # Room Shade Studio visualizer renders
│   └── src/
│       ├── components/
│       │   ├── experiences/              # Modular experiential sections
│       │   │   ├── ColourCapsule.tsx     # Curated 50-shade mood palette
│       │   │   ├── ExtendedTextures.tsx  # 17 sensory relief studies
│       │   │   ├── InsideJaymurti.tsx    # Photographic showroom gallery
│       │   │   ├── OwnerAndTeam.tsx      # Leadership video & specialist team
│       │   │   ├── ProductWorlds.tsx     # 8 Birla Opus product categories
│       │   │   ├── RoomLibrary.tsx       # 102-space room inspiration library
│       │   │   ├── RoomShadeStudio.tsx   # Live room shade try-on studio
│       │   │   ├── StepInside.tsx        # 2-column showroom video & store highlights
│       │   │   └── WallpaperGallery.tsx  # 13 designer wallpaper collections
│       │   ├── ui/                       # Accessible Radix UI components (dialogs, tabs, etc.)
│       │   ├── CircularGallery.tsx       # Rotating visual carousel
│       │   └── ProductStories.tsx        # Architectural video showcase
│       ├── lib/
│       │   ├── motion.tsx                # Framer Motion animations & cursor utilities
│       │   ├── paintCalculator.ts        # Material requirement estimation algorithms
│       │   ├── trpc.ts                   # tRPC client React hooks
│       │   └── utils.ts                  # Tailwind clsx / cn helper
│       ├── pages/
│       │   ├── Home.tsx                  # Core showroom landing page (5-stage journey)
│       │   └── Privacy.tsx               # Privacy policy & customer rights
│       ├── App.tsx                       # App routes & tRPC QueryClientProvider
│       ├── index.css                     # Design tokens, hero typography & custom animations
│       └── main.tsx                      # React DOM mount point
├── server/                               # Backend Express API & tRPC service
│   ├── _core/
│   │   ├── index.ts                      # Server bootstrap & port listener
│   │   ├── storageProxy.ts               # Local media & storage streaming proxy
│   │   ├── trpc.ts                       # tRPC procedure initialization
│   │   └── vite.ts                       # Vite dev middleware integration
│   ├── db.ts                             # Database queries (enquiries, shop reviews)
│   └── routers.ts                        # tRPC router endpoints (serviceEnquiry, shopReviews)
├── shared/                               # Cross-stack TypeScript data models & schemas
│   ├── birlaOpusCatalogue.ts             # 120+ official Birla Opus paint products
│   ├── verifiedBirlaOpusShades.ts        # 159 verified shades with codes, families, hexes
│   ├── businessProfile.ts                # Single source of truth for dealer contact & coordinates
│   ├── roomShadeStudioData.ts            # Dynamic room visualizer configurations
│   ├── colourDirections.ts               # Colour ticker swatches & undertone pairings
│   ├── extendedTexturesData.ts           # Texture surface catalogue & descriptions
│   ├── wallpaperData.ts                  # Designer wallpaper series metadata
│   ├── insideJaymurtiData.ts             # Showroom photographic gallery metadata
│   └── paintTools.ts                     # Material estimation formula constants
├── drizzle/                              # Database schema & migrations
│   └── schema.ts                         # MySQL schema for reviews and enquiries
├── package.json                          # Dependencies & NPM scripts
├── tsconfig.json                         # Strict TypeScript configuration
├── vite.config.ts                        # Vite bundler configuration & path aliases
└── vitest.config.ts                      # Vitest test runner configuration
```

---

## 🚀 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/yushy07/client2.git
cd client2
```

### 2. Install dependencies
```bash
npm install
# or
pnpm install
```

### 3. Environment configuration
Create a `.env` file in the project root:
```env
PORT=3000
NODE_ENV=development
# Optional: MySQL database connection for storing reviews & enquiries
# DATABASE_URL=mysql://user:password@localhost:3306/jaymurti_db
```

### 4. Start development server
```bash
npm run dev
```
Open [http://localhost:3000/](http://localhost:3000/) in your browser.

### 5. Verification & Testing
```bash
# Run TypeScript compilation check
npm run check

# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 📄 License
This project is proprietary software for **Jaymurti Traders** (Birla Opus Authorized Dealer, Baskhari, Ambedkar Nagar). All brand marks, product names, and shade formulas are copyright of their respective owners (Aditya Birla Group / Birla Opus).
