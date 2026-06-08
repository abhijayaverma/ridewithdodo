import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { listMessages, sendMessage } from "./chat.service.js";

export const chatRouter = Router();
chatRouter.get("/:rideId/messages", requireAuth, async (req, res) => res.json(await listMessages(req.params.rideId)));
chatRouter.post("/:rideId/messages", requireAuth, async (req, res) => res.status(201).json(await sendMessage(req.params.rideId, req.user!.sub, req.body)));
