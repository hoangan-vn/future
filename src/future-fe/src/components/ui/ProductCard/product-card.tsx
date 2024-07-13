import React, { useEffect, useState } from "react";
import CircleBtn from "../../form/button-circle/social-btn";
import CartIcon from "../../icon/cart";
import WhiteHeartIcon from "../../icon/white-heart";
import { formatPrice } from "../../../utils/string-utils";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { userApi } from "../../../api/user.api";
import { selectWishlist } from "../../../redux/reducers/wishlist-slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import clsx from "clsx";
import { HeartFill } from "../../icon";
import { addToCart } from "../../../redux/actions/user-action";

interface Props {
  product: IProductCard;
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [love, setLove] = useState<boolean>(false);
  const wishlist = useAppSelector(selectWishlist).wishlist;

  const handleFavorite = async () => {
    if (!love) {
      await userApi.insertWishlistItem(product._id);
      toast.success("Thêm sản phẩm yêu thích thành công!");
      setLove(true);
    } else {
      await userApi.deleteWishlistItem(product._id);
      toast.success("Xóa sản phẩm yêu thích thành công!");
      setLove(false);
    }
  };

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = async () => {
    await dispatch(addToCart({ productId: product._id, quantity: 1 }));
    toast.success("Thêm sản phẩm vào giỏ hàng thành công");
  };

  useEffect(() => {
    for (const items of wishlist) {
      if (items._id === product._id) {
        setLove(true);
      }
    }
  }, [wishlist]);

  return (
    <div className="relative group flex h-[400px] rounded hover:cursor-pointer overflow-hidden select-none">
      <img
        onClick={handleClick}
        src={product.thumbnail}
        alt="product thumbnail"
        className="min-w-full min-h-full rounded-xl"
      />
      <span
        className="absolute text-body-3 leading-[21px] px-2 
            py-[2px] text-white bg-red-600 rounded-lg top-5 right-4"
      >
        Mới
      </span>

      <div className="absolute transition-all duration-300 inset-y-32 group-hover:right-3 -right-12">
        <CircleBtn
          type="black"
          className="mb-5 transition duration-300 ease-in-out delay-150 hover:-translate-y-1"
          onClick={handleFavorite}
        >
          {love ? (
            <HeartFill className="text-red-600" />
          ) : (
            <WhiteHeartIcon className="text-white" />
          )}
        </CircleBtn>

        <CircleBtn
          onClick={handleAddToCart}
          type="wheat"
          className="transition duration-300 ease-in-out delay-150 hover:-translate-y-1"
        >
          <CartIcon />
        </CircleBtn>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="mb-[15px] px-[14px] py-[7px] leading-[21px] text-white rounded-[10px] text-body-3 w-fit bg-emerald-700">
          {product.category.name}
        </div>
        <div className="px-[14px] py-[15px] bg-white rounded-lg ">
          <p className="font-bold line-clamp-1">{product.name}</p>
          <p className="text-green-700">{formatPrice(product.price)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
