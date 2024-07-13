// const cloudinary = require("cloudinary").v2;
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryResponse } from "../types/cloudinary";
const toStream = require("buffer-to-stream");

export class CloudinaryService {
  static async upload(
    file: Express.Multer.File,
    folderName: string
  ): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: folderName,
        },
        (error, result) => {
          if (error) return reject(error);
          if (result) resolve(result);
        }
      );

      toStream(file.buffer).pipe(upload);
    });
  }

  static async deleteImage(pulbicId: string): Promise<boolean> {
    try {
      await cloudinary.uploader.destroy(pulbicId);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async getImageUrl(publicId: string): Promise<string> {
    if (publicId) {
      const url = cloudinary.url(publicId);
      return url;
    }

    return "https://res.cloudinary.com/cake-shop/image/upload/v1662910949/default-image_n5nxby.jpg";
  }
}
