import { QueryBuilder } from "../../builder/QueryBuilder";
import { config } from "../../config";
import { AppError } from "../../errors/AppError";
import { deleteFileFromCloudinary } from "../../utils/deleteFileFromCloudinary";
import generateUniqueUserId from "../../utils/generateUniqueUserId";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

const createUserIntoDB = async (payload: TUser) => {
  const isEmailExists = await User.findOne({ email: payload?.email });
  if (isEmailExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "userError",
      "Already you are registered."
    );
  }
  const userId = await generateUniqueUserId(payload.name);
  payload.userId = userId!;
  const result = await User.create(payload);

  const jwtPayload = {
    _id: result._id,
    name: result.name,
    profileImage:result.profileImage || null,
    userId: result.userId,
    email: result.email,
    role: result.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: config.jwt_expries,
  });
  return { result, accessToken };
};
const isExistsUserIdDB = async (query: Record<string, undefined>) => {
  const isEmailAndUserIdExists = await User.findOne({
    email: query?.email,
    userId: query.userId,
  });
  if (isEmailAndUserIdExists) {
    return isEmailAndUserIdExists;
  }
  const isExistsUserId = await User.findOne({ userId: query?.userId });
  if (isExistsUserId) {
    throw new AppError(
      httpStatus.CONFLICT,
      "unavilable",
      "User name is unavailable."
    );
  } else {
    throw new AppError(httpStatus.FOUND, "avilable", "User name is available.");
  }
};
const updateUserIdDB = async (
  query: Record<string, undefined>,
  payload: TUser
) => {

  const isEmailExists = await User.findOne({ email: query?.email });
  if (!isEmailExists) {
    throw new AppError(httpStatus.NOT_FOUND, "userError", "User not found.");
  }
  const result = await User.findOneAndUpdate({ email: query?.email }, payload, {
    new: true,
  });

  return result;
};
const updateUserIntoDB = async (userId:string,files:any,payload: TUser) => {
  const isUserExists = await User.findOne({ userId: userId });
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "userError", "User Not found.");
  }
  if (files?.profileImage) {
    isUserExists?.profileImage && await deleteFileFromCloudinary(isUserExists?.profileImage)
    payload.profileImage=files.profileImage[0].path
  }
  if (files?.coverImage) {
    isUserExists?.coverImage && await deleteFileFromCloudinary(isUserExists?.coverImage)
    payload.coverImage=files.coverImage[0].path
  }
  
  const result = await User.findOneAndUpdate(
    { userId: userId },
    payload,
    { new: true }
  );
  return result;
};
const getSingleUserDB = async (userId:string) => {

 const result=await User.findOne({userId})

  return result;
};
const getAllUsersDB = async (query: Record<string, undefined>) => {
  const searchableFields = ["name", "email", "phone"];
  const mainQuery = new QueryBuilder(User.find({}).populate("subscription"), query).search(
    searchableFields
  );
  const totalPages = (await mainQuery.totalPages()).totalQuery;
  const paginateQuery = mainQuery.paginate();
  const users = await paginateQuery.modelQuery;
  const result = { data: users, totalPages: totalPages };

  return result;
};
const updateUserRoleDB = async (query: Record<string, undefined>) => {

  const isEmailExists = await User.findOne({ email: query?.email });
  if (!isEmailExists) {
    throw new AppError(httpStatus.NOT_FOUND, "userError", "User Not found.");
  }
  const result = await User.findOneAndUpdate(
    { email: query?.email },
    { role: query.role },
    { new: true }
  );
  return result;
};
const updateUserActiveStatusDB = async (query: Record<string, undefined>) => {

  const isEmailExists = await User.findOne({ email: query?.email });
  if (!isEmailExists) {
    throw new AppError(httpStatus.NOT_FOUND, "userError", "User Not found.");
  }
  const result = await User.findOneAndUpdate(
    { email: query?.email },
    { isActive: query.isActive },
    { new: true }
  );
  return result;
};
export const UserServices = {
  createUserIntoDB,
  updateUserIntoDB,
  getAllUsersDB,
  updateUserRoleDB,
  isExistsUserIdDB,
  updateUserIdDB,
  getSingleUserDB,
  updateUserActiveStatusDB
};
