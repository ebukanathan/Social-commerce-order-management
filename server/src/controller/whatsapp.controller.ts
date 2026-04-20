// src/controller/whatsapp.controller.ts
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const verifyWhatsAppWebhook = (req: Request, res: Response) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
};

export const receiveWhatsAppWebhook = async (req: Request, res: Response) => {
  try {
    const entries = req.body?.entry;

    if (!Array.isArray(entries)) {
      return res.sendStatus(200);
    }

    for (const entry of entries) {
      const changes = entry?.changes;

      if (!Array.isArray(changes)) continue;

      for (const change of changes) {
        const value = change?.value;
        const messages = value?.messages;
        const contacts = value?.contacts;

        if (!Array.isArray(messages)) continue;

        for (const message of messages) {
          const senderPhone = message?.from;
          const externalMessageId = message?.id;
          const messageType = message?.type || "unknown";
          const textBody = message?.text?.body || null;

          const senderName =
            Array.isArray(contacts) && contacts[0]?.profile?.name
              ? contacts[0].profile.name
              : null;

          if (!senderPhone || !externalMessageId) continue;

          const existingCustomer = await prisma.customer.findFirst({
            where: {
              phone: senderPhone,
            },
            select: {
              id: true,
              businessId: true,
            },
          });

          await prisma.incomingMessage.upsert({
            where: {
              externalMessageId,
            },
            update: {
              rawPayload: req.body,
              textBody,
              senderName,
              customerId: existingCustomer?.id ?? null,
              businessId: existingCustomer?.businessId ?? null,
            },
            create: {
              channel: "WHATSAPP",
              externalMessageId,
              senderPhone,
              senderName: senderName ?? undefined,
              messageType,
              textBody,
              rawPayload: req.body,
              customerId: existingCustomer?.id ?? undefined,
              businessId: existingCustomer?.businessId ?? undefined,
            },
          });
        }
      }
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return res.sendStatus(500);
  }
};
