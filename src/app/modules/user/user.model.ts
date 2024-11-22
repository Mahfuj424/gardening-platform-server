import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gander: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    bannerImage: { type: String },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Favorite" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isVerified: { type: Boolean, default: false },
    premiumAccess: { type: Boolean, default: false },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);
export default User;
