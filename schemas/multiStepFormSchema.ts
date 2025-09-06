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
const isWithin90Days = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // শুধু দিন compare করার জন্য সময় reset

  const maxFutureDate = new Date();
  maxFutureDate.setDate(today.getDate() + 90);

  return date >= today && date <= maxFutureDate;
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
    error: "Enter a valid email",
  }),
  phone: z
    .string()
    .trim()
    .regex(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, "Format: +1-123-456-7890"),
  dateOfBirth: z.date().refine(is18Plus, "You must be at least 18 years old"),
  profilePic: z
    .file()
    .max(2000000, {
      error: "File must be less then 2MB",
    })
    .mime(["image/png", "image/jpeg"], {
      error: "Only accept JPG and PNG",
    })
    .optional(),
  department: z.string({ error: "Please Select a department!" }),
  position: z.string().min(3, { error: "At least 3 characters!" }),
  startDate: z.date().refine(isWithin90Days, "Can't hire you after 90 days!"),
  jobType: z.enum(["full-time", "part-time", "contract"], {
    error: "You need to select a type.",
  }),
  salaryExpt: z
    .number({ error: "Select your job type and express your expectation!" })
    .min(50, { error: "Select your job type and express your expectation!" })
    .max(200000, {
      error: "Select your job type and express your expectation!",
    }),
  manager: z.string({ error: "Select a Manager" }),
});
