// interfaces/IDislike.ts
import { Types } from "mongoose";

export interface IDislike {
  user: Types.ObjectId; // User who disliked the post
  post: Types.ObjectId; // The post that was disliked
}