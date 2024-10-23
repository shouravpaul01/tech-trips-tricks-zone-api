import mongoose from "mongoose";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { config } from "../../config";
import { AppError } from "../../errors/AppError";
import { deleteFileFromCloudinary } from "../../utils/deleteFileFromCloudinary";
import generateUniqueUserId from "../../utils/generateUniqueUserId";
import { TJwtDecodedUserData, TUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";

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
    profileImage: result.profileImage || null,
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
const updateUserIntoDB = async (userId: string, files: any, payload: TUser) => {
  const isUserExists = await User.findOne({ userId: userId });
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "userError", "User Not found.");
  }
  if (files?.profileImage) {
    isUserExists?.profileImage &&
      (await deleteFileFromCloudinary(isUserExists?.profileImage));
    payload.profileImage = files.profileImage[0].path;
  }
  if (files?.coverImage) {
    isUserExists?.coverImage &&
      (await deleteFileFromCloudinary(isUserExists?.coverImage));
    payload.coverImage = files.coverImage[0].path;
  }

  const result = await User.findOneAndUpdate({ userId: userId }, payload, {
    new: true,
  });
  return result;
};
const getSingleUserDB = async (user: TJwtDecodedUserData) => {
  const result = await User.findById(user._id);

  return result;
};
const getAllUsersDB = async (query: Record<string, undefined>) => {
  const nonEQUser = query?.nonEQUser;
  const nonEQUserArray = (nonEQUser as any).toString().split(",");
  const nonEQUserFilterQuery: any = {};

  if (nonEQUserArray.length>0) {
    nonEQUserFilterQuery._id = { $nin: nonEQUserArray };
  } 
  console.log(nonEQUser, nonEQUserArray, nonEQUserFilterQuery);
  const searchableFields = ["name", "email", "phone"];
  const mainQuery = new QueryBuilder(
    User.find(nonEQUserFilterQuery).populate("subscription"),
    query
  ).search(searchableFields);
  const totalPages = (await mainQuery.totalPages()).totalQuery;
  const paginateQuery = mainQuery.paginate();
  const users = await paginateQuery.modelQuery;
  const result = {
    data: users,
    page: query?.page || 1,
    totalPages: totalPages,
  };

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
const followingUserDB = async (
  user: TJwtDecodedUserData,
  followingUserId: string
) => {
  console.log(followingUserId, user);
  const session = await mongoose.startSession();
  await session.startTransaction();

  try {
    if (user._id === followingUserId) {
      throw new AppError(
        httpStatus.CONFLICT,
        "followingError",
        "You can't follow yourself"
      );
    }

    const userToFollow = await User.findById(followingUserId).session(session);
    const currentUser = await User.findById(user._id).session(session);
    console.log(userToFollow, currentUser);
    if (!userToFollow) {
      throw new AppError(
        httpStatus.CONFLICT,
        "followingError",
        "User not found"
      );
    }

    // Check if the user is already following the target user
    if (!currentUser) {
      throw new AppError(
        httpStatus.CONFLICT,
        "followingError",
        "You are already following this user"
      );
    }

    // Add the user to the following list and the followed user to the followers list
    if (currentUser.following.includes(userToFollow._id)) {
      throw new AppError(
        httpStatus.CONFLICT,
        "followingError",
        "You are already following this user."
      );
    }

    const currentUserRes = await User.findByIdAndUpdate(
      user._id,
      { $push: { following: userToFollow._id } },
      { session, new: true }
    );

    await User.findByIdAndUpdate(
      userToFollow._id,
      { $push: { followers: currentUser._id } },
      { session, new: true }
    );

    // Commit the transaction
    await session.commitTransaction();
    await session.endSession();
    return currentUserRes?.following;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.CONFLICT,
      "followingError",
      "You did not follow the tech enthusiastic."
    );
  }
};
const getAllUsersForFollowingDB = async (
  user: TJwtDecodedUserData,
  query: Record<string, undefined>
) => {
  const isUserExists = await User.findById(user._id);
  const nonEQUserFilterQuery: any = {};
  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "followingErroe",
      "User not found."
    );
  }
  if (isUserExists) {
    nonEQUserFilterQuery._id = {
      $nin: [isUserExists._id, ...isUserExists.following],
    };
  }

  const searchableFields = ["name", "email", "phone"];
  const mainQuery = new QueryBuilder(
    User.find(nonEQUserFilterQuery)
      .populate("subscription")
      .populate("following")
      .populate("followers"),
    query
  ).search(searchableFields);
  const totalPages = (await mainQuery.totalPages()).totalQuery;
  const paginateQuery = mainQuery.paginate();
  const users = await paginateQuery.modelQuery;
  const result = {
    data: users,
    page: query?.page || 1,
    totalPages: totalPages,
  };

  return result;
};
const unFollowUserDB = async (
  user: TJwtDecodedUserData,
  followingUserId: string
) => {
  console.log(followingUserId, user);
  const session = await mongoose.startSession();
  await session.startTransaction();

  try {
    if (user._id === followingUserId) {
      throw new AppError(
        httpStatus.CONFLICT,
        "followingError",
        "You can't unfollow yourself"
      );
    }

    const userToFollow = await User.findById(followingUserId).session(session);
    const currentUser = await User.findById(user._id).session(session);
    console.log(userToFollow, currentUser);
    if (!userToFollow && !currentUser) {
      throw new AppError(
        httpStatus.CONFLICT,
        "followingError",
        "User not found"
      );
    }

    
    const currentUserRes = await User.findByIdAndUpdate(
      user._id,
      { $pull: { following: userToFollow?._id } },
      { session, new: true }
    );

    await User.findByIdAndUpdate(
      userToFollow?._id,
      { $pull: { followers: currentUser?._id } },
      { session, new: true }
    );

    // Commit the transaction
    await session.commitTransaction();
    await session.endSession();
    return currentUserRes?.following;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.CONFLICT,
      "followingError",
      "You did not follow the tech enthusiastic."
    );
  }
};
export const UserServices = {
  createUserIntoDB,
  updateUserIntoDB,
  getAllUsersDB,
  updateUserRoleDB,
  isExistsUserIdDB,
  updateUserIdDB,
  getSingleUserDB,
  updateUserActiveStatusDB,
  followingUserDB,
  getAllUsersForFollowingDB,
  unFollowUserDB
};
