import { Types } from "mongoose";

export type TComment = {
  user: Types.ObjectId;
  text: string;
  upvotes: number;
  downvotes: number;
  isUpvotedIP: string[];
  isDownvotedIP: string[];
  post: Types.ObjectId;
};
