import { prisma } from "../../db/prisma.js";
import { HttpError, ok } from "../../utils/http.js";

export async function createRide(userId: string, input: any) {
  const driver = await prisma.driver.findUnique({ where: { userId } });
  if (!driver) throw new HttpError(404, "Driver profile not found");
  if (driver.verificationStatus !== "APPROVED") throw new HttpError(403, "Driver must be verified before publishing rides");
  const ride = await prisma.ride.create({
    data: {
      driverId: driver.id,
      vehicleId: input.vehicleId,
      sourceAddress: input.sourceAddress,
      sourceLat: input.sourceLat,
      sourceLng: input.sourceLng,
      destinationAddress: input.destinationAddress,
      destinationLat: input.destinationLat,
      destinationLng: input.destinationLng,
      departureAt: input.departureAt,
      estimatedArrivalAt: input.estimatedArrivalAt,
      pricePerSeat: input.pricePerSeat,
      totalSeats: input.totalSeats,
      remainingSeats: input.totalSeats,
      luggageAllowance: input.luggageAllowance,
      genderPreference: input.genderPreference,
      status: "PUBLISHED",
      stops: { create: input.stops }
    },
    include: { stops: true, vehicle: true, driver: { include: { user: true } } }
  });
  return ok(ride);
}

export async function searchRides(query: any) {
  const where: any = { status: "PUBLISHED", remainingSeats: { gte: Number(query.seats ?? 1) } };
  if (query.source) where.sourceAddress = { contains: query.source, mode: "insensitive" };
  if (query.destination) where.destinationAddress = { contains: query.destination, mode: "insensitive" };
  if (query.maxPrice) where.pricePerSeat = { lte: Number(query.maxPrice) };
  if (query.verifiedOnly) where.driver = { is: { verificationStatus: "APPROVED" } };
  if (query.date) {
    const start = new Date(query.date);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    where.departureAt = { gte: start, lt: end };
  }
  const orderBy = query.sort === "price" ? { pricePerSeat: "asc" as const } : { departureAt: "asc" as const };
  const rides = await prisma.ride.findMany({ where, orderBy, include: { driver: { include: { user: true } }, vehicle: true, stops: true } });
  return ok(rides);
}

export async function updateRide(userId: string, rideId: string, patch: any) {
  const driver = await prisma.driver.findUnique({ where: { userId } });
  const ride = await prisma.ride.findFirst({ where: { id: rideId, driverId: driver?.id } });
  if (!ride) throw new HttpError(404, "Ride not found");
  return ok(await prisma.ride.update({ where: { id: rideId }, data: patch }));
}

export async function cancelRide(userId: string, rideId: string, reason?: string) {
  const ride = await prisma.ride.update({ where: { id: rideId }, data: { status: "CANCELLED", cancellationReason: reason } });
  await prisma.adminLog.create({ data: { actorId: userId, action: "RIDE_CANCELLED", targetType: "Ride", targetId: rideId, metadata: { reason } } });
  return ok(ride);
}
