import { COOKIE_NAME } from "../shared/const";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createServiceEnquiry, createShopReview, listPublishedShopReviews, listShopReviewsForModeration, moderateShopReview } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";

const temporarilyUnavailable = () => new TRPCError({
  code: "INTERNAL_SERVER_ERROR",
  message: "This service is temporarily unavailable. Please try again.",
});

export const serviceEnquiryInput = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  phone: z.string().trim().regex(/^[0-9+()\-\s]{7,30}$/, "Please enter a valid phone number."),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  serviceType: z.string().trim().min(2, "Please select a service.").max(120),
  pincode: z.string().trim().regex(/^\d{6}$/, "Enter a valid 6-digit pincode."),
});

export const shopReviewInput = z.object({
  displayName: z.string().trim().min(2, "Please enter your name.").max(80),
  rating: z.number().int().min(1, "Choose a rating from 1 to 5.").max(5, "Choose a rating from 1 to 5."),
  reviewText: z.string().trim().min(20, "Please share at least 20 characters of feedback.").max(800),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  enquiries: router({
    create: publicProcedure.input(serviceEnquiryInput).mutation(async ({ input }) => {
      try {
        const saved = await createServiceEnquiry(input);
        return { success: true, enquiryId: saved.id } as const;
      } catch {
        throw temporarilyUnavailable();
      }
    }),
  }),
  shopReviews: router({
    listPublished: publicProcedure.query(async () => {
      try {
        const reviews = await listPublishedShopReviews();
        const averageRating = reviews.length === 0 ? null : reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
        return { reviews, averageRating };
      } catch (error) {
        if (process.env.DATABASE_URL) {
          console.error("[shopReviews.listPublished Error]:", error);
        }
        throw temporarilyUnavailable();
      }
    }),
    create: publicProcedure.input(shopReviewInput).mutation(async ({ input }) => {
      try {
        const saved = await createShopReview(input);
        return { success: true, reviewId: saved.id, published: false } as const;
      } catch {
        throw temporarilyUnavailable();
      }
    }),
    listForModeration: adminProcedure
      .input(z.object({ page: z.number().int().min(1).max(10_000).default(1), pageSize: z.number().int().min(1).max(50).default(20) }))
      .query(async ({ input }) => {
        try {
          return await listShopReviewsForModeration(input.page, input.pageSize);
        } catch {
          throw temporarilyUnavailable();
        }
      }),
    moderate: adminProcedure
      .input(z.object({ reviewId: z.number().int().positive(), action: z.enum(["approve", "hide"]) }))
      .mutation(async ({ input }) => {
        try {
          const result = await moderateShopReview(input.reviewId, input.action);
          if (!result) throw new TRPCError({ code: "NOT_FOUND", message: "Review not found." });
          return { success: true, ...result } as const;
        } catch (error) {
          if (error instanceof TRPCError) throw error;
          throw temporarilyUnavailable();
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
