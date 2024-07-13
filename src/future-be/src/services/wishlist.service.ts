import {
  ERROR_PRODUCT_NOT_FOUND,
  ERROR_USER_NOT_FOUND,
  DELETE_WISHLIST_ITEM_SUCCESS,
  ERROR_WISHLIST_ITEM_NOT_FOUND,
  INSERT_WISHLIST_ITEM_SUCCESS,
  ERROR_WISHLIST_ITEM_ALREADY_EXIST,
  ERROR_INSERT_WISHLIST_ITEM,
  ERROR_DELETE_WISHLIST_ITEM,
} from "../constances";
import { HttpStatus } from "../constances/enum";
import { WishlistItem } from "../dto/response";
import Product from "../models/product";
import User from "../models/user";
import { handleResFailure, handlerResSuccess } from "../utils/handle-response";
import { CloudinaryService } from "./cloudinary.service";

export class WishlistService {
  static async insert(userId: string, productId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const product = await Product.findById(productId);
      if (!product) {
        return handleResFailure(ERROR_PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      const wishlist = user.wishlist;
      for (const item of wishlist) {
        if (item.toString() === productId) {
          return handleResFailure(
            ERROR_WISHLIST_ITEM_ALREADY_EXIST,
            HttpStatus.BAD_REQUEST
          );
        }
      }
      await User.findByIdAndUpdate(userId, {
        $push: { wishlist: productId },
      });
      const result: WishlistItem = {
        _id: product.id,
        name: product.name,
        thumbnail: await CloudinaryService.getImageUrl(product.thumbnail),
        price: product.price,
        isStock: product.quantity > 0 ? true : false,
      };
      return handlerResSuccess(INSERT_WISHLIST_ITEM_SUCCESS, result);
    } catch (error: any) {
      return handleResFailure(
        error.error || ERROR_INSERT_WISHLIST_ITEM,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  static async delete(userId: string, productId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      const wishlist = user.wishlist;
      if (!wishlist) {
        return handleResFailure(
          ERROR_WISHLIST_ITEM_NOT_FOUND,
          HttpStatus.NOT_FOUND
        );
      }

      const itemIndex = (wishlist as string[]).findIndex((item) => {
        return item.toString() === productId;
      });

      if (itemIndex === -1)
        return handlerResSuccess(
          ERROR_WISHLIST_ITEM_NOT_FOUND,
          HttpStatus.NOT_FOUND
        );

      wishlist.splice(itemIndex, 1);
      await User.updateOne({ _id: userId }, { $set: { wishlist: wishlist } });

      return handlerResSuccess(DELETE_WISHLIST_ITEM_SUCCESS, productId);
    } catch (error: any) {
      return handleResFailure(
        error.error || ERROR_DELETE_WISHLIST_ITEM,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
