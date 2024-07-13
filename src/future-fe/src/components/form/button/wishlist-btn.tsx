import React, { useEffect, useState } from "react";
import IconBtn from "./icon-btn";
import { Heart, HeartFill } from "../../icon";
import { userApi } from "../../../api/user.api";
import toast from "react-hot-toast";
import { useAppSelector } from "../../../store/hooks";
import { selectWishlist } from "../../../redux/reducers/wishlist-slice";

interface Props {
  defaultLove?: boolean;
  id: string;
}

export default function WishlistBtn({ defaultLove = false, id }: Props) {
  const [love, setLove] = useState<boolean>(defaultLove);
  const wishlist = useAppSelector(selectWishlist).wishlist;
  const handleClick = async () => {
    if (!love) {
      await userApi.insertWishlistItem(id);
      toast.success("Insert wishlist item success!");
      setLove(true);
    } else {
      await userApi.deleteWishlistItem(id);
      toast.success("Delete wishlist item success!");
      setLove(false);
    }
  };

  useEffect(() => {
    for (const items of wishlist) {
      if (items._id === id) {
        setLove(true);
      }
    }
  }, [wishlist]);
  return (
    <IconBtn
      onClick={handleClick}
      className="border-[1px] border-light-gray"
      icon={love ? <HeartFill className="text-red-accent" /> : <Heart />}
    />
  );
}
