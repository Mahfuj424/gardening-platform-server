import Post from "../post/post.model";
import { IComment } from "./comment.interface";
import { Comment } from "./comment.model";

// Create comment in the DB and associate it with a post
const createCommentIntoDB = async (
  postId: string,
  author: string,
  commentText: string,
  commentImage: string
) => {
  const comment = await Comment.create({
    author,
    commentText,
    commentImage,
  });

  // Push the comment to the relevant post's comments array
  await Post.findByIdAndUpdate(
    postId,
    { $push: { comments: comment?._id } },
    { new: true, runValidators: true }
  );

  return comment;
};

// Update comment only if the author matches the requester
const updateCommentInDB = async (
  commentId: string,
  authorId: string,
  payload: Partial<IComment>
) => {
  // Find the comment by ID
  const existingComment = await Comment.findById(commentId);

  // Check if the comment exists
  if (!existingComment) {
    throw new Error("Comment not found.");
  }

  // Check if the author of the comment matches the user requesting the update
  if (existingComment.author.toString() !== authorId) {
    throw new Error("You are not authorized to update this comment.");
  }

  // Proceed with updating the comment
  const updatedComment = await Comment.findByIdAndUpdate(commentId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedComment;
};


const deleteCommentInDB = async (commentId: string, authorId: string) => {
  // Find the comment by ID
  const existingComment = await Comment.findById(commentId);

  // Check if the comment exists
  if (!existingComment) {
    throw new Error("Comment not found.");
  }

  // Check if the author of the comment matches the user requesting the deletion
  if (existingComment.author.toString() !== authorId) {
    throw new Error("You are not authorized to delete this comment.");
  }

  // Proceed with deleting the comment
  await Comment.findByIdAndDelete(commentId);

  return { message: "Comment successfully deleted." };
};


const addReplyToComment = async (commentId: string, replyId: string) => {
  const comment = await Comment.findByIdAndUpdate(
    commentId,
    { $push: { replies: replyId } },
    { new: true }
  );
  return comment;
};

const getCommentsByPostId = async (postId: string) => {
  const comments = await Comment.find({ postId }).populate("replies");
  return comments;
};

export const CommentServices = {
  createCommentIntoDB,
  updateCommentInDB,
  addReplyToComment,
  getCommentsByPostId,
  deleteCommentInDB
};
