import React, { useEffect, useState, Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import BannerContactUs from "../components/ui/banner/banner-contact-us";
import Filter from "../components/ui/Filter/Filter";
import Input from "../components/form/input/input";
import Button from "../components/form/button/button";
import toast from "react-hot-toast";
import { productApi } from "../api/product.api";
import ProductCard from "../components/ui/ProductCard/product-card";
import { useAppSelector } from "../store/hooks";
import { selectCategories } from "../redux/reducers/category-slice";
import { Link, createSearchParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

interface FormValue {
  search: string;
}

export default function Shop() {
  const [products, setProducts] = useState<IProductCard[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useAppSelector(selectCategories);
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      search: "",
    },
  });

  const handleGetProducts = async (page: number, isLoadMore?: boolean) => {
    try {
      const categoryName = searchParams.get("category");
      const search = searchParams.get("search") || "";
      const from = searchParams.get("from");
      const to = searchParams.get("to");
      const sort = searchParams.get("sort") || "";

      console.log("sort: ", sort);
      const category = categories.find((item) => item.name === categoryName);

      const data = await productApi.searchAndFilterProducts({
        categry: category?._id,
        limit: 9,
        page,
        search,
        from: from ? parseInt(from) : undefined,
        to: to ? parseInt(to) : undefined,
        sort: sort as "ascending" | "descending",
      });

      if (data.length === 0) {
        setEnd(true);
        return;
      }

      if (isLoadMore) {
        setProducts((value) => [...value, ...data]);
      } else {
        setProducts(data);
      }
    } catch (error) {
      toast.error((error as IResponseError).error);
    }
  };

  const handeLoadMore = async () => {
    setPage((page) => page + 1);
    handleGetProducts(page + 1, true);
  };

  const handleSearch = (value: FormValue) => {
    setSearchParams({ search: value.search });
  };

  const handleSort = (value: "ascending" | "descending") => () => {
    setSearchParams((params) => {
      params.delete("sort");
      params.append("sort", value);
      return params;
    });
  };

  useEffect(() => {
    handleGetProducts(0);
    setEnd(false);
    setPage(0);
  }, [searchParams]);

  return (
    <div className="mx-[75px] mt-[50px] mb-[100px]">
      <Swiper
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="h-[450px]"
      >
        <SwiperSlide>
          <BannerContactUs image="./room-decor1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <BannerContactUs image="./room-decor2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <BannerContactUs image="./room-decor3.jpg" />
        </SwiperSlide>
      </Swiper>
      <div className="flex mt-[50px] gap-x-[100px]">
        <div className="relative">
          <Filter />
        </div>

        <div>
          <div className="flex justify-between items-center mb-11">
            <form onSubmit={handleSubmit(handleSearch)} className="flex ">
              <Input
                register={register}
                name="search"
                option={{ required: { value: true, message: "Nhập từ khóa" } }}
                variation="filled"
                error={errors.search?.message}
                className="!bg-scarlet text-body-3 !p-[14px]"
              />
              <Button
                type="submit"
                title="Tìm kiếm"
                variant="primary"
                className="px-[30px] py-[14px] text-body-3 leading-[14px]"
              />
            </form>
            <div>
              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center text-sm font-medium ">
                        Sắp xếp
                        <ChevronDownIcon
                          className={clsx(
                            "ml-2 -mr-1 h-5 w-5 transition-all duration-150 ease-linear",
                            open && "rotate-180"
                          )}
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    {open && (
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute z-10 right-0 mt-2 w-40 origin-top-right overflow-hidden rounded-md bg-white drop-shadow-lg focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleSort("ascending")}
                                className={`${
                                  active
                                    ? "bg-dark-slate-gray text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center px-2 py-2 text-sm`}
                              >
                                Giá thấp - cao
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleSort("descending")}
                                className={`${
                                  active
                                    ? "bg-dark-slate-gray text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center  px-2 py-2 text-sm`}
                              >
                                Giá cao - thấp
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    )}
                  </>
                )}
              </Menu>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {products.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
          {!end && (
            <Button
              onClick={handeLoadMore}
              title="Xem thêm"
              variant="primary"
              className="block px-8 py-4 mx-auto mt-10"
            />
          )}
        </div>
      </div>
    </div>
  );
}
