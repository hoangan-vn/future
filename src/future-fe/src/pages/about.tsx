import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import CardTeam from "../components/ui/card/card-team";
import Button from "../components/form/button/button";
import Star from "../components/icon/star";
import { Avatar, AvatarGroup } from "@mui/material";
import Quote from "../components/ui/quote";
import Subcribe from "../components/ui/subcribe";

export default function About() {
  return (
    <div className="mt-20">
      <div className="flex mx-[75px] justify-between gap-x-48">
        <div>
          <h2 className="mt-5 font-bold text-heading-5">
            Chúng tôi cung cấp những sản phẩm tốt nhất cho bạn
          </h2>
          <p className="mt-5 leading-9 text-philippine-gray">
            Lorem ipsum dolor sit amet consectetur adipiscing elit dictumst
            posuere, lectus dis vehicula augue elementum quam risus. Placerat
            dictum lobortis lacinia volutpat morbi cum justo commodo est
            aliquam, facilisi consequat ligula vivamus faucibus
          </p>
          <Button
            title="Tham gia ngay"
            variant="secondary"
            className="px-6 py-3 mt-8"
          />
          <div className="flex gap-x-2 mt-14">
            <h3 className="font-bold text-heading-8">Đánh giá</h3>
            <Star className="text-yellow" />
            <h3 className="font-bold text-heading-8">5.0</h3>
          </div>
          <p className="mt-3 text-philippine-gray">
            Được tin dùng bởi nhiều người trên khắp thế giới
          </p>
          <AvatarGroup max={4} className="mt-5 w-fit">
            <Avatar
              alt="Remy Sharp"
              src="https://s3-alpha-sig.figma.com/img/9c1a/b700/6fc120580122cc5c1443394d7cbd3883?Expires=1684713600&Signature=lHoQpPdONyrCM8ei801nqHqCMp-Aks4zNMKzfVR47SUChVHtbSqhN51yldB3WKP1B8nteuW2ofs10DgTVW3atSvD46uKJfOXJGYhsZd3dFiDLQR92QrEES6ikDdGBOp2xgdd-VfSJWPvdJIjcYNIkbZCy4ANcsXJEzWMtJwfXe331befPfdH8hNt2rzuld9x5fdLb5p6T8l6q6gS3Yhwq--YP99JWPQn0XPJ2KdNaBV9yWxiIyTWxczajlyKBhIpBdpITXXY949Ab0ysLUCxyT5tFBrRjVpViBtOgQPTJBQK~OtetLzt-aDo8siUxNxb8qfN9F8gaOVTK4QCX04Ybw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            />
            <Avatar
              alt="Travis Howard"
              src="https://s3-alpha-sig.figma.com/img/b784/3879/68ae447ee1c119fe0d99cc44e30cc3dc?Expires=1684713600&Signature=VMXZrKU1mvVDQC-QT5v-gnk0OEHdPBFx9oQDrmPzdpM5XuU~bZsqw8etXFULhGkd2keykjbzB-BdCyrXr96GfU74pRYrgXGOV7S3SqZeJMEpLLt6mj7dQXgAQx06axKeGg8Xd-ZTPcrMyQ5LmGholPZR8wBY~8T6lZqmQmSVHJWD8YORCEpRJed7BJJrl1LJeE1ud9l8IZmGIE34PyPHhOJXu8UBWIK5thL0ZAiRgFGFdWdd0EttK3WTmwiQiwnmPtdYKSHL0yw6KSmBGTkgv29ITdZN-TmH8qV2hvFAUNa4BAn~1m35npj0MA9Njb7ZWaiV4CJK1wcGNrF8koXwfg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            />
            <Avatar
              alt="Cindy Baker"
              src="https://s3-alpha-sig.figma.com/img/a27b/b91a/fb0ec304610b4834f08a60cec93a7a06?Expires=1684713600&Signature=Ypwg0admhJu4dpWzCqBbUFtTFBRJSWUePQQ4q4fyZXGAn2NfwAiAWvDJ71BarvH5Su8rW4~iyGzklyga7vZEUwxC08~wqrtr~EYUc4WAqHBh-UdTnz3rLrdwt9zpidIpL8mYVgB21G~QOxkYckOyaCBxEBKVSs68tDE5LO4TmivUFDas87opyNC1fTkeX7YxGZMJYZqRN64opuQuPMbiQlaUGfufpdnqobm5TPqflXWuKv-OkTWMnu~FPdr5nC1gFcC731SU1xjve1mP5clz-vtWB-Hsv90w9rVwb3kZrSEywpx9h4nSKucsnxy6R3NuekGgMVAVSaAPGJTdUF00Zg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            />
            <Avatar
              alt="Agnes Walker"
              src="https://s3-alpha-sig.figma.com/img/f977/ce4e/b8057b6e1584e50febde66d2ac2a339a?Expires=1684713600&Signature=CJW06BGMPurBbyc4qKr5CDgYEUYqd0i8fNpmnn061mPACSXD2Gfbt3QYrtoWpV2ht9uoBTScjVFaOz9ScN~CT5OuUSVCvcVSOCa-n4NEuxLyV5K2HPPx58Sz1DON0qnqwZL3ZYNWYbQovTKSHTwyzPKxMh62HnHJFexGu0KDcSDm4wudtSQh29LOobe3SVjVR3MqZBuNk9V8YohXGzQmCRVnhItfzZjNPbcMBjJRguWmbFueD4Mi~fPSg1QUsApRlnf~NCL0AvCcCXX-55-BcTIOskblQRj7jEZhLaxiv9kvcF1m3p~~ibh~-XoTqCzklXaGcuoS1gMQ198SMq9GAQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            />
            <Avatar alt="Trevor Henderson" src="./user1.jpg" />
          </AvatarGroup>
        </div>
        <div className="w-[400px] shrink-0">
          <img
            className="object-cover object-center h-full rounded-t-full "
            alt="image"
            src="https://s3-alpha-sig.figma.com/img/116d/fc74/21456c331445bbb43b3c47aa2b960390?Expires=1684713600&Signature=GUlHiAFn6~j-wELHXFbzhwF5LCdjqSakEQXw5bIHe-ktYFPB5zoaRc-5Yxge-7ncyoH4dLTVQ7aKII~70OE7fYJaVdI8jqT-ao-4pgdhyVGuls1rssqqHWa9JNXVo8Y6BryvUy7UUZqUMFcSZcLVcE-wQFkKa8-uRUxP8ZeQzY5ZagKXMU9ke10w50GVI0mEcvsSexkv5-XBStzS3kR4Rr4mNSJmmmF~wM3GrWU7iFl-cPhTVNj5Ov5U2Lh19JZTbihW6JkM5NoXQazNQBXJGKr0T-uP8kxY2-wC7Lk5aYuSuDiaIJBdTbH8uvasBM21zojICbNmTHt9xQUPln~7eQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          />
        </div>
      </div>

      <div className="mt-[100px] mx-[75px] mb-[50px]">
        <h3 className="font-bold text-center capitalize text-heading-5">
          Đội ngũ của chúng tôi
        </h3>
        <p className="w-3/5 mx-auto mt-5 leading-9 text-center text-philippine-gray text-heading-8">
          Chúng tôi viết nhiều thứ khác nhau liên quan đến đồ nội thất, từ các
          mẹo và những điều tôi cần chú ý khi chọn đồ nội thất
        </p>
      </div>
      <div className="mx-[75px]">
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          pagination={true}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <CardTeam
              name="Nguyễn Hải Đăng"
              position="Giám đốc tài chính"
              avatar="./user1.jpg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <CardTeam
              name="Nguyễn Hải Đăng"
              position="Giám đốc tài chính"
              avatar="./user1.jpg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <CardTeam
              name="Nguyễn Hải Đăng"
              position="Giám đốc tài chính"
              avatar="./user1.jpg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <CardTeam
              name="Nguyễn Hải Đăng"
              position="Giám đốc tài chính"
              avatar="./user1.jpg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <CardTeam
              name="Nguyễn Hải Đăng"
              position="Giám đốc tài chính"
              avatar="./user1.jpg"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="flex relative bg-scarlet py-[62px] mt-[145px] px-[75px]">
        <div className="w-3/5">
          <p className="mb-[10px]">Đồ trang trí hiện đại</p>
          <h2 className="text-heading-5 mb-[30px] leading-[60px]">
            Giúp căn phòng của bạn có một diên mạo mới nổi bật hơn, hiện đại
            hơn.
          </h2>
          <Button title="Mua ngay" variant="secondary" className="px-8 py-4" />
        </div>
        <img
          src="./giraffe_pot.png"
          className="absolute top-0 right-0 drop-shadow-xl -translate-y-1/4"
        />
      </div>

      <h3 className="w-1/3 leading-[60px] mt-[100px] mb-[50px] mx-auto font-bold text-center text-heading-5">
        Khách hàng đã nói gì về dịch vụ của chúng tôi
      </h3>
      <div className="mx-[75px] mb-[128px]">
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          pagination={true}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <Quote
              address="Quận 8, TP Hồ Chí Minh"
              avatar="https://i.pinimg.com/564x/e6/68/ae/e668aee6a9496753b329e241e4105822.jpg"
              name="Ngô Huy Tuấn"
              subTitle="Tôi đã mua sản phẩm của cửa hàng này và nhìn chung rất ổn. Sản phẩm ưu nhìn, đẹp, vừa tầm giá, dịch vụ chăm sóc khách hàng khá thân thiện. Số lượng sản phẩm đa dạng, nhiều mẫu mà đẹp. Tôi sẽ giới thiệu cho các đồng nghiệp của mình về cửa hàng này"
              title="Sản phẩm tốt, trong rất xinh luôn."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Quote
              address="Hoàn Kiếm, Hà Nội"
              avatar="https://i.pinimg.com/564x/66/fb/8f/66fb8f9b6738f663ad883e3ed6c8f173.jpg"
              name="Đặng Thanh Huyền"
              subTitle="Tôi đã mua sản phẩm của cửa hàng này và nhìn chung rất ổn. Sản phẩm ưu nhìn, đẹp, vừa tầm giá, dịch vụ chăm sóc khách hàng khá thân thiện. Số lượng sản phẩm đa dạng, nhiều mẫu mà đẹp. Tôi sẽ giới thiệu cho các đồng nghiệp của mình về cửa hàng này"
              title="Nên mua nha mọi người."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Quote
              address="Quận 8, TP Hồ Chí Minh"
              avatar="https://i.pinimg.com/564x/e6/68/ae/e668aee6a9496753b329e241e4105822.jpg"
              name="Ngô Huy Tuấn"
              subTitle="Tôi đã mua sản phẩm của cửa hàng này và nhìn chung rất ổn. Sản phẩm ưu nhìn, đẹp, vừa tầm giá, dịch vụ chăm sóc khách hàng khá thân thiện. Số lượng sản phẩm đa dạng, nhiều mẫu mà đẹp. Tôi sẽ giới thiệu cho các đồng nghiệp của mình về cửa hàng này"
              title="Sản phẩm tốt, trong rất xinh luôn."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Quote
              address="Quận 8, TP Hồ Chí Minh"
              avatar="https://i.pinimg.com/564x/e6/68/ae/e668aee6a9496753b329e241e4105822.jpg"
              name="Ngô Huy Tuấn"
              subTitle="Tôi đã mua sản phẩm của cửa hàng này và nhìn chung rất ổn. Sản phẩm ưu nhìn, đẹp, vừa tầm giá, dịch vụ chăm sóc khách hàng khá thân thiện. Số lượng sản phẩm đa dạng, nhiều mẫu mà đẹp. Tôi sẽ giới thiệu cho các đồng nghiệp của mình về cửa hàng này"
              title="Sản phẩm tốt, trong rất xinh luôn."
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <Subcribe />
    </div>
  );
}
