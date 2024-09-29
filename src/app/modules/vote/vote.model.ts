import { Schema, model } from 'mongoose';
import { IVote } from './vote.interface';

const voteSchema = new Schema<IVote>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  voteType: { type: String, enum: ['like', 'dislike'], required: true }
}, { timestamps: true });

const Vote = model<IVote>('Vote', voteSchema);
export default Vote;
