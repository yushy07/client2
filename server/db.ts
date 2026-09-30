import { desc, eq, or, sql } from "drizzle-orm";
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
        // Ignore cleanup errors; callers will receive an unavailable error.
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

export class DatabaseUnavailableError extends Error {
  constructor(message = "Database is temporarily unavailable", options?: ErrorOptions) {
    super(message, options);
    this.name = "DatabaseUnavailableError";
  }
}

async function requireDb() {
  const db = await getDb();
  if (!db) throw new DatabaseUnavailableError();
  return db;
}

export async function createServiceEnquiry(enquiry: InsertServiceEnquiry) {
  try {
    const db = await requireDb();
    const result = await db.insert(serviceEnquiries).values(enquiry);
    const id = Number(result[0].insertId);
    if (!Number.isSafeInteger(id) || id < 1) throw new Error("Database did not return an enquiry ID");
    return { id };
  } catch (error) {
    console.error("[Database] Failed to persist enquiry:", error);
    if (error instanceof DatabaseUnavailableError) throw error;
    throw new DatabaseUnavailableError("Unable to persist enquiry", { cause: error });
  }
}

export type PublicShopReview = {
  id: number;
  displayName: string;
  rating: number;
  reviewText: string;
  createdAt: Date;
};

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
  try {
    const db = await requireDb();
    const result = await db.insert(shopReviews).values({ ...review, status: "private" });
    const id = Number(result[0].insertId);
    if (!Number.isSafeInteger(id) || id < 1) throw new Error("Database did not return a review ID");
    return { id, published: false as const };
  } catch (error) {
    console.error("[Database] Failed to persist review:", error);
    if (error instanceof DatabaseUnavailableError) throw error;
    throw new DatabaseUnavailableError("Unable to persist review", { cause: error });
  }
}

export async function listPublishedShopReviews(): Promise<PublicShopReview[]> {
  try {
    const db = await requireDb();

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
        .where(or(eq(shopReviews.status, "published"), eq(shopReviews.status, "approved")))
        .orderBy(desc(shopReviews.createdAt)),
      3500,
      "Published reviews query",
    );

    return rawDbReviews.map(normalizeReview);
  } catch (error) {
    if (process.env.DATABASE_URL) {
      console.error("[Database] Failed to query published reviews:", error);
    }
    if (error instanceof DatabaseUnavailableError) throw error;
    throw new DatabaseUnavailableError("Unable to load reviews", { cause: error });
  }
}

export async function listShopReviewsForModeration(page: number, pageSize: number) {
  try {
    const db = await requireDb();
    const offset = (page - 1) * pageSize;
    const [reviews, countRows] = await Promise.all([
      db.select().from(shopReviews).orderBy(desc(shopReviews.createdAt)).limit(pageSize).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(shopReviews),
    ]);
    return { reviews, total: Number(countRows[0]?.count ?? 0), page, pageSize };
  } catch (error) {
    console.error("[Database] Failed to list reviews for moderation:", error);
    if (error instanceof DatabaseUnavailableError) throw error;
    throw new DatabaseUnavailableError("Unable to load reviews for moderation", { cause: error });
  }
}

export async function moderateShopReview(id: number, action: "approve" | "hide") {
  try {
    const db = await requireDb();
    const status = action === "approve" ? "published" as const : "private" as const;
    const result = await db.update(shopReviews).set({ status }).where(eq(shopReviews.id, id));
    if (Number(result[0].affectedRows) === 0) return null;
    return { id, status, published: status === "published" };
  } catch (error) {
    console.error("[Database] Failed to moderate review:", error);
    if (error instanceof DatabaseUnavailableError) throw error;
    throw new DatabaseUnavailableError("Unable to moderate review", { cause: error });
  }
}
