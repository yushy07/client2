import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";
import { ENV } from "./env";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch {
    // Authentication is optional for public procedures.
    user = null;
  }

  // Fallback: Check for header-based admin key authentication
  if (!user && ENV.adminKey) {
    const headerKey = opts.req.headers["x-admin-key"] ||
      (opts.req.headers.authorization?.startsWith("Bearer ") ? opts.req.headers.authorization.slice(7) : null);
    if (headerKey && headerKey === ENV.adminKey) {
      user = {
        id: 0,
        openId: "system-admin-key",
        name: "Admin",
        email: "admin@jaymurtitraders.com",
        loginMethod: "admin-key",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      };
    }
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
