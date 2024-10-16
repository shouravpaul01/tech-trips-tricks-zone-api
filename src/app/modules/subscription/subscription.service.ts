import mongoose from "mongoose";
import { TSubscription } from "./subscription.interface";
import { User } from "../user/user.model";
import { AppError } from "../../errors/AppError";
import httpStatus from "http-status";
import { generateTransactionId } from "../../utils/generateTransectionId";
import calculateEndDate from "../../utils/calculateEndDate";
import { Subscription } from "./subscription.modal";
import { initiatePayment } from "../payment/payment.utils";


const subscriptionIntoDB = async (userId: string, payload: TSubscription) => {
  const session = await mongoose.startSession();
  
  try {
    // Start the transaction
    session.startTransaction();

    // Check if user exists
    const isUserExists = await User.findById(userId)
    if (!isUserExists) {
      throw new AppError(httpStatus.NOT_FOUND, "userError", "User not found.");
    }

    // Set transaction ID and dates
    payload.transactionId = generateTransactionId();
    payload.startDate = new Date();
    payload.endDate = calculateEndDate(payload.plan, payload.startDate);

    // Create the subscription
    const isSuccessSubscription = await Subscription.create([payload], { session });
    if (!isSuccessSubscription) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "subscriptionError", "Subscription creation failed.");
    }

    // Create payment info
    const paymentInfo = {
      customerName: isUserExists.name,
      customerEmail: isUserExists.email,
      transactionId: payload.transactionId,
      amount: payload.amount, // Assuming `amount` is defined in payload
    };

    // Initiate payment 
    const isSuccessPayment = await initiatePayment(paymentInfo);
    if (isSuccessPayment.result !== "true") {
      throw new AppError(httpStatus.NOT_FOUND, "paymentError", "Payment not successful. Please try again.");
    }

    // Commit the transaction if everything is successful
    await session.commitTransaction();
    
   
    return isSuccessPayment;
  } catch (error) {
    // Abort the transaction on error
   
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.NOT_FOUND, "paymentError", "Payment not successful. Please try again.");
  } 
};
export const SubscriptionServices={
    subscriptionIntoDB
}