import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./db", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./db")>();
  return {
    ...actual,
    createShopReview: vi.fn(),
    listPublishedShopReviews: vi.fn(),
    createServiceEnquiry: vi.fn(),
  };
});

import { createShopReview, isShopReviewPublished, listPublishedShopReviews } from "./db";
import { appRouter, shopReviewInput } from "./routers";

const publishedReview = {
  id: 3,
  displayName: "Rohan Das",
  rating: 5,
  reviewText: "Helpful colour guidance and a smooth in-store buying experience.",
  createdAt: new Date("2026-08-13T00:00:00Z"),
};

describe("shop reviews", () => {
  beforeEach(() => vi.resetAllMocks());

  it("accepts only valid review content and star ratings", () => {
    const valid = shopReviewInput.safeParse({
      displayName: "Rohan Das",
      rating: 5,
      reviewText: "Helpful colour guidance and a smooth in-store buying experience.",
    });
    expect(valid.success).toBe(true);
    expect(shopReviewInput.safeParse({ ...valid.data, rating: 6 }).success).toBe(false);
    expect(shopReviewInput.safeParse({ ...valid.data, reviewText: "Too short" }).success).toBe(false);
  });

  it("classifies ratings of 3–5 as published and ratings below 3 as private", () => {
    expect(isShopReviewPublished(3)).toBe(true);
    expect(isShopReviewPublished(5)).toBe(true);
    expect(isShopReviewPublished(2)).toBe(false);
    expect(isShopReviewPublished(1)).toBe(false);
  });

  it("returns the automatic publication outcome to the submitted review", async () => {
    vi.mocked(createShopReview).mockResolvedValue({ id: 18, published: true });
    const caller = appRouter.createCaller({} as never);
    const input = { displayName: "Rohan Das", rating: 5, reviewText: "Helpful colour guidance and a smooth in-store buying experience." };

    await expect(caller.shopReviews.create(input)).resolves.toEqual({ success: true, reviewId: 18, published: true });
    expect(createShopReview).toHaveBeenCalledWith(input);

    vi.mocked(createShopReview).mockResolvedValue({ id: 19, published: false });
    await expect(caller.shopReviews.create({ ...input, rating: 2 })).resolves.toEqual({ success: true, reviewId: 19, published: false });
  });

  it("returns only published reviews through the public listing contract", async () => {
    vi.mocked(listPublishedShopReviews).mockResolvedValue([publishedReview]);
    const caller = appRouter.createCaller({} as never);

    await expect(caller.shopReviews.listPublished()).resolves.toMatchObject({
      reviews: [publishedReview],
      averageRating: 5,
    });
  });

  it("gracefully returns empty list and null rating when listPublishedShopReviews throws", async () => {
    vi.mocked(listPublishedShopReviews).mockRejectedValue(new Error("Database connection timeout"));
    const caller = appRouter.createCaller({} as never);

    await expect(caller.shopReviews.listPublished()).resolves.toEqual({
      reviews: [],
      averageRating: null,
    });
  });

  it("returns an empty list and null average rating when there are zero published reviews", async () => {
    vi.mocked(listPublishedShopReviews).mockResolvedValue([]);
    const caller = appRouter.createCaller({} as never);

    await expect(caller.shopReviews.listPublished()).resolves.toEqual({
      reviews: [],
      averageRating: null,
    });
  });

  it("does not expose manual moderation procedures", () => {
    const caller = appRouter.createCaller({} as never);
    expect(caller.shopReviews).not.toHaveProperty("listPending");
    expect(caller.shopReviews).not.toHaveProperty("moderate");
  });
});
