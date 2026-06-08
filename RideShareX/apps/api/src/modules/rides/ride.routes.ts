import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { cancelRide, createRide, searchRides, updateRide } from "./ride.service.js";

export const rideRouter = Router();

const createRideSchema = z.object({
  body: z.object({
    vehicleId: z.string().uuid(),
    sourceAddress: z.string(),
    sourceLat: z.number(),
    sourceLng: z.number(),
    destinationAddress: z.string(),
    destinationLat: z.number(),
    destinationLng: z.number(),
    departureAt: z.coerce.date(),
    estimatedArrivalAt: z.coerce.date().optional(),
    pricePerSeat: z.number().positive(),
    totalSeats: z.number().int().min(1).max(8),
    luggageAllowance: z.string().optional(),
    genderPreference: z.string().optional(),
    stops: z.array(z.object({ address: z.string(), lat: z.number(), lng: z.number(), sequence: z.number().int() })).default([])
  })
});

const searchSchema = z.object({
  query: z.object({
    source: z.string().optional(),
    destination: z.string().optional(),
    date: z.string().optional(),
    seats: z.coerce.number().default(1),
    verifiedOnly: z.coerce.boolean().optional(),
    maxPrice: z.coerce.number().optional(),
    vehicleType: z.string().optional(),
    sort: z.enum(["price", "rating", "departure", "fastest"]).optional()
  })
});

rideRouter.get("/search", validate(searchSchema), async (req, res) => res.json(await searchRides(req.query)));
rideRouter.post("/", requireAuth, requireRole("DRIVER"), validate(createRideSchema), async (req, res) => res.status(201).json(await createRide(req.user!.sub, req.body)));
rideRouter.patch("/:id", requireAuth, requireRole("DRIVER"), async (req, res) => res.json(await updateRide(req.user!.sub, req.params.id, req.body)));
rideRouter.post("/:id/cancel", requireAuth, async (req, res) => res.json(await cancelRide(req.user!.sub, req.params.id, req.body.reason)));
