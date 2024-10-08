import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserValidations } from "./user.validation";
import { UserControllers } from "./user.controller";

const router = Router();

router.post(
  "/create-user",
  validateRequest(UserValidations.createUserSchema),
  UserControllers.createUser
);

router.patch(
  "/user/:id",
  validateRequest(UserValidations.updateUserSchema),
  UserControllers.updateUser
);

router.get('/all-users', UserControllers.getAllUsers)

router.post('/follow', UserControllers.followOrUnfollow);

export const UserRoutes = router;
