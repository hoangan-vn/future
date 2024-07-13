import mongoose, {
  Document,
  Model,
  Schema,
  SchemaTimestampsConfig,
  model,
} from "mongoose";
import { IUserModel } from "./user";
import { IAddressModel } from "./address";
import { IOrderItemModel } from "./order-item";
import { OrderStatus } from "../constances/enum";

export interface IOrder {
  user: string | IUserModel;
  address: string | IAddressModel;
  orderItems: string[] | IOrderItemModel[];
  total: number;
  status: OrderStatus;
  shortId: string;
  paymentMethod: string;
}

export interface IOrderModel extends IOrder, Document, SchemaTimestampsConfig {}

export const OrderSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, require: true, ref: "User" },
    address: { type: Schema.Types.ObjectId, require: true, ref: "Address" },
    orderItems: [
      { type: Schema.Types.ObjectId, require: true, ref: "OrderItem" },
    ],
    total: { type: Number, require: true },
    status: {
      type: String,
      enum: OrderStatus,
      default: OrderStatus.Pending,
      require: true,
    },
    shortId: { type: String, require: true },
    paymentMethod: { type: String, require: true },
  },
  { timestamps: true }
);

const Order = model<IOrderModel>("Order", OrderSchema);

export default Order;
