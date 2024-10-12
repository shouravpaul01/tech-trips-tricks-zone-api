import { TPost } from "./post.interface"
import { Post } from "./post.model"

const createPostIntoDB=async(files:any,payload:TPost)=>{
    if (files.length>0) {
        payload.images=files?.map((file:any)=>file.path)
    }
    const result=await Post.create(payload)
    return result
}
const updatePostIntoDB=async(postId:string,payload:TPost)=>{
    const result=await Post.findByIdAndUpdate(postId,payload,{new:true})
    return result
}
export const PostServices={
    createPostIntoDB,
    updatePostIntoDB
}