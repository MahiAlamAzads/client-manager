// src/types/express.d.ts
import { TokenPayload } from "google-auth-library";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};
