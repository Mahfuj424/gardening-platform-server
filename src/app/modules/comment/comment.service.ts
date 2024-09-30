import Comment from "./comment.model";

const createCommentIntoDB = async (
  content: string,
  postId: string,
  authorId: string
) => {
  const comment = await Comment.create({
    content,
    post: postId,
    author: authorId,
  });
  return comment;
};

const replyToCommentInDB = async (
  parentCommentId: string,
  content: string,
  authorId: string
) => {
  const parentComment = await Comment.findById(parentCommentId).populate(
    "author",
    "name"
  );

  if (!parentComment) {
    throw new Error("Parent comment not found");
  }

  const authorName = parentComment.author?.name
    ? `@${parentComment.author.name}`
    : "";
  const replyContent = `${authorName} ${content}`;

  const replyComment = await Comment.create({
    content: replyContent,
    post: parentComment.post,
    author: authorId,
  });

  parentComment.replies.push(replyComment._id);
  await parentComment.save();

  return replyComment;
};

const getAllCommentsFromDB = async (postId: string) => {
    const result = await Comment.find({ post: postId })
      .populate("author", "name") // Populates author details like the name
      .populate("replies"); // Populates any replies to the comment
    return result;
  };

const updateCommentInDB = async (commentId: string, content: string) => {
  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { content },
    { new: true }
  );
  return updatedComment;
};

export const CommentServices = {
  createCommentIntoDB,
  replyToCommentInDB,
  updateCommentInDB,
  getAllCommentsFromDB,
};
