import { Schema, model } from "mongoose";
import { IPayment } from "./payment.interface"; // Import the interface

const PaymentSchema = new Schema<IPayment>(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    isConfirmed: {
      type: String,
      required: true,
      default:'pending'
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export const Payment = model<IPayment>("Payment", PaymentSchema);
