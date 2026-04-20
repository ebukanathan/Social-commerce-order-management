// src/routes/whatsapp.routes.ts
import { Router } from "express";
import {
  verifyWhatsAppWebhook,
  receiveWhatsAppWebhook,
} from "../controller/whatsapp.controller";

const router = Router();

router.get("/webhook", verifyWhatsAppWebhook);
router.post("/webhook", receiveWhatsAppWebhook);

export default router;
