import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const productStoriesComponent = readFileSync(resolve(projectRoot, "client/src/components/ProductStories.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

describe("Product Stories Video Showcase", () => {
  it("includes all 14 product videos with correct metadata and paths", () => {
    expect(productStoriesComponent).toContain('id: "calista-ever-clear"');
    expect(productStoriesComponent).toContain('id: "one-pure-elegance-shine"');
    expect(productStoriesComponent).toContain('id: "calista-neo-star-shine"');
    expect(productStoriesComponent).toContain('id: "style-color-smart"');
    expect(productStoriesComponent).toContain('id: "one-pure-elegance"');
    expect(productStoriesComponent).toContain('id: "calista-ever-wash-matt"');
    expect(productStoriesComponent).toContain('id: "calista-ever-clear-studio"');
    expect(productStoriesComponent).toContain('id: "style-color-fresh"');
    expect(productStoriesComponent).toContain('id: "calista-ever-wash-shine"');
    expect(productStoriesComponent).toContain('id: "style-pro-fresh-primer"');
    expect(productStoriesComponent).toContain('id: "calista-neo-star-facade"');
    expect(productStoriesComponent).toContain('id: "one-pure-elegance-lounge"');
    expect(productStoriesComponent).toContain('id: "one-true-life-exterior"');
    expect(productStoriesComponent).toContain('id: "one-pure-elegance-showroom"');
  });

  it("strictly enforces silent playback at both component and DOM levels", () => {
    expect(productStoriesComponent).toContain("muted");
    expect(productStoriesComponent).toContain("playsInline");
    expect(productStoriesComponent).toContain("video.muted = true");
    expect(productStoriesComponent).toContain("video.volume = 0");
    // Ensure no audio controls or unmute toggles
    expect(productStoriesComponent).not.toContain("unmute");
    expect(productStoriesComponent).not.toContain("Volume2");
    expect(productStoriesComponent).not.toContain("VolumeX");
  });

  it("removes redundant top status pill and bottom helper label", () => {
    expect(productStoriesComponent).not.toContain("product-stories-status-indicator");
    expect(productStoriesComponent).not.toContain("Continuous Reel");
    expect(productStoriesComponent).not.toContain("product-stories-footer-label");
    expect(productStoriesComponent).not.toContain("Continuous Birla Opus Formulations Showcase");
    expect(productStoriesComponent).not.toContain("product-stories-indicator-dot");
  });

  it("preserves View Master Catalogue and Consult CTAs with infinite scrollbar", () => {
    expect(productStoriesComponent).toContain("View master catalogue");
    expect(productStoriesComponent).toContain("Consult on master finishes");
    expect(productStoriesComponent).toContain("product-stories-scrollbar-track");
    expect(productStoriesComponent).toContain("product-stories-scrollbar-thumb");
  });

  it("supports click-to-center focusing on all cards", () => {
    expect(productStoriesComponent).toContain("onFocusCard");
    expect(productStoriesComponent).toContain("centerCard");
    expect(productStoriesComponent).toContain("calculateCenterShiftSteps");
    expect(productStoriesComponent).toContain("is-centered");
    expect(stylesheet).toContain(".product-story-card.is-centered");
  });
});
