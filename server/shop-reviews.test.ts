import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./db", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./db")>();
  return {
    ...actual,
    createShopReview: vi.fn(),
    listPublishedShopReviews: vi.fn(),
    createServiceEnquiry: vi.fn(),
    listShopReviewsForModeration: vi.fn(),
    moderateShopReview: vi.fn(),
  };
});

import { createShopReview, listPublishedShopReviews, listShopReviewsForModeration, moderateShopReview } from "./db";
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

  it("returns pending publication for every submitted rating", async () => {
    vi.mocked(createShopReview).mockResolvedValue({ id: 18, published: false });
    const caller = appRouter.createCaller({} as never);
    const input = { displayName: "Rohan Das", rating: 5, reviewText: "Helpful colour guidance and a smooth in-store buying experience." };

    await expect(caller.shopReviews.create(input)).resolves.toEqual({ success: true, reviewId: 18, published: false });
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

  it("does not disguise a public review database outage as an empty valid result", async () => {
    vi.mocked(listPublishedShopReviews).mockRejectedValue(new Error("Database connection timeout"));
    const caller = appRouter.createCaller({} as never);

    await expect(caller.shopReviews.listPublished()).rejects.toMatchObject({ code: "INTERNAL_SERVER_ERROR" });
  });

  it("returns an empty list and null average rating when there are zero published reviews", async () => {
    vi.mocked(listPublishedShopReviews).mockResolvedValue([]);
    const caller = appRouter.createCaller({} as never);

    await expect(caller.shopReviews.listPublished()).resolves.toEqual({
      reviews: [],
      averageRating: null,
    });
  });

  it("allows only admins to list and moderate reviews", async () => {
    const user = { role: "user" } as never;
    await expect(appRouter.createCaller({ user } as never).shopReviews.listForModeration({ page: 1, pageSize: 20 })).rejects.toMatchObject({ code: "FORBIDDEN" });

    vi.mocked(listShopReviewsForModeration).mockResolvedValue({ reviews: [], total: 0, page: 1, pageSize: 20 });
    const admin = appRouter.createCaller({ user: { role: "admin" } } as never);
    await expect(admin.shopReviews.listForModeration({ page: 1, pageSize: 20 })).resolves.toMatchObject({ total: 0 });

    vi.mocked(moderateShopReview).mockResolvedValue({ id: 3, status: "published", published: true });
    await expect(admin.shopReviews.moderate({ reviewId: 3, action: "approve" })).resolves.toMatchObject({ success: true, published: true });
  });
});
