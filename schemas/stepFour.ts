import { z } from "zod";

export const stepFourSchema = z.object({
  contactName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .refine(
      (v) => v.split(/\s+/).filter(Boolean).length >= 2,
      "Please enter at least two words"
    ),
  relationship: z.string({ error: "Please Select the relative!" }),
  phone: z
    .string({ error: "Please provide a contact number!" })
    .trim()
    .regex(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, "Format: +1-123-456-7890"),
  guardianName: z
    .string()
    .trim()
    .min(1, "Guardian name is required")
    .refine(
      (v) => v.split(/\s+/).filter(Boolean).length >= 2,
      "Please enter at least two words"
    ),
  guardianPhone: z
    .string({ error: "Please provide a contact number!" })
    .trim()
    .regex(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, "Format: +1-123-456-7890"),
});
