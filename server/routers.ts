import { COOKIE_NAME } from "../shared/const";
import { z } from "zod";
import { createServiceEnquiry, createShopReview, listPublishedShopReviews } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

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
      const saved = await createServiceEnquiry(input);
      return { success: true, enquiryId: saved.id } as const;
    }),
  }),
  shopReviews: router({
    listPublished: publicProcedure.query(async () => {
      try {
        const reviews = await listPublishedShopReviews();
        const averageRating = reviews.length === 0 ? null : reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
        return { reviews, averageRating };
      } catch (error) {
        console.error("[shopReviews.listPublished Error]:", error);
        return { reviews: [], averageRating: null };
      }
    }),
    create: publicProcedure.input(shopReviewInput).mutation(async ({ input }) => {
      const saved = await createShopReview(input);
      return { success: true, reviewId: saved.id, published: saved.published } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
