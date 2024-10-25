import express from "express";
import { UserControllers } from "../user/user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "../user/user.validation";
import { AuthValidations } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
const router = express.Router();

router.post(
  "/register",
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUserInto
);
router.post(
  "/login",
  validateRequest(AuthValidations.signinValidationSchema),
  AuthControllers.login
);
router.patch(
  "/change-password",
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword
);
router.patch(
  "/send-otp",
  AuthControllers.sendOTP
);
router.post(
  "/matched-otp",validateRequest(AuthValidations.matchedOTPValidation),
  AuthControllers.matchedOTP
);
router.patch(
  "/reset-password",validateRequest(AuthValidations.resetPasswordValidation),
  AuthControllers.resetPassword
);
export const AuthRoutes = router;
