import { JwtPayload } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        userId: string;
        businessId: string;
        role: string;
      };
    }
  }
}

export {};
