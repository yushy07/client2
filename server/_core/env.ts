import { z } from "zod";

/**
 * Every variable below was previously read as `process.env.X ?? ""`, so a
 * missing secret produced an empty string and then an opaque failure deep in a
 * request. `jose` rejects a zero-length HMAC key, for example, which turned a
 * missing JWT_SECRET into a 500 on every authenticated request.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DEMO_MODE: z
    .preprocess(
      (val) => val === "true" || val === "1" || val === true,
      z.boolean(),
    )
    .default(false),

  // Connection and credentials
  DATABASE_URL: z.string().trim().min(1).optional(),
  JWT_SECRET: z.string().min(1).optional(),
  VITE_APP_ID: z.string().trim().min(1).optional(),
  OAUTH_SERVER_URL: z.string().trim().min(1).optional(),
  OWNER_OPEN_ID: z.string().trim().min(1).optional(),
  ADMIN_KEY: z.string().trim().min(8).optional(),

  // Optional object storage integration
  BUILT_IN_FORGE_API_URL: z.string().trim().min(1).optional(),
  BUILT_IN_FORGE_API_KEY: z.string().min(1).optional(),

  // Server tuning
  // 0 is a legitimate value meaning "let the operating system assign a port",
  // so it must not be rejected; `startServer` reports the resolved port.
  PORT: z.coerce.number().int().min(0).max(65535).default(3000),
  DB_POOL_SIZE: z.coerce.number().int().min(1).max(200).default(10),
  DB_QUERY_TIMEOUT_MS: z.coerce.number().int().min(500).max(60_000).default(5_000),
});

type RawEnv = z.infer<typeof envSchema>;

// Environment files commonly contain declared-but-empty keys (and shells export
// `PORT=`), which `z.coerce.number()` would read as 0 rather than "unset".
// Dropping empty values makes "blank" behave like "missing", so an empty
// JWT_SECRET is reported as a missing secret instead of a zero-length key.
const populatedEnv = Object.fromEntries(
  Object.entries(process.env).filter(([, value]) => typeof value === "string" && value !== ""),
);

const rawEnvResult = envSchema.safeParse(populatedEnv);

if (!rawEnvResult.success) {
  console.error(
    "[Config] Invalid environment configuration:",
    rawEnvResult.error.issues.map(issue => `${issue.path.join(".")}: ${issue.message}`).join("; "),
  );
  process.exit(1);
}

const rawEnv: RawEnv = rawEnvResult.data;
const isProduction = rawEnv.NODE_ENV === "production";
const isDemoMode = rawEnv.DEMO_MODE;

const REQUIRED_IN_PRODUCTION = {
  DATABASE_URL: "MySQL connection string used for enquiries, reviews, and admin accounts.",
  JWT_SECRET: "Session cookie signing key (HS256 needs at least 32 characters).",
  OAUTH_SERVER_URL: "OAuth token/userinfo endpoint used to sign administrators in.",
  VITE_APP_ID: "OAuth application id issued for this site.",
} as const;

/** `ALLOW_MISSING_ENV=1` permits a deliberately degraded run, e.g. a preview
 * deploy without a database. Nothing else should set it. */
const allowMissingEnv = process.env.ALLOW_MISSING_ENV === "1";

if (isProduction) {
  if (isDemoMode) {
    console.info(
      "[Config] Starting in DEMO_MODE: public showroom, visualizers, colour finder, and SEO routes are active. Database and OAuth integrations are running in standalone demo mode.",
    );
  } else {
    const missing = (Object.keys(REQUIRED_IN_PRODUCTION) as Array<keyof typeof REQUIRED_IN_PRODUCTION>)
      .filter(key => !rawEnv[key]);

    if (rawEnv.JWT_SECRET && rawEnv.JWT_SECRET.length < 32) {
      console.error(
        "[Config] JWT_SECRET is shorter than 32 characters; HS256 signing requires a 256-bit key.",
      );
      process.exit(1);
    }

    if (missing.length > 0) {
      const details = missing
        .map(key => `  - ${key}: ${REQUIRED_IN_PRODUCTION[key]}`)
        .join("\n");

      if (allowMissingEnv) {
        console.warn(
          `[Config] Running in production with missing configuration because ALLOW_MISSING_ENV=1:\n${details}`,
        );
      } else {
        console.error(
          `[Config] Refusing to start: missing required production configuration.\n${details}\n` +
            "Set these variables, or set DEMO_MODE=true for standalone demo deployment.",
        );
        process.exit(1);
      }
    }
  }
}

// An unset OWNER_OPEN_ID and ADMIN_KEY makes the admin surface unreachable.
if (!isDemoMode && !rawEnv.OWNER_OPEN_ID && !rawEnv.ADMIN_KEY) {
  console.warn(
    "[Config] Neither OWNER_OPEN_ID nor ADMIN_KEY is set. No account can be granted the admin role, " +
      "so /admin/reviews and every adminProcedure will be unreachable.",
  );
} else if (rawEnv.ADMIN_KEY) {
  console.info("[Config] ADMIN_KEY fallback authentication configured for admin moderation procedures.");
}

export const ENV = {
  appId: rawEnv.VITE_APP_ID ?? "",
  cookieSecret: rawEnv.JWT_SECRET ?? "",
  databaseUrl: rawEnv.DATABASE_URL ?? "",
  oAuthServerUrl: rawEnv.OAUTH_SERVER_URL ?? "",
  ownerOpenId: rawEnv.OWNER_OPEN_ID ?? "",
  adminKey: rawEnv.ADMIN_KEY ?? "",
  isProduction,
  isDemoMode,
  forgeApiUrl: rawEnv.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: rawEnv.BUILT_IN_FORGE_API_KEY ?? "",
  port: rawEnv.PORT,
  dbPoolSize: rawEnv.DB_POOL_SIZE,
  dbQueryTimeoutMs: rawEnv.DB_QUERY_TIMEOUT_MS,
} as const;
