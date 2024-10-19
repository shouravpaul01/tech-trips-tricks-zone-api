import httpStatus from "http-status";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import { TPost } from "./post.interface";
import { Post } from "./post.model";
import { deleteFileFromCloudinary } from "../../utils/deleteFileFromCloudinary";

const createPostIntoDB = async (files: any, payload: TPost) => {
  if (files.length > 0) {
    payload.images = files?.map((file: any) => file.path);
  }
  const result = await Post.create(payload);
  return result;
};
const getAllPostsDB = async (query: Record<string, undefined>) => {
  console.log(query);
  const searchableFields = ["name"];
  const mainQuery = new QueryBuilder(
    Post.find({}).populate("user").populate({
      path: "comments", // Populating the comments
      populate: {
        path: "user", // Populating the user inside each comment
        model: "User", // Referencing the User model
      },
    }),
    query
  )
    .search(searchableFields)
    .filter()
    .paginate();

  const result = await mainQuery.modelQuery;

  return { data: result, page: Number(query?.page) || 1 };
};
const getSinglePostDB = async (postId: string) => {
  const result = await Post.findById(postId)
    .populate("user")
    .populate({
      path: "comments", // Populating the comments
      populate: {
        path: "user", // Populating the user inside each comment
        model: "User", // Referencing the User model
      },
    });
  // if (!result) {
  //   throw new AppError(httpStatus.NOT_FOUND, "postError", "Post no found.");
  // }
  return result;
};
const updatePostIntoDB = async (postId: string, files: any, payload: TPost) => {
  const isExistsPost = await Post.findById(postId);

  if (!isExistsPost) {
    throw new AppError(httpStatus.NOT_FOUND, "postError", "Post not found.");
  }

  if (files.length > 0) {
    const newImages = files.map((file: any) => file.path);

    // Combine the existing images from the post with the new images
    payload.images = [...isExistsPost.images, ...newImages];
  }
  const result = await Post.findByIdAndUpdate(postId, payload, { new: true });
  return result;
};
const removePostImageDB = async (query: Record<string, undefined>) => {
  const isExistsPost = await Post.findById(query.postId);

  if (!isExistsPost) {
    throw new AppError(httpStatus.NOT_FOUND, "postError", "Post not found.");
  }

  const result = await Post.findByIdAndUpdate(
    query.postId,
    {
      $pull: { images: query.image },
    },
    { new: true }
  );
  if (result) {
    await deleteFileFromCloudinary(query.image!);
  }
  return result;
};
const upvoteIntoDB = async (
  postId: string,
  query: Record<string, undefined>
) => {
  // Extract the IP address of the user
  if (!query.ipAddress) {
    throw new AppError(httpStatus.NOT_FOUND, "postError", "Network problem!.");
  }

  const isPostExists = await Post.findById(postId);
  if (!isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, "postError", "Post not found.");
  }
  if (!isPostExists?.isUpvotedIP.includes(query.ipAddress!)) {
    const result = await Post.findByIdAndUpdate(
      postId,
      {
        $inc: { upvotes: 1 },
        $push: { isUpvotedIP: query.ipAddress! },
      },
      { new: true }
    );
    return result;
  }
  // Check if the IP has already voted
  if (isPostExists.isUpvotedIP.includes(query.ipAddress!)) {
    const result = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { isUpvotedIP: query.ipAddress! },
        $inc: { upvotes: -1 },
      },
      { new: true }
    );
    return result;
  }
};
const downvoteIntoDB = async (
  postId: string,
  query: Record<string, undefined>
) => {
  // Extract the IP address of the user
  if (!query.ipAddress) {
    throw new AppError(httpStatus.NOT_FOUND, "postError", "Network problem!.");
  }

  const isPostExists = await Post.findById(postId);
  if (!isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, "postError", "Post not found.");
  }
  if (!isPostExists?.isDownvotedIP.includes(query.ipAddress!)) {
    const result = await Post.findByIdAndUpdate(
      postId,
      {
        $inc: { downvotes: 1 },
        $push: { isDownvotedIP: query.ipAddress! },
      },
      { new: true }
    );
    return result;
  }
  // Check if the IP has already voted
  if (isPostExists.isDownvotedIP.includes(query.ipAddress!)) {
    const result = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { isDownvotedIP: query.ipAddress! },
        $inc: { downvotes: -1 },
      },
      { new: true }
    );
    return result;
  }
};
export const PostServices = {
  createPostIntoDB,
  getSinglePostDB,
  updatePostIntoDB,
  getAllPostsDB,
  upvoteIntoDB,
  downvoteIntoDB,
  removePostImageDB,
};
