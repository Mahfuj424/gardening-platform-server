import DislikeModel from "./disLike.model"

export const getAllDislikesFromDB = async()=>{
    const result = await DislikeModel.find()
    return result
}