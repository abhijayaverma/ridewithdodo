import { Router } from "express";
import { prisma } from "../../db/prisma.js";
import { requireAuth } from "../../middleware/auth.js";
import { ok } from "../../utils/http.js";

export const safetyRouter = Router();
safetyRouter.post("/sos", requireAuth, async (req, res) => res.status(201).json(ok(await prisma.report.create({ data: { reporterId: req.user!.sub, category: "EMERGENCY", description: req.body.description, rideId: req.body.rideId } }))));
safetyRouter.post("/reports", requireAuth, async (req, res) => res.status(201).json(ok(await prisma.report.create({ data: { ...req.body, reporterId: req.user!.sub } }))));
safetyRouter.post("/blocks", requireAuth, async (req, res) => res.status(201).json(ok(await prisma.blockedUser.create({ data: { blockerId: req.user!.sub, blockedId: req.body.blockedId, reason: req.body.reason } }))));
