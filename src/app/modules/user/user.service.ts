/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "./user.interface";
import User from "./user.model";

const createUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const updateUserInfo = async (
  id: string,
  name: string,
  email: string,
  profileImage: string
) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found"); // Handle case when user is not found
  }

  // Update user fields
  user.name = name;
  user.email = email;
  user.profileImage = profileImage;

  // Save updated user information
  const updatedUser = await user.save();

  return updatedUser; // Return the updated user information
};

const updateUserRole = async (id: any, role: string) => {
  const updateUser = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true }
  );
  return updateUser
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id).populate('followers').populate('following').populate({
    path: "posts",
    populate: [
      { path: "author" }, // Populating the author of the post
      {
        path: "likes", // Populating likes array
        populate: { path: "user" }, // Further populating users inside likes
      },
      {
        path: "dislikes", // Populating likes array
        populate: { path: "user" }, // Further populating users inside likes
      }, // Populating dislikes array (if it's a reference)
      {
        path: "comments", // Populating likes array
        populate: { path: "author" }, // Further populating users inside likes
      }, // Populating comments array (if it's a reference)
    ],
  });
  return result;
};

const getAllUsersFromDB = async (isPremium?: boolean) => {
  let filter = {};

  // Apply filter based on isPremium value
  if (isPremium === true) {
    filter = { premiumAccess: true }; // Fetch only premium users
  } else if (isPremium === false) {
    filter = { premiumAccess: false }; // Fetch only non-premium users
  }

  const result = await User.find(filter)
    .populate("posts")
    .populate("followers")
    .populate("following");

  return result;
};

const followUser = async (followerId: string, followeeId: any) => {
  // Check if the follower is already following the followee
  const followee = await User.findById(followeeId);
  const follower = await User.findById(followerId);

  if (!followee || !follower) {
    throw new Error("User not found");
  }

  const isAlreadyFollowing = follower.following.includes(followeeId);

  if (isAlreadyFollowing) {
    // Unfollow: Remove followee from follower's following list
    await User.findByIdAndUpdate(followerId, {
      $pull: { following: followeeId },
    });
    await User.findByIdAndUpdate(followeeId, {
      $pull: { followers: followerId },
    });

    return { message: "User unfollowed successfully" };
  } else {
    // Follow: Add followee to follower's following list
    await User.findByIdAndUpdate(followerId, {
      $addToSet: { following: followeeId },
    });
    await User.findByIdAndUpdate(followeeId, {
      $addToSet: { followers: followerId },
    });

    return { message: "User followed successfully" };
  }
};

export const UserServices = {
  createUserIntoDB,
  updateUserInfo,
  getAllUsersFromDB,
  followUser,
  getSingleUserFromDB,
  updateUserRole
};
