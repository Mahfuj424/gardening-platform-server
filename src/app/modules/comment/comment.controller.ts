import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { CommentServices } from "./comment.service";

const createComment = catchAsync(async (req, res) => {
  const { author, commentText, commentImage} = req.body;
  const {postId}= req.params;
  console.log(postId);
  const result = await CommentServices.createCommentIntoDB(postId, author, commentText, commentImage);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully added comment",
    data: result,
  });
});

const updateComment = catchAsync(async (req, res) => {
  const { id } = req.params; // Comment ID
  const { author, commentText, commentImage } = req.body; // Author and comment data

  // Ensure either 'commentText' or 'commentImage' is provided
  if (!commentText && !commentImage) {
    return "Either 'commentText' or 'commentImage' must be provided."
  }

  try {
    // Update the comment with the provided data
    const result = await CommentServices.updateCommentInDB(id, author, { commentText, commentImage });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully updated comment",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});


const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params; // Comment ID
  const { author } = req.body; // Author ID from the request body

  try {
    const result = await CommentServices.deleteCommentInDB(id, author);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully deleted comment",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});



const addReply = catchAsync(async (req, res) => {
  const { commentId, replyId } = req.body;
  const result = await CommentServices.addReplyToComment(commentId, replyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reply successfully added to comment",
    data: result,
  });
});

const getComments = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await CommentServices.getCommentsByPostId(postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully fetched comments",
    data: result,
  });
});

export const CommentControllers = {
  createComment,
  updateComment,
  addReply,
  getComments,
  deleteComment
};
