import Favorite from "./favorite.model";

// Create Favorite Service
const createFavoriteIntoDB = async (userId: string, postId: string) => {
  const favorite = await Favorite.create({
    user: userId,
    post: postId,
  });
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
  getAllFavoriteFromDB
};
