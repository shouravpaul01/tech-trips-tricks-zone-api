import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model";
import { TChangePassword, TSignin } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config";

const loginDB = async (payload: TSignin) => {
  const isUserExists = await User.findOne({ email: payload?.email }).select(
    "+password"
  );
  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "authError",
      "Incorrect user or password!."
    );
  }
  const isMatchedPassword = await bcrypt.compare(
    payload?.password,
    isUserExists?.password
  );
  if (!isMatchedPassword) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "authError",
      "Incorrect user or password!."
    );
  }
  const jwtPayload = {
    _id: isUserExists._id,
    name: isUserExists.name,
    profileImage: isUserExists.profileImage || null,
    userId: isUserExists.userId,
    email: isUserExists.email,
    role: isUserExists.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: config.jwt_expries,
  });
  const user = isUserExists.toObject();
  delete (user as { password?: string }).password;
  return { accessToken };
};
const changePasswordDB = async (payload: TChangePassword) => {
  const isUserExists = await User.findOne({ email: payload.email }).select(
    "+password"
  );
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "authError", "User not found.");
  }
  const isMatchedPassword = await bcrypt.compare(
    payload?.oldPassword,
    isUserExists?.password
  );
  if (!isMatchedPassword) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "oldPassword",
      "Old password is incorrect."
    );
  }
  const passwordBycrpt = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );
  const result = await User.findOneAndUpdate(
    { email: payload.email },
    { password: passwordBycrpt },
    { new: true }
  );
  return result;
};
export const AuthServices = {
  loginDB,
  changePasswordDB,
};
