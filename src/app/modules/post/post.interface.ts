import { Types } from "mongoose";

export type TPost = {
  user: Types.ObjectId;
  category: string;
  images: string[];
  content: string;
  upvotes: number;
  downvotes: number;
  comments: Types.ObjectId[];
  isPremium: boolean;
  viewStatus: "Public" | "Hide";
  isDeleted: boolean;
};
