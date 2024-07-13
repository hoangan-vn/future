import React from "react";
import QuoteAltLeft from "../icon/quote-alt-left";
import { Avatar } from "@mui/material";

interface Props {
  title: string;
  subTitle: string;
  avatar: string;
  name: string;
  address: string;
}

export default function Quote({
  title,
  subTitle,
  avatar,
  name,
  address,
}: Props) {
  return (
    <div className="space-y-5 select-none">
      <QuoteAltLeft />
      <p className="font-semibold text-heading-8">{title}</p>
      <p className="text-body-3 font-normal text-philippine-gray !mt-2">
        {subTitle}
      </p>
      <div className="flex items-center gap-x-4">
        <Avatar alt={name} src={avatar} sx={{ width: 56, height: 56 }} />
        <div>
          <p className="font-semibold text-heading-8">{name}</p>
          <p className="text-philippine-gray text-body-3">{address}</p>
        </div>
      </div>
    </div>
  );
}
