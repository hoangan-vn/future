import mongoose, {
  Document,
  Model,
  Schema,
  SchemaTimestampsConfig,
  model,
} from "mongoose";
import { IProductModel } from "./product";

export interface ICartItem {
  product: string | IProductModel;
  quantity: number;
}

export interface ICartItemModel
  extends ICartItem,
    Document,
    SchemaTimestampsConfig {}

export const CartItemSchema: Schema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, require: true, ref: "Product" },
    quantity: { type: Number, require: true },
  },
  { timestamps: true }
);

const CartItem = model<ICartItemModel>("CartItem", CartItemSchema);

export default CartItem;
