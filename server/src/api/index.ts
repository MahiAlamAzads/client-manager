import express from "express";
import { Router } from "express";
import { pool } from "../lib/db";
import apiProjectsRouter from "./projects";
import apiCategoriesRouter from "./categories";

const apiRouter = Router();

// Middleware specific to this router
apiRouter.use((req, res, next) => {
  console.log(`[API Router] ${req.method} ${req.url}`);
  next();
});

apiRouter.use("/categories", apiCategoriesRouter);
apiRouter.use("/projects", apiProjectsRouter);

export default apiRouter;
