import { model, Schema } from "mongoose";
import { TComment } from "./comment.interface";

const commentSchema = new Schema<TComment>({
    text: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  });

  export const Comment=model<TComment>("Comment",commentSchema)