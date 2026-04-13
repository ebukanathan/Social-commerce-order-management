import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { string } from "zod";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing",
      });
    }

    // const parts = authHeader.split(" ");

    // if (parts.length !== 2 || parts[0] !== "Bearer") {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Invalid authorization format",
    //   });
    // }

    // const token = parts[1];

    const decoded = verifyToken(accessToken as string);

    req.user = decoded;
    console.log("Authenticated user:", req.user); // Debugging log

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
