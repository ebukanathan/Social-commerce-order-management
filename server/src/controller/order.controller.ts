// src/controller/order.controller.ts
import type { Request, Response } from "express";
import { orderService } from "../services/order.services";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const businessId = req.user?.businessId;
    console.log("this is the businessId:", businessId);

    if (!businessId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { customerId, total, subtotal, source, notes } = req.body;

    if (!customerId || total === undefined) {
      return res.status(400).json({
        message: "customerId and total are required",
      });
    }

    const orderInput: any = {
      customerId,
      total: Number(total),
      source,
      notes,
    };
    if (subtotal !== undefined) {
      orderInput.subtotal = Number(subtotal);
    }
    const order = await orderService.createOrder(
      businessId,
      orderInput,
      req.user!.userId,
    );
    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({ message: "Failed to create order" });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const businessId = req.user?.businessId;

    if (!businessId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await orderService.getOrders(businessId);

    return res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const businessId = req.user?.businessId;

    if (!businessId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    const order = await orderService.getOrderById(id, businessId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    console.error("Get order error:", error);
    return res.status(500).json({ message: "Failed to fetch order" });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const businessId = req.user?.businessId;

    if (!businessId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    const order = await orderService.updateOrder(id, businessId, req.body);

    return res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update order error:", error);

    if (error instanceof Error && error.message === "Order not found") {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Failed to update order" });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const businessId = req.user?.businessId;

    if (!businessId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    const result = await orderService.deleteOrder(id, businessId);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Delete order error:", error);

    if (error instanceof Error && error.message === "Order not found") {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Failed to delete order" });
  }
};
