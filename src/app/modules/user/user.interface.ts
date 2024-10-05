import { Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  isVerified: boolean;
  premiumAccess: boolean;
  posts: Types.ObjectId[];
  role: string;
}
