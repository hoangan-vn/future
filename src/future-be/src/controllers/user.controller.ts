// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Route,
  Security,
  Request,
  Path,
  Tags,
  FormField,
  UploadedFile,
  Delete,
  Put,
} from "tsoa";
import { UsersService } from "../services";
import {
  ICreateUser,
  ISignJWT,
  IUpdateUserInfo,
  UpdateQuantity,
  AddToCart,
} from "../dto/request/user.dto";
import * as jwt from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../types/express";
import { WishlistService } from "../services/wishlist.service";

@Tags("Users")
@Route("users")
export class UsersController extends Controller {
  @Post()
  public async createUser(@Body() dto: ICreateUser) {
    return UsersService.create(dto);
  }

  @Post("/sign-jwt-token")
  public signJwtToken(@Body() dto: ISignJWT) {
    return jwt.sign(
      { userId: dto.userId, role: [dto.role] },
      process.env.JWT_SECRET || ""
    );
  }

  @Security("jwt", ["user"])
  @Get("/addresses")
  public async getMyAddresses(@Request() request: IGetUserAuthInfoRequest) {
    return UsersService.getMyAddresses(request.user.userId);
  }

  @Security("jwt", ["admin"])
  @Get("/count-user")
  public async countUser() {
    return UsersService.countUsers();
  }

  @Security("jwt", ["user"])
  @Get()
  public getUser(@Request() request: IGetUserAuthInfoRequest) {
    return UsersService.getUser(request.user.userId);
  }

  @Security("jwt", ["user"])
  @Get("/wishlist")
  public getWishlist(@Request() request: IGetUserAuthInfoRequest) {
    return UsersService.getWishlistProduct(request.user.userId);
  }

  @Security("jwt", ["user"])
  @Get("/cart")
  public getCart(@Request() request: IGetUserAuthInfoRequest) {
    return UsersService.getCart(request.user.userId);
  }

  @Get("/{userId}")
  public findUserById(@Path() userId: string) {
    return UsersService.findUserById(userId);
  }

  @Security("jwt", ["user"])
  @Post("/wishlist/{productId}")
  public async insertWishlistItem(
    @Request() request: IGetUserAuthInfoRequest,
    @Path() productId: string
  ) {
    return WishlistService.insert(request.user.userId, productId);
  }

  @Security("jwt", ["user"])
  @Delete("/wishlist/{productId}")
  public async deleteWishlistItem(
    @Request() request: IGetUserAuthInfoRequest,
    @Path() productId: string
  ) {
    return WishlistService.delete(request.user.userId, productId);
  }

  @Security("jwt", ["user"])
  @Post("/cart")
  public addToCart(
    @Body() body: AddToCart,
    @Request() request: IGetUserAuthInfoRequest
  ) {
    return UsersService.addToCart(body, request.user.userId);
  }

  @Security("jwt", ["user"])
  @Delete("/cart")
  public DeleteAllCart(@Request() request: IGetUserAuthInfoRequest) {
    return UsersService.deleteAllCart(request.user.userId);
  }

  @Security("jwt", ["user"])
  @Delete("/cart/{productId}")
  public deleteCart(
    @Path() productId: string,
    @Request() request: IGetUserAuthInfoRequest
  ) {
    return UsersService.deleteCart(productId, request.user.userId);
  }

  @Security("jwt", ["user"])
  @Put("/cart/{productId}")
  public updateQuantity(
    @Path() productId: string,
    @Body() body: UpdateQuantity,
    @Request() request: IGetUserAuthInfoRequest
  ) {
    return UsersService.updateQuantity(
      productId,
      request.user.userId,
      body.action
    );
  }

  @Security("jwt", ["user"])
  @Put("/setting")
  public updateInfo(
    @Request() request: IGetUserAuthInfoRequest,
    @FormField("name") name?: string,
    @FormField("email") email?: string,
    @FormField("birthday") birthday?: string,
    @UploadedFile("avatar")
    avatar?: Express.Multer.File
  ) {
    const dto: IUpdateUserInfo = {
      name,
      email,
      birthday,
      avatar,
    };
    return UsersService.updateInfo(request.user.userId, dto);
  }
}
