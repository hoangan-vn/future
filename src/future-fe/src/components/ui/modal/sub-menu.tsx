import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "../../icon";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function SubMenu() {
  const location = useLocation();
  const token = Cookies.get("Authorization");
  const navigate = useNavigate();

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="py-2 text-sm">
            <UserIcon />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-lg w-fit focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => navigate("/account-setting")}
                  className={`${
                    active ? "bg-dark-slate-gray text-white" : "text-gray-900"
                  } group flex w-full items-center px-4 py-2 text-sm whitespace-nowrap`}
                >
                  Trang cá nhân
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    navigate("/order-history?status=pending");
                  }}
                  className={`${
                    active ? "bg-dark-slate-gray text-white" : "text-gray-900"
                  } group flex w-full items-center px-4 py-2 text-sm whitespace-nowrap`}
                >
                  Đơn hàng
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    navigate("/addresses");
                  }}
                  className={`${
                    active ? "bg-dark-slate-gray text-white" : "text-gray-900"
                  } group flex w-full items-center px-4 py-2 text-sm whitespace-nowrap`}
                >
                  Sổ địa chỉ
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    navigate("/wishlist");
                  }}
                  className={`${
                    active ? "bg-dark-slate-gray text-white" : "text-gray-900"
                  } group flex w-full items-center px-4 py-2 text-sm whitespace-nowrap`}
                >
                  Yêu thích
                </button>
              )}
            </Menu.Item>
            {token ? (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      Cookies.remove("Authorization");
                      navigate("/");
                    }}
                    className={`${
                      active ? "bg-dark-slate-gray text-white" : "text-gray-900"
                    } group flex w-full items-center px-4 py-2 text-sm whitespace-nowrap`}
                  >
                    Đăng xuất
                  </button>
                )}
              </Menu.Item>
            ) : (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      navigate(`/login?redirectUrL=${location.pathname}`);
                    }}
                    className={`${
                      active ? "bg-dark-slate-gray text-white" : "text-gray-900"
                    } group flex w-full items-center px-4 py-2 text-sm whitespace-nowrap`}
                  >
                    Đăng nhập
                  </button>
                )}
              </Menu.Item>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
