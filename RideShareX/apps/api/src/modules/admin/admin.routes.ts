import { Router } from "express";
import { prisma } from "../../db/prisma.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { ok } from "../../utils/http.js";

export const adminRouter = Router();
adminRouter.use(requireAuth, requireRole("ADMIN"));

adminRouter.get("/analytics", async (_req, res) => {
  const [users, drivers, activeRides, bookings, verificationRequests] = await Promise.all([
    prisma.user.count(),
    prisma.driver.count(),
    prisma.ride.count({ where: { status: { in: ["PUBLISHED", "ONGOING"] } } }),
    prisma.booking.count(),
    prisma.driverVerification.count({ where: { status: "UNDER_REVIEW" } })
  ]);
  res.json(ok({ users, drivers, activeRides, bookings, verificationRequests }));
});

adminRouter.patch("/drivers/:driverId/verification", async (req, res) => {
  res.json(ok(await prisma.driver.update({ where: { id: req.params.driverId }, data: { verificationStatus: req.body.status } })));
});

adminRouter.patch("/users/:userId/suspend", async (req, res) => {
  res.json(ok(await prisma.user.update({ where: { id: req.params.userId }, data: { suspendedAt: req.body.suspended ? new Date() : null } })));
});
