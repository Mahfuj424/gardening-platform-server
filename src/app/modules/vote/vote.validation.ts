import { z } from 'zod';

export const createVoteSchema = z.object({
  user: z.string(),
  post: z.string(),
  voteType: z.enum(['like', 'dislike']),
});
