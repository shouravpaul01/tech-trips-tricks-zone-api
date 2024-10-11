import { Types } from "mongoose";

export type TPost= {
    title: string;
    category:Types.ObjectId
    content: string;
    upvotes: number;
    downvotes: number;
    comments: Types.ObjectId[]; 
    isPremium:boolean,
    viewStatus:"Public" | "Hide",
    isDeleted:boolean
  }