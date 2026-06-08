import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { prisma } from "../../db/prisma.js";
import { HttpError, ok } from "../../utils/http.js";

function signTokens(user: { id: string; role: "PASSENGER" | "DRIVER" | "ADMIN" }) {
  return {
    accessToken: jwt.sign({ sub: user.id, role: user.role }, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_TTL }),
    refreshToken: jwt.sign({ sub: user.id, role: user.role }, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_TTL })
  };
}

export async function register(input: { name: string; email: string; phone: string; password: string; role: "PASSENGER" | "DRIVER" }) {
  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      passwordHash,
      role: input.role,
      wallet: { create: {} },
      driver: input.role === "DRIVER" ? { create: { verificationStatus: "PENDING" } } : undefined
    }
  });
  return ok({ user: { id: user.id, name: user.name, role: user.role }, ...signTokens(user) });
}

export async function login(input: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) throw new HttpError(401, "Invalid credentials");
  if (user.suspendedAt) throw new HttpError(403, "Account suspended");
  return ok({ user: { id: user.id, name: user.name, role: user.role }, ...signTokens(user) });
}

export async function requestOtp(phone: string) {
  console.log(`RideShareX development OTP for ${phone}: 123456`);
  return ok({ delivered: true, provider: "console" });
}

export async function verifyOtp(phone: string, code: string) {
  if (code !== "123456") throw new HttpError(400, "Invalid OTP");
  await prisma.user.updateMany({ where: { phone }, data: { phoneVerifiedAt: new Date() } });
  return ok({ verified: true });
}
