import React from "react";
import { RecycleIcon } from "../../icon";
import { formatPrice } from "../../../utils/string-utils";
import Button from "../../form/button/button";
import { useAppDispatch } from "../../../store/hooks";
import { deleteWishlist } from "../../../redux/actions/wishlist-action";
import { toast } from "react-hot-toast";
import { addToCart } from "../../../redux/actions/user-action";

interface Props {
  product: FavoriteProduct;
}

const WishList = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    try {
      await dispatch(deleteWishlist(product._id)).unwrap();
      toast.success("Xóa sản phẩm yêu thích thành công");
    } catch (error) {
      toast.error("Xóa sản phẩm yêu thích thất bại");
    }
  };

  const handleAddToCart = async () => {
    await dispatch(addToCart({ productId: product._id, quantity: 1 }));
    toast.success("Thêm sản phẩm vào giỏ hàng thành công");
  };

  return (
    <div className="m-[30px] p-2 grid grid-cols-10">
      <div className="flex items-center justify-center col-span-5">
        <div
          onClick={handleDelete}
          className="flex items-center p-[13px] cursor-pointer bg-gray-100 justify-center mr-8"
        >
          <RecycleIcon></RecycleIcon>
        </div>
        <div className="flex gap-x-5">
          <img
            className="object-cover object-center w-[120px] h-[120px]"
            src={product.thumbnail}
            alt="img"
          />
          <div className="w-[280px] space-y-[15px]">
            <h2 className="font-bold leading-9 capitalize text-heading-7 line-clamp-2">
              {product.name}
            </h2>
            <p className="text-xl font-bold text-green-800">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center col-span-2">
        {product.isStock ? (
          <p className="font-bold text-green-700">Còn hàng</p>
        ) : (
          <p className="font-bold text-red-accent">Hết hàng</p>
        )}
      </div>
      <div className="flex items-center justify-center col-span-3">
        <Button
          variant="teritary"
          title="Thêm vào giỏ hàng"
          className="py-4 px-7"
          onClick={handleAddToCart}
        />
      </div>
    </div>
  );
};
export default WishList;
