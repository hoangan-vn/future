import React, { useState } from "react";
import { CircleMinus, Delete, RecycleIcon, Trash } from "../../icon";
import { CirclePlus } from "../../icon";
import QuantityBtn from "../../form/button/quantity-btn";
import { formatPrice } from "../../../utils/string-utils";
import { useAppDispatch } from "../../../store/hooks";
import toast from "react-hot-toast";
import { deleteCart, updateQuantity } from "../../../redux/actions/user-action";
interface Props {
  cartItem: CartItem;
}
const CartItem = ({ cartItem }: Props) => {
  const dispatch = useAppDispatch();
  const handleUpdateQuantity = async (value: number) => {
    try {
      const action = value > cartItem.quantity ? "increment" : "decrement";
      await dispatch(
        updateQuantity({
          productId: cartItem._id,
          action: action,
        })
      );
    } catch (error) {
      toast.error((error as IResponseError).error);
    }
  };
  const handleDeleteItemCart = async () => {
    try {
      await dispatch(deleteCart(cartItem._id));
      toast.success("Xóa sản phẩm thành công");
    } catch (error) {
      toast.error((error as IResponseError).error);
    }
  };
  return (
    <div className="bg-slate-50 grid grid-cols-5 gap-x-[50px] ">
      <div className="flex col-span-2">
        <div className="mr-[20px] shrink-0">
          <img
            className="w-[120px] h-[120px] object-cover"
            src={cartItem.thumbnail}
            alt="img"
          />
        </div>
        <div>
          <h2 className="text-[18px] leading-[35px] font-bold mb-[15px] line-clamp-2">
            {cartItem.name}
          </h2>
          <p className="text-green-600 text-[20px] leading-[30px] font-bold">
            {formatPrice(cartItem.price)}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <QuantityBtn
          quantity={cartItem.quantity}
          onChange={handleUpdateQuantity}
        />
      </div>
      <p className="flex items-center justify-center">
        {formatPrice(cartItem.quantity * cartItem.price)}
      </p>
      <button
        onClick={handleDeleteItemCart}
        className="flex items-center justify-center"
      >
        <Trash />
      </button>
    </div>
  );
};

export default CartItem;
