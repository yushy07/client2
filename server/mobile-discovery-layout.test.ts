import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const homePage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

describe("mobile discovery paths", () => {
  it("provides a labeled, keyboard-reachable horizontal category rail", () => {
    expect(homePage).toContain('className="supplementary-grid" ref={supplementaryRailRef} role="list"');
    expect(homePage).toContain('aria-label="Explore more Birla Opus product categories" tabIndex={0}');
    expect(homePage).toContain('className="supplementary-scroll-cue"');
    expect(homePage).toContain('className="supplementary-rail-controls"');
    expect(homePage).toContain('scrollSupplementaryRail(-1)');
    expect(homePage).toContain('scrollSupplementaryRail(1)');
  });

  it("uses touch scrolling, snap points, and full-width cards before the phone breakpoint", () => {
    expect(stylesheet).toContain('.supplementary-grid { -webkit-overflow-scrolling: touch; display: flex;');
    expect(stylesheet).toContain('overflow-x: auto;');
    expect(stylesheet).toContain('scroll-snap-type: x mandatory;');
    expect(stylesheet).toContain('touch-action: pan-x;');
    expect(stylesheet).toContain('@media (max-width: 1100px)');
    expect(stylesheet).toContain('.supplementary-card { flex: 0 0 100%;');
  });
});
