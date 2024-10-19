import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CommentServices } from "./comment.service";


const createCommentInto=catchAsync(async(req,res)=>{
    const result=await CommentServices.createCommentIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        status:true,
        message:"Successfully Done. ",
        data:result
    })
})
const updateCommentInto=catchAsync(async(req,res)=>{
    const {commentId}=req.params
    const result=await CommentServices.updateCommentIntoDB(commentId,req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        status:true,
        message:"The Comment was updated",
        data:result
    })
})
const deleteComment=catchAsync(async(req,res)=>{
    const {commentId}=req.params
    const result=await CommentServices.deleteCommentDB(commentId)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        status:true,
        message:"The comment was deleted.",
        data:result
    })
})
const upvoteInto=catchAsync(async(req,res)=>{
    const {commentId}=req.params
    const result=await CommentServices.upvoteIntoDB(commentId,req.query as Record<string,undefined>)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        status:true,
        message:"Successfull ",
        data:result
    })
})
const downvoteInto=catchAsync(async(req,res)=>{
    const {commentId}=req.params
    const result=await CommentServices.downvoteIntoDB(commentId,req.query as Record<string,undefined>)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        status:true,
        message:"Successfull ",
        data:result
    })
})
export const CommentController={
    createCommentInto,
    updateCommentInto,
    deleteComment,
    upvoteInto,
    downvoteInto
}