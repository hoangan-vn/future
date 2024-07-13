import React, { useRef, useState } from "react";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material";
import Star from "../../icon/star";
import QuantityBtn from "../../form/button/quantity-btn";
import Button from "../../form/button/button";
import WishlistBtn from "../../form/button/wishlist-btn";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { ChervonLeft, ChervonRight } from "../../icon";

// import CSS
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import { formatPrice } from "../../../utils/string-utils";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../../../store/hooks";
import { addToCart } from "../../../redux/actions/user-action";

const StyledRating = styled(Rating)({
  "& .MuiRating-icon": {
    marginRight: "12px",
  },
});

interface Props {
  product: IProductDetail;
}

export default function ProductDetail({ product }: Props) {
  const [quantity, setQuantity] = useState<number>(1);

  const dispatch = useAppDispatch();
  const prodSwiperRef = useRef<SwiperRef>(null);

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  const hanleSlideToLeft = () => {
    if (prodSwiperRef.current) {
      prodSwiperRef.current.swiper.slidePrev();
    }
  };
  const hanleSlideToRight = () => {
    if (prodSwiperRef.current) {
      prodSwiperRef.current.swiper.slideNext();
    }
  };

  const handleAddToCart = async () => {
    try {
      await dispatch(
        addToCart({
          productId: product._id,
          quantity: quantity,
        })
      );
      toast.success("Thêm sản phẩm vào giỏ hàng thành công");
    } catch (error) {
      toast.error((error as IResponseError).error);
    }
  };

  return (
    <div className="px-[76px] mt-[45px] grid grid-cols-7 gap-x-[47px]">
      <div className="relative col-span-3">
        <Swiper
          loop
          ref={prodSwiperRef}
          pagination={true}
          modules={[Pagination]}
          className="mySwiper"
        >
          {[product.thumbnail, ...product.images].map((imgUrl) => (
            <SwiperSlide key={imgUrl}>
              <img
                className="object-cover object-center w-full aspect-square"
                src={imgUrl}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={hanleSlideToRight}
          className="absolute top-1/2 right-0 translate-x-[50%] -translate-y-[50%] z-[1] shadow-md p-3 rounded-full bg-scarlet"
        >
          <ChervonRight />
        </button>
        <button
          onClick={hanleSlideToLeft}
          className="absolute top-1/2 left-0 -translate-x-[50%] -translate-y-[50%] z-[1] shadow-md p-3 rounded-full bg-scarlet"
        >
          <ChervonLeft />
        </button>
      </div>
      <div className="col-span-4">
        <h3 className="font-bold text-heading-5 leading-[48px] mb-[15px]">
          {product.name}
        </h3>
        <StyledRating
          value={product.rating}
          icon={<Star className="text-yellow" />}
          emptyIcon={<Star className="text-light-gray" />}
          readOnly
          className="mb-[25px]"
        />

        <p className="font-bold text-heading-4 text-dark-slate-gray mb-[30px]">
          {formatPrice(product.price)}
        </p>

        <div className="text-body-1 line-clamp-3 mb-[30px]">
          {product.description}
        </div>

        <div className="flex gap-x-[15px]">
          <QuantityBtn quantity={quantity} onChange={handleQuantityChange} />
          <Button
            onClick={handleAddToCart}
            title="Add to Cart"
            variant="teritary"
            className="px-[25px] py-[5px] text-body-1"
          />
          <WishlistBtn id={product._id} />
        </div>
      </div>
    </div>
  );
}
