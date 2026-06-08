import { prisma } from "../../db/prisma.js";
import { HttpError, ok } from "../../utils/http.js";

export async function bookSeat(passengerId: string, input: { rideId: string; seats: number; pickupAddress: string; dropAddress: string }) {
  const booking = await prisma.$transaction(async (tx) => {
    const ride = await tx.ride.findUnique({ where: { id: input.rideId } });
    if (!ride || ride.status !== "PUBLISHED") throw new HttpError(404, "Ride not available");
    if (ride.remainingSeats < input.seats) throw new HttpError(409, "Not enough seats available");
    await tx.ride.update({ where: { id: ride.id }, data: { remainingSeats: { decrement: input.seats } } });
    return tx.booking.create({
      data: {
        passengerId,
        rideId: ride.id,
        seats: input.seats,
        pickupAddress: input.pickupAddress,
        dropAddress: input.dropAddress,
        fare: Number(ride.pricePerSeat) * input.seats,
        status: "PENDING"
      }
    });
  });
  return ok(booking);
}

export async function cancelBooking(userId: string, bookingId: string, reason?: string) {
  const booking = await prisma.$transaction(async (tx) => {
    const current = await tx.booking.findUnique({ where: { id: bookingId } });
    if (!current) throw new HttpError(404, "Booking not found");
    if (current.passengerId !== userId) throw new HttpError(403, "Cannot cancel this booking");
    await tx.ride.update({ where: { id: current.rideId }, data: { remainingSeats: { increment: current.seats } } });
    return tx.booking.update({ where: { id: bookingId }, data: { status: "CANCELLED", cancellationReason: reason } });
  });
  return ok(booking);
}

export async function decideBooking(driverUserId: string, bookingId: string, accepted: boolean) {
  const driver = await prisma.driver.findUnique({ where: { userId: driverUserId } });
  const booking = await prisma.booking.findFirst({ where: { id: bookingId, ride: { driverId: driver?.id } } });
  if (!booking) throw new HttpError(404, "Booking not found");
  return ok(await prisma.booking.update({ where: { id: bookingId }, data: { status: accepted ? "CONFIRMED" : "CANCELLED" } }));
}
