import React from "react";

import FutureIcon from "../../icon/future";
import CircleBtn from "../../form/button-circle/social-btn";
import {
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  TiktokIcon,
} from "../../icon";

const Footer = () => {
  return (
    <footer className="flex flex-col bg-white">
      <div className="flex p-10 gap-x-24">
        <div>
          <div className="mb-5">
            <FutureIcon />
          </div>
          <p className="mb-[30px]">
            Cửa hàng chúng tôi chuyên cung cấp các sản phẩm trang trí phòng như
            đèn, tranh treo tường, đồng hồ, thảm, cốc, ... Hãy truy cập vào
            website để khám phá thêm nhiều sản phẩm hấp dẫn khác.
          </p>
          <div className="flex gap-x-5">
            <CircleBtn type="wheat">
              <InstagramIcon />
            </CircleBtn>
            <CircleBtn type="wheat">
              <FacebookIcon />
            </CircleBtn>
            <CircleBtn type="wheat">
              <TwitterIcon />
            </CircleBtn>
            <CircleBtn type="wheat">
              <TiktokIcon />
            </CircleBtn>
          </div>
        </div>

        <div>
          <h5 className="text-heading-7 leading-[35px] font-semibold mb-5">
            Khách hàng
          </h5>
          <ul className="space-y-5 text-heading-9 whitespace-nowrap">
            <li>Trạng thái đơn hàng</li>
            <li>Bộ sưu tập</li>
            <li>Blog</li>
            <li>Chi nhánh</li>
            <li>Bảo mật</li>
          </ul>
        </div>

        <div>
          <h5 className="text-heading-7 leading-[35px] font-semibold mb-5">
            Thông tin
          </h5>
          <ul className="space-y-5 text-heading-9 whitespace-nowrap">
            <li>Chăm sóc khách hàng</li>
            <li>Tuyển dụng</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="shrink-0">
          <h5 className="text-heading-7 leading-[35px] font-semibold mb-5">
            Theo dõi chúng tôi
          </h5>

          <div className="grid grid-cols-3 gap-x-[15px] gap-y-5">
            <img
              src="./footer6.png"
              alt="6"
              className="h-[105px] aspect-square"
            />
            <img
              src="./footer5.png"
              alt="5"
              className="h-[105px] aspect-square"
            />
            <img
              src="./footer4.png"
              alt="4"
              className="h-[105px] aspect-square"
            />
            <img
              src="./footer3.png"
              alt="3"
              className="h-[105px] aspect-square"
            />

            <img
              src="./footer2.png"
              alt="2"
              className="h-[105px] aspect-square"
            />

            <img
              src="./footer1.png"
              alt="1"
              className="h-[105px] aspect-square"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between p-10">
        <p className="">© Copyright 2022 Furgan. All Rights Reserved.</p>
        <div className="flex justify-between">
          <p className="mr-5">Terms of condition</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
