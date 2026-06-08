import { Router } from "express";
import { prisma } from "../../db/prisma.js";
import { requireAuth } from "../../middleware/auth.js";
import { ok } from "../../utils/http.js";

export const reviewRouter = Router();
reviewRouter.post("/", requireAuth, async (req, res) => res.status(201).json(ok(await prisma.review.create({ data: { ...req.body, reviewerId: req.user!.sub } }))));
reviewRouter.get("/driver/:driverId", async (req, res) => res.json(ok(await prisma.review.findMany({ where: { driverId: req.params.driverId, moderatedAt: { not: null } } }))));
