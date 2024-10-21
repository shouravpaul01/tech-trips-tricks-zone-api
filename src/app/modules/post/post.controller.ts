import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PostServices } from "./post.service";

const createPostInto = catchAsync(async (req, res) => {
  const result = await PostServices.createPostIntoDB(
    (req as any).files,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully Done. ",
    data: result,
  });
});
const getAllPosts = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostsDB(
    req.query as Record<string, undefined>
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Retrieved all posts ",
    data: result,
  });
});
const getSinglePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await PostServices.getSinglePostDB(postId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Retrieved single post. ",
    data: result,
  });
});
const updatePostInto = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await PostServices.updatePostIntoDB(
    postId,
    (req as any).files,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully Updated. ",
    data: result,
  });
});
const removePostImage = catchAsync(async (req, res) => {
  const result = await PostServices.removePostImageDB(
    req.query as Record<string, undefined>
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully Image Deleted. ",
    data: result,
  });
});
const deletePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await PostServices.deletePostDB(postId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "The Post was deleted.",
    data: result,
  });
});
const upvoteInto = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await PostServices.upvoteIntoDB(
    postId,
    req.query as Record<string, undefined>
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfull ",
    data: result,
  });
});
const downvoteInto = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await PostServices.downvoteIntoDB(
    postId,
    req.query as Record<string, undefined>
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfull ",
    data: result,
  });
});
const restorePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await PostServices.restorePostDB(postId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "The post was successfully restored.",
    data: result,
  });
});
export const PostController = {
  createPostInto,
  getAllPosts,
  getSinglePost,
  updatePostInto,
  removePostImage,
  deletePost,
  upvoteInto,
  downvoteInto,
  restorePost
};
