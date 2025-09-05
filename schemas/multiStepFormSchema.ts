import { z } from "zod";

export const multiStepFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email({ pattern: z.regexes.email }),
});
