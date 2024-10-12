import express from "express";
import { CommentControllers } from "./comment.controller";

const router = express.Router();

// Create a new comment for a post
router.post("/:postId", CommentControllers.createComment);

// Update a specific comment
router.patch("/update", CommentControllers.updateComment);

router.get("/", CommentControllers.getAllComments);

// delete comment
router.delete("/delete", CommentControllers.deleteComment);


export const CommentRoutes = router;
