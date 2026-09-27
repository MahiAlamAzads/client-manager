// src/server.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { authenticateGoogleUser } from "./middleware/auth";
import cors from "cors";
import morgan from "morgan";
import apiRouter from "./api";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api", apiRouter);

// Public route
app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "This is an open endpoint" });
});

// Protected route — requires valid Google ID token
app.get("/api/me", authenticateGoogleUser, (req: Request, res: Response) => {
  // Access verified identity attributes directly:
  const { sub, email, name, picture } = req.user!;
  console.log(req.user);
  res.json({
    googleId: sub,
    email,
    name,
    picture,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
