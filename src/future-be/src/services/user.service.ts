/* eslint-disable @typescript-eslint/no-explicit-any */
// src/users/usersService.ts
import {
  ADD_CART_SUCCESS,
  CREATE_USER_SUCCESS,
  DELETE_CART_SUCCESS,
  ERROR_ADD_CART,
  ERROR_CREATE_USER,
  ERROR_DELETE_CART,
  ERROR_GET_MY_ADDRESSES,
  ERROR_GET_USER_BY_ID,
  ERROR_UPDATE_USER,
  ERROR_GET_WISHLIST,
  ERROR_PRODUCT_NOT_FOUND,
  ERROR_UPDATE_QUANTITY,
  ERROR_USER_NOT_FOUND,
  FIND_USER_BY_ID_SUCCESS,
  GET_CART_SUCCESS,
  GET_MY_ADDRESSES_SUCCESS,
  UPDATE_USER_SUCESS,
  GET_WISHLIST_SUCCESS,
  UPDATE_QUANTITY_SUCCESS,
  ERROR_DELETE_ALL_CART,
  DELETE_ALL_CART_SUCCESS,
  COUNT_USERS_SUCCESS,
  COUNT_USERS_ERROR,
} from "../constances";
import { HttpStatus } from "../constances/enum";
import {
  AddToCart,
  ICreateUser,
  IUpdateUserInfo,
} from "../dto/request/user.dto";
import { IUserInfo, WishlistItem } from "../dto/response";
import { ProductCard } from "../dto/response/product.dto";
import { CartItemResDTO, UserResDTO } from "../dto/response/user.dto";
import CartItem, { ICartItemModel } from "../models/cart-item";
import { IProductModel } from "../models/product";
import User from "../models/user";
import { handleResFailure, handlerResSuccess } from "../utils/handle-response";
import { hashPasswords } from "../utils/hash-password";
import { AddressService } from "./address.service";
import { CloudinaryService } from "./cloudinary.service";
import { ProductService } from "./product.service";

export class UsersService {
  static async create(userCreationParams: ICreateUser) {
    try {
      const user = new User({
        name: userCreationParams.name,
        email: userCreationParams.email,
        username: userCreationParams.username,
        password: hashPasswords(userCreationParams.password),
        birthday: new Date().toString(),
        avatar: userCreationParams.avatar,
      });

      await user.save();

      const userRes: UserResDTO = {
        _id: user._id.toString(),
        name: user.name,
      };

      return handlerResSuccess<UserResDTO>(CREATE_USER_SUCCESS, userRes);
    } catch (error) {
      return handleResFailure(ERROR_CREATE_USER, HttpStatus.BAD_REQUEST);
    }
  }

  static async findUserById(userId: string) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const userRes: UserResDTO = {
        _id: user._id.toString(),
        name: user.name,
      };

      return handlerResSuccess<UserResDTO>(FIND_USER_BY_ID_SUCCESS, userRes);
    } catch (error: any) {
      console.log("error: ", error);
      return handleResFailure(
        error.error ? error.error : ERROR_GET_USER_BY_ID,
        error.statusCode ? error.statusCode : HttpStatus.BAD_REQUEST
      );
    }
  }
  static async getUser(id: string) {
    try {
      const user = await User.findById(id);

      if (!user) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      const res: IUserInfo = {
        name: user.name,
        avatar: await CloudinaryService.getImageUrl(user.avatar),
        email: user.email,
        birthday: user.birthday,
      };

      return handlerResSuccess(FIND_USER_BY_ID_SUCCESS, res);
    } catch (error: any) {
      console.log("error: ", error);
      return handleResFailure(
        error.error ? error.error : ERROR_GET_USER_BY_ID,
        error.statusCode ? error.statusCode : HttpStatus.BAD_REQUEST
      );
    }
  }
  static async updateInfo(userId: string, userInfo: IUpdateUserInfo) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      // await User.updateOne(
      //   { _id: userId },
      //   {
      //     $set: {
      //       name: userInfo.name,
      //       email: userInfo.email,
      //       avatar: userInfo.avatar,
      //       birthday: userInfo.birthday,
      //     },
      //   }
      // );
      if (userInfo.name) {
        user.name = userInfo.name;
      }
      if (userInfo.email) {
        user.email = userInfo.email;
      }
      if (userInfo.avatar) {
        await CloudinaryService.deleteImage(user.avatar);
        const image = await CloudinaryService.upload(userInfo.avatar, "users");
        user.avatar = image.public_id;
      }
      if (userInfo.birthday) {
        user.birthday = new Date(userInfo.birthday).toString();
      }

      await user.save();

      const res: IUserInfo = {
        name: user.name,
        avatar: await CloudinaryService.getImageUrl(user.avatar),
        email: user.email,
        birthday: user.birthday,
      };
      return handlerResSuccess(UPDATE_USER_SUCESS, res);
    } catch (error: any) {
      console.log("error: ", error);
      return handleResFailure(
        error.error ? error.error : ERROR_UPDATE_USER,
        error.statusCode ? error.statusCode : HttpStatus.BAD_REQUEST
      );
    }
  }

  static async getWishlistProduct(userId: string) {
    try {
      const user = await User.findById(userId).populate("wishlist");

      if (!user) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      const wishlist: WishlistItem[] = [];
      for (const item of user.wishlist as IProductModel[]) {
        wishlist.push({
          _id: item._id,
          thumbnail: await CloudinaryService.getImageUrl(item.thumbnail),
          name: item.name,
          price: item.price,
          isStock: item.quantity > 0 ? true : false,
        });
      }

      return handlerResSuccess(GET_WISHLIST_SUCCESS, wishlist);
    } catch (error) {
      console.log("error: ", error);
      return handleResFailure(ERROR_GET_WISHLIST, HttpStatus.BAD_REQUEST);
    }
  }

  static async getMyAddresses(userId: string) {
    try {
      const user = await User.findById(userId);
      const addresses = await AddressService.getMany(
        user?.addresses as string[]
      );

      return handlerResSuccess(GET_MY_ADDRESSES_SUCCESS, addresses);
    } catch (error) {
      return handleResFailure(ERROR_GET_MY_ADDRESSES, HttpStatus.BAD_REQUEST);
    }
  }

  static async getCart(userId: string) {
    const user = await User.findById(userId).populate("cart.product");
    const cartItems: CartItemResDTO[] = [];
    if (user) {
      for (const cartItem of user.cart as ICartItemModel[]) {
        const imgURl = await CloudinaryService.getImageUrl(
          (cartItem.product as IProductModel).thumbnail
        );
        cartItems.push({
          _id: (cartItem.product as IProductModel)._id,

          name: (cartItem.product as IProductModel).name,

          thumbnail: imgURl,

          price: (cartItem.product as IProductModel).price,

          quantity: cartItem.quantity,
        });
      }
    }
    return handlerResSuccess(GET_CART_SUCCESS, cartItems);
  }

  static async addToCart(dto: AddToCart, userId: string) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      const existProduct = user.cart.find(
        (item) => item.product.toString() === dto.productId
      );

      const product = await ProductService.getProductForCart(dto.productId);
      if (!product) {
        return handleResFailure(ERROR_PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      const productRes: CartItemResDTO = {
        _id: product.id.toString(),
        name: product.name,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,
      };
      if (existProduct) {
        existProduct.quantity += dto.quantity;
        await user.save();
        productRes.quantity = existProduct.quantity;
      } else {
        await User.findByIdAndUpdate(userId, {
          $push: {
            cart: { product: dto.productId, quantity: dto.quantity },
          },
        });
        productRes.quantity = dto.quantity;
      }
      return handlerResSuccess(ADD_CART_SUCCESS, productRes);
    } catch (error) {
      console.log("error: ", error);
      return handleResFailure(ERROR_ADD_CART, HttpStatus.BAD_REQUEST);
    }
  }

  static async deleteCart(productId: string, userId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      await User.findByIdAndUpdate(userId, {
        $pull: {
          cart: { product: productId },
        },
      });
      return handlerResSuccess(DELETE_CART_SUCCESS, productId);
    } catch (error) {
      console.log("error: ", error);
      return handleResFailure(ERROR_DELETE_CART, HttpStatus.BAD_REQUEST);
    }
  }

  static async updateQuantity(
    productId: string,
    userId: string,
    action: string
  ) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      const existProduct = user.cart.find(
        (item) => item.product.toString() === productId
      );
      if (existProduct) {
        if (action === "increment") {
          existProduct.quantity += 1;
        } else if (action === "decrement") {
          if (existProduct.quantity > 1) {
            existProduct.quantity -= 1;
          }
        }
        await user.save();
      }
      return handlerResSuccess(UPDATE_QUANTITY_SUCCESS, { productId, action });
    } catch (error) {
      console.log("error: ", error);
      return handleResFailure(ERROR_UPDATE_QUANTITY, HttpStatus.BAD_REQUEST);
    }
  }

  static async deleteAllCart(userId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      user.cart = [];
      await user.save();

      return handlerResSuccess(DELETE_ALL_CART_SUCCESS, "");
    } catch (error) {
      console.log("error: ", error);
      return handleResFailure(ERROR_DELETE_ALL_CART, HttpStatus.BAD_REQUEST);
    }
  }

  static async countUsers() {
    try {
      const numberOfUsers = (await User.find({})).length;

      return handlerResSuccess(COUNT_USERS_SUCCESS, numberOfUsers);
    } catch (error) {
      return handleResFailure(COUNT_USERS_ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
