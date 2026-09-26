import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const productStoriesComponent = readFileSync(
  resolve(projectRoot, "client/src/components/ProductStories.tsx"),
  "utf8"
);
const videoDir = resolve(projectRoot, "client/public/storage/product-videos");
const posterDir = resolve(videoDir, "posters");

const expectedVideos = [
  "calista-ever-clear.mp4",
  "one-pure-elegance-shine.mp4",
  "calista-neo-star-shine.mp4",
  "style-color-smart.mp4",
  "one-pure-elegance.mp4",
  "calista-ever-wash-matt.mp4",
  "calista-ever-clear-studio.mp4",
  "style-color-fresh.mp4",
  "calista-ever-wash-shine.mp4",
  "style-pro-fresh-primer.mp4",
  "calista-neo-star-facade.mp4",
  "one-pure-elegance-lounge.mp4",
  "one-true-life-exterior.mp4",
  "one-pure-elegance-showroom.mp4",
];

describe("Product Video Performance & Strategy (Phase B)", () => {
  it("verifies all 14 product video and poster assets exist with valid non-zero payloads", () => {
    let totalBytes = 0;
    for (const file of expectedVideos) {
      const videoPath = resolve(videoDir, file);
      const posterPath = resolve(posterDir, file.replace(".mp4", ".jpg"));

      expect(existsSync(videoPath), `Missing video file: ${file}`).toBe(true);
      expect(existsSync(posterPath), `Missing poster file for: ${file}`).toBe(true);

      const vStat = statSync(videoPath);
      const pStat = statSync(posterPath);

      expect(vStat.size).toBeGreaterThan(100 * 1024);
      expect(pStat.size).toBeGreaterThan(5 * 1024);

      totalBytes += vStat.size;
    }

    // Total library size must be under 25 MB
    const totalMB = totalBytes / (1024 * 1024);
    expect(totalMB).toBeLessThan(25);
  });

  it("verifies faststart streaming optimization on heavy product videos", () => {
    // Check that moov atom appears before mdat atom in optimized files
    const heavyFiles = [
      "calista-neo-star-facade.mp4",
      "one-true-life-exterior.mp4",
      "style-pro-fresh-primer.mp4",
      "one-pure-elegance-showroom.mp4",
      "one-pure-elegance-lounge.mp4",
    ];

    for (const file of heavyFiles) {
      const buffer = readFileSync(resolve(videoDir, file));
      const moovIndex = buffer.indexOf(Buffer.from("moov"));
      const mdatIndex = buffer.indexOf(Buffer.from("mdat"));

      expect(moovIndex).toBeGreaterThan(-1);
      expect(mdatIndex).toBeGreaterThan(-1);
      expect(moovIndex, `${file} moov atom must precede mdat atom for faststart`).toBeLessThan(mdatIndex);
    }
  });

  it("enforces section-level viewport gating and active+next video loading strategy in component", () => {
    // Section-level intersection observer
    expect(productStoriesComponent).toContain("isSectionInView");
    expect(productStoriesComponent).toContain("rootMargin");
    expect(productStoriesComponent).toContain("ref={sectionRef}");

    // Active + Next loading priority
    expect(productStoriesComponent).toContain("isNext");
    expect(productStoriesComponent).toContain("shouldAttachSrc = isSectionInView && (isCentered || isNext)");
    expect(productStoriesComponent).toContain('preloadStrategy');
    expect(productStoriesComponent).toContain('preload={preloadStrategy}');
    expect(productStoriesComponent).toContain("src={shouldAttachSrc ? story.src : undefined}");

    // Strict silence enforcement
    expect(productStoriesComponent).toContain("video.muted = true");
    expect(productStoriesComponent).toContain("video.volume = 0");
    expect(productStoriesComponent).toContain("muted");
    expect(productStoriesComponent).toContain("playsInline");
  });
});
