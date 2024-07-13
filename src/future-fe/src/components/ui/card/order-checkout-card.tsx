import React from "react";
import { formatPrice } from "../../../utils/string-utils";

interface Props {
  name: string;
  imgUrl: string;
  price: number;
  quantity: number;
}

export default function OrderChekoutCard({
  imgUrl,
  name,
  price,
  quantity,
}: Props) {
  return (
    <div className="flex gap-x-4">
      <img src={imgUrl} className="w-32 h-32 shrink-0" />
      <div className="flex flex-col justify-evenly">
        <h4 className="font-bold leading-[30px] text-heading-7">{name}</h4>
        <span className="text-philippine-gray">x{quantity}</span>
        <p className="font-bold text-heading-7 text-dark-slate-gray">
          {formatPrice(price)}
        </p>
      </div>
    </div>
  );
}
