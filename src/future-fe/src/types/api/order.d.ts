declare interface IOrderHistory {
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

declare interface ICreateOrder {
  orderItems: {
    product: string;
    price: number;
    quantity: number;
  }[];
  address: string;
  paymentMethod: string;
}

declare interface ICreateZaloPayOrder {
  amount: number;
  order_id: string;
  bank_code: string;
}

declare interface IQueryOrderZaloPayStatusRes {
  orderStatus: number;
}
