import { Types } from "mongoose";

export type TPost = {
  user: Types.ObjectId;
  type:"Free" | "Premium"
  category: string;
  images: string[];
  content: string;
  upvotes: number;
  downvotes: number;
  isUpvotedIP: string[];
  isDownvotedIP: string[];
  comments: Types.ObjectId[];
  isPremium: boolean;
  viewStatus: "Public" | "Hide";
  isDeleted: boolean;
};
