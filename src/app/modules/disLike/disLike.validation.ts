import { z } from "zod";

const createDisLikeSchema = z.object({
  body: z.object({
    userId: z.string(),
  }),
});

export const DisLikeValidations = {
  createDisLikeSchema,
};
