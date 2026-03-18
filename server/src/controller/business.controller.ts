import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

//create a new business
export const createBusiness = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    //check if business exists
    const existingBusiness = await prisma.business.findFirst({
      where: { email },
    });

    if (existingBusiness) {
      return res.status(400).json({ message: "Business already exists" });
    }

    //create business
    const business = await prisma.business.create({
      data: { name, email },
    });
    return res
      .status(201)
      .json({ business, message: "Business created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//get a business
export const getBusiness = async (req: Request, res: Response) => {
  try {
    //get business from database
    const business = await prisma.business.findMany();
    console.log(business);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    return res.status(200).json({ business });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//login business

export const loginBusiness = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find the business by email
    const business = await prisma.business.findUnique({
      where: { email },
    });

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    // In a real app, you'd also verify a password or implement proper authentication
    return res.status(200).json({ business, message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
