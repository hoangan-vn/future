import { IAddressModel } from "../../models/address";

export interface ICreateUser {
  name: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
}

export interface ISignJWT {
  userId: string;
  role: string;
}

export type IUpdateUserInfo = {
  name?: string;
  email?: string;
  avatar?: Express.Multer.File;
  birthday?: Date | string;
};

export interface ICreateAdmin {
  name: string;
  username: string;
  password: string;
}

export interface IUpdateAdmin {
  name?: string;
  password?: string;
  oldPassword: string;
}

export type ResAdmin = Pick<ICreateAdmin, "username" | "name">;

export type AdminLogin = Pick<ICreateAdmin, "username" | "password">;

export type AddToCart = {
  productId: string;
  quantity: number;
};

export type UpdateQuantity = {
  action: string;
};

export type IEmailVerify = Pick<ICreateUser, "email">;
