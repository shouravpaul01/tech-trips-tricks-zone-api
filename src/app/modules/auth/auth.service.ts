import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model";
import { TChangePassword, TMatchedOTP, TSignin } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import e from "cors";
import generateOTP from "../../utils/generateOTP";
import { sendMail } from "../../utils/sendMail";

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
const sendOTPDB = async (email: string) => {
  const isUserExists = await User.findOne({ email: email });
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "authError", "User not found.");
  }
  const result = await User.findOneAndUpdate(
    { email: email },
    { otp: generateOTP() },
    { new: true }
  ).select("+otp");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "authError", "User not found.");
  }
  
  const sendMailArg = {
    to: result?.email,
    subject: "OTP for confirm your identity.",
    html: `<b>${result?.otp}</b>`,
  };
  sendMail(sendMailArg);
  const resetPasswordToken = jwt.sign({email:result.email}, config.jwt_secret as string, {
    expiresIn: config.jwt_expries,
  });
  return {resetPasswordToken:resetPasswordToken}
};
const matchedOTPDB=async(payload:TMatchedOTP)=>{
  const isUserExists = await User.findOne({ email: payload.email,otp:payload.otp }).select("+otp");
 
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "authError", "OTP dosn't matched.Try again!.");
  }
  const resetPasswordToken = jwt.sign({email:isUserExists.email,otp:isUserExists.otp}, config.jwt_secret as string, {
    expiresIn: config.jwt_expries,
  });
  return {resetPasswordToken:resetPasswordToken}
}
const resetPasswordDB=async(payload:TMatchedOTP)=>{
  const isUserExists = await User.findOne({ email: payload.email,otp:payload.otp }).select("+otp");
  console.log(isUserExists)
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "authError", "OTP dosn't matched.Try again!.");
  }
  const passwordBycrpt = await bcrypt.hash(
    payload.password!,
    Number(config.bcrypt_salt_rounds)
  );
  const result = await User.updateOne(
    { email: payload.email },
    { $set: { password: passwordBycrpt }, $unset: { otp: "" } },{new:true}
  );
 
  return result
}
export const AuthServices = {
  loginDB,
  changePasswordDB,
  sendOTPDB,
  matchedOTPDB,
  resetPasswordDB,
};
