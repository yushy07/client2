import { desc, eq, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import {
  InsertServiceEnquiry,
  InsertShopReview,
  InsertUser,
  serviceEnquiries,
  shopReviews,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;
let _pool: mysql.Pool | null = null;

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(`${label} timed out after ${timeoutMs}ms`)), timeoutMs);
    promise.then(
      (value) => {
        clearTimeout(timeout);
        resolve(value);
      },
      (error) => {
        clearTimeout(timeout);
        reject(error);
      },
    );
  });
}

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _pool = mysql.createPool({
        uri: process.env.DATABASE_URL,
        connectionLimit: 2,
        connectTimeout: 2500,
        waitForConnections: false,
      });
      _db = drizzle(_pool);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      try {
        _pool?.end();
      } catch {
        // Ignore cleanup errors while falling back to memory storage.
      }
      _pool = null;
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;

  for (const field of textFields) {
    if (user[field] !== undefined) {
      const value = user[field] ?? null;
      values[field] = value;
      updateSet[field] = value;
    }
  }

  values.lastSignedIn = user.lastSignedIn ?? new Date();
  updateSet.lastSignedIn = values.lastSignedIn;
  values.role = user.role ?? (user.openId === ENV.ownerOpenId ? "admin" : "user");
  updateSet.role = values.role;

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

const memoryReviews: PublicShopReview[] = [];
let nextMemoryReviewId = 1000;

export async function createServiceEnquiry(enquiry: InsertServiceEnquiry) {
  try {
    const db = await getDb();
    if (db) {
      const result = await db.insert(serviceEnquiries).values(enquiry);
      return { id: Number(result[0].insertId) };
    }
  } catch (error) {
    console.warn("[Database] Failed to insert enquiry into database:", error);
  }
  return { id: Date.now() };
}

export type PublicShopReview = {
  id: number;
  displayName: string;
  rating: number;
  reviewText: string;
  createdAt: Date;
};

export function isShopReviewPublished(rating: number) {
  return rating >= 3;
}

function safeTimestamp(date: Date | string | number | unknown): number {
  if (date instanceof Date) {
    const time = date.getTime();
    return Number.isNaN(time) ? 0 : time;
  }
  if (typeof date === "string" || typeof date === "number") {
    const parsed = new Date(date).getTime();
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

function normalizeReview(review: {
  id: number;
  displayName: string;
  rating: number;
  reviewText: string;
  createdAt: Date | string | number;
}): PublicShopReview {
  const createdDate = review.createdAt instanceof Date
    ? review.createdAt
    : new Date(review.createdAt || Date.now());
  return {
    id: review.id,
    displayName: review.displayName,
    rating: review.rating,
    reviewText: review.reviewText,
    createdAt: Number.isNaN(createdDate.getTime()) ? new Date() : createdDate,
  };
}

export async function createShopReview(review: Pick<InsertShopReview, "displayName" | "rating" | "reviewText">) {
  const published = isShopReviewPublished(review.rating);
  let id = nextMemoryReviewId++;

  try {
    const db = await getDb();
    if (db) {
      const result = await db.insert(shopReviews).values({ ...review, status: published ? "published" : "private" });
      id = Number(result[0].insertId);
    } else {
      console.warn("[Database] Database unavailable, persisting review to memory store");
    }
  } catch (error) {
    console.warn("[Database] Failed to insert review into database, falling back to memory store:", error);
  }

  if (published) {
    memoryReviews.push({
      id,
      displayName: review.displayName,
      rating: review.rating,
      reviewText: review.reviewText,
      createdAt: new Date(),
    });
  }

  return { id, published };
}

export async function listPublishedShopReviews(): Promise<PublicShopReview[]> {
  try {
    const db = await getDb();
    if (!db) {
      return [...memoryReviews]
        .map(normalizeReview)
        .sort((a, b) => safeTimestamp(b.createdAt) - safeTimestamp(a.createdAt));
    }

    const rawDbReviews = await withTimeout(
      db
        .select({
          id: shopReviews.id,
          displayName: shopReviews.displayName,
          rating: shopReviews.rating,
          reviewText: shopReviews.reviewText,
          createdAt: shopReviews.createdAt,
        })
        .from(shopReviews)
        .where(or(eq(shopReviews.status, "published"), eq(shopReviews.status, "approved" as any)))
        .orderBy(desc(shopReviews.createdAt)),
      3500,
      "Published reviews query",
    );

    const dbReviews = rawDbReviews.map(normalizeReview);
    const dbIds = new Set(dbReviews.map((r) => r.id));
    const uniqueMemory = memoryReviews.filter((r) => !dbIds.has(r.id)).map(normalizeReview);
    return [...dbReviews, ...uniqueMemory].sort((a, b) => safeTimestamp(b.createdAt) - safeTimestamp(a.createdAt));
  } catch (error) {
    console.warn("[Database] Failed to query published reviews from database, using memory fallback:", error);
    return [...memoryReviews]
      .map(normalizeReview)
      .sort((a, b) => safeTimestamp(b.createdAt) - safeTimestamp(a.createdAt));
  }
}
