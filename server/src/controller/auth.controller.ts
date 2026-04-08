import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authService } from "../services/auth.services";
import {
  registerBusinessSchema,
  loginSchema,
} from "../validation/auth.validation";
import { ZodError } from "zod";

//register a new user

export const registerBusiness = async (req: Request, res: Response) => {
  console.log("Received registration request with body:", req.body); // Debugging log
  try {
    const validatedData = registerBusinessSchema.parse(req.body);

    const result = await authService.registerBusiness(validatedData);

    return res.status(201).json({
      success: true,
      message: "Business registered successfully",
      data: result,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.issues,
      });
    }

    console.log("Error during registration222:", error); // Debugging log

    // return res.status(403).json({
    //   success: false,
    //   message: error.message || "Something went wrong",
    // });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await authService.login(validatedData);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }

    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await authService.getCurrentUser(req.user.userId);

    return res.status(200).json({
      success: true,
      message: "Current user fetched successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
