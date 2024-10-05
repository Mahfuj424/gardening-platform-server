import { Types } from "mongoose";

export interface IPost {
  title: string;
  content: string;
  images: string[];
  favorite:Types.ObjectId[];
  category: string;
  likes: Types.ObjectId[]; 
  dislikes: Types.ObjectId[]; 
  author: Types.ObjectId;
  isPremium: boolean;
  comments: Types.ObjectId[];
}
