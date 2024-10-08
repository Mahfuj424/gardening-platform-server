/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthServices } from "./auth-service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const logInUser = catchAsync(async (req, res, next) => {
  const body = req.body;

  const { email, password } = body;

  const result = await AuthServices.logInUserIntoDB(email, password);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found User",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    token: result?.token,
    data: result?.data,
  });
});

const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // Await the result from AuthServices.forgotPasswordIntoDB
  const result = await AuthServices.forgotPasswordIntoDB(email);

  // Send the response with the reset link
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset link sent successfully.",
    data: result, // This will contain the reset link
  });
});


// reset password
const resetPassword = catchAsync(async (req, res, next) => {
  const { id, token } = req.params;
  
  // Call your AuthService to get the HTML form or error message
  const result = await AuthServices.resetPasswordIntoDB(id, token);
  
  // Set content-type to HTML and send the HTML form directly
  res.status(200).contentType('text/html').send(result);
});


const resetPassowrdAndSave = catchAsync(async (req, res, next) => {
  const {password, id, token}=req.body;
  console.log(req.body);
  
  // Call your AuthService to get the HTML form or error message
  const result = await AuthServices.resetPasswordAndSaveIntoDB(id, token, password);
  
  res.status(200).json({ message: result });
});

export const AuthControllers = {
  logInUser,
  forgotPassword,
  resetPassword,
  resetPassowrdAndSave
};
