import { Router } from "express";
import { z } from "zod";
import { validate } from "../../middleware/validate.js";
import { login, register, requestOtp, verifyOtp } from "./auth.service.js";

export const authRouter = Router();

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
    password: z.string().min(8),
    role: z.enum(["PASSENGER", "DRIVER"]).default("PASSENGER")
  })
});
const loginSchema = z.object({ body: z.object({ email: z.string().email(), password: z.string().min(8) }) });
const otpSchema = z.object({ body: z.object({ phone: z.string().min(8) }) });
const verifyOtpSchema = z.object({ body: z.object({ phone: z.string().min(8), code: z.string().length(6) }) });

authRouter.post("/register", validate(registerSchema), async (req, res) => res.status(201).json(await register(req.body)));
authRouter.post("/login", validate(loginSchema), async (req, res) => res.json(await login(req.body)));
authRouter.post("/otp/request", validate(otpSchema), async (req, res) => res.json(await requestOtp(req.body.phone)));
authRouter.post("/otp/verify", validate(verifyOtpSchema), async (req, res) => res.json(await verifyOtp(req.body.phone, req.body.code)));
authRouter.get("/google", (_req, res) => res.status(501).json({ error: "Configure OAuth client and callback URL to enable Google login" }));
