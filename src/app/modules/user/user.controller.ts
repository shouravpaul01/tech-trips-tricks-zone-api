import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { query } from "express";
import { TJwtDecodedUserData } from "./user.interface";

const createUserInto = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "User registered successfully",
    data: result,
  });
});
const isExistsUserId = catchAsync(async (req, res) => {
  
  const result = await UserServices.isExistsUserIdDB(req.query as  Record<string, undefined>);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Checked UserId",
    data: result,
  });
});
const updateUserID = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserIdDB(req.query as Record<string,undefined>,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully Done.",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const result = await UserServices.getSingleUserDB(req.user as TJwtDecodedUserData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Retrieved Single user.",
    data: result,
  });
});
const getSingleUserById = catchAsync(async (req, res) => {
  const {userId}=req.params
  const result = await UserServices.getSingleUserByIdDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Retrieved Single user.",
    data: result,
  });
});
const getSingleUserByEmail= catchAsync(async (req, res) => {
  const {email}=req.query
  
  const result = await UserServices.getSingleUserByEmailDB(email as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Retrieved Single user.",
    data: result,
  });
});
const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersDB(req.query as Record<string,undefined>);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully retrieved",
    data: result,
  });
});
const updateUserInto = catchAsync(async (req, res) => {
  const {userId}=req.params
  const files = (req as any).files;
  const result = await UserServices.updateUserIntoDB(userId,files,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Updated successfully.",
    data: result,
  });
});
const updateUserRole = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserRoleDB(req.query as Record<string,undefined>);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Updated successfully.",
    data: result,
  });
});
const updateUserActiveStatus = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserActiveStatusDB(req.query as Record<string,undefined>);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Updated successfully.",
    data: result,
  });
});
const followingUser = catchAsync(async (req, res) => {

  const {followingUserId}=req.params
  const result = await UserServices.followingUserDB(req.user as TJwtDecodedUserData,followingUserId as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully Followed.",
    data: result,
  });
});
const getAllUsersForFollowing = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersForFollowingDB(req.user as TJwtDecodedUserData,req.query as Record<string,undefined>);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully retrieved",
    data: result,
  });
});
const unFollowUser = catchAsync(async (req, res) => {

  const {followingUserId}=req.params
  const result = await UserServices.unFollowUserDB(req.user as TJwtDecodedUserData,followingUserId as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully Unfollowed.",
    data: result,
  });
});
const followBackUser = catchAsync(async (req, res) => {

  const {followingUserId}=req.params
  const result = await UserServices.followBackDB(req.user as TJwtDecodedUserData,followingUserId as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully following each other.",
    data: result,
  });
});
export const UserControllers = {
  createUserInto,
  updateUserInto,
  getSingleUser,
  getSingleUserById,
  getAllUsers,
  updateUserRole,
  isExistsUserId,
  updateUserID,
  updateUserActiveStatus,
  followingUser,
  getAllUsersForFollowing,
  unFollowUser,
  followBackUser,
  getSingleUserByEmail
};
