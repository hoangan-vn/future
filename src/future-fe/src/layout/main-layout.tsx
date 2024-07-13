import React, { useEffect } from "react";
import { Header } from "../components/ui/header";
import { Footer } from "../components/ui/footer";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectCategories } from "../redux/reducers/category-slice";
import { getCategories } from "../redux/actions/category-action";
import { toast } from "react-hot-toast";
import { getWishlist } from "../redux/actions/wishlist-action";
import { getCart } from "../redux/actions/user-action";
import Cookies from "js-cookie";
import { selectWishlist } from "../redux/reducers/wishlist-slice";
import { getAddresses } from "../redux/actions/address-action";

export default function MainLayout() {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const token = Cookies.get("Authorization");

  const handleFetchCategories = async () => {
    if (categories.length === 0) {
      try {
        await dispatch(getCategories()).unwrap();
      } catch (error) {
        toast.error("Không thể lấy danh sách phân loại");
      }
    }
  };
  const handleGetWishlist = async () => {
    try {
      await dispatch(getWishlist()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCart = async () => {
    try {
      await dispatch(getCart()).unwrap();
    } catch (error) {
      toast.error((error as IResponseError).error);
    }
  };

  const handleGetAddresses = async () => {
    try {
      await dispatch(getAddresses()).unwrap();
    } catch (error) {
      toast.error((error as IResponseError).error);
    }
  };

  useEffect(() => {
    handleFetchCategories();
  }, []);

  useEffect(() => {
    if (token) {
      handleGetWishlist();
      handleGetCart();
      handleGetAddresses();
    }
  }, [token]);

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
