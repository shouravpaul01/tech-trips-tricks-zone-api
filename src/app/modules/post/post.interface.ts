import { Types } from "mongoose";

export type TPost= {
    category:string
    images:string[],
    content: string;
    upvotes: number;
    downvotes: number;
    comments: Types.ObjectId[]; 
    isPremium:boolean,
    viewStatus:"Public" | "Hide",
    isDeleted:boolean
  }