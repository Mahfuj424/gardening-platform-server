import { Schema, model } from 'mongoose';
import { IComment } from './comment.interface';

const commentSchema = new Schema<IComment>({
  content: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

const Comment = model<IComment>('Comment', commentSchema);
export default Comment;
