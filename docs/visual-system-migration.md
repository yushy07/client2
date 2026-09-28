# Jaymurti Traders — Visual System Migration Document
**Phase 0 → Phase 3 Implementation Baseline**
*Date: 2026-09-27*

---

## 1. Previous Palette Families (Legacy / Baseline)

Prior to this migration, the codebase contained four uncoordinated color systems:

1. **Original Part 1 Token Palette**:
   - `--ink`: `#201A14`
   - `--paper`: `#FBF3E7`
   - `--saffron`: `#F2A93B`
   - `--moss`: `#1F3B5C` (and `--moss-dark`: `#14283F`)
   - `--coral`: `#C1502E`
   - `--lavender`: `#7A4B6D`

2. **Hard-coded Dark Gradient & Shadow Family**:
   - Literal near-blacks: `#161716`, `#0e0f0e`, `#121413`
   - Tinted green/plum dark backgrounds: `#1c2722`, `#213b32`, `#2a2233`, `#1e1b24`
   - Shadows and borders hardcoded with `rgba(22, 23, 22, ...)`

3. **Visual Refinement Layer**:
   - Coral-pinks and accents: `#d96f62`, `#b7574c`, `#ea8b94`, `#f3dddd`
   - Yellow glow & ticker highlights: `#f5cb38`, `#f1c641`, `#f4d270`
   - Warm neutrals: `#f2eee8`, `#fffaf7`, `#fffdfb`, `#ded3cc`

4. **Part 2 Experience Showroom System**:
   - Decoupled espresso ramp: `#0F0E0C`, `#141210`, `#12100E`, `#151310`, `#181512`, `#1F1C18`...
   - Burnt orange accent: `#E08855` (hover `#C97240`)
   - Independent ProductWorlds accents: Green (`#5BB381`, `#2D6649`) and Amber (`#D48248`, `#A85828`)
   - 100% Tailwind arbitrary classes (`bg-[#...]`, `text-[#...]`) with 0 token references

---

## 2. New Canonical Palette (Contemporary Architectural Paint-Studio)

- **Primary Brand / CTAs**: Deep Teal `#123F46` (hover `#0C292F`)
- **Secondary Brand / Secondary Actions**: Petrol Blue `#176B73` (hover `#123F46`)
- **Accent / Micro-Highlights / Active Indicators**: Butter Yellow `#F3D36B` (hover `#E4C45A`)
- **Editorial Highlight (Rare)**: Soft Coral `#E98B78`
- **Main Background**: Porcelain `#F7F6F1`
- **Secondary Surfaces (Cards, Panels, Forms)**: Mist `#E7ECEA`
- **Strong Surface**: `#DCE5E2`
- **Primary Text**: Charcoal `#182426`
- **Secondary Text**: `#526266`
- **Muted Text**: `#68777A`
- **Dark Background**: Midnight Teal `#0C292F`
- **Dark Surface**: Deep Teal `#123F46`
- **Dark Text**: Porcelain `#F7F6F1`
- **Dark Muted**: `#B9C8C8`
- **Light Border**: `#CBD7D4`
- **Dark Border**: `rgba(247, 246, 241, 0.18)`
- **Focus Indicator**: Butter Yellow `#F3D36B` (with Charcoal text on yellow buttons)
- **Status Semantics**:
  - Success: `#288153`
  - Warning: `#D9822B`
  - Error: `#C93B2B`
  - Info: Petrol Blue `#176B73`

---

## 3. Semantic Token Architecture

All colors are exposed through both CSS Custom Properties in `:root` and mirrored in the Tailwind `@theme` configuration:

```css
:root {
  /* Canonical Backgrounds & Surfaces */
  --color-bg: #F7F6F1;
  --color-bg-soft: #E7ECEA;
  --color-surface: #E7ECEA;
  --color-surface-strong: #DCE5E2;
  --color-surface-elevated: #FFFFFF;
  --color-dark: #0C292F;
  --color-dark-surface: #123F46;

  /* Brand Hierarchy */
  --color-brand-primary: #123F46;
  --color-brand-primary-hover: #0C292F;
  --color-brand-secondary: #176B73;
  --color-brand-secondary-hover: #123F46;

  /* Accents */
  --color-accent: #F3D36B;
  --color-accent-hover: #E4C45A;
  --color-highlight: #E98B78;

  /* Typography / Text Roles */
  --color-text-primary: #182426;
  --color-text-secondary: #526266;
  --color-text-muted: #68777A;
  --color-text-on-dark: #F7F6F1;
  --color-text-on-dark-muted: #B9C8C8;
  --color-text-on-accent: #182426;

  /* Borders */
  --color-border: #CBD7D4;
  --color-border-dark: rgba(247, 246, 241, 0.18);

  /* Actions */
  --color-action-primary: #123F46;
  --color-action-primary-hover: #0C292F;
  --color-action-secondary: #176B73;
  --color-action-secondary-hover: #123F46;

  /* Focus & Functional Status */
  --color-focus: #F3D36B;
  --color-success: #288153;
  --color-warning: #D9822B;
  --color-error: #C93B2B;
  --color-info: #176B73;
  --color-overlay: rgba(12, 41, 47, 0.72);
}
```

Legacy CSS variable aliases (`--ink`, `--paper`, `--saffron`, `--moss`, `--coral`, etc.) are mapped directly to the corresponding semantic tokens to preserve layout mechanics while repainting 100% of token-dependent components.

---

## 4. Typography Unification

Tailwind v4's `@theme` block is established in `client/src/index.css`:
- `--font-serif: "Playfair Display", Georgia, serif;`
- `--font-sans: "DM Sans", Arial, sans-serif;`
- `--font-mono: "DM Mono", monospace;`
- `--font-brand: "Bebas Neue", sans-serif;`

This ensures that Part 2 components using `font-serif`, `font-sans`, and `font-mono` utilities directly inherit the authentic loaded Google Fonts rather than generic system fallbacks.

---

## 5. Components Migrated

### Part 1 (Core Editorial Journey in `index.css` & `Home.tsx`):
- **Global Shell & Body**: Porcelain background `#F7F6F1`, Charcoal body text `#182426`.
- **Navigation & Mobile Drawer**: Midnight Teal chrome, Deep Teal buttons, Butter Yellow active markers.
- **Hero Section**: Midnight Teal depth gradient, Deep Teal primary CTA with Porcelain text, Butter Yellow micro-labels.
- **Discovery Index**: Deep Teal surface, Porcelain typography, Butter Yellow numbers and hover indicators.
- **Colour Archive & Visual Glows**: Recolored from multi-colored rainbow/plum to Midnight Teal with Deep Teal / Petrol Blue / Butter Yellow aurora glow.
- **Product Catalogue**: Porcelain background, Mist card containers, Butter Yellow active category pills, Deep Teal action buttons.
- **Surface Studio & Services**: Dark Midnight Teal / Deep Teal background gradients (replacing green/plum tints), Deep Teal cards with hairline borders.
- **Estimator & Enquiry**: Mist surfaces, Deep Teal headers, Butter Yellow metric accents.
- **Footer**: Midnight Teal `#0C292F` with Porcelain links and Butter Yellow accents.

### Part 2 (Digital Showroom Experiences):
- `ColourCapsule.tsx`: Midnight Teal / Deep Teal showroom framing, Butter Yellow highlights.
- `RoomShadeStudio.tsx`: Migrated espresso to Midnight Teal / Deep Teal, Butter Yellow / Petrol Blue interactive controls.
- `RoomLibrary.tsx`: Unified search and filters using Mist, Petrol Blue, and Deep Teal.
- `WallpaperGallery.tsx`: Midnight Teal immersive backdrop, Petrol Blue action buttons.
- `ExtendedTextures.tsx`: Deep Teal card framing, Butter Yellow texture tags.
- `ProductWorlds.tsx`: Harmonized Interior (Deep Teal), Exterior (Petrol Blue + Butter Yellow), and Wood (Restrained Soft Coral / Butter Yellow).
- `InsideJaymurti.tsx` & `StepInside.tsx`: Reconciled showroom cards and story modals into the canonical design system.

---

## 6. Intentional Functional Exceptions

The following items are intentionally preserved and exempt from palette recoloring:
1. **WhatsApp Brand Identity**: `#25d366` / `#2ee06e` across floating contact pills, sticky bars, and CTA icons.
2. **Instagram Brand Gradient**: Radial/linear Instagram gradient used specifically on Instagram social link buttons.
3. **Birla Opus & Shop Imagery**: Zero image modification (no tinting, hue-shifting, desaturating, or pixel filtering).
4. **Data-Driven Paint Shades / Swatches**: Actual RGB/hex shade values in catalogues, capsule swatches, and room palettes represent authentic paint pigment formulations.

---

## 7. Phase 3.1 — Full Theme Centralization Status

- **Tailwind Utility Centralization**: Expanded the Tailwind `@theme` block in `client/src/index.css` to define utility classes (`bg-dark`, `bg-dark-surface`, `bg-brand-primary`, `bg-brand-secondary`, `bg-accent`, `text-on-dark`, `text-on-dark-muted`, `text-surface`, `text-accent`, `text-highlight`, `border-border-teal`, `border-accent`, etc.).
- **Part 2 Component Audit**: Replaced all 240 arbitrary color classes (`bg-[#...]`, `text-[#...]`, `border-[#...]`, `shadow-[#...]`) across all 8 experience components with the canonical utility tokens.
- **Remaining Theme Literals in Components**: Exactly **0**.
- **Single Source of Truth**: All palette definitions are concentrated strictly in `client/src/index.css` under `@theme` and `:root`. Future theme tweaks require modifying only this single file.

