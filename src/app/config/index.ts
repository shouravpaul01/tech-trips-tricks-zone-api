import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expries: process.env.JWT_EXPRIES,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  payment_base_url:process.env.PAYMENT_BASE_URL,
  store_id:process.env.STORE_ID,
  signature_key:process.env.SIGNATURE_KEY,
  payment_verify_url:process.env.PAYMENT_VERIFY_URL
};
