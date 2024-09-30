import { Router } from "express";
import { CommentControllers } from "./comment.controller";
import validateRequest from "../../middleware/validateRequest";
import { CommentValidation } from "./comment.validation";

const router = Router();

// Route to create a new comment on a post
router.post(
  "/",
  validateRequest(CommentValidation.createCommentSchema),
  CommentControllers.createComment
);

// Route to reply to a comment
router.post("/:parentCommentId/reply", CommentControllers.replyToComment);

router.get("/:postId", CommentControllers.getAllComments);

// Route to update a comment
router.patch(
  "/:commentId",
  validateRequest(CommentValidation.updateCommentSchema),
  CommentControllers.updateComment
);

export const CommentRoutes = router;
