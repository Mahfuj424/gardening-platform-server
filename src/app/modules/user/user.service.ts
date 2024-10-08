/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "./user.interface";
import User from "./user.model";

const createUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const updateUserInfo = async (userId: string, updateData: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });
  return result;
};


const getAllUsersFromDB = async()=>{
  const result = await User.find().populate('posts').populate('followers').populate('following')
  return result;
}


const followUser = async (followerId: string, followeeId: any) => {
  // Check if the follower is already following the followee
  const followee = await User.findById(followeeId);
  const follower = await User.findById(followerId);

  if (!followee || !follower) {
    throw new Error('User not found');
  }

  const isAlreadyFollowing = follower.following.includes(followeeId);

  if (isAlreadyFollowing) {
    // Unfollow: Remove followee from follower's following list
    await User.findByIdAndUpdate(followerId, { $pull: { following: followeeId } });
    await User.findByIdAndUpdate(followeeId, { $pull: { followers: followerId } });

    return { message: 'User unfollowed successfully' };
  } else {
    // Follow: Add followee to follower's following list
    await User.findByIdAndUpdate(followerId, { $addToSet: { following: followeeId } });
    await User.findByIdAndUpdate(followeeId, { $addToSet: { followers: followerId } });

    return { message: 'User followed successfully' };
  }
};

export const UserServices = {
  createUserIntoDB,
  updateUserInfo,
  getAllUsersFromDB,
  followUser
};
