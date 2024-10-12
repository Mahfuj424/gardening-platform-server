import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  jwt_access_screet:process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in:process.env.EXPIREIN,
  store_id:process.env.STORE_ID,
  signature_key:process.env.SIGNATURE_KEY,
  payment_url:process.env.PAYMENT_URL,
  payment_verify_url:process.env.PAYMENT_VERIFY_URL
};
