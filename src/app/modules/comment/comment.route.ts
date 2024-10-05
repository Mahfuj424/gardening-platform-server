import express from "express";
import { CommentControllers } from "./comment.controller";

const router = express.Router();

// Create a new comment for a post
router.post("/:postId", CommentControllers.createComment);

// Update a specific comment
router.patch("/:id", CommentControllers.updateComment);

// delete comment
router.delete("/:id/delete", CommentControllers.deleteComment);


export const CommentRoutes = router;
