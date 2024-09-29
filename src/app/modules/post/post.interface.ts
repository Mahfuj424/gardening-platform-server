import { Types } from "mongoose";

export interface IPost {
  title: string;
  content: string;
  images: string[];
  category: string;
  like: number;
  dislike: number;
  author: Types.ObjectId;
  isPremium: boolean;
  comments: string[];
}
