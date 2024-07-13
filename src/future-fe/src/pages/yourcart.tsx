import React, { useEffect, useState } from "react";
import CartItem from "../components/ui/CarItem/CarItem";
import Button from "../components/form/button/button";
import Subcribe from "../components/ui/subcribe";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectCart } from "../redux/reducers/cart-slice";
import { getCart } from "../redux/actions/user-action";
import { formatPrice } from "../utils/string-utils";
import { useNavigate } from "react-router-dom";

export default function YourCart() {
  const navigate = useNavigate();
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const subToTal = cart.reduce(
    (sum, currItem) => sum + currItem.price * currItem.quantity,
    0
  );
  const shippingFee = cart.length > 0 ? 45000 : 0;

  const handleShopNow = () => {
    navigate("/");
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="mx-[75px] ">
      <h2 className="flex items-center justify-center text-[40px] leading-[40px] font-bold mt-[50px] mb-[100px]">
        Giỏ Hàng
      </h2>
      {cart.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-[62px] mb-[140px]">
          <div className="col-span-2 ">
            <header className="grid grid-cols-5 text-center text-[20px] leading-[35px] font-semibold mb-[20px]">
              <h3 className="col-span-2 text-left">Sản phẩm</h3>
              <h3 className="">Số lượng</h3>
              <h3 className="">Giá tiền</h3>
            </header>
            <div className="space-y-[30px] ">
              {cart.map((cartItem) => (
                <CartItem key={cartItem._id} cartItem={cartItem} />
              ))}
            </div>
          </div>
          <div className="bg-scarlet py-[30px] px-[27px] h-fit ">
            <h5 className="text-[24px] leading-[35px] font-bold mb-[30px]">
              Tổng giỏ hàng
            </h5>
            <div className="space-y-[25px]">
              <div className="flex justify-between">
                <p className="text-[18px] leading-[35px] text-philippine-gray ">
                  Giá trị sản phẩm
                </p>
                <p className="text-[18px] leading-[30px] font-semibold">
                  {formatPrice(subToTal)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[18px] leading-[35px] text-philippine-gray ">
                  Phí giao hàng
                </p>
                <p className="text-[18px] leading-[30px] font-semibold">
                  {formatPrice(shippingFee)}
                </p>
              </div>
              <div className="border-b-[1px] border-black "></div>
              <div className="flex justify-between">
                <p className="text-[18px] leading-[35px] text-philippine-gray ">
                  Thành tiền
                </p>
                <p className="text-[18px] leading-[30px] font-semibold">
                  {formatPrice(subToTal + shippingFee)}
                </p>
              </div>
              <Button
                onClick={handleCheckout}
                title="Mua ngay "
                variant="primary"
                className="py-[15px] w-full"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-y-5 mb-[150px]">
          <img
            src="./empty_cart.png"
            alt="empty cart"
            className="h-[200px] w-[200px]"
          />
          <p className="font-semibold text-heading-7">
            Giỏ hàng của bạn còn trống
          </p>
          <Button
            onClick={handleShopNow}
            title="Mua ngay"
            variant="primary"
            className="py-[15px] px-5"
          />
        </div>
      )}

      <div className="mb-[100px]">
        <Subcribe />
      </div>
    </div>
  );
}
