export type TSignin = {
  email: string;
  password: string;
};
export type TChangePassword = {
  email: string;
  password: string;
  oldPassword: string;
};
export type TMatchedOTP = {
  email: string;
  otp: string;
  password?: string;
};
