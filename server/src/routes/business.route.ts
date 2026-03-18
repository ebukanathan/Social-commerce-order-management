import { Router } from "express";
import {
  createBusiness,
  getBusiness,
  loginBusiness,
} from "../controller/business.controller";

const router = Router();

router.post("/create", createBusiness);
router.get("/get", getBusiness);
router.post("/login", loginBusiness);

export default router;
