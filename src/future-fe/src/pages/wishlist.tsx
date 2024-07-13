import React, { useEffect } from "react";
import WishList from "../components/ui/WishList/WishList";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectWishlist } from "../redux/reducers/wishlist-slice";
import { getWishlist } from "../redux/actions/wishlist-action";

export default function WishListPage() {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector(selectWishlist).wishlist;
  const handleGetWishlist = async () => {
    try {
      await dispatch(getWishlist()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetWishlist();
  }, []);
  return (
    <div>
      <h2 className="flex items-center justify-center text-3xl my-[30px]">
        Danh sách yêu thích
      </h2>
      <div className="m-[30px]">
        <header className="mx-[30px] p-2 grid grid-cols-10 font-bold text-center text-heading-7 leading-[35px] text-dark-slate-gray">
          <h3 className="col-span-5">Sản phẩm</h3>
          <h3 className="col-span-2">Tình trạng</h3>
          <h3 className="col-span-3">Hành động</h3>
        </header>
        <div>
          {wishlist?.map((item) => (
            <WishList product={item} key={item._id}></WishList>
          ))}
        </div>
      </div>
    </div>
  );
}
