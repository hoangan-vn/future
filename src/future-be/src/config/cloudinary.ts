import { v2 as cloudinary } from "cloudinary";

export default function initCloudinary() {
  const config = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  };
  cloudinary.config(config);
}
