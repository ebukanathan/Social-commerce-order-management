// Plan: Implement a basic structure for an Order Route with methods for CRUD operations (create, get, update, delete orders) using Prisma. Export route functions for later use in routes.

import { Router } from "express";
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from "../controller/order.controller";

const router = Router();

router.post("/create", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;