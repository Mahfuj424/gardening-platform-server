// /* eslint-disable @typescript-eslint/no-explicit-any */

// import Post from "../post/post.model";
// import { DisLike } from "./disLike.model";

// const addDisLikeIntoDB = async (postId: any, userId: any) => {
//   // Find the post by postId
//   const post = await Post.findById(postId);

//   // Check if likes array contains an object with matching userId as author
//   const userLike = post?.likes.find(
//     (like: any) => like?.author?.toString() === userId?.toString()
//   );

//   // If the user has liked, remove the like object
//   if (userLike) {
//     await Post.findByIdAndUpdate(
//       postId,
//       { $pull: { likes: { author: userId } } }, // Remove the like from likes array
//       { new: true, runValidators: true }
//     );
//   }

//   // Create a new dislike
//   const disLike = await DisLike.create({
//     author: userId,
//   });

//   // Add the dislike to the post's dislikes array
//   await Post.findByIdAndUpdate(
//     postId,
//     { $push: { dislikes: disLike } }, // Add the dislike object to dislikes array
//     { new: true, runValidators: true }
//   );

//   return disLike;
// };

// export const DisLikeServices = {
//   addDisLikeIntoDB,
// };
