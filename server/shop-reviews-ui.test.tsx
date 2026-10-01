import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { HomeReviewsSection } from "@/components/reviews/HomeReviewsSection";

const projectRoot = resolve(import.meta.dirname, "..");
const homePage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");
const businessProfileCode = readFileSync(
  resolve(projectRoot, "shared/businessProfile.ts"),
  "utf8",
);

const GOOGLE_PROFILE_URL = "https://share.google/Nyju9PoRuINGGoD83";

const publishedReview = {
  id: 7,
  displayName: "Rohan Das",
  rating: 4,
  reviewText: "Straightforward shade matching and honest guidance on primer coats.",
  createdAt: new Date("2026-08-13T00:00:00Z"),
};

function renderSection(
  overrides: Partial<Parameters<typeof HomeReviewsSection>[0]> = {},
): string {
  return renderToStaticMarkup(
    <HomeReviewsSection
      reviews={[]}
      averageRating={null}
      onSubmit={vi.fn()}
      googleBusinessProfileUrl={GOOGLE_PROFILE_URL}
      {...overrides}
    />,
  );
}

describe("automatic shop reviews UI and Google profile integration", () => {
  it("links to the official Google Business Profile from the section", () => {
    const html = renderSection();

    expect(html).toContain("https://share.google/");
    expect(businessProfileCode).toContain("https://share.google/");
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain("Review us on Google");
    expect(html).toContain("Google Business Profile");
  });

  it("keeps website reviews independent with clear source attribution", () => {
    const html = renderSection({ reviews: [publishedReview], averageRating: 4 });

    expect(html).toContain("review-source-tag");
    expect(html).toContain("Website review");
    expect(html).toContain("Showroom testimonial");
    expect(html).toContain("Rohan Das");
    expect(html).toContain(publishedReview.reviewText);
    expect(stylesheet).toMatch(/\.shop-reviews\s*\{[\s\S]*?background:/);
    expect(stylesheet).toContain(".review-source-tag");
  });

  it("reports the rating computed from published reviews instead of a fixed value", () => {
    const html = renderSection({
      reviews: [
        publishedReview,
        { ...publishedReview, id: 8, displayName: "Meera Joshi", rating: 2 },
      ],
      averageRating: 3,
    });

    expect(html).toContain(">3.0<");
    expect(html).toContain("Based on 2 published reviews");
    // The previous implementation hardcoded a 5.0 average and a "100% Verified"
    // claim that no review data could ever change.
    expect(html).not.toContain("100% Verified Customer Reviews");
  });

  it("shows an honest empty state when nothing has been published", () => {
    const html = renderSection({ reviews: [], averageRating: null, isLoading: false });

    expect(html).toContain("No published website reviews yet.");
    expect(html).toContain("review-empty");
    expect(html).not.toContain("100% Verified Customer Reviews");
  });

  it("offers a review form and never exposes the moderation workflow", () => {
    const html = renderSection();

    expect(html).toContain("review-form");
    expect(html).toContain("Submit review");
    expect(html).toContain('class="review-rating"');
    expect(html).not.toContain("Submit for approval");
    expect(html).not.toContain("Pending review approval");
    expect(html).not.toContain("user?.role");
  });

  it("wires the section to the review query and submission mutation", () => {
    expect(homePage).toContain("<HomeReviewsSection");
    expect(homePage).toContain("trpc.shopReviews.listPublished.useQuery");
    expect(homePage).toContain("trpc.shopReviews.create.useMutation");
    // The published reviews returned by the query must actually reach the
    // section: rendering a hardcoded fixture instead is the bug this guards.
    expect(homePage).toContain("reviews={publishedReviewsQuery.data");
    expect(homePage).toContain("averageRating={publishedReviewsQuery.data");
    expect(homePage).not.toContain("CUSTOMER_REVIEWS");
  });
});
