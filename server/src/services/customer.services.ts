// src/services/customer.service.ts
import { boolean } from "zod";
import { prisma } from "../lib/prisma";

type CreateCustomerInput = {
  name: string;
  phone?: string | null;
  email?: string;
  address?: string;
};

export class CustomerService {
  async createCustomer(businessId: string, data: CreateCustomerInput) {
    return prisma.customer.create({
      data: {
        name: data.name,
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
        name: true,
        phone: true,
      },
    });
  }
}

export const customerService = new CustomerService();
