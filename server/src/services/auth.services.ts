import bcrypt from "bcryptjs";

import type {
  LoginInput,
  RegisterBusinessInput,
} from "../validation/auth.validation";
import { prisma } from "../lib/prisma";
import { generateToken } from "../utils/jwt";

export class AuthService {
  async registerBusiness(data: RegisterBusinessInput) {
    const {
      businessName,
      businessEmail,
      phone,
      address,
      firstName,
      lastName,
      userEmail,
      password,
    } = data;

    const existingBusiness = await prisma.business.findUnique({
      where: { email: businessEmail },
    });

    if (existingBusiness) {
      throw new Error("Business email already exists");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (existingUser) {
      throw new Error("User email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx) => {
      const business = await tx.business.create({
        data: {
          name: businessName,
          email: businessEmail,
          phone: phone ?? null,
          address: address ?? null,
        },
      });

      const adminUser = await tx.user.create({
        data: {
          firstName,
          lastName,
          email: userEmail,
          password: hashedPassword,
          role: "ADMIN",
          businessId: business.id,
        },
      });

      return {
        business,
        adminUser: {
          id: adminUser.id,
          firstName: adminUser.firstName,
          lastName: adminUser.lastName,
          email: adminUser.email,
          role: adminUser.role,
          businessId: adminUser.businessId,
        },
      };
    });

    return result;
  }

  async login(data: LoginInput) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { business: true },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }
    if (!user.isActive) {
      throw new Error("User account is inactive. Please contact support.");
    }

    //compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken({
      userId: user.id,
      businessId: user.businessId,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        businessId: user.businessId,
        business: {
          id: user.business.id,
          name: user.business.name,
          email: user.business.email,
        },
      },
    };
  }

  //get current user details
  async getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        business: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.isActive) {
      throw new Error("Account is inactive");
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      businessId: user.businessId,
      business: {
        id: user.business.id,
        name: user.business.name,
        email: user.business.email,
        phone: user.business.phone,
        address: user.business.address,
        logoUrl: user.business.logoUrl,
      },
    };
  }
}

export const authService = new AuthService();
