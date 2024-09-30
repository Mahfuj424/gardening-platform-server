/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { FavoriteServices } from "./favorite.service";

// Create Favorite
const createFavorite = catchAsync(async (req, res, next) => {
  const { user, post } = req.body;
  console.log(user, post);

  const result = await FavoriteServices.createFavoriteIntoDB(user, post);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully added post to favorites",
    data: result,
  });
});

const getAllFavorite = catchAsync(async (req, res, next) => {
  const { user } = req.body;

  const result = await FavoriteServices.getAllFavoriteFromDB(user);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: true,
      message: "not found favorite posts",
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully Retrieved favorites post",
    data: result,
  });
});

// Delete Favorite
const deleteFavorite = catchAsync(async (req, res, next) => {
  const { user, post } = req.body;

  const result = await FavoriteServices.deleteFavoriteFromDB(user, post);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully removed post from favorites",
    data: result,
  });
});

export const FavoriteControllers = {
  createFavorite,
  deleteFavorite,
  getAllFavorite,
};
