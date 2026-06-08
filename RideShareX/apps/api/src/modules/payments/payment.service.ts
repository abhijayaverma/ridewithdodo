import { prisma } from "../../db/prisma.js";
import { ok } from "../../utils/http.js";

export async function createPaymentIntent(userId: string, input: { bookingId: string; provider: "STRIPE" | "RAZORPAY" }) {
  const booking = await prisma.booking.findFirstOrThrow({ where: { id: input.bookingId, passengerId: userId } });
  const payment = await prisma.payment.create({
    data: { bookingId: booking.id, userId, amount: booking.fare, currency: "INR", provider: input.provider, status: "PENDING" }
  });
  return ok({ payment, clientSecret: `${input.provider.toLowerCase()}_configure_real_provider` });
}

export async function handleWebhook(provider: string, payload: unknown) {
  return ok({ received: true, provider, payloadType: typeof payload });
}
