import { describe, expect, it } from "vitest";
import path from "node:path";
import { resolveContainedPath, safeDecodeUriComponent } from "./_core/safePath";

describe("storage path containment", () => {
  const base = path.resolve("client/public/storage");

  it("accepts nested files beneath the storage root", () => {
    expect(resolveContainedPath(base, "storefront/shopwide.jpeg")).toBe(path.join(base, "storefront", "shopwide.jpeg"));
  });

  it.each(["../index.html", "../../.env", "..\\..\\package.json", "/absolute/file"])("rejects escaping path %s", input => {
    expect(resolveContainedPath(base, input)).toBeNull();
  });

  it("handles malformed URI input without throwing", () => {
    expect(safeDecodeUriComponent("%E0%A4%A")).toBeNull();
  });
});
