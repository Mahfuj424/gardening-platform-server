import { z } from "zod";

const createLikeSchema = z.object({
  body: z.object({
    userId: z.string(),
  }),
});

export const LikeValidations = {
  createLikeSchema,
};
