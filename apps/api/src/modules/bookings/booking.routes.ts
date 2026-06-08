import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { bookSeat, cancelBooking, decideBooking } from "./booking.service.js";

export const bookingRouter = Router();
const bookSchema = z.object({ body: z.object({ rideId: z.string().uuid(), seats: z.number().int().min(1), pickupAddress: z.string(), dropAddress: z.string() }) });

bookingRouter.post("/", requireAuth, requireRole("PASSENGER"), validate(bookSchema), async (req, res) => res.status(201).json(await bookSeat(req.user!.sub, req.body)));
bookingRouter.post("/:id/cancel", requireAuth, async (req, res) => res.json(await cancelBooking(req.user!.sub, req.params.id, req.body.reason)));
bookingRouter.post("/:id/decision", requireAuth, requireRole("DRIVER"), async (req, res) => res.json(await decideBooking(req.user!.sub, req.params.id, req.body.accepted)));
