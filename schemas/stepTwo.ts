import { z } from "zod";

const isWithin90Days = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxFutureDate = new Date();
  maxFutureDate.setDate(today.getDate() + 90);

  return date >= today && date <= maxFutureDate;
};
export const stepTwoSchema = z.object({
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
