import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { createPaymentIntent, handleWebhook } from "./payment.service.js";

export const paymentRouter = Router();
paymentRouter.post("/intent", requireAuth, async (req, res) => res.status(201).json(await createPaymentIntent(req.user!.sub, req.body)));
paymentRouter.post("/webhook/:provider", async (req, res) => res.json(await handleWebhook(req.params.provider, req.body)));
