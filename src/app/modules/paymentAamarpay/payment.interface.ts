export interface IPayment {
  transactionId: string; // For transaction ID, generated as a unique identifier
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  isConfirmed:'pending'
}
