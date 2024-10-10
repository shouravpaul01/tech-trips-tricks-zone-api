import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model";
import { TSignin } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config";


const loginDB = async (payload: TSignin) => {
  const isUserExists = await User.findOne({ email: payload?.email }).select('+password');
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND,'authError',"Incorrect user or password!.");   
  }
  const isMatchedPassword=await bcrypt.compare(payload?.password, isUserExists?.password);
  if (!isMatchedPassword) {
    throw new AppError(httpStatus.NOT_FOUND,'authError',"Incorrect user or password!.");   
  }
  const jwtPayload = {
    _id: isUserExists._id,
    name: isUserExists.name,
    profileImage:isUserExists.profileImage || null,
    userId: isUserExists.userId,
    email: isUserExists.email,
    role: isUserExists.role,
  };
 
  
  const accessToken= jwt.sign(jwtPayload, config.jwt_secret as string, { expiresIn:config.jwt_expries });
  const user=isUserExists.toObject();
  delete (user as { password?: string }).password;
  return {accessToken}
};
export const AuthServices = {
  loginDB,
};
