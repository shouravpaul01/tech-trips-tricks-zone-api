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
        message:"Successfully Updated. ",
        data:result
    })
})

export const CommentController={
    createCommentInto,
    updateCommentInto
}