// /* eslint-disable @typescript-eslint/no-explicit-any */

// import Post from "../post/post.model";
// import { Like } from "./like.model";

// const addLikeIntoDB = async (postId: any, userId: any) => {
//   // Step 1: Find the post by postId
//   const post = await Post.findById(postId);

//   // Step 2: If the post doesn't exist, throw an error or handle it
//   if (!post) {
//     throw new Error("Post not found");
//   }

//   // Step 3: Check if there is a dislike from the user and remove it if exists
//   const dislikeIndex = post.dislikes.findIndex(
//     (dislike) => dislike?.author?._id.toString() === userId
//   );
//   console.log(dislikeIndex);

//   if (dislikeIndex !== -1) {
//     // Remove the dislike
//     post.dislikes.splice(dislikeIndex, 1);
//     await post.save(); // Save the updated post
//   }

//   // Step 4: Create a new like
//   const like = await Like.create({
//     author: userId,
//   });

//   // Step 5: Add the new like to the post's likes array
//   await Post.findByIdAndUpdate(
//     postId,
//     { $push: { likes: like } },
//     { new: true, runValidators: true }
//   );

//   return like;
// };

// export const LikeServices = {
//   addLikeIntoDB,
// };
