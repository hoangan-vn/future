import mongoose from "mongoose";
import {
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  ERROR_CATEGORY_EXISTED,
  ERROR_CATEGORY_IS_BEING_USED,
  ERROR_CATEGORY_NOT_EXISTED,
  ERROR_CREATE_CATEGORY,
  ERROR_DELETE_CATEGORY,
  ERROR_GET_CATEGORIES,
  ERROR_THIS_NAME_HAS_ALREADY_BEEN_USED,
  ERROR_UPDATE_CATEGORY,
  GET_CATEORIES_SUCCESS,
  UPDATE_CATEGOY_SUCCESS,
} from "../constances/category-res-message";
import { HttpStatus } from "../constances/enum";
import {
  CategoryAdminRes,
  CategoryClientRes,
} from "../dto/response/category.dto";
import Category from "../models/category";
import { handleResFailure, handlerResSuccess } from "../utils/handle-response";
import { CloudinaryService } from "./cloudinary.service";
import { ProductService } from "./product.service";

export class CategoryService {
  static async create(name: string, image: Express.Multer.File) {
    try {
      const categoy = await Category.findOne({
        name: { $regex: name, $options: "i" },
      });

      if (categoy) {
        return handleResFailure(
          ERROR_CATEGORY_EXISTED,
          HttpStatus.NOT_ACCEPTABLE
        );
      }

      const res = await CloudinaryService.upload(image, "categories");

      const newCategory = await Category.create({
        name: name,
        image: res.public_id,
      });

      const result: CategoryAdminRes = {
        _id: newCategory.id,
        name: newCategory.name,
        image: res.url,
      };

      return handlerResSuccess(CREATE_CATEGORY_SUCCESS, result);
    } catch (error: any) {
      return handleResFailure(
        error.error || ERROR_CREATE_CATEGORY,
        error.statuscode || HttpStatus.BAD_REQUEST
      );
    }
  }

  static async update(id: string, name?: string, image?: Express.Multer.File) {
    try {
      const category = await Category.findById(id);

      if (!category) {
        return handleResFailure(
          ERROR_CATEGORY_NOT_EXISTED,
          HttpStatus.NOT_FOUND
        );
      }

      if (image) {
        await CloudinaryService.deleteImage(category.image);

        const res = await CloudinaryService.upload(image, "categories");

        category.image = res.public_id;
      }

      if (name) {
        const searchCategory = await Category.findOne({
          name: { $regex: name, $options: "i" },
        });

        if (searchCategory && searchCategory.id !== category.id) {
          return handleResFailure(
            ERROR_THIS_NAME_HAS_ALREADY_BEEN_USED,
            HttpStatus.NOT_ACCEPTABLE
          );
        } else {
          category.name = name;
        }
      }

      await category.save();

      const result: CategoryAdminRes = {
        _id: category.id,
        name: category.name,
        image: await CloudinaryService.getImageUrl(category.image),
      };

      return handlerResSuccess(UPDATE_CATEGOY_SUCCESS, result);
    } catch (error: any) {
      return handleResFailure(
        error.error || ERROR_UPDATE_CATEGORY,
        error.statusCode || HttpStatus.BAD_REQUEST
      );
    }
  }

  static async delete(id: string) {
    try {
      const isUsed = await ProductService.checkCategoryIdIsBeingUsed(id);

      if (isUsed) {
        return handleResFailure(
          ERROR_CATEGORY_IS_BEING_USED,
          HttpStatus.BAD_REQUEST
        );
      }

      const category = await Category.findById(id);

      if (!category) {
        return handleResFailure(
          ERROR_CATEGORY_NOT_EXISTED,
          HttpStatus.NOT_FOUND
        );
      }

      await CloudinaryService.deleteImage(category.image);
      await Category.deleteOne({ _id: new mongoose.Types.ObjectId(id) });

      return handlerResSuccess(DELETE_CATEGORY_SUCCESS, id);
    } catch (error: any) {
      return handleResFailure(
        error.error || ERROR_DELETE_CATEGORY,
        error.statuscode || HttpStatus.BAD_REQUEST
      );
    }
  }

  static async getMany() {
    try {
      const categories = await Category.find({});
      const result: CategoryClientRes[] = [];

      for (const cate of categories) {
        const image = await CloudinaryService.getImageUrl(cate.image);
        const numberOfProducts = await ProductService.countProdutsInCategory(
          cate._id
        );

        result.push({
          _id: cate.id,
          name: cate.name,
          image,
          numberOfProducts,
        });
      }

      return handlerResSuccess(GET_CATEORIES_SUCCESS, result);
    } catch (error) {
      return handleResFailure(ERROR_GET_CATEGORIES, HttpStatus.BAD_REQUEST);
    }
  }

  static async findCategoryById(id: string) {
    const cateFound = await Category.findById(id, "name");
    return cateFound;
  }
}
