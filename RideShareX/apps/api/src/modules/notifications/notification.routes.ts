import { Router } from "express";
import { prisma } from "../../db/prisma.js";
import { requireAuth } from "../../middleware/auth.js";
import { ok } from "../../utils/http.js";

export const notificationRouter = Router();
notificationRouter.get("/", requireAuth, async (req, res) => res.json(ok(await prisma.notification.findMany({ where: { userId: req.user!.sub }, orderBy: { createdAt: "desc" } }))));
notificationRouter.patch("/:id/read", requireAuth, async (req, res) => res.json(ok(await prisma.notification.update({ where: { id: req.params.id }, data: { readAt: new Date() } }))));
