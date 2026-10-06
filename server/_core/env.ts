import { z } from "zod";

/** Configuration used by the public, WhatsApp-first site runtime. */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  // Optional object storage integration
  BUILT_IN_FORGE_API_URL: z.string().trim().min(1).optional(),
  BUILT_IN_FORGE_API_KEY: z.string().min(1).optional(),

  // Server tuning
  // 0 is a legitimate value meaning "let the operating system assign a port",
  // so it must not be rejected; `startServer` reports the resolved port.
  PORT: z.coerce.number().int().min(0).max(65535).default(3000),
});

type RawEnv = z.infer<typeof envSchema>;

// Environment files commonly contain declared-but-empty keys (and shells export
// `PORT=`), which `z.coerce.number()` would read as 0 rather than "unset".
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
const isProduction =
  rawEnv.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";

export const ENV = {
  // These empty compatibility fields are for legacy, unmounted server modules.
  // They are not configured or used by the public site runtime.
  appId: "",
  cookieSecret: "",
  databaseUrl: "",
  oAuthServerUrl: "",
  ownerOpenId: "",
  adminKey: "",
  isProduction,
  forgeApiUrl: rawEnv.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: rawEnv.BUILT_IN_FORGE_API_KEY ?? "",
  port: rawEnv.PORT,
  dbPoolSize: 10,
  dbQueryTimeoutMs: 5_000,
} as const;
