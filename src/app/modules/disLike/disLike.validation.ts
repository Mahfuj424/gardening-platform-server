import { z } from "zod";

const createDisLikeSchema = z.object({
  body: z.object({
    author: z.string(),
  }),
});

export const DisLikeValidations = {
  createDisLikeSchema,
};
