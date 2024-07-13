import React from "react";
import Button from "../../form/button/button";
import { useNavigate } from "react-router-dom";

interface Props {
  _id: string;
  title: string;
  subTitle: string;
  image: string;
}

export default function CategoryCard({ title, subTitle, image, _id }: Props) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3 bg-scarlet">
      <div className="pt-[35px] pl-[30px] col-span-2">
        <p className="capitalize text-body-1 mb-[25px] text-dark-slate-gray">
          {title}
        </p>
        <h3 className="text-heading-6 mb-[35px]">{subTitle}</h3>
        <Button
          onClick={() => {
            navigate(`/shop?categoryName=${title}`);
          }}
          title="Mua ngay"
          variant="secondary"
          className="px-10 py-3 mb-6 capitalize"
        />
      </div>
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
          <defs>
            <clipPath id={_id}>
              <path
                fill="hsl(340, 45%, 50%)"
                d="M527.979 546.47c75.399-50.59 33.232-326.517-10.974-413.987C472.8 45.013 338.145-28.94 262.747 21.65c-75.4 50.59-242.34 326.903-198.135 414.373 44.205 87.47 387.968 161.037 463.367 110.447s33.232-326.517-10.974-413.987"
              ></path>
            </clipPath>
          </defs>
          <path
            fill='url("#ssshape-pattern5")'
            stroke="hsl(170, 42%, 26%)"
            strokeWidth="10"
            d="M525.644 253.378c-27.545-62.275-236.826-67.066-307.186-45.808-70.359 21.257-142.515 111.078-114.97 173.353 27.545 62.276 209.88 221.557 280.24 200.3 70.36-21.258 169.461-265.57 141.916-327.845-27.545-62.275-236.826-67.066-307.186-45.808"
            transform="scale(1.3334) rotate(80 340.287 238.926)"
          ></path>
          <defs>
            <pattern
              id="ssshape-pattern5"
              width="20"
              height="20"
              patternTransform="scale(.8)"
              patternUnits="userSpaceOnUse"
            >
              <rect width="100%" height="100%" fill="none"></rect>
              <path fill="hsl(205, 69%, 60%)" d="M0 0H5V5H0z"></path>
            </pattern>
          </defs>
          <image
            xlinkHref={image}
            clipPath={`url(#${_id})`}
            className="object-cover h-full"
          />
        </svg>
      </div>
    </div>
  );
}
