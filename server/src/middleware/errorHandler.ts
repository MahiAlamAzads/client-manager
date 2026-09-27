import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

// Optional custom error interface if you use custom AppError/HttpError classes
export interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler: ErrorRequestHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "internal server error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
