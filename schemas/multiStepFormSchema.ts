import { z } from "zod";

const is18Plus = (date: Date) => {
  const today = new Date();
  const eighteen = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  return date <= eighteen;
};

export const multiStepFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .refine(
      (v) => v.split(/\s+/).filter(Boolean).length >= 2,
      "Please enter at least two words"
    ),
  email: z.email({
    pattern: z.regexes.html5Email,
    message: "Enter a valid email",
  }),
  phone: z
    .string()
    .trim()
    .regex(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, "Format: +1-123-456-7890"),
  dateOfBirth: z.date().refine(is18Plus, "You must be at least 18 years old"),
  profilePic: z
    .file()
    .max(2000000, {
      message: "File must be less then 2MB",
    })
    .mime(["image/png", "image/jpeg"], {
      message: "Only accept JPG and PNG",
    })
    .optional(),
});
