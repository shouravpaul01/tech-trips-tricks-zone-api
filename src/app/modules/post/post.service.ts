import httpStatus from "http-status";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import { TPost } from "./post.interface";
import { Post } from "./post.model";

const createPostIntoDB = async (files: any, payload: TPost) => {
  if (files.length > 0) {
    payload.images = files?.map((file: any) => file.path);
  }
  const result = await Post.create(payload);
  return result;
};
const getAllPostsDB = async (query: Record<string, undefined>) => {
  const searchableFields = ["name"];
  const mainQuery = new QueryBuilder(Post.find({}).populate("user").populate("comments"), query)
    .search(searchableFields)
    .filter()
    .paginate();

  const result = await mainQuery.modelQuery;

  return {data:result,page:Number(query?.page) || 1};
};
const getSinglePostDB = async (postId: string) => {
  const result = await Post.findById(postId).populate("user").populate("comments");
  // if (!result) {
  //   throw new AppError(httpStatus.NOT_FOUND, "postError", "Post no found.");
  // }
  return result;
};
const updatePostIntoDB = async (postId: string, payload: TPost) => {
  const result = await Post.findByIdAndUpdate(postId, payload, { new: true });
  return result;
};
export const PostServices = {
  createPostIntoDB,
  getSinglePostDB,
  updatePostIntoDB,
  getAllPostsDB,
};
