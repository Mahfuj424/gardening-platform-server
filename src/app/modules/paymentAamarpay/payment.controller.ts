/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { PaymentServices } from "./payment.service";

const createPayment = catchAsync(async (req, res) => {
  // Destructuring with proper commas
  const { totalAmount, customerName, customerEmail } = req.body;

  // No need to pass transactionId from req.body, it is generated in the service
  const result = await PaymentServices.createPaymentIntoDB(
    totalAmount,
    customerName,
    customerEmail
  );

  // Sending the response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment successfully created",
    data: result,
  });
});

const successUrl = catchAsync(async (req, res) => {
  const { transactionId, status } = req.query;
  const result = await PaymentServices.updateAndConfirmation(
    transactionId as string
  );

  const successOrFailedPage = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment ${status}</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
          }
          .container {
            text-align: center;
          }
          h1 {
            color: ${status === "success" ? "#28a745" : "#dc3545"};
            font-size: 3rem;
            margin-bottom: 1rem;
          }
          p {
            font-size: 1.2rem;
            color: #555;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Payment ${status === "success" ? "Successful" : "Failed"}</h1>
          <p>${
            status === "success"
              ? "Thank you for your payment. You will be redirected to the homepage shortly."
              : "Something went wrong!!  Please try again"
          }</p>
        </div>
        <script>
          // Redirect to homepage after 2.5 seconds
          setTimeout(() => {
            window.location.href = "https://gardening-tips-platform-client.vercel.app"
          }, 2500);
        </script>
      </body>
      </html>
    `;
  res.send(successOrFailedPage);
});

export const PaymentControllers = {
  createPayment,
  successUrl,
};
