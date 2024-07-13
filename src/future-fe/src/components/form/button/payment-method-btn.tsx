import clsx from "clsx";
import React from "react";
import CircleBtn from "../button-circle/social-btn";

interface Props {
  active?: boolean;
  title: string;
  icon: JSX.Element;
  onClick: (value: string) => void;
}

export default function PaymentMethodBtn({
  title,
  icon,
  active,
  onClick,
}: Props) {
  return (
    <div
      className={clsx(
        "flex gap-x-[10px] py-[15px] px-[30px] justify-center items-center border-2 cursor-pointer",
        active && "border-emerald-700 bg-slate-200"
      )}
      onClick={() => onClick(title)}
    >
      <CircleBtn type={active ? "green" : "gray"}>{icon}</CircleBtn>
      <span className="text-body-1 font-body">{title}</span>
    </div>
  );
}
