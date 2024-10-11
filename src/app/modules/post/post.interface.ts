import { Types } from "mongoose";

export type TPost= {
    title: string;
    content: string;
    upvotes: number;
    downvotes: number;
    comments: Types.ObjectId[]; 
  }