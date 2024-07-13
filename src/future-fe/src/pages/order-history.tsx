import React, { useEffect, useState } from "react";
import Button from "../components/form/button/button";
import { OrderStatus } from "../constants/enum";
import OrderHistoryCard from "../components/ui/card/order-history-card";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import { orderApi } from "../api/order.api";

const orderStatus = ["pending", "delivering", "completed"];

export default function OrderHistory() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [seletedStatus, setSelectedStatus] = useState<string>();
  const [orders, setOrders] = useState<IOrderHistory[]>([]);

  const handleClickStatus = (status: string) => () => {
    setSelectedStatus(status);
    navigate({
      pathname: "/order-history",
      search: createSearchParams({
        status: status,
      }).toString(),
    });
  };

  const handleFetchOrders = async (status: string) => {
    try {
      const response = await orderApi.getOrderHistoryFollowStatus(status);
      console.log("status: ", seletedStatus);
      console.log("response: ", response);
      setOrders(response);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleTitleButton = (title: string) => {
    switch (title) {
      case "pending":
        return "Đang chuẩn bị";
      case "delivering":
        return "Đang giao";
      case "completed":
        return "Đã giao";
      default:
        return "";
    }
  };

  useEffect(() => {
    const status = searchParams.get("status");
    if (!status) {
      navigate({
        pathname: "/order-history",
        search: createSearchParams({
          status: "pending",
        }).toString(),
      });
    } else {
      setSelectedStatus(status);
    }
  }, []);

  useEffect(() => {
    const status = searchParams.get("status");
    if (status) {
      console.log("status: ", status);
      handleFetchOrders(status);
    }
  }, [searchParams.get("status")]);

  return (
    <div className="px-[75px] pt-[45px] pb-[100px]">
      <h3 className="mb-[100px] text-center text-heading-3">
        Lịch sử mua hàng
      </h3>
      <div className="grid grid-cols-10 gap-x-10">
        <div className="col-span-3 space-y-5">
          {orderStatus.map((status) => {
            if (seletedStatus === status) {
              return (
                <Button
                  key={status}
                  onClick={handleClickStatus(status)}
                  className="w-full py-3 capitalize"
                  title={handleTitleButton(status)}
                  variant="primary"
                />
              );
            }
            return (
              <Button
                key={status}
                onClick={handleClickStatus(status)}
                className="w-full py-3 capitalize"
                title={handleTitleButton(status)}
                variant="secondary"
              />
            );
          })}
        </div>
        <div className="col-span-7 space-y-5">
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderHistoryCard key={order._id} order={order} />
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-body-1">Không có dữ liệu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
