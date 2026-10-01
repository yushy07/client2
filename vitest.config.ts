import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import path from "path";

const templateRoot = path.resolve(import.meta.dirname);

export default defineConfig({
  root: templateRoot,
  // The root tsconfig sets `jsx: "preserve"` for the app build, which leaves
  // JSX untouched for direct transforms. Component tests import .tsx sources
  // and use JSX themselves, so they need the React transform here.
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(templateRoot, "client", "src"),
      "@shared": path.resolve(templateRoot, "shared"),
      "@assets": path.resolve(templateRoot, "attached_assets"),
    },
  },
  test: {
    environment: "node",
    include: [
      "client/**/*.test.ts",
      "client/**/*.test.tsx",
      "server/**/*.test.ts",
      "server/**/*.test.tsx",
      "shared/**/*.test.ts",
      "shared/**/*.test.tsx",
    ],
  },
});
