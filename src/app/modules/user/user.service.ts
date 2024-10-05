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
  const result = await User.find()
  return result;
}

export const UserServices = {
  createUserIntoDB,
  updateUserInfo,
  getAllUsersFromDB
};
