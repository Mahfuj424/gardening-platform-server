/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import DislikeModel from "../disLike/disLike.model";
import Post from "../post/post.model";
import LikeModel from "../like/like.model";

export const toggleDislike = async (req: Request, res: Response) => {
  const { postId } = req.params; // Assuming postId is passed in the URL
  const {userId} = req.body; // Assuming user ID is available in the request object

  try {
    // Check if user has already disliked the post
    const existingDislike = await DislikeModel.findOne({
      user: userId,
      post: postId,
    });
    if (existingDislike) {
      // User already disliked, remove dislike
      await DislikeModel.deleteOne({ _id: existingDislike._id });
      await Post.findByIdAndUpdate(postId, {
        $pull: { dislikes: existingDislike._id },
      });
      return res.status(200).json({ message: "Dislike removed" });
    }

    // Check if user has liked the post
    const existingLike = await LikeModel.findOne({
      user: userId,
      post: postId,
    });
    if (existingLike) {
      // User has liked, remove like and add dislike
      await LikeModel.deleteOne({ _id: existingLike._id });
      await Post.findByIdAndUpdate(postId, {
        $pull: { likes: existingLike._id },
      });

      // Create new dislike
      const newDislike = await DislikeModel.create({
        user: userId,
        post: postId,
      });
      await Post.findByIdAndUpdate(postId, {
        $push: { dislikes: newDislike._id },
      });
      return res.status(200).json({ message: "Dislike added" });
    }

    // If no existing like or dislike, create a new dislike
    const newDislike = await DislikeModel.create({
      user: userId,
      post: postId,
    });
    await Post.findByIdAndUpdate(postId, {
      $push: { dislikes: newDislike._id },
    });
    return res.status(201).json({ message: "Dislike added" });
  } catch (error:any) {
    return res.status(500).json({ error: error.message });
  }
};