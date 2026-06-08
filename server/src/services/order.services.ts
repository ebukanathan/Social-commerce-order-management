// src/services/order.service.ts
import { prisma } from "../lib/prisma";

type CreateOrderInput = {
  customerId: string;
  total: number;
  subtotal?: number;
  source?: string;
  notes?: string;
};

type UpdateOrderInput = {
  status?:
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";
  total?: number;
  subtotal?: number;
  source?: "WHATSAPP" | "FACEBOOK" | "INSTAGRAM" | "WALK-IN" | "WEBSITE";
  notes?: string;
};

export class OrderService {
  async createOrder(
    businessId: string,
    data: CreateOrderInput,
    userId: string,
  ) {
    const orderNumber = `ORD-${Date.now()}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        total: data.total,
        subtotal: data.subtotal as number,
        ...(data.source && {
          source: data.source as UpdateOrderInput["source"],
        }),
        notes: data.notes,
        createdBy: {
          connect: { id: userId },
        },
        business: {
          connect: { id: businessId },
        },
        customer: {
          connect: { id: data.customerId },
        },
      },
      include: {
        customer: true,
        business: true,
      },
    });

    return order;
  }

  async getOrders(businessId: string) {
    return prisma.order.findMany({
      where: { businessId },
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getOrderById(orderId: string, businessId: string) {
    return prisma.order.findFirst({
      where: {
        id: orderId,
        businessId,
      },
      include: {
        customer: true,
        business: true,
      },
    });
  }

  async updateOrder(
    orderId: string,
    businessId: string,
    data: UpdateOrderInput,
  ) {
    const existingOrder = await prisma.order.findFirst({
      where: {
        id: orderId,
        businessId,
      },
    });

    if (!existingOrder) {
      throw new Error("Order not found");
    }

    return prisma.order.update({
      where: {
        id: orderId,
      },
      data,
      include: {
        customer: true,
      },
    });
  }

  async deleteOrder(orderId: string, businessId: string) {
    const existingOrder = await prisma.order.findFirst({
      where: {
        id: orderId,
        businessId,
      },
    });

    if (!existingOrder) {
      throw new Error("Order not found");
    }

    await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    return { message: "Order deleted successfully" };
  }

  async updateOrderStatus(orderId: string, status: UpdateOrderInput["status"]) {
    const existingOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    if (!existingOrder) {
      throw new Error("Order not found");
    }

    return prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });
  }
}

export const orderService = new OrderService();
