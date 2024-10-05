// interfaces/ILike.ts
import { Types } from "mongoose";

export interface ILike {
  user: Types.ObjectId; // User who liked the post
  post: Types.ObjectId; // The post that was liked
}