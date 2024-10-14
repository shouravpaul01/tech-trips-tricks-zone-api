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


    const postResult = await Post.findByIdAndUpdate(
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
export const CommentServices={
    createCommentIntoDB,
    updateCommentIntoDB
}