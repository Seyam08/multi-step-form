import { z } from "zod";

export const stepThreeSchema = z.object({
  skills: z
    .array(z.string())
    .min(3, { message: "You must select at least 3 items." }),
  experience: z.array(z.string().min(1, { message: "Share your experience" })),
  preferWorkTime: z.object(
    {
      start: z.string(),
      end: z.string(),
    },
    {
      error: "Please select your preferable work time",
    }
  ),
  remotePrefer: z
    .number({ error: "Choose your Remote preference" })
    .min(0, { error: "Choose your Remote preference" })
    .max(100, {
      error: "Choose your Remote preference",
    }),
  managerApprove: z.boolean().optional(),
  notes: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(500, {
      message: "Bio must not be longer than 30 characters.",
    })
    .optional(),
});
