import express from "express";
import {  toggleLike } from "./like.controller";
import validateRequest from "../../middleware/validateRequest";
import { LikeValidations } from "./like.validation";
// import validateRequest from "../../middleware/validateRequest";
// import { LikeValidations } from "./like.validation";

const router = express.Router();

// Toggle like on a post
router.post("/", validateRequest(LikeValidations.createLikeSchema),  toggleLike);  // Changed from "/:postId/like" to "/:postId"
export const LikeRoutes = router;
