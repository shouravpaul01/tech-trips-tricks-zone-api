import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { SubscriptionServices } from "./subscription.service";

const subscriptionInto=catchAsync(async(req,res)=>{
    
    const result=await SubscriptionServices.subscriptionIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        status:true,
        message:"Successfully Updated. ",
        data:result
    })
})

export const SubscriptionController={
    subscriptionInto
}