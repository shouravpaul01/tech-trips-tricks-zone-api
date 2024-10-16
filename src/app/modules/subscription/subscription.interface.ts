import { Types } from "mongoose";

export type TSubscription = {
  user: Types.ObjectId;
  plan: "1 month" | "6 months" | "1 year";
  transactionId:string;
  amount: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
};
