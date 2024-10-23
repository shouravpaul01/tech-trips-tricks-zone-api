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
export const AuthControllers={
    login,
    changePassword
}