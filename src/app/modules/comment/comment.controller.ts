/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CommentServices } from "./comment.service";

// Create Comment
const createComment = catchAsync(async (req, res, next) => {
  const { content, post, author } = req.body;

  const result = await CommentServices.createCommentIntoDB(
    content,
    post,
    author
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully created comment",
    data: result,
  });
});

// Reply to Comment
const replyToComment = catchAsync(async (req, res, next) => {
  const { content, author } = req.body;
  const { parentCommentId } = req.params;

  const result = await CommentServices.replyToCommentInDB(
    parentCommentId,
    content,
    author
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully replied to comment",
    data: result,
  });
});

const getAllComments = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const result = await CommentServices.getAllCommentsFromDB(postId);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: true,
      message: "not found post comment",
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully Retrieved post comment",
    data: result,
  });
});

// Update Comment
const updateComment = catchAsync(async (req, res, next) => {
  const { content } = req.body;
  const { commentId } = req.params;

  const result = await CommentServices.updateCommentInDB(commentId, content);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated comment",
    data: result,
  });
});

export const CommentControllers = {
  createComment,
  replyToComment,
  updateComment,
  getAllComments,
};
