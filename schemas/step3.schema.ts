import { z } from "zod";

export const step3Schema = z.object({
  pincode: z
    .string()
    .regex(/^\d{6}$/, "PIN code must be exactly 6 digits"),
  
  state: z
    .string()
    .min(2, "Please select a valid state"),
  
  city: z
    .string()
    .min(2, "Please enter a valid city name"),
  
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(120, "Address cannot exceed 120 characters"),
  
  guardianName: z
    .string()
    .min(2, "Guardian name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "Guardian name can only contain letters and spaces"),
  
  guardianMobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  
  plan: z
    .enum(["Quarterly", "Half-Yearly", "Annual"], {
      message: "Please select a payment plan",
    }),
  
  payment: z
    .enum(["UPI", "Card", "NetBanking"], {
      message: "Please select a payment mode",
    }),
});

export type Step3FormValues = z.infer<typeof step3Schema>;