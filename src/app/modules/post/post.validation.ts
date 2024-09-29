import { z } from "zod";

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    content: z.string().min(10, "Content must be at least 10 characters long"),
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
