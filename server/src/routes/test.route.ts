import { Router, type Request, type Response } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/me", authenticate, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    include: { business: true },
  });
  return res.status(200).json({
    success: true,
    message: "Authenticated user",
    data: user,
  });
});

export default router;
