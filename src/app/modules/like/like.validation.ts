import { z } from "zod";

const createLikeSchema = z.object({
  body: z.object({
    author: z.string(),
  }),
});

export const LikeValidations = {
  createLikeSchema,
};
