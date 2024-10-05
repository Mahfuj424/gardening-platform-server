import mongoose, { Schema } from "mongoose";
import { IDislike } from "./disLike.interface";

const DislikeSchema: Schema<IDislike> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
}, { timestamps: true });

const DislikeModel = mongoose.model<IDislike>("Dislike", DislikeSchema);
export default DislikeModel;