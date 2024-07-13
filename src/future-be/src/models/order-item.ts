import mongoose, {
  Document,
  Model,
  Schema,
  SchemaTimestampsConfig,
  model,
} from "mongoose";
import { IProductModel } from "./product";

export interface IOrderItem {
  product: string | IProductModel;
  price: number;
  quantity: number;
}

export interface IOrderItemModel
  extends IOrderItem,
    Document,
    SchemaTimestampsConfig {}

export const OrderItemSchema: Schema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, require: true, ref: "Product" },
    price: { type: Number, require: true },
    quantity: { type: Number, require: true },
  },
  { timestamps: true }
);

const OrderItem = model<IOrderItemModel>("OrderItem", OrderItemSchema);

export default OrderItem;
