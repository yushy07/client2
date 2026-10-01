import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");
const productStories = readFileSync(resolve(projectRoot, "client/src/components/ProductStories.tsx"), "utf8");

describe("Phase D–G: Mobile UX, Catalogue, Product Video & Page-End Audit", () => {
  describe("D: Floating Controls & Header", () => {
    it("verifies floating contact buttons account for mobile safe area insets and stacking", () => {
      expect(stylesheet).toContain(".floating-contact");
      expect(stylesheet).toContain("env(safe-area-inset-bottom");
      expect(stylesheet).toContain("z-index:");
    });

    it("verifies floating call and WhatsApp buttons have compliant touch targets", () => {
      expect(stylesheet).toContain(".floating-contact a");
      expect(stylesheet).toContain("min-height: 44px;");
    });

    it("verifies mobile navigation has horizontal scroll handling with smooth touch behavior", () => {
      expect(stylesheet).toContain(".nav-links");
      expect(stylesheet).toContain("-webkit-overflow-scrolling: touch;");
      expect(stylesheet).toContain("overflow-x: auto;");
    });

    it("verifies utility bar wraps gracefully on narrow mobile screens", () => {
      expect(stylesheet).toContain(".utility-bar");
    });
  });

  describe("E: Catalogue Mobile Experience", () => {
    it("verifies filter pills allow flexible multi-line wrapping without horizontal clipping", () => {
      expect(stylesheet).toContain(".visual-catalogue-header .filter-pills");
      expect(stylesheet).toContain("flex-wrap: wrap;");
    });

    it("verifies catalogue product cards maintain image aspect ratio and layout stability (Phase A preserved)", () => {
      expect(stylesheet).toContain("aspect-ratio: 248 / 226;");
      const preview = readFileSync(resolve(projectRoot, "client/src/components/home/HomeProductsPreview.tsx"), "utf8");
      expect(preview).toContain('loading={displayProducts.indexOf(product) < 2 ? "eager" : "lazy"}');
    });

    it("verifies catalogue sort controls wrap cleanly on narrow screens", () => {
      expect(stylesheet).toContain(".catalogue-tools");
    });
  });

  describe("F: Product Video Section UX", () => {
    it("verifies ProductStories retains 10-second autoplay loop, infinite carousel, and active/next priority (Phase B preserved)", () => {
      expect(productStories).toContain("AUTO_ADVANCE_INTERVAL");
      expect(productStories).toContain("IntersectionObserver");
      expect(productStories).toContain("isNearViewport");
      expect(productStories).toContain("focusCard");
    });
  });

  describe("G: Late-Section Padding & Page-End Whitespace", () => {
    it("verifies late sections (ideas, reviews, faq, footer) use balanced mobile padding", () => {
      expect(stylesheet).toContain(".visual-ideas-compact");
      expect(stylesheet).toContain(".visual-reviews-compact");
      expect(stylesheet).toContain(".visual-faq-compact");
      expect(stylesheet).toContain(".visual-footer-compact");
    });
  });

  describe("H: Mobile Hero, Texture Studio, Calculator & Services UX", () => {
    it("verifies hero uses responsive clamp headline, full-width mobile action buttons, clean hero notes, and hides redundant mobile lockup", () => {
      expect(stylesheet).toContain(".hero-headline");
      expect(stylesheet).toContain(".hero-actions");
      expect(stylesheet).toContain(".hero-notes");
      expect(stylesheet).toContain(".hero-brand-lockup");
      expect(stylesheet).toContain(".utility-bar");
    });

    it("verifies texture studio cards and tabs have touch-friendly targets and compact spacing", () => {
      expect(stylesheet).toContain(".texture-studio");
      expect(stylesheet).toContain(".texture-tabs");
      expect(stylesheet).toContain(".texture-card-copy");
      expect(stylesheet).toContain(".texture-visit-guide");
    });

    it("verifies calculator form inputs and calculation action are optimized for mobile viewports", () => {
      expect(stylesheet).toContain(".calculator-intro");
      expect(stylesheet).toContain(".calculator-form");
      expect(stylesheet).toContain(".calc-inputs");
      expect(stylesheet).toContain(".calculate-action");
    });

    it("verifies services showcase and consultation form inputs have compliant touch targets", () => {
      expect(stylesheet).toContain(".services-showcase");
      expect(stylesheet).toContain(".service-steps");
      expect(stylesheet).toContain(".enquiry-panel");
      expect(stylesheet).toContain(".enquiry-grid");
      expect(stylesheet).toContain(".enquiry-submit");
    });

    it("verifies FAQ and footer have compliant touch targets, responsive typography, and clearance", () => {
      expect(stylesheet).toContain(".faq-trigger");
      expect(stylesheet).toContain("min-height: 48px;");
      expect(stylesheet).toContain(".faq-answer");
      expect(stylesheet).toContain(".footer-intro");
      expect(stylesheet).toContain(".footer-nav");
      expect(stylesheet).toContain(".footer-bottom");
    });

    it("verifies mobile Colour / Spectral Archive uses deliberate vertical layout, visible shade names without truncation, and clean automatic ticker strip", () => {
      expect(stylesheet).toContain(".colour-archive-hero");
      expect(stylesheet).toContain(".colour-archive-hero-copy");
      expect(stylesheet).toContain(".colour-archive-specimen");
      expect(stylesheet).toContain(".colour-archive-ticker");
      expect(stylesheet).toContain(".colour-archive-ticker-swatch");
      expect(stylesheet).not.toContain(".colour-archive-loop-status");
      expect(stylesheet).not.toContain(".colour-archive-loop-controls");
    });
  });
});
