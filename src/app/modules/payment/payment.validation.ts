import { z } from "zod";

export const createPaymentSchema = z.object({
  user: z.string(),
  amount: z.number().min(1, "Amount must be greater than 0"),
  status: z.enum(["Pending", "Completed", "Failed"]),
  method: z.enum(["Stripe", "Aamarpay"]),
});

export const updatePaymentSchema = z.object({
  status: z.enum(["Pending", "Completed", "Failed"]).optional(),
});
