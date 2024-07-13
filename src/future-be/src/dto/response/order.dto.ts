import { OrderStatus } from "../../constances/enum";
import { IAddress } from "../../models/address";
import { IOrderItem } from "../../models/order-item";
import { IUserModel } from "../../models/user";

export interface IOrderHistoryRes {
  _id: string;
  shortId: string;
  total: number;
  createdAt: string;
  firstProduct: {
    _id: string;
    name: string;
    thumbnail: string;
    quantity: number;
    price: number;
  };
  orderItemsLength: number;
}

export interface IAllOrders {
  shortId: string;
  address: string | IAddress;
  userName: string | IUserModel;
  total: number;
  dateCreated: string;
  status: OrderStatus;
}
export interface IOrderRes {
  allOrders: IAllOrders[];
  numOfProds: number;
}
export interface IOrderItemsDetail {
  orderItems: IOrderItem[];
  totalQuantity: number;
}

export interface IUpdateStatus {
  orderId: string;
  status: OrderStatus;
}

export interface ICreateMAC {
  app_id: number;
  app_trans_id: string;
  app_user: string;
  amount: number;
  app_time: number;
  embed_data: JSON;
  item: JSON[];
}

export interface IQueryZaloPayOrderStatusRes {
  orderStatus: number;
}

export interface IRevenueValue {
  value: number;
  label: string;
}

export interface IOrderRevenue {
  _id: string;
  total: number;
  createdAt: Date;
}
