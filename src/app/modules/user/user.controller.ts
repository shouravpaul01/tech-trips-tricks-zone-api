import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";

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

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersDB(req.query as Record<string,undefined>);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully retrieved",
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const {userId}=req.params
  const result = await UserServices.getSingleUserDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Retrieved Single user.",
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
export const UserControllers = {
  createUserInto,
  updateUserInto,
  getAllUsers,
  updateUserRole,
  isExistsUserId,
  updateUserID,
  getSingleUser
};
