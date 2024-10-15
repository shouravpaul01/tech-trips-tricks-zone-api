import { model, Schema } from "mongoose";
import { TComment } from "./comment.interface";

const commentSchema = new Schema<TComment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
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
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

export const Comment = model<TComment>("Comment", commentSchema);
