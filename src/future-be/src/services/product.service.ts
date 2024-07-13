/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import {
  COUNT_PRODUCT_SUCCESS,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  ERROR_CATEGORY_NOT_FOUND,
  ERROR_COUNT_PRODUCT,
  ERROR_CREATE_PRODUCT,
  ERROR_DELETE_PRODUCT,
  ERROR_FILTER_PRODUCT,
  ERROR_GET_MAX_PRICE,
  ERROR_GET_NEWEST_PRODUCT,
  ERROR_GET_PRODUCT_FOR_UPDATE,
  ERROR_GET_PRODUCT_PAGINATION,
  ERROR_PRODUCT_ALREADY_EXIST,
  ERROR_PRODUCT_NOT_FOUND,
  ERROR_UPDATE_PRODUCT,
  FILTER_PRODUCT_SUCCESS,
  GET_MAX_PRICE_SUCCESS,
  GET_NEWEST_PRODUCT_SUCCESS,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_FOR_UPDATE_SUCCESS,
  GET_PRODUCT_PAGINATION_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
} from "../constances";
import { HttpStatus } from "../constances/enum";
import { CreateProductDTO, UpdateProductDTO } from "../dto/request/product.dto";
import {
  ProductCard,
  ProductDetail,
  ProductUpdateRes,
  ProdutResDTO,
} from "../dto/response/product.dto";
import Product, { IProductModel } from "../models/product";
import { handleResFailure, handlerResSuccess } from "../utils/handle-response";
import { CategoryService } from "./category.service";
import { CloudinaryService } from "./cloudinary.service";
import { ICategoryModel } from "../models/category";
import { shuffle } from "../utils/array";
import { CommentResDTO } from "../dto/response/comment.dto";
import { ICommentModel } from "../models/comment";
import { IUserModel } from "../models/user";

export class ProductService {
  static async createProduct(
    dto: CreateProductDTO,
    images: Express.Multer.File[]
  ) {
    try {
      const cateFound = await CategoryService.findCategoryById(dto.category);
      if (!cateFound) {
        return handleResFailure(ERROR_CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const prodFound = await Product.findOne({
        name: { $regex: dto.name, $options: "i" },
      });
      if (prodFound) {
        return handleResFailure(
          ERROR_PRODUCT_ALREADY_EXIST,
          HttpStatus.BAD_REQUEST
        );
      }

      const imageURLs: string[] = [];
      for (const img of images) {
        const { public_id } = await CloudinaryService.upload(img, "products");
        imageURLs.push(public_id);
      }

      const newProduct = new Product({
        name: dto.name,
        category: dto.category,
        price: dto.price,
        quantity: dto.quantity,
        description: dto.description,
        rating: 0,
        images: imageURLs.slice(1),
        thumbnail: imageURLs[0],
      });

      await newProduct.save();

      return handlerResSuccess(CREATE_PRODUCT_SUCCESS, "");
    } catch (error: any) {
      console.log("error: ", error);
      return handleResFailure(
        error.error || ERROR_CREATE_PRODUCT,
        error.statusCode || HttpStatus.BAD_REQUEST
      );
    }
  }

  static async updateProduct(
    prodId: string,
    dto: UpdateProductDTO,
    images: Express.Multer.File[]
  ) {
    try {
      const { category, description, name, price, quantity, updateImageField } =
        dto;
      const product = await Product.findById(prodId);
      if (!product) {
        return handleResFailure(ERROR_PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      if (category) {
        const cateFound = await CategoryService.findCategoryById(category);
        if (!cateFound) {
          return handleResFailure(
            ERROR_CATEGORY_NOT_FOUND,
            HttpStatus.NOT_FOUND
          );
        }

        product.category = category;
      }

      if (description) {
        product.description = description;
      }
      if (name) {
        product.name = name;
      }
      if (price) {
        product.price = price;
      }
      if (quantity) {
        product.quantity = quantity;
      }

      if (updateImageField === "thumbnail") {
        const { public_id } = await CloudinaryService.upload(
          images[0],
          "products"
        );
        await CloudinaryService.deleteImage(product.thumbnail);
        product.thumbnail = public_id;
      } else if (updateImageField === "images") {
        for (const img of product.images) {
          await CloudinaryService.deleteImage(img);
        }
        product.images = [];

        for (const img of images) {
          const { public_id } = await CloudinaryService.upload(img, "products");
          product.images.push(public_id);
        }
      } else if (updateImageField === "all") {
        const imgURLs: string[] = [];

        for (const img of images) {
          const { public_id } = await CloudinaryService.upload(img, "products");
          imgURLs.push(public_id);
        }

        await CloudinaryService.deleteImage(product.thumbnail);
        product.thumbnail = imgURLs[0];

        for (const img of product.images) {
          await CloudinaryService.deleteImage(img);
        }
        product.images = imgURLs.slice(1);
      }

      await product.save();

      return handlerResSuccess(
        UPDATE_PRODUCT_SUCCESS,
        product as IProductModel
      );
    } catch (error: any) {
      console.log("error: ", error);
      return handleResFailure(
        error.error || ERROR_UPDATE_PRODUCT,
        error.statusCode || HttpStatus.BAD_REQUEST
      );
    }
  }

  static async deleteProduct(productId: string) {
    try {
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return handleResFailure(ERROR_PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      for (const img of product.images) {
        await CloudinaryService.deleteImage(img);
      }

      await CloudinaryService.deleteImage(product.thumbnail);

      return handlerResSuccess(DELETE_PRODUCT_SUCCESS, productId);
    } catch (error) {
      console.log("error: ", error);
      return handleResFailure(ERROR_DELETE_PRODUCT, HttpStatus.BAD_REQUEST);
    }
  }

  static async getProductsPagination(limit: number, page: number) {
    try {
      const product = await Product.find()
        .skip(limit * page)
        .limit(limit)
        .populate("category")
        .select("name category price quantity");

      const numOfProds = await Product.count();
      // const totalPages =
      // 	numOfProds % limit > 0 ? Math.floor(numOfProds / limit) + 1 : Math.floor(numOfProds / limit);

      const prodRes: ProdutResDTO[] = product.map((prod) => ({
        _id: prod.id,
        name: prod.name,
        price: prod.price,
        quantity: prod.quantity,
        category: {
          _id: (prod.category as ICategoryModel)._id,
          name: (prod.category as ICategoryModel).name,
        },
      }));

      return handlerResSuccess(GET_PRODUCT_PAGINATION_SUCCESS, {
        products: prodRes,
        numOfProds,
      });
    } catch (error) {
      console.log("error: ", error);
      return handleResFailure(
        ERROR_GET_PRODUCT_PAGINATION,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  static async getProductById(id: string) {
    try {
      const product = await Product.findById(id)
        .populate("category", "name")
        .populate({
          path: "comments",
          select: "user content createdAt rate",
          populate: {
            path: "user",
            select: "avatar name",
          },
        });
      if (!product) {
        return handleResFailure(ERROR_PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      const thumbnailURL = await CloudinaryService.getImageUrl(
        product.thumbnail
      );
      product.thumbnail = thumbnailURL;
      const imgURLs: string[] = [];
      for (const publicId of product.images) {
        const url = await CloudinaryService.getImageUrl(publicId);
        imgURLs.push(url);
      }
      product.images = imgURLs;

      // Chuyển đổi comment từ ICommentModal sang kiểu CommentResDTO
      const comments: CommentResDTO[] = [];
      for (const comment of product.comments as ICommentModel[]) {
        const userAvatar = await CloudinaryService.getImageUrl(
          (comment.user as IUserModel).avatar
        );

        const tempComment: CommentResDTO = {
          _id: comment._id,
          content: comment.content,
          rate: comment.rate,
          user: {
            _id: (comment.user as IUserModel)._id,
            avatar: userAvatar,
            name: (comment.user as IUserModel).name,
          },
          createdAt: comment.createdAt as string,
        };

        comments.push(tempComment);
      }

      const prodRes: ProductDetail = {
        _id: product._id,
        category: {
          _id: (product.category as ICategoryModel)._id,
          name: (product.category as ICategoryModel).name,
        },
        comments,
        description: product.description,
        images: product.images,
        quantity: product.quantity,
        name: product.name,
        price: product.price,
        rating: product.rating,
        thumbnail: product.thumbnail,
      };

      return handlerResSuccess(GET_PRODUCT_BY_ID_SUCCESS, prodRes);
    } catch (error: any) {
      return handleResFailure(
        error.error || ERROR_PRODUCT_NOT_FOUND,
        error.statusCode || HttpStatus.NOT_FOUND
      );
    }
  }

  static async checkCategoryIdIsBeingUsed(categoryId: string) {
    const products = await Product.find({
      category: new mongoose.Types.ObjectId(categoryId),
    });

    return products.length > 0 ? true : false;
  }

  static async getProductForUpdate(prodId: string) {
    try {
      const prod = await Product.findById(
        prodId,
        "name category quantity price description thumbnail images"
      );
      if (prod) {
        prod.thumbnail = await CloudinaryService.getImageUrl(prod.thumbnail);

        const imgURLs: string[] = [];
        for (const publicId of prod.images) {
          const url = await CloudinaryService.getImageUrl(publicId);
          imgURLs.push(url);
        }
        prod.images = imgURLs;
      }

      return handlerResSuccess(
        GET_PRODUCT_FOR_UPDATE_SUCCESS,
        prod as ProductUpdateRes
      );
    } catch (error) {
      console.log("error: ", error);
      return handleResFailure(
        ERROR_GET_PRODUCT_FOR_UPDATE,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  static async getNewestProduct() {
    try {
      const newestProds = await Product.find({})
        .sort({ createdAt: -1 })
        .limit(24)
        .populate("category");
      const newestProdsRes: ProductCard[] = [];
      for (const prod of newestProds) {
        const thumbnailURL = await CloudinaryService.getImageUrl(
          prod.thumbnail
        );
        newestProdsRes.push({
          _id: prod.id,
          category: {
            _id: (prod.category as ICategoryModel).id,
            name: (prod.category as ICategoryModel).name,
          },
          name: prod.name,
          price: prod.price,
          thumbnail: thumbnailURL,
        });
      }

      return handlerResSuccess(
        GET_NEWEST_PRODUCT_SUCCESS,
        shuffle(newestProdsRes)
      );
    } catch (error) {
      console.log("error: ", error);
      return handleResFailure(ERROR_GET_NEWEST_PRODUCT, HttpStatus.BAD_REQUEST);
    }
  }

  static async countProdutsInCategory(categoryId: string) {
    const products = await Product.find({ category: categoryId });

    return products.length;
  }

  static async findMaxPrice(categoryId?: string) {
    try {
      const query: { [index: string]: any } = {};
      if (categoryId) {
        query.category = new mongoose.Types.ObjectId(categoryId);
      }

      const product = await Product.find(query)
        .sort({
          price: -1,
        })
        .limit(1);

      return handlerResSuccess(GET_MAX_PRICE_SUCCESS, product[0].price);
    } catch (error) {
      return handleResFailure(ERROR_GET_MAX_PRICE, HttpStatus.BAD_REQUEST);
    }
  }

  static async filterProduct(
    limit: number,
    page: number,
    categoryId?: string,
    searchText?: string,
    priceFrom?: number,
    priceTo?: number,
    sort?: string
  ) {
    try {
      const query: { [index: string]: any } = {};
      if (searchText && searchText.length > 0) {
        query.name = { $regex: searchText, $options: "i" };
      }

      if (priceTo) {
        query.price = { $gte: priceFrom, $lte: priceTo };
      }

      if (categoryId) {
        query.category = new mongoose.Types.ObjectId(categoryId);
      }

      const products = await Product.find(query)
        .populate("category")
        .select("name category price thumbnail");

      let prodsRes: ProductCard[] = [];
      for (const prod of products) {
        const thumbnailURL = await CloudinaryService.getImageUrl(
          prod.thumbnail
        );
        prodsRes.push({
          _id: prod.id,
          category: {
            _id: (prod.category as ICategoryModel).id,
            name: (prod.category as ICategoryModel).name,
          },
          name: prod.name,
          price: prod.price,
          thumbnail: thumbnailURL,
        });
      }

      if (sort) {
        if (sort === "ascending") {
          prodsRes = prodsRes.sort((prodA: ProductCard, prodB: ProductCard) =>
            prodA.price - prodB.price >= 0 ? 1 : -1
          );
        } else if (sort === "descending") {
          prodsRes = prodsRes.sort((prodA: ProductCard, prodB: ProductCard) =>
            prodB.price - prodA.price >= 0 ? 1 : -1
          );
        }
      }

      return handlerResSuccess(
        FILTER_PRODUCT_SUCCESS,
        prodsRes.slice(limit * page, limit * page + limit)
      );
    } catch (error) {
      console.log("error: ", error);
      return handleResFailure(ERROR_FILTER_PRODUCT, HttpStatus.BAD_REQUEST);
    }
  }

  static async getProductForCart(productId: string) {
    const product = await Product.findById(productId).select(
      "name thumbnail price"
    );

    if (!product) {
      return null;
    }

    const imgUrl = await CloudinaryService.getImageUrl(product.thumbnail);
    product.thumbnail = imgUrl;

    return product as IProductModel;
  }

  static async countProducts() {
    try {
      const numberOfProducts = (await Product.find({})).length;

      return handlerResSuccess(COUNT_PRODUCT_SUCCESS, numberOfProducts);
    } catch (error) {
      return handleResFailure(ERROR_COUNT_PRODUCT, HttpStatus.BAD_REQUEST);
    }
  }
}
