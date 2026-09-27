import type { NextFunction, Response, Request, RequestHandler } from "express";

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  Next: NextFunction,
) => Promise<any>;

// Using Promise.resolve(...) also guarantees that if someone passes a non-async function that throws a synchronous error, it gets wrapped in a Promise and safely caught by .catch(next).
export const asyncHandler = (fn: AsyncRequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
