import React from "react";
import Button from "../form/button/button";
import Input from "../form/input/input";

export default function Subcribe() {
  return (
    <div className="relative pt-[46px] pb-[75px] px-[60px] bg-scarlet">
      <div className="w-1/2">
        <h3 className="mb-[10px] text-heading-3 leading-[60px]">
          Đăng ký ngay để nhận giảm giá 10% cho tất cả sản phẩm
        </h3>
        <p className="mb-10 text-body-2 text-philippine-gray">
          Nhanh tay lên, số lượng có hạn. Chương trình ưu đãi chỉ áp dụng cho
          khách mới.
        </p>
        <div className="flex">
          <Input placeholder="Nhập email tại đây..." className="w-[437px]" />
          <Button
            variant="primary"
            title="Xong"
            className="py-5 font-bold px-9 text-heading-8"
          />
        </div>
      </div>
      <img
        src="/person.png"
        alt="person subcribe"
        className="absolute bottom-0 right-8 h-[460px] aspect-auto"
      />
    </div>
  );
}
