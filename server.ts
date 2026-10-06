import "dotenv/config";
import express from "express";

// Vercel does not always provide NODE_ENV to Express functions at runtime.
process.env.NODE_ENV ??= "production";

const { createProductionApp } = await import("./server/_core/index");
const app = express();
app.use(createProductionApp());

export default app;
