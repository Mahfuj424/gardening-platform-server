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

router.patch("/user/:id", UserControllers.updateUser);

router.patch("/update-role/:id", UserControllers.updateUserRole);

router.get("/all-users", UserControllers.getAllUsers);

router.post("/follow", UserControllers.followOrUnfollow);

router.get("/:id", UserControllers.getSingleUser);

export const UserRoutes = router;
