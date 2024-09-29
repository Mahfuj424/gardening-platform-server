import { z } from "zod";

export const createFavoriteSchema = z.object({
  user: z.string(),
  post: z.string(),
});
