import { Schema, model } from 'mongoose';
import { IPayment } from './payment.interface';

const paymentSchema = new Schema<IPayment>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  method: { type: String, enum: ['Stripe', 'Aamarpay'], required: true },
}, { timestamps: true });

const Payment = model<IPayment>('Payment', paymentSchema);
export default Payment;

