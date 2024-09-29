import { z } from "zod";

export const createCommentSchema = z.object({
  content: z.string().min(3, "Comment must be at least 3 characters long"),
  post: z.string(),
  author: z.string(),
});

export const updateCommentSchema = z.object({
  content: z.string().min(3).optional(),
});

export const CommentValidation = {
  createCommentSchema,
  updateCommentSchema,
};
