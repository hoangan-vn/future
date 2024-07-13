import { IOrderItem } from "../../models/order-item";

export interface ICreateOrder {
  orderItems: IOrderItem[];
  address: string;
  paymentMethod: string;
}

export interface ICallBackZaloPay {
  data: string;
  mac: string;
  type: number;
}

export interface IDataCallbackZalopay {
  app_id: number;
  app_trans_id: string;
  app_time: number;
  app_user: string;
  amount: number;
  embed_data: any;
  item: any;
  zp_trans_id: number;
  server_time: number;
  channel: number;
  merchant_user_id: string;
  user_fee_amount: number;
  discount_amount: number;
}

export interface IQueryZaloPayOrderStatus {
  app_trans_id: string;
}

export interface ICreateZaloPayOrder {
  amount: number;
  order_id: string;
  bank_code: string;
}
