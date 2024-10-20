
import { Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TSocialLinks = {
  facebook: string;
  twitter: string;
  linkedin: string;
};

export type TStudyInformation = {
  university: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: number;
};


export type TUser = {
  name: string;
  userId: string;
  email: string;
  password:string;
  role:"User" | "Admin";
  gender:"Male" | "Female" | "Other",
  dateOfBirth:Date,
  phoneNumber: string;
  bio: string;
  profileImage: string;
  coverImage: string;
  address: string;
  website: string;
  socialLinks: TSocialLinks;
  educationalInfo: TStudyInformation,
  isSubscribed:boolean,
  subscription:Types.ObjectId,
  isActive:boolean
};

export type TUserRole = keyof typeof USER_ROLE;