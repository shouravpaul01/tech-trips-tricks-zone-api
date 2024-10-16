import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";

import { verifyPayment } from "./payment.utils";
import { Subscription } from "../subscription/subscription.modal";
import { User } from "../user/user.model";

const paymentConfirmationDB = async (txnId: string, status: string) => {
  const verifyPaymentRes = await verifyPayment(txnId);
  if (
    verifyPaymentRes &&
    verifyPaymentRes.pay_status === "Successful" &&
    status == "success"
  ) {
    const subscription = await Subscription.findOne({ transactionId: txnId });
    await User.findByIdAndUpdate(subscription?.user,{isSubscribed:true,subscription:subscription?._id})
    return true;
  } else {
    const isSubscriptionExists = await Subscription.findOne({ transactionId: txnId });
    if (!isSubscriptionExists) {
      return false;
    }
    await Subscription.findOneAndDelete({ transactionId: txnId });
    
    return false;
  }
};
const paymentCencelDB = async () => {};
export const PaymentServices = { paymentConfirmationDB, paymentCencelDB };
