// src/services/customer.service.ts
import { boolean } from "zod";
import { prisma } from "../lib/prisma";

type CreateCustomerInput = {
  fullName: string;
  phone?: string | null;
  email?: string;
  address?: string;
};

export class CustomerService {
  async createCustomer(businessId: string, data: CreateCustomerInput) {
    return prisma.customer.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        address: data.address,
        businessId,
      },
    });
  }

  async getCustomers(businessId: string) {
    return prisma.customer.findMany({
      where: { businessId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fullName: true,
        phone: true,
      },
    });
  }
}

export const customerService = new CustomerService();
