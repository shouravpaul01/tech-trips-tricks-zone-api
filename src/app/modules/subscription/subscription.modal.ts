import { Schema, model, Types } from "mongoose";
import { TSubscription } from "./subscription.interface";

const subscriptionSchema = new Schema<TSubscription>({
  user:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plan: {
    type: String,
    enum: ["1 month", "6 months", "1 year"],
    required: true,
  },
  transactionId:{
    type:String,
    unique:true,
    required:true
  },
  amount: {
    type: Number,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

export const Subscription = model("Subscription", subscriptionSchema);
