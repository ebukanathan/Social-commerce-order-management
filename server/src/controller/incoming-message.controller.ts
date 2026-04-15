// src/controller/incoming-message.controller.ts
import type { Request, Response } from "express";
import { prisma } from "../libs/prisma";

export const getIncomingMessages = async (req: Request, res: Response) => {
  try {
    const businessId = req.user?.businessId;

    if (!businessId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const messages = await prisma.incomingMessage.findMany({
      where: { businessId },
      orderBy: { createdAt: "desc" },
      include: {
        customer: {
          select: {
            id: true,
            fullName: true,
            phone: true,
          },
        },
      },
    });

    return res.status(200).json({ messages });
  } catch (error) {
    console.error("Get incoming messages error:", error);
    return res.status(500).json({ message: "Failed to fetch messages" });
  }
};
