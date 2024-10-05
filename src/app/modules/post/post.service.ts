/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPost } from "./post.interface";
import Post from "./post.model";

const createPostIntoDB = async (payload: IPost) => {
  const result = await Post.create(payload);
  return result;
};

const getAllPostsFormDB = async (search: string, sortBy: string) => {
  const query: any = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  let sortCriteria: any = {};
  if (sortBy === "like") {
    sortCriteria = { like: -1 };
  } else if (sortBy === "dislike") {
    sortCriteria = { dislike: -1 };
  } else if (sortBy === "comments") {
    sortCriteria = { comments: -1 };
  }

  const result = await Post.find(query)
    .populate("author")
    .populate({
      path: "comments", // Populate the 'comments' field
      populate: { path: "author" }, // Optionally populate author inside comments
    })
    .populate({
      path: "likes", // Populate the 'comments' field
      populate: { path: "user" }, // Optionally populate author inside comments
    })
    .populate({
      path: "dislikes", // Populate the 'comments' field
      populate: { path: "user" }, // Optionally populate author inside comments
    })
    .sort(sortCriteria);
  return result;
};

const updatePostFormDB = async (postId: string, updateData: Partial<IPost>) => {
  const result = await Post.findByIdAndUpdate(postId, updateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const getSinglePostFormDB = async (postId: string) => {
  const result = await Post.findById(postId);
  return result;
};

const deletePostFormDB = async (postId: string) => {
  const result = await Post.findByIdAndDelete(postId);
  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFormDB,
  updatePostFormDB,
  getSinglePostFormDB,
  deletePostFormDB,
};
