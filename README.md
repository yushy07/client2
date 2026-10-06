# Birla Opus Paints — Jaymurti Traders Digital Showroom & SEO Platform

An interactive digital showroom and WhatsApp enquiry website for Jaymurti Traders, an authorised Birla Opus dealer in Baskhari, Ambedkar Nagar. Customer contact details stay in page memory until the customer chooses to open WhatsApp; the site does not save enquiry details to a database.

[![Birla Opus Authorized Dealer](https://img.shields.io/badge/Birla%20Opus-Authorized%20Dealer-e8a338?style=flat-square)](https://www.birlaopus.com/)
[![React 19](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
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
| `/terms` | `Terms & Conditions \| Jaymurti Traders` | Website Use & Enquiry Terms | `WebPage` |

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
4. **Showroom Consultation**: Contact the Baskhari team for product guidance, shade selection, surface preparation advice, and project estimates.
5. **Showroom Visual Tour**: Real interior photos, computerized tinting machinery, and founder consultation desk in Baskhari.
6. **Omni-Channel Floating Actions & Mobile Sticky Bar**: Persistent quick-access actions across desktop (floating glassmorphic contact pill) and mobile (ergonomic bottom sticky bar) featuring instant showroom calls (`tel:`), pre-formatted WhatsApp consultations (`wa.me`), Instagram, Facebook, and the interactive Enquiry Cart drawer.
7. **Product Video Stories**: The About page includes a responsive carousel of 14 short Birla Opus product videos. It advances every 10 seconds, supports touch swipes and previous/next controls, and links each video to its relevant interior or exterior catalogue page. A contact action opens the showroom contact page.
8. **Showroom Photo Gallery**: Browse real showroom photos in a detail modal. The image stays unobstructed; photo navigation sits with the details and the layout adapts to phone and desktop screens.
9. **Showroom Location**: About and Contact pages show the Baskhari showroom address with a map and direct Google Maps directions.

The main showroom, product catalogue, gallery, and video experiences are responsive and adapt their layouts to phone and desktop screen widths.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend UI** | React 19, TypeScript 5.9, Vite 8, Tailwind CSS v4, Framer Motion, GSAP, Lucide React, Radix UI |
| **Routing & State** | Wouter v3.7, React state and browser storage for non-personal cart selections |
| **Server Runtime** | Node.js 22 (ESM), Express 4 for media paths, health checks, and static page serving |
| **Build & Tooling** | esbuild, pnpm v10, Vitest v4, Sharp (SSR Pre-rendering & Budget Checks) |
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
│       │   │   ├── ExtendedTextures.tsx  # 17 sensory relief studies & modal showcase
│       │   │   ├── InsideJaymurti.tsx    # Photographic showroom gallery
│       │   │   ├── ProductStories.tsx    # Responsive product video carousel and catalogue links
│       │   │   ├── OwnerAndTeam.tsx      # Leadership video & specialist team
│       │   │   ├── ProductWorlds.tsx     # 8 Birla Opus product categories
│       │   │   ├── RoomLibrary.tsx       # 102-space room inspiration library
│       │   │   ├── RoomShadeStudio.tsx   # Live room shade try-on studio with lighting modes
│       │   │   ├── StepInside.tsx        # 2-column showroom video & store highlights
│       │   │   └── WallpaperGallery.tsx  # 13 designer wallpaper collections
│       │   ├── reactbits/                # Micro-interaction & dynamic 3D components (DriftWall, TiltedCard, SplitText)
│       │   ├── seo/
│       │   │   └── SEOPageLayout.tsx     # Editorial page shell with Breadcrumb & FAQ Schema
│       │   └── ui/                       # Accessible Radix UI primitives
│       ├── hooks/
│       │   └── usePageSEO.ts             # Dynamic title, meta, canonical & OG sync
│       ├── lib/
│       │   ├── analytics.ts              # Privacy-safe conversion event logging
│       ├── pages/
│       │   ├── Home.tsx                  # Master showroom landing page
│       │   ├── CategoryPage.tsx          # Dynamic product category template
│       │   ├── ColourFinderPage.tsx      # 159-shade interactive catalogue
│       │   ├── RoomInspirationPage.tsx   # Room shade lookbook & lighting studio
│       │   ├── SurfaceStudioPage.tsx     # Wall textures & 3D perspective wall studio
│       │   ├── AboutPage.tsx             # Showroom history, gallery, product videos & trust pillars
│       │   ├── ContactPage.tsx           # WhatsApp enquiry form and showroom map directions
│       │   ├── NotFound.tsx              # Luxury dark 404 handler
│       │   ├── Privacy.tsx               # Privacy policy
│       │   └── Terms.tsx                 # Terms & conditions
│       ├── App.tsx                       # Wouter router registering all 17 canonical routes
│       └── index.css                     # Design tokens, typography & animations
├── server/                               # Express media, health, and static site support
│   ├── _core/
│   │   ├── env.ts                        # Zod environment schema & fail-fast validator
│   │   ├── index.ts                      # Server bootstrap & HTTP security headers
│   │   ├── rateLimiter.ts                # Route & asset rate limiting
│   │   ├── storageProxy.ts               # Local media & storage streaming proxy
│   └── seo.test.ts                       # Vitest SEO foundation test suite
├── shared/                               # Cross-stack TypeScript data models
│   ├── seoKeywordMap.ts                  # Central keyword & metadata mapping
│   ├── verifiedBirlaOpusShades.ts        # 159 verified shades (codes, families, hexes)
│   ├── birlaOpusCatalogue.ts             # Official Birla Opus paint formulations
│   └── businessProfile.ts                # NAP source of truth & showroom coordinates
├── docs/                                 # Technical & deployment documentation
│   ├── render-deployment.md              # Note about the retired Render environment setup
│   └── visual-system-migration.md        # UI design token & visual architecture guide
├── scripts/                              # Verification, prerender, & build automation scripts
├── package.json                          # Dependencies & scripts
├── pnpm-lock.yaml                        # Locked dependency graph
├── tsconfig.json                         # Strict TypeScript configuration
├── vite.config.ts                        # Vite bundler, chunk splitting & alias configuration
└── vitest.config.ts                      # Vitest test runner configuration
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Node.js**: `v22.x` or higher
- **pnpm**: `v10.x` (`corepack enable && corepack prepare pnpm@latest --activate`)

### 2. Clone the repository
```bash
git clone https://github.com/yushy07/client2.git
cd client2
```

### 3. Install dependencies
```bash
pnpm install
```

### 4. Configure local environment
Copy the template environment file:
```bash
cp .env.example .env
```
No database or OAuth setup is needed for the public site. Customer details stay in page memory until the customer chooses to open WhatsApp; only non-personal cart selections may persist in browser storage.

### 5. Start development server
```bash
pnpm dev
```
Open [http://localhost:3000/](http://localhost:3000/) in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Starts the Express/Vite development server with hot module replacement (port `3000` by default; uses the next available port if busy). |
| `pnpm check` | Runs strict TypeScript typecheck (`tsc --noEmit`) with zero emit. |
| `pnpm test` | Executes the complete Vitest test suite (SEO, APIs, calculations, components). |
| `pnpm build` | Compiles frontend bundle, runs bundle budget checks, executes prerender scripts, and bundles the server. |
| `pnpm start` | Boots the compiled production Node/Express server (`dist/index.js`). |
| `pnpm verify:budget` | Enforces bundle size limits to prevent performance regressions. |
| `pnpm verify:prerender` | Verifies SSR pre-rendered HTML snapshot integrity for all 17 canonical routes. |
| `pnpm report:media` | Generates a media inventory report auditing public image/video assets, including showroom and product showcase media. |
| `pnpm deploy` | Legacy Render deploy hook; not used for the current Vercel deployment. |
| `pnpm format` | Formats all code using Prettier. |

---

## ⚙️ Production Configuration

The public site does not require DATABASE_URL, JWT_SECRET, OAUTH_SERVER_URL, or VITE_APP_ID. Import the GitHub repository into Vercel with root directory ./ and the Express preset. The Vite mismatch warning is expected: Vite builds the frontend, while Express handles media paths and health checks. No customer database or administrator login is part of this launch.

Local environment examples are in [.env.example](.env.example). The older Render guide at [docs/render-deployment.md](docs/render-deployment.md) describes the previous full-stack configuration and should not be used for this deployment.

---

## 📄 License & Security
- **License**: Licensed under the [MIT License](LICENSE).
- **Security Policy**: For vulnerability disclosures, please review [SECURITY.md](SECURITY.md).
