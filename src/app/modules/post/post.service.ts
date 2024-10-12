/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "../user/user.model";
import { IPost } from "./post.interface";
import Post from "./post.model";

const createPostIntoDB = async (payload: IPost) => {
  const post = await Post.create(payload);

  await User.findByIdAndUpdate(
    payload?.author,
    { $push: { posts: post?._id } },
    { new: true, runValidators: true }
  );

  return post;
};

const getAllPostsFormDB = async (search: string, sortBy: string) => {
  const query: any = {};

  // Prepare the search query if a search term is provided
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  // Sort criteria based on user input
  let sortCriteria: any = {};

  // Determine sorting based on the sortBy parameter
  if (sortBy === "like") {
    sortCriteria = { likes: -1 }; // Sort by likes in descending order
  } else if (sortBy === "dislike") {
    sortCriteria = { dislikes: -1 }; // Sort by dislikes in descending order
  } else if (sortBy === "comments") {
    sortCriteria = { comments: -1 }; // Sort by comments in descending order
  } else {
    sortCriteria = { createdAt: -1 }; // Default to sorting by createdAt in descending order
  }

  // Fetch posts from the database with the specified query and sorting
  const result = await Post.find(query)
    .populate("author")
    .populate({
      path: "comments",
      populate: { path: "author" }, // Optionally populate author inside comments
    })
    .populate({
      path: "likes",
      populate: { path: "user" }, // Optionally populate user inside likes
    })
    .populate({
      path: "dislikes",
      populate: { path: "user" }, // Optionally populate user inside dislikes
    })
    .sort(sortCriteria) // Apply the sorting criteria
    .exec(); // Execute the query

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
  const result = await Post.findById(postId)
    .populate("author")
    .populate({
      path: "comments",
      populate: { path: "author" }, // Optionally populate author inside comments
    })
    .populate({
      path: "likes",
      populate: { path: "user" }, // Optionally populate user inside likes
    })
    .populate({
      path: "dislikes",
      populate: { path: "user" }, // Optionally populate user inside dislikes
    }); 
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
