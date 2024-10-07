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

export const AuthRoutes = router;
