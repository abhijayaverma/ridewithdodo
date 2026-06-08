import { prisma } from "../../db/prisma.js";
import { ok } from "../../utils/http.js";

export async function listMessages(rideId: string) {
  const conversation = await prisma.chat.findUnique({ where: { rideId }, include: { messages: { orderBy: { createdAt: "asc" } } } });
  return ok(conversation?.messages ?? []);
}

export async function sendMessage(rideId: string, senderId: string, input: { body: string; imageUrl?: string }) {
  const chat = await prisma.chat.upsert({ where: { rideId }, create: { rideId }, update: {} });
  const message = await prisma.message.create({ data: { chatId: chat.id, senderId, body: input.body, imageUrl: input.imageUrl } });
  return ok(message);
}
