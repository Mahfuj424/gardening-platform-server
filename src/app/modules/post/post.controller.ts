/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { PostServices } from "./post.service";

// Create Post
const createPost = catchAsync(async (req, res, next) => {
  const postData = req.body;
  console.log("post", postData);
  const result = await PostServices.createPostIntoDB(postData);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully created post",
    data: result,
  });
});

// Get All Posts with Search and Filter
const getAllPosts = catchAsync(async (req, res, next) => {
  const { search, filter } = req.query;

  const result = await PostServices.getAllPostsFormDB(
    search as string,
    filter as string
  );

  if (!result.length) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No posts found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Posts retrieved successfully",
    data: result,
  });
});


const updatePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await PostServices.updatePostFormDB(id, updateData);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Post not found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated post",
    data: result,
  });
});

const getSinglePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await PostServices.getSinglePostFormDB(id);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Post not found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post retrieved successfully",
    data: result,
  });
});

const deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await PostServices.deletePostFormDB(id);
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Post not found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post deleted successfully",
    data: result,
  });
});

export const PostControllers = {
  createPost,
  getAllPosts,
  updatePost,
  getSinglePost,
  deletePost,
};
