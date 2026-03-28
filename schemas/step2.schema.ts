import { z } from "zod";

export const step2Schema = z
  .object({
    subjects: z.array(z.string()),
    goal: z.string(),
    hours: z.number().min(1).max(40),
    scholarship: z.boolean(),
    percentage: z.number().min(0).max(100).optional(),
    achievements: z.string().optional(),
  })
  .refine((data) => {
    if (data.scholarship) return data.percentage !== undefined;
    return true;
  }, { message: "Percentage required if scholarship selected" });