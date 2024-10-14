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
const getAllPosts=catchAsync(async(req,res)=>{
    console.log('sessssssssssss')
    const result=await PostServices.getAllPostsDB(req.query as Record<string,undefined>)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        status:true,
        message:"Retrieved all posts ",
        data:result
    })
})
const getSinglePost=catchAsync(async(req,res)=>{
    console.log('se')
   const {postId}=req.params
    const result=await PostServices.getSinglePostDB(postId)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        status:true,
        message:"Retrieved single post. ",
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
    getAllPosts,
    getSinglePost,
    updatePostInto
}