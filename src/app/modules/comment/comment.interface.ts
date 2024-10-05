import { Types } from "mongoose";

export interface IComment {
  author: Types.ObjectId;    // Reference to the User who commented
  commentImage? : string ;
  commentText?: string;           // Comment content
  // replies: Types.ObjectId[]; // Nested replies (array of Comment IDs)
}
