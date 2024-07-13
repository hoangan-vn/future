import mongoose, {
  Document,
  Model,
  Schema,
  SchemaTimestampsConfig,
  model,
} from "mongoose";
import { IAddressModel } from "./address";
import { IProductModel } from "./product";
import { CartItemSchema, ICartItemModel } from "./cart-item";

export interface IUser {
  name: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
  birthday: string;
  googleId: string;
  addresses: string[] | IAddressModel[];
  wishlist: string[] | IProductModel[];
  cart: {
    product: IProductModel;
    quantity: number;
  }[];
}

export interface IUserModel extends IUser, Document, SchemaTimestampsConfig {}

export const UserSchema: Schema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String },
    username: { type: String, require: true },
    password: { type: String, require: true },
    avatar: { type: String, require: true },
    birthday: { type: Date },
    googleId: { type: String },
    addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    cart: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, require: true },
      },
    ],
  },
  { timestamps: true }
);

const User = model<IUserModel>("User", UserSchema);

export default User;
