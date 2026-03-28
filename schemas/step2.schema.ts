import { z } from "zod";

export const step2Schema = z
  .object({
    // Class (needed for dynamic subject validation)
    class: z.enum(["9", "10", "11", "12"]),

    // Subjects
    subjects: z.array(z.string()),

    // Exam Goal
    goal: z
      .string()
      .min(1, "Exam goal is required"),

    // Weekly Study Hours (FIXED with coerce)
    hours: z
      .coerce.number({
        message: "Enter valid number",
      })
      .min(1, "Minimum 1 hour")
      .max(40, "Maximum 40 hours"),

    // Scholarship Toggle
    scholarship: z.boolean(),

    // Conditional field
    percentage: z
      .coerce.number()
      .min(0, "Min 0")
      .max(100, "Max 100")
      .optional(),

    // Optional
    achievements: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // ✅ SUBJECT VALIDATION (MAIN LOGIC)

    if (data.class === "9" || data.class === "10") {
      if (data.subjects.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["subjects"],
          message: "Select at least 2 subjects",
        });
      }
    }

    if (data.class === "11" || data.class === "12") {
      if (data.subjects.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["subjects"],
          message: "Select at least 3 subjects",
        });
      }
    }

    // ✅ SCHOLARSHIP CONDITIONAL VALIDATION

    if (data.scholarship) {
      if (data.percentage === undefined || isNaN(data.percentage)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["percentage"],
          message: "Percentage is required when applying for scholarship",
        });
      }
    }
  });

export type Step2FormValues = z.infer<typeof step2Schema>;