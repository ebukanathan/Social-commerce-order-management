import prisma from "prisma"


// Plan: Implement a basic structure for an Order Controller with methods for CRUD operations (create, get, update, delete orders) using Prisma. Export controller functions for later use in routes.

import { Request, Response } from "express";

// Create an order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const order = await prisma.order.create({
      data: data,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get all orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Get an order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: Number(id) }
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// Update an order
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: data,
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
  }
};

// Delete an order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.order.delete({
      where: { id: Number(id) }
    });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};