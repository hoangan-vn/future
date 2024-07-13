import React from "react";
import { formatPrice } from "../../../utils/string-utils";
import Button from "../../form/button/button";
import OrderChekoutCard from "./order-checkout-card";

interface Props {
  order: IOrderHistory;
}

export default function OrderHistoryCard({ order }: Props) {
  return (
    <div className="relative w-full p-5 space-y-4 border-2 border-dark-slate-gray">
      <div className="flex justify-between">
        <h4 className="text-heading-8">{order.shortId}</h4>
        <h4 className="text-heading-8">
          {new Date(order.createdAt).toLocaleDateString()}
        </h4>
      </div>
      <OrderChekoutCard
        imgUrl={order.firstProduct.thumbnail}
        name={order.firstProduct.name}
        price={order.firstProduct.price}
        quantity={order.firstProduct.quantity}
      />
      {order.orderItemsLength > 1 && (
        <p className="text-heading-8">
          và{" "}
          <span className="font-bold">
            {order.orderItemsLength - 1} khác
            {order.orderItemsLength - 1 > 1 ? " products" : " product"}
          </span>
        </p>
      )}
      <Button
        className="absolute px-5 py-2 right-5 bottom-5"
        title="Xem chi tiết"
        variant="secondary"
      />
    </div>
  );
}
