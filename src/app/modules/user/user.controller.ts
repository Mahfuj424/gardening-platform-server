/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res, next) => {
  const userData = req.body;

  const result = await UserServices.createUserIntoDB(userData);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res, next) => {
  const { id } = req.params; // Extract user ID from the request parameters

  const result = await UserServices.getSingleUserFromDB(id);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "User not found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully Reterived user",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params; // Extract user ID from the request parameters
  const { name, email, profileImage } = req.body; // Get the update data from the request body

  // Call the service to update user information
  const result = await UserServices.updateUserInfo(
    id,
    name,
    email,
    profileImage
  );

  // Send the response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated user",
    data: result,
  });
});

const updateUserRole = catchAsync(async (req, res, next) => {
  const {id} = req.params;
  const {role} = req.body;
  
  const result = await UserServices.updateUserRole(id, role);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Users not found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully update user role",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const { premiumAccess } = req.query; // Read from query instead of body

  const result = await UserServices.getAllUsersFromDB(
    premiumAccess === "true"
      ? true
      : premiumAccess === "false"
      ? false
      : undefined
  );

  if (!result || result.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Users not found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully Retrieved users",
    data: result,
  });
});

const followOrUnfollow = catchAsync(async (req, res) => {
  const { followerId, followeeId } = req.body;

  try {
    const result = await UserServices.followUser(followerId, followeeId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export const UserControllers = {
  createUser,
  updateUser,
  getAllUsers,
  followOrUnfollow,
  getSingleUser,
  updateUserRole,
};
