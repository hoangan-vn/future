import React from "react";
import BannerContactUs from "../components/ui/banner/banner-contact-us";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";
import ContactUsFreqQuestionAndForm from "../components/ui/contact-us";
import Subcribe from "../components/ui/subcribe";

export default function ContactUs() {
  return (
    <div className="px-[76px] space-y-[100px] mt-[100px]">
      <Swiper
        direction="vertical"
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

      <ContactUsFreqQuestionAndForm />

      <Subcribe />
    </div>
  );
}
