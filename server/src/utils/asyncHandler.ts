import type { NextFunction, Response, Request, RequestHandler } from "express";

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  Next: NextFunction,
) => Promise<any>;

export const asyncHandler = (fn: AsyncRequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
