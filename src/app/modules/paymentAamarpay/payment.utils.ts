/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import config from "../../config";

export const initiatePayment = async (paymentData: any) => {
  const response = await axios.post(config.payment_url!, {
    store_id: config.store_id,
    signature_key: config.signature_key,
    tran_id: paymentData.transactionId,
    success_url: `https://gardening-tips-platform-server.vercel.app/api/v1/payment/confirmation?transactionId=${paymentData?.transactionId}&status=success`,
    fail_url: `https://gardening-tips-platform-server.vercel.app/api/v1/payment/confirmation?status=failed`,
    cancel_url: "http://localhost:3000",
    amount: paymentData.totalAmount,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: paymentData.customerName,
    cus_email: paymentData.customerEmail,
    cus_add1: paymentData.customerAddress,
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "Bangladesh",
    cus_phone: paymentData.customerPhone,
    type: "json",
  });
  return response.data;
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(config.payment_verify_url!, {
      params: {
        store_id: config.store_id,
        signature_key: config.signature_key,
        type: "json",
        request_id: tnxId,
      },
    });

    return response.data;
  } catch (err) {
    throw new Error("Payment validation failed!");
  }
};
