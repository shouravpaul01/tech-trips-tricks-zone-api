import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { Post } from "../post/post.model";
import { TComment } from "./comment.interface"
import { Comment } from "./comment.model"
import mongoose from "mongoose";


const createCommentIntoDB = async (payload: TComment) => {
  // Start a new Mongoose session
  const session = await mongoose.startSession();
  
  try {
    // Start a transaction within the session
    session.startTransaction();

   
    const commentResult = await Comment.create([payload], { session });


   await Post.findByIdAndUpdate(
      payload.post,
      { $push: { comments: commentResult[0]._id } },
      { session }
    );

 
    await session.commitTransaction();
    
    // End the session
    session.endSession();

    
    return commentResult[0];
  } catch (error:any) {
    // If any operation fails, abort the transaction
    await session.abortTransaction();
    session.endSession();


    throw new AppError(httpStatus.NOT_FOUND,"commentError","Failed to comment.");
  }
};

const updateCommentIntoDB=async(commentId:string,payload:TComment)=>{
    const result=await Comment.findByIdAndUpdate(commentId,payload,{new:true})
    return result
}
const deleteCommentDB=async(commentId:string)=>{
  const result=await Comment.findByIdAndDelete(commentId)
  return result
}
const upvoteIntoDB = async (
  commentId: string,
  query: Record<string, undefined>
) => {
  // Extract the IP address of the user
  if (!query.ipAddress) {
    throw new AppError(httpStatus.NOT_FOUND, "postError", "Network problem!.");
  }

  const isPostExists = await Comment.findById(commentId);
  if (!isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, "postError", "Post not found.");
  }
  if (!isPostExists?.isUpvotedIP.includes(query.ipAddress!)) {
    const result = await Comment.findByIdAndUpdate(commentId, {
      $inc: { upvotes: 1 }, // Increment the upvote count
      $push: { isUpvotedIP: query.ipAddress! }, // Add the IP to the upvoted list
    },{new:true});
    return result;
  }
  // Check if the IP has already voted
  if (isPostExists.isUpvotedIP.includes(query.ipAddress!)) {
    const result = await Comment.findByIdAndUpdate(commentId, {
      $pull: { isUpvotedIP: query.ipAddress! },
      $inc: { upvotes: -1 },
    },{new:true});
    return result;
  }
};
const downvoteIntoDB = async (
  commentId: string,
  query: Record<string, undefined>
) => {
  // Extract the IP address of the user
  if (!query.ipAddress) {
    throw new AppError(httpStatus.NOT_FOUND, "postError", "Network problem!.");
  }

  const isPostExists = await Comment.findById(commentId);
  if (!isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, "postError", "Comment not found.");
  }
  if (!isPostExists?.isDownvotedIP.includes(query.ipAddress!)) {
    const result = await Comment.findByIdAndUpdate(commentId, {
      $inc: { downvotes: 1 },
      $push: { isDownvotedIP: query.ipAddress! },
    },{new:true});
    return result;
  }
  // Check if the IP has already voted
  if (isPostExists.isDownvotedIP.includes(query.ipAddress!)) {
    const result = await Comment.findByIdAndUpdate(commentId, {
      $pull: { isDownvotedIP: query.ipAddress! },
      $inc: { downvotes: -1 },
    },{new:true});
    return result;
  }
};
export const CommentServices={
    createCommentIntoDB,
    updateCommentIntoDB,
    upvoteIntoDB,
    downvoteIntoDB,
    deleteCommentDB
}