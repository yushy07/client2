# Birla Opus Paints — Jaymurti Traders Digital Showroom & SEO Platform

An immersive, full-stack architectural paint platform, digital showroom, and production-grade Local & Technical SEO system for **Jaymurti Traders (जयमूर्ति ट्रेडर्स)** — premier authorized **Birla Opus Paints** dealer located in Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh.

[![Birla Opus Authorized Dealer](https://img.shields.io/badge/Birla%20Opus-Authorized%20Dealer-e8a338?style=flat-square)](https://www.birlaopus.com/)
[![React 19](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![tRPC](https://img.shields.io/badge/tRPC-v11-2596be?style=flat-square&logo=trpc)](https://trpc.io/)
[![SEO Ready](https://img.shields.io/badge/SEO-Local%20%26%20Technical-00b894?style=flat-square)](https://jaymurtitraders.com/sitemap.xml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

---

## 📍 Verified Business Profile & NAP Master Record

```text
=============================================================================
CANONICAL BUSINESS MASTER RECORD (NAP SOURCE OF TRUTH)
=============================================================================
Business Name:      Jaymurti Traders
Hindi Name:         जयमूर्ति ट्रेडर्स
Authorized Brand:   Birla Opus Paints (Grasim Industries / Aditya Birla Group)
Showroom Address:   Shukul Bazar, Baskhari, Ambedkar Nagar, Uttar Pradesh — 224129, India
Geo Coordinates:    26.4719° N, 82.8016° E
Opening Hours:      Monday – Sunday: 8:00 AM – 9:00 PM (All 7 Days)
Direct Phone:       +91 87566 59035
WhatsApp Showroom:  +91 87566 59035
Instagram:          https://www.instagram.com/paintwalebhaiya45/
Google Profile:     https://share.google/Nyju9PoRuINGGoD83
Google Maps:        https://maps.app.goo.gl/V1wvtKAGnH5RUG1cA
Production Domain:  https://jaymurtitraders.com/
=============================================================================
```

---

## 🌐 17 Canonical Indexable Routes Architecture

| Route | Page Title | Primary Search Intent | Schema.org Structured Data |
|---|---|---|---|
| `/` | `Jaymurti Traders — Birla Opus Paint Dealer in Baskhari, Ambedkar Nagar` | Brand + Local Commercial Hub | `LocalBusiness`, `HomeGoodsStore` |
| `/paint-products` | `Paint Products & Birla Opus Catalogue \| Jaymurti Traders Baskhari` | Product Category Hub | `BreadcrumbList`, `CollectionPage` |
| `/interior-paints` | `Interior Paints & Luxury Wall Colours \| Jaymurti Traders Baskhari` | Luxury Interior Emulsions | `BreadcrumbList`, `FAQPage` |
| `/exterior-paints` | `Exterior Paints & Weatherproof Coatings \| Jaymurti Traders Baskhari` | All-Weather Facade Defense | `BreadcrumbList`, `FAQPage` |
| `/waterproofing` | `Waterproofing & Damp Shield Solutions \| Jaymurti Traders Baskhari` | Moisture & Seepage Shields | `BreadcrumbList`, `FAQPage` |
| `/enamels` | `Enamel Paints for Metal & Wood \| Jaymurti Traders Baskhari` | High-Gloss & Satin Enamels | `BreadcrumbList`, `FAQPage` |
| `/wood-finishes` | `Wood Finishes & Luxury Timber Polishes \| Jaymurti Traders Baskhari` | PU & Italian Wood Finishes | `BreadcrumbList`, `FAQPage` |
| `/wall-textures` | `Wall Textures & Designer Metallic Finishes \| Jaymurti Traders Baskhari` | Metallic & Stucco Finishes | `BreadcrumbList`, `FAQPage` |
| `/wallpapers` | `Designer Wallpapers & Wallcoverings \| Jaymurti Traders Baskhari` | Curated Wallpaper Series | `BreadcrumbList`, `FAQPage` |
| `/paint-tools` | `Paint Tools & Professional Application Accessories \| Jaymurti Traders` | Rollers, Brushes, Putty Blades | `BreadcrumbList`, `FAQPage` |
| `/colour-finder` | `Birla Opus Colour Finder & 159 Verified Shades \| Jaymurti Traders` | 159-Shade Search & Tonal Matching | `BreadcrumbList`, `CollectionPage` |
| `/room-inspiration` | `Room Colour & Paint Inspiration Studio \| Jaymurti Traders Baskhari` | Lookbook & Room Lighting Modes | `BreadcrumbList`, `FAQPage` |
| `/surface-studio` | `Surface Studio & Wall Texture Visualizer \| Jaymurti Traders Baskhari` | Sensory Relief & Texture Studies | `BreadcrumbList`, `FAQPage` |
| `/about` | `About Jaymurti Traders \| Authorized Birla Opus Dealer in Baskhari` | E-E-A-T, Trust & Leadership | `BreadcrumbList`, `AboutPage` |
| `/contact` | `Contact Jaymurti Traders \| Paint Showroom in Shukul Bazar, Baskhari` | Direct Calls, Directions & Reviews | `BreadcrumbList`, `ContactPage` |
| `/privacy` | `Privacy Policy \| Jaymurti Traders` | Data Protection & Customer Rights | `WebPage` |
| `/terms` | `Terms & Conditions \| Jaymurti Traders` | Terms of Use & Estimation Disclaimer | `WebPage` |

---

## 🔍 SEO & Technical Architecture

### 1. Dynamic Client SEO Hook (`usePageSEO`)
- Dynamically updates `document.title`, `meta[name="description"]`, `link[rel="canonical"]`, Open Graph (`og:*`), and Twitter (`twitter:*`) cards on client-side route transitions.
- Dispatches privacy-safe pageview analytics events.

### 2. Crawl & Discovery Controls
- **`sitemap.xml`**: Valid XML indexing all 17 public canonical URLs with search engine priority weighting.
- **`robots.txt`**: Unrestricted public indexing for Googlebot, Bingbot, and AI agents while cleanly disallowing `/api/`.
- **`llms.txt`**: Markdown manifest engineered for AI search and LLM conversational discovery.

### 3. Structured Data Validation (Schema.org)
- Validated JSON-LD `LocalBusiness` and `HomeGoodsStore` with verified geo-coordinates, telephone, business hours, and social profiles.
- Validated `BreadcrumbList` hierarchy on all subpages.
- Contextual `FAQPage` markup answering real customer questions regarding physical fan deck verification, tinting accuracy, and opening hours.

### 4. Privacy-First Conversion Analytics (`analytics.ts`)
Tracks high-intent local conversion events without collecting Personally Identifiable Information (PII):
- `click_phone` (Direct mobile/desktop phone calls)
- `click_whatsapp` (WhatsApp consultation dispatches)
- `click_directions` (Google Maps route navigations)
- `search_shade` & `view_shade` (Birla Opus shade queries)
- `use_estimator` (Carpet area paint calculation runs)
- `submit_review` (Google Business Profile review prompts)

### 5. Production Hardening & Security Headers
Server-level Express middleware enforces standard HTTP response headers:
```text
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```
- Production source maps disabled (`build.sourcemap: false`) to safeguard build code.

---

## 🎨 Interactive Experience Architecture

1. **159 Verified Birla Opus Shades**: Complete verified catalogue across 10 families (*Whites, Neutrals, Oranges, Yellows, Yellow-Greens, Greens, Blue-Greens, Blues, Purples, Reds*) with digital hex matching, lightness-aware badges, and direct WhatsApp enquiry.
2. **Room Shade Studio & Lookbook**: Virtual try-on studio previewing verified shades across 12 architectural spaces under Daylight, Warm Golden, and Twilight lighting.
3. **Surface Studio & Extended Textures**: 21 tactile texture finishes and 17 sensory relief studies.
4. **Precision Paint Estimator**: Instant engineering-grade calculation of topcoat litres, primer litres, and putty kg by either carpet area or standard home configuration (1 BHK, 2 BHK, 3 BHK, Villa).
5. **Showroom Visual Tour**: Real interior photos, computerized tinting machinery, and founder consultation desk in Baskhari.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend UI** | React 19, TypeScript 5.9, Vite 6, Tailwind CSS 4, Framer Motion, Lucide React, Radix UI |
| **Routing & State** | Wouter, TanStack React Query v5 |
| **Backend & API** | Node.js (ESM), Express, tRPC v11 (End-to-end type safety) |
| **Database & ORM** | MySQL, Drizzle ORM, Drizzle Kit |
| **Build & Tooling** | esbuild, pnpm, Vitest |
| **SEO & Crawl** | Schema.org JSON-LD, W3C XML Sitemaps, Robots.txt, LLMs.txt |

---

## 📁 Repository Structure

```text
client2/
├── client/                               # Frontend Single-Page Application
│   ├── index.html                        # HTML entry point & LocalBusiness JSON-LD Schema
│   ├── public/
│   │   ├── favicon.ico                   # Brand insignia icon
│   │   ├── robots.txt                    # Search crawler directive rules
│   │   ├── sitemap.xml                   # 17 canonical routes sitemap
│   │   ├── llms.txt                      # AI / LLM discoverability manifest
│   │   └── storage/                      # Production media assets & fan decks
│   └── src/
│       ├── components/
│       │   ├── experiences/              # Showroom & visualizer components
│       │   │   ├── ColourCapsule.tsx     # Curated 50-shade mood palette
│       │   │   ├── ExtendedTextures.tsx  # 17 sensory relief studies
│       │   │   ├── InsideJaymurti.tsx    # Photographic showroom gallery
│       │   │   ├── OwnerAndTeam.tsx      # Leadership video & specialist team
│       │   │   ├── ProductWorlds.tsx     # 8 Birla Opus product categories
│       │   │   ├── RoomLibrary.tsx       # 102-space room inspiration library
│       │   │   ├── RoomShadeStudio.tsx   # Live room shade try-on studio
│       │   │   ├── StepInside.tsx        # 2-column showroom video & store highlights
│       │   │   └── WallpaperGallery.tsx  # 13 designer wallpaper collections
│       │   ├── seo/
│       │   │   └── SEOPageLayout.tsx     # Editorial page shell with Breadcrumb & FAQ Schema
│       │   └── ui/                       # Accessible Radix UI primitives
│       ├── hooks/
│       │   └── usePageSEO.ts             # Dynamic title, meta, canonical & OG sync
│       ├── lib/
│       │   ├── analytics.ts              # Privacy-safe conversion event logging
│       │   ├── paintCalculator.ts        # Material requirement estimation algorithms
│       │   └── trpc.ts                   # tRPC client React hooks
│       ├── pages/
│       │   ├── Home.tsx                  # Master showroom landing page
│       │   ├── CategoryPage.tsx          # Dynamic product category template
│       │   ├── ColourFinderPage.tsx      # 159-shade interactive database
│       │   ├── RoomInspirationPage.tsx   # Room shade lookbook & lighting studio
│       │   ├── SurfaceStudioPage.tsx     # Wall textures & wallpaper studio
│       │   ├── AboutPage.tsx             # Showroom history & trust pillars
│       │   ├── ContactPage.tsx           # Contact details, map directions & review flow
│       │   ├── NotFound.tsx              # Luxury dark 404 handler
│       │   ├── Privacy.tsx               # Privacy policy
│       │   └── Terms.tsx                 # Terms & conditions
│       ├── App.tsx                       # Wouter router registering all 17 canonical routes
│       └── index.css                     # Design tokens, typography & animations
├── server/                               # Backend Express API & tRPC service
│   ├── _core/
│   │   ├── index.ts                      # Server bootstrap & HTTP security headers
│   │   ├── storageProxy.ts               # Local media & storage streaming proxy
│   │   └── trpc.ts                       # tRPC procedure initialization
│   ├── db.ts                             # Database queries (enquiries, reviews)
│   ├── routers.ts                        # tRPC router endpoints
│   └── seo.test.ts                       # Vitest SEO foundation test suite
├── shared/                               # Cross-stack TypeScript data models
│   ├── seoKeywordMap.ts                  # Central keyword & metadata mapping
│   ├── verifiedBirlaOpusShades.ts        # 159 verified shades (codes, families, hexes)
│   ├── birlaOpusCatalogue.ts             # Official Birla Opus paint formulations
│   └── businessProfile.ts                # NAP source of truth & showroom coordinates
├── package.json                          # Dependencies & build scripts
├── tsconfig.json                         # Strict TypeScript configuration
├── vite.config.ts                        # Vite bundler, chunk splitting & alias configuration
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
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:3000/](http://localhost:3000/) in your browser.

### 4. Verification & Testing
```bash
# Run TypeScript compilation check
npm run check

# Run SEO & backend unit tests
npm test

# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 📄 License
This project is proprietary software for **Jaymurti Traders** (Birla Opus Authorized Dealer, Baskhari, Ambedkar Nagar). All brand marks, product names, and shade formulas are copyright of their respective owners (Aditya Birla Group / Birla Opus).
