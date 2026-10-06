import "dotenv/config";
import express from "express";
import { createProductionApp } from "./server/_core/index";

const app = express();
app.use(createProductionApp());

export default app;
