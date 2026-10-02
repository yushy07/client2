import { describe, it, expect, beforeAll } from "vitest";
import { spawn } from "child_process";
import path from "path";
import http from "http";
import fs from "fs";
import { build as esbuild } from "esbuild";

const DIST_INDEX = path.resolve(__dirname, "../dist/index.js");

describe("Production Environment Startup Validation", () => {
  beforeAll(async () => {
    if (!fs.existsSync(DIST_INDEX)) {
      await esbuild({
        entryPoints: [path.resolve(__dirname, "_core/index.ts")],
        platform: "node",
        packages: "external",
        bundle: true,
        format: "esm",
        outfile: DIST_INDEX,
      });
    }
  });

  it("fails fast with non-zero exit code when required production variables are missing", async () => {
    const child = spawn(process.execPath, [DIST_INDEX], {
      env: {
        ...process.env,
        NODE_ENV: "production",
        DATABASE_URL: "",
        JWT_SECRET: "",
        OAUTH_SERVER_URL: "",
        VITE_APP_ID: "",
      },
    });

    let stderr = "";
    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    const exitCode = await new Promise<number | null>((resolve) => {
      child.on("exit", (code) => resolve(code));
    });

    expect(exitCode).toBe(1);
    expect(stderr).toContain("[Config] Refusing to start: missing required production configuration.");
    expect(stderr).toContain("DATABASE_URL");
    expect(stderr).toContain("JWT_SECRET");
    expect(stderr).toContain("OAUTH_SERVER_URL");
    expect(stderr).toContain("VITE_APP_ID");
  });

  it("fails fast when JWT_SECRET is shorter than 32 characters in production", async () => {
    const child = spawn(process.execPath, [DIST_INDEX], {
      env: {
        ...process.env,
        NODE_ENV: "production",
        DATABASE_URL: "mysql://test:test@localhost:3306/test",
        JWT_SECRET: "too-short-secret-under-32-chars",
        OAUTH_SERVER_URL: "https://auth.example.com",
        VITE_APP_ID: "test-app-id",
      },
    });

    let stderr = "";
    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    const exitCode = await new Promise<number | null>((resolve) => {
      child.on("exit", (code) => resolve(code));
    });

    expect(exitCode).toBe(1);
    expect(stderr).toContain("JWT_SECRET is shorter than 32 characters");
  });

  it("successfully boots and binds to PORT when all required variables are present", async () => {
    // Pick a test port
    const testPort = 3099;
    const child = spawn(process.execPath, [DIST_INDEX], {
      env: {
        ...process.env,
        NODE_ENV: "production",
        PORT: String(testPort),
        DATABASE_URL: "mysql://mock_user:mock_pass@127.0.0.1:3306/mock_db",
        JWT_SECRET: "a_very_secure_test_jwt_secret_with_more_than_32_characters!",
        OAUTH_SERVER_URL: "https://auth.example.com",
        VITE_APP_ID: "test_app_id",
        OWNER_OPEN_ID: "owner_test_123",
      },
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });
    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    // Wait for server to bind or error out
    const started = await new Promise<boolean>((resolve) => {
      const interval = setInterval(() => {
        if (stdout.includes(`http://localhost:${testPort}/`)) {
          clearInterval(interval);
          resolve(true);
        }
      }, 50);

      child.on("exit", () => {
        clearInterval(interval);
        resolve(false);
      });

      setTimeout(() => {
        clearInterval(interval);
        resolve(false);
      }, 5000);
    });

    expect(started).toBe(true);

    // Verify /health endpoint responds
    const healthStatus = await new Promise<number>((resolve, reject) => {
      http
        .get(`http://localhost:${testPort}/health`, (res) => {
          resolve(res.statusCode ?? 0);
        })
        .on("error", reject);
    });

    expect(healthStatus).toBe(200);

    // Clean up
    child.kill("SIGTERM");
  });
});
