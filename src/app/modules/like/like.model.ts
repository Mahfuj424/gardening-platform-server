// models/Like.ts
import mongoose, { Schema } from "mongoose";
import { ILike } from "./like.interface";

const LikeSchema: Schema<ILike> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
}, { timestamps: true });

const LikeModel = mongoose.model<ILike>("Like", LikeSchema);
export default LikeModel;