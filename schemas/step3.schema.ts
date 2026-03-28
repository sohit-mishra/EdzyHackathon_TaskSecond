import { z } from "zod";

export const step3Schema = z.object({
  pincode: z.string().regex(/^\d{6}$/),
  state: z.string(),
  city: z.string(),
  address: z.string().min(10).max(120),
  guardianName: z.string(),
  guardianMobile: z.string().regex(/^[6-9]\d{9}$/),
  plan: z.enum(["Quarterly", "Half-Yearly", "Annual"]),
  payment: z.enum(["UPI", "Card", "NetBanking"]),
});