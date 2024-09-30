/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { NotificationServices } from "./notification.service";

const createNotification = catchAsync(async (req, res, next) => {
  const bodyData = req.body;

  const result = await NotificationServices.createNotificationIntoDB(bodyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully added Notification",
    data: result,
  });
});

const updateNotification = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const bodyData = req.body;

  const result = await NotificationServices.updateNotificationFormDB(
    id,
    bodyData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully Updated Notification",
    data: result,
  });
});

export const NotificationControllers = {
  createNotification,
  updateNotification,
};
