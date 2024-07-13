import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/main-layout";
import About from "./pages/about";
import OrderHistory from "./pages/order-history";
import Addresses from "./pages/addresses";
import Login from "./pages/login";
import Register from "./components/ui/register/register";
import RegisterInfo from "./components/ui/register/RegisterInfo";
import Checkout from "./pages/checkout";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import ZaloPayResult from "./pages/zalo-pay-result";
import ContactUs from "./pages/contact-us";
import ErrorPage from "./pages/error";
import ProductDetailPage from "./pages/product-detail";
import Home from "./pages/home";
import ScrollToTop from "./components/ui/scroll-to-top";
import Shop from "./pages/shop";
import WishListPage from "./pages/wishlist";
import YourCart from "./pages/yourcart";
import AccountSettingPage from "./pages/account-setting";
import ProtectRoute from "./layout/protect-route";

function App() {
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 1;

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/register/info" element={<RegisterInfo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="shop" element={<Shop />} />
            <Route
              path="account-setting"
              element={
                <ProtectRoute>
                  <AccountSettingPage />
                </ProtectRoute>
              }
            />
            <Route
              path="order-history"
              element={
                <ProtectRoute>
                  <OrderHistory />
                </ProtectRoute>
              }
            />
            <Route
              path="addresses"
              element={
                <ProtectRoute>
                  <Addresses />
                </ProtectRoute>
              }
            />
            <Route
              path="checkout"
              element={
                <ProtectRoute>
                  <Checkout />
                </ProtectRoute>
              }
            />
            <Route
              path="zalo-pay-result"
              element={
                <ProtectRoute>
                  <ZaloPayResult />
                </ProtectRoute>
              }
            />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route
              path="wishlist"
              element={
                <ProtectRoute>
                  <WishListPage />
                </ProtectRoute>
              }
            />
            <Route
              path="cart"
              element={
                <ProtectRoute>
                  <YourCart />
                </ProtectRoute>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </ScrollToTop>
      <Toaster
        toastOptions={{
          className: "z-[500]",
        }}
      />
    </>
  );
}

export default App;
