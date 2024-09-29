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

const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params; // Extract user ID from the request parameters
  const updateData = req.body; // Get the update data from the request body

  const result = await UserServices.updateUserInfo(id, updateData);

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
    message: "Successfully updated user",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  updateUser,
};
