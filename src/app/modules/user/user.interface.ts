import { Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  gander: string;
  password: string;
  profileImage?: string;
  bannerImage?: string;
  favorites: Types.ObjectId[];
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  isVerified: boolean;
  premiumAccess: boolean;
  posts: Types.ObjectId[];
  role: string;
}
