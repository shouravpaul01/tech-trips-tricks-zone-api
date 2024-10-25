import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const login=catchAsync(async(req,res)=>{
    const result =await AuthServices.loginDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        status: true,
        message: "User logged in successfully.",
        data: result,
      });
})
const changePassword=catchAsync(async(req,res)=>{
    const result =await AuthServices.changePasswordDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        status: true,
        message: "Password changed successfully.Please Login.",
        data: result,
      });
})
const sendOTP=catchAsync(async(req,res)=>{
    const {email}=req.query
    const result =await AuthServices.sendOTPDB(email as string)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        status: true,
        message: "OTP has been sent successfully.",
        data: result,
      });
})
const matchedOTP=catchAsync(async(req,res)=>{
 
    const result =await AuthServices.matchedOTPDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        status: true,
        message: "Successfully OTP matched.",
        data: result,
      });
})
const resetPassword=catchAsync(async(req,res)=>{
    
    const result =await AuthServices.resetPasswordDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        status: true,
        message: "Password reset successfully.",
        data: result,
      });
})
export const AuthControllers={
    login,
    changePassword,
    sendOTP,
    matchedOTP,
    resetPassword
}