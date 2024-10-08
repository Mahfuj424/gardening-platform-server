import { Router } from "express";
import { toggleDislike } from "./disLike.controller";
import validateRequest from "../../middleware/validateRequest";
import { DisLikeValidations } from "./disLike.validation";

const router = Router();

router.post(
  "/",
  validateRequest(DisLikeValidations.createDisLikeSchema),
  toggleDislike
);

export const DisLikeRoutes = router;
