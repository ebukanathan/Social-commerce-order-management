import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register a new user

export const register = async (req: Request, res: Response) => {
  const { email, password, businessId } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    //check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        businessId: "222",
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//login a user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    //check if user exists
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userExists) {
      return res.status(400).json({ message: "User not found" });
    }
    //check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExists.password,
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }
    //generate token
    const token = jwt.sign(
      { userId: userExists.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );
    //send token to client
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//logout a user
export const logout = async (req: Request, res: Response) => {
  try {
    //clear token from client
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//get a user

export const getUser = async (req: Request, res: Response) => {
  interface JwtPayloadWithUserId {
    userId: string;
  }
  try {
    //get user from token
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    //verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayloadWithUserId;
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    //get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
