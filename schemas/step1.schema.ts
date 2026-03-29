import { z } from "zod";

export const step1Schema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(60, "Full name cannot exceed 60 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
  
  email: z
    .string()
    .email("Please enter a valid email address"),
  
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  
  class: z
    .enum(["9", "10", "11", "12"], { message: "Please select a valid class" }),
  
  board: z
    .enum(["CBSE", "ICSE", "State Board"], { message: "Please select a valid board" }),
  
  language: z
    .enum(["English", "Hindi", "Hinglish"], { message: "Please select a preferred language" }),
});

export type Step1FormValues = z.infer<typeof step1Schema>;