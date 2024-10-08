import { model, Schema } from "mongoose";
import { IFollowing } from "./following.interface";

const followingSchema: Schema<IFollowing> = new Schema(
  {
    myUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Following = model<IFollowing>("Following", followingSchema)
