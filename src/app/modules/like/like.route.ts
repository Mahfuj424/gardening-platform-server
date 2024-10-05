import express from "express";
import { toggleLike } from "./like.controller";

const router = express.Router();

// Toggle like on a post
router.post("/:postId", toggleLike);  // Changed from "/:postId/like" to "/:postId"
export const LikeRoutes = router;
