
import config from "../../config";
import jwt from "jsonwebtoken";
import User from "../user/user.model";

const logInUserIntoDB = async (email: string, password: string) => {
  const user = await User.findOne({ email, password });

  if (!user) {
    return null;
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage:user.profileImage,
    followers:user.followers,
    following:user.following,
    isVerified:user.isVerified,
    premiumAccess:user.premiumAccess,
    posts:user.posts,
    
  };

  // Create token and send to the user
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_screet as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return {
    token: accessToken,
    data: jwtPayload,
  };
};

export const AuthServices = {
  logInUserIntoDB,
};
