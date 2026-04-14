// src/routes/customer.routes.ts
import { Router } from "express";
import {
  createCustomer,
  getCustomers,
} from "../controller/customer.controller";
//import { protect } from "../middleware/auth.middleware";

const router = Router();

//router.use(protect);

router.post("/", createCustomer);
router.get("/", getCustomers);

export default router;
