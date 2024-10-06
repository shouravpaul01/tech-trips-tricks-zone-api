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
const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  gerder: {
    type: String,
    enum:["Male","Female","Other"]
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
  studyInformation: StudyInformationSchema,
  socialLinks: SocialLinksSchema,
  isVerified: {
    type: Boolean,
    default: false,
  },
});
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
