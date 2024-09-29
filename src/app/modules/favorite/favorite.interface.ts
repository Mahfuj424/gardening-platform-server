import { Types } from "mongoose";

export interface IFavorite {
    user: Types.ObjectId;
    post: Types.ObjectId;
  }
  