/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// controllers/likeController.ts
import { Request, Response } from "express";
import LikeModel from "./like.model";
import Post from "../post/post.model";
import DislikeModel from "../disLike/disLike.model";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { getAllLikesFromDB } from "./like.service";

export const toggleLike = async (req: Request, res: Response) => {
  const { userId, postId } = req.body; // Assuming user ID is available in the request object

  try {
    // Check if user has already liked the post
    const existingLike = await LikeModel.findOne({
      user: userId,
      post: postId,
    });

    if (existingLike) {
      // User already liked, remove like
      await LikeModel.deleteOne({ _id: existingLike._id });
      await Post.findByIdAndUpdate(postId, {
        $pull: { likes: existingLike._id },
      });

      // Populate the likes array with user data
      const updatedPost = await Post.findById(postId).populate({
        path: 'likes',
        populate: {
          path: 'user', // assuming your LikeModel has a 'user' field referencing the UserModel
          select: 'name email', // adjust the fields as needed
        },
      });

      return res.status(200).json({ message: "Like removed", post: updatedPost });
    }

    // Check if user has disliked the post
    const existingDislike = await DislikeModel.findOne({
      user: userId,
      post: postId,
    });

    if (existingDislike) {
      // User has disliked, remove dislike and add like
      await DislikeModel.deleteOne({ _id: existingDislike._id });
      await Post.findByIdAndUpdate(postId, {
        $pull: { dislikes: existingDislike._id },
      });

      // Create new like
      const newLike = await LikeModel.create({ user: userId, post: postId });
      await Post.findByIdAndUpdate(postId, { $push: { likes: newLike._id } });

      

      return res.status(200).json({ message: "Like added", });
    }

    // If no existing like or dislike, create a new like
    const newLike = await LikeModel.create({ user: userId, post: postId });
    await Post.findByIdAndUpdate(postId, { $push: { likes: newLike._id } });

    // Populate the likes array with user data
    const updatedPost = await Post.findById(postId).populate({
      path: 'likes',
      populate: {
        path: 'user',
        select:'_id'
      },
    });

    return res.status(201).json({ message: "Like added", post: updatedPost });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllLikes =catchAsync(async (req, res, next) => {

  const result = await getAllLikesFromDB();

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: true,
      message: "not found likes",
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully Retrieved all likes",
    data: result,
  });
});

