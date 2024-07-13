import React from "react";
import AboutCard from "./AboutCard";

function Strengths() {
  return (
    <div className="flex gap-x-[85px]">
      <div className="w-1/2">
        <h1 className="font-bold text-heading-3">
          Chúng tôi đảm bảo cho đơn hàng của bạn
        </h1>
        <div className="mt-[50px] grid grid-cols-2 gap-[50px]">
          <AboutCard title="Giao hàng nhanh" icon="rocket">
            Liên kết với các đơn vị vận chuyển như Grab, Ninja Van, Giao hàng
            tiết kiệm. Đảm bảo đơn hàng giao đúng hẹn.
          </AboutCard>
          <AboutCard title="Giao hàng an toàn" icon="lock">
            Sản phẩm bạn mua được vận chuyển cẩn thận. Đảm bảo không bị móp méo
            hay hư hỏng.
          </AboutCard>
          <AboutCard title="7 ngày đổi trả" icon="reload">
            Khách hàng có thể đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.
          </AboutCard>
          <AboutCard title="Sẵn sàng tư vấn 24/7" icon="phone">
            Đội ngũ tư vấn luôn có mặt để giải đáp thắc mắc của bạn mọi lúc, mọi
            nơi.
          </AboutCard>
        </div>
      </div>
      <div className="w-1/2">
        <img
          src="/strength_img.png"
          alt="strength image"
          className="object-cover h-full"
        />
      </div>
    </div>
  );
}

export default Strengths;
