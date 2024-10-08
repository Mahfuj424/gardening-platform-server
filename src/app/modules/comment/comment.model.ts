import { Schema, model } from "mongoose";
import { IComment } from "./comment.interface";

const commentSchema = new Schema<IComment>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true }, // User reference
    commentText: { type: String,}, // Comment content
    commentImage: { type: String },
    // replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],  // Nested replies
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

export const Comment = model<IComment>("Comment", commentSchema);
