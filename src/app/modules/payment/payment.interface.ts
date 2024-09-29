import { Types } from "mongoose";

export interface IPayment {
    user: Types.ObjectId;
    amount: number;
    status: 'Pending' | 'Completed' | 'Failed';
    method: 'Stripe' | 'Aamarpay';
  }
  