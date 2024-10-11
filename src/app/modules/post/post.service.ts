import { TPost } from "./post.interface"
import { Post } from "./post.model"

const createPostIntoDB=async(payload:TPost)=>{
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