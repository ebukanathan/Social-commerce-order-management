import { Router } from "express";
import { createBusiness, getBusiness } from "../controller/business.controller";

const router = Router();

router.post("/create", createBusiness);
router.get("/get", getBusiness);

export default router;
