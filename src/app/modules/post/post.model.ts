import { model, Schema, Types } from "mongoose";
import { TPost } from "./post.interface";

const postSchema = new Schema<TPost>({
  // category: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Category",
  // },
  user:{
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  
  category: {
    type: String,
    
  },
  images: [
    {
      type: String,
    },
  ],
  content: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  comments: [
    {
      type: Types.ObjectId,
      ref: "Comment",
    },
  ],
  isPremium: {
    type: Boolean,
    default: false,
  },
  viewStatus: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Post = model<TPost>("Post", postSchema);
