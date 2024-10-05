import { Schema, model } from "mongoose";
import { IPost } from "./post.interface";

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: [String], 
    favorite: [
      {
        type: Schema.Types.ObjectId,
        ref: "Favorite",
      },
    ],
    category: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ], 
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dislike",
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true } 
);

const Post = model<IPost>("Post", postSchema);
export default Post;
