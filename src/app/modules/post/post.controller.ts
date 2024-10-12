import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PostServices } from "./post.service";

const createPostInto=catchAsync(async(req,res)=>{
    const result=await PostServices.createPostIntoDB((req as any).files,req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        status:true,
        message:"Successfully Done. ",
        data:result
    })
})
const updatePostInto=catchAsync(async(req,res)=>{
    const {postId}=req.params
    const result=await PostServices.updatePostIntoDB(postId,req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        status:true,
        message:"Successfully Updated. ",
        data:result
    })
})

export const PostController={
    createPostInto,
    updatePostInto
}