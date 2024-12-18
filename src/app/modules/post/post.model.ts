import { model, Schema, Types } from "mongoose";
import { TPost } from "./post.interface";

const postSchema = new Schema<TPost>({
  // category: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Category",
  // },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["Free", "Premium"],
    default:"Free"
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
  isUpvotedIP: [
    {
      type: String,
    },
  ],
  isDownvotedIP: [
    {
      type: String,
    },
  ],
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
},{
  timestamps:true
});

export const Post = model<TPost>("Post", postSchema);
