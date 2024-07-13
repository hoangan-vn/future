import React from "react";
import Button from "../components/form/button/button";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleBackToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="relative w-full h-screen">
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-[240px] text-light-gray">
        404
      </span>
      <div className="absolute text-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 whitespace-nowrap">
        <h3 className="text-heading-3">OPPS..., KHÔNG TÌM THẤY TRANG!</h3>
        <p className="uppercase text-body-2">
          trang bạn đang tìm kiếm có thể đã bị xóa hoặc tạm thời không có
        </p>
      </div>
      <Button
        onClick={handleBackToHomePage}
        title="Trở về trang chủ"
        variant="primary"
        className="absolute px-4 py-2 font-bold uppercase -translate-x-1/2 bottom-16 left-1/2"
      />
    </div>
  );
}
