import LikeModel from "./like.model";

export const getAllLikesFromDB = async () => {
  const result = await LikeModel.find();
  return result;
};
