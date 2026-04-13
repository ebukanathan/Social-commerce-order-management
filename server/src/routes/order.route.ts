// src/routes/order.routes.ts
import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
} from "../controller/order.controller";


const router = Router();



router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
