// src/routes/incoming-message.routes.ts
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { getIncomingMessages } from "../controller/incoming-message.controller";

const router = Router();

router.use(authenticate);
router.get("/", getIncomingMessages);

export default router;
