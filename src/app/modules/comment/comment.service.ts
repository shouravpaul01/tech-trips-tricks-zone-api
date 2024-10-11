import { TComment } from "./comment.interface"
import { Comment } from "./comment.model"

const createCommentIntoDB=async(payload:TComment)=>{
    const result=await Comment.create(payload)
    return result
}
const updateCommentIntoDB=async(commentId:string,payload:TComment)=>{
    const result=await Comment.findByIdAndUpdate(commentId,payload,{new:true})
    return result
}
export const CommentServices={
    createCommentIntoDB,
    updateCommentIntoDB
}