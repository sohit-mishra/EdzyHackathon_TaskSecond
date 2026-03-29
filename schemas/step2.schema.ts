import { z } from "zod";

export const step2Schema = z
  .object({
    // Class (needed for dynamic subject validation)
    class: z.enum(["9", "10", "11", "12"], {
      message: "Class is required",
    }),

    // Subjects
    subjects: z
      .array(z.string())
      .min(1, "Please select at least one subject"),

    // Exam Goal
    goal: z
      .string()
      .min(1, "Please select an exam goal"),

    // Weekly Study Hours
    hours: z
      .union([z.number(), z.string()])
      .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
      .refine((val) => val >= 1 && val <= 40, {
        message: "Hours must be between 1 and 40",
      }),

    // Scholarship Toggle  
    scholarship: z.boolean(),

    // Conditional field
    percentage: z
      .union([z.number(), z.string()])
      .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
      .refine((val) => val >= 0 && val <= 100, {
        message: "Percentage must be between 0 and 100",
      })
      .nullable()
      .optional(),

    // Optional
    achievements: z
      .string()
      .max(500, "Achievements cannot exceed 500 characters")
      .optional(),
  })
  .superRefine((data, ctx) => {
    // ✅ SUBJECT VALIDATION (MAIN LOGIC)

    if (data.class === "9" || data.class === "10") {
      if (!data.subjects || data.subjects.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["subjects"],
          message: "Select at least 2 subjects for Class 9-10",
        });
      }
    }

    if (data.class === "11" || data.class === "12") {
      if (!data.subjects || data.subjects.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["subjects"],
          message: "Select at least 3 subjects for Class 11-12",
        });
      }
    }

    // ✅ SCHOLARSHIP CONDITIONAL VALIDATION

    if (data.scholarship) {
      if (data.percentage === null || data.percentage === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["percentage"],
          message: "Percentage is required when applying for scholarship",
        });
      } else if (isNaN(data.percentage)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["percentage"],
          message: "Please enter a valid percentage",
        });
      }
    }
  });

export type Step2FormValues = z.infer<typeof step2Schema>;