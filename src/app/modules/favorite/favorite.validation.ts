import { z } from "zod";

const createFavoriteSchema = z.object({
  body: z.object({
    user: z.string(),
    post: z.string(),
  }),
});

export const FavoriteValidations = {
  createFavoriteSchema,
};
