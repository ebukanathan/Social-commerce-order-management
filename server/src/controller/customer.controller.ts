// src/controller/customer.controller.ts
import type { Request, Response } from "express";
import { customerService } from "../services/customer.services";

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const businessId = req.user?.businessId;

    if (!businessId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, phone, email, address } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const customer = await customerService.createCustomer(businessId, {
      name,
      phone,
      email,
      address,
    });

    return res.status(201).json({
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    console.error("Create customer error:", error);
    return res.status(500).json({ message: "Failed to create customer" });
  }
};

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const businessId = req.user?.businessId;

    if (!businessId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const customers = await customerService.getCustomers(businessId);

    return res.status(200).json({
      customers,
    });
  } catch (error) {
    console.error("Get customers error:", error);
    return res.status(500).json({ message: "Failed to fetch customers" });
  }
};
