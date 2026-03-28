import { z } from "zod";

export const step1Schema = z.object({
  fullName: z.string().min(2).max(60),
  email: z.string().email(),
  mobile: z.string().regex(/^[6-9]\d{9}$/),
  class: z.enum(["9", "10", "11", "12"]),
  board: z.enum(["CBSE", "ICSE", "State Board"]),
  language: z.enum(["English", "Hindi", "Hinglish"]),
});