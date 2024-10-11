import { Types } from "mongoose";

export type TComment= {
    text: string;
    upvotes: number;
    downvotes: number;
    post: Types.ObjectId; 
  }