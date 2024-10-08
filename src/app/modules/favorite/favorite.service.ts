import User from "../user/user.model";
import Favorite from "./favorite.model";

// Create Favorite Service
const createFavoriteIntoDB = async (userId: string, postId: string) => {
  // Check if the favorite already exists for this user and post
  const existingFavorite = await Favorite.findOne({ user: userId, post: postId });

  if (existingFavorite) {
    throw new Error("Already saved this post");
  }

  // Create a new favorite if it doesn't exist
  const favorite = await Favorite.create({
    user: userId,
    post: postId,
  });

  // Push the new favorite ID into the user's favorites array
  await User.findByIdAndUpdate(
    userId,
    { $push: { favorites: favorite._id } },
    { new: true, runValidators: true }
  );

  return favorite;
};



const getAllFavoriteFromDB = async (userId: string) => {
  const result = await Favorite.find({ user: userId }).populate("post");
  return result;
};

// Delete Favorite Service
const deleteFavoriteFromDB = async (userId: string, postId: string) => {
  const result = await Favorite.findOneAndDelete({
    user: userId,
    post: postId,
  });
  return result;
};

export const FavoriteServices = {
  createFavoriteIntoDB,
  deleteFavoriteFromDB,
  getAllFavoriteFromDB,
};
