import { Router } from "express";
import { AuthControllers } from "./auth-controller";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidations } from "./auth-validation";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidation),
  AuthControllers.logInUser
);

// forget password
router.post(
  "/forgot-password",
  validateRequest(AuthValidations.forgetPasswordValidation),
  AuthControllers.forgotPassword
);

// reset password
router.get("/reset-password/:id/:token", AuthControllers.resetPassword);

router.post("/update-password", AuthControllers.resetPassowrdAndSave)

export const AuthRotues = router;
