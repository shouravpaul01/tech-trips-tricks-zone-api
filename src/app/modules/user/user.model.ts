import { Schema, model } from "mongoose";
import { TSocialLinks, TStudyInformation, TUser } from "./user.interface";
import { config } from "../../config";
import bcrypt from "bcrypt";

const SocialLinksSchema = new Schema<TSocialLinks>({
  facebook: { type: String },
  twitter: { type: String },
  linkedin: { type: String },
});

const StudyInformationSchema = new Schema<TStudyInformation>({
  university: { type: String },
  degree: { type: String },
  fieldOfStudy: { type: String },
  graduationYear: { type: Number },
});

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
      set: (name: string) => name.replace(/\b\w/g, (char) => char.toUpperCase()),
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      select: 0,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    dateOfBirth: {
      type: Date,
    },
    phoneNumber: {
      type: String,
    },
    bio: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    address: {
      type: String,
    },
    website: {
      type: String,
    },
    educationalInfo: StudyInformationSchema,
    socialLinks: SocialLinksSchema,
    isSubscribed: { type: Boolean, default: false },
    subscription: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser>("User", userSchema);
