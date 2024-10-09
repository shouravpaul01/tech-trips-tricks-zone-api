import { QueryBuilder } from "../../builder/QueryBuilder";
import { config } from "../../config";
import { AppError } from "../../errors/AppError";
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
  const isExistsUserId = await User.findOne({ userId: query.userId });
  if (isExistsUserId) {
    throw new AppError(httpStatus.CONFLICT, "unavilable", "User name is unavailable.");
  }else{
    throw new AppError(httpStatus.FOUND, "avilable", "User name is available.");
  }
 
};
// const updateUserIdDB = async (payload: TUser) => {
//   const updateData = { email: payload.email };
//   const isEmailExists = await User.findOne({ email: payload?.email });
//   if (isEmailExists) {
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       "userError",
//       "Already you are registered."
//     );
//   }

//   const result = await User.findOneAndUpdate({ email: payload.email });
//   const jwtPayload = {
//     name: result.name,
//     email: result.email,
//     phone: result.phoneNumber,
//     role: result.role,
//   };

//   const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
//     expiresIn: config.jwt_expries,
//   });
//   return { result, accessToken };
// };
const updateUserIntoDB = async (payload: TUser) => {
  const isEmailExists = await User.findOne({ email: payload?.email });
  if (!isEmailExists) {
    throw new AppError(httpStatus.NOT_FOUND, "userError", "User Not found.");
  }
  const result = await User.findOneAndUpdate(
    { email: payload?.email },
    payload,
    { new: true }
  );
  return result;
};
const getAllUsersDB = async (query: Record<string, undefined>) => {
  const searchableFields = ["name", "email", "phone"];
  const mainQuery = new QueryBuilder(User.find({}), query).search(
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
export const UserServices = {
  createUserIntoDB,
  updateUserIntoDB,
  getAllUsersDB,
  updateUserRoleDB,
  isExistsUserIdDB
};
