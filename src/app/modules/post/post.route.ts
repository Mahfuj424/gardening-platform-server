import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { PostValidations } from "./post.validation";
import { PostControllers } from "./post.controller";

const router = Router();

router.post("/create-post",validateRequest(PostValidations.createPostSchema), PostControllers.createPost);

router.get("/posts", PostControllers.getAllPosts);
router.get("/post/:id", PostControllers.getSinglePost);
router.delete("/post/:id", PostControllers.deletePost);
router.patch(
  "/post/:id",
  validateRequest(PostValidations.updatePostSchema),
  PostControllers.updatePost
);

export const PostRoutes = router;
