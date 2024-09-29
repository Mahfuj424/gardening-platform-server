import { z } from 'zod';

export const createNotificationSchema = z.object({
  user: z.string(),
  message: z.string(),
  isRead: z.boolean().default(false),
});

export const updateNotificationSchema = z.object({
  message: z.string().optional(),
  isRead: z.boolean().optional(),
});
