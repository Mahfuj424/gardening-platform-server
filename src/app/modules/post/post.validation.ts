import { z } from "zod";

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title must be at least 1 characters long"),
    content: z.string().optional(),
    images: z.array(z.string()).optional(),
    category: z.string(),
    isPremium: z.boolean().default(false),
  }),
});

export const updatePostSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    content: z.string().min(10).optional(),
    images: z.array(z.string()).optional(),
    category: z.string().optional(),
    isPremium: z.boolean().optional(),
  }),
});

export const PostValidations = {
  createPostSchema,
  updatePostSchema,
};
