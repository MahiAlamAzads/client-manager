// src/server.ts
import dotenv from "dotenv";
dotenv.config(); // Call config as early as possible

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import apiRouter from "./api";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

// Global Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Public Health Check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

// Mount all API routes (move /me inside apiRouter)
app.use("/api", apiRouter);

// 404 Fallback
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// Centralized Error Handler (Always last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
