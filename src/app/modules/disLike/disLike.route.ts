import { Router } from "express";
import { getAllDislikes, toggleDislike } from "./disLike.controller";
import validateRequest from "../../middleware/validateRequest";
import { DisLikeValidations } from "./disLike.validation";

const router = Router();

router.post(
  "/",
  validateRequest(DisLikeValidations.createDisLikeSchema),
  toggleDislike
);
router.get("/", getAllDislikes);

export const DisLikeRoutes = router;
