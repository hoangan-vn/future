import React, { SVGProps } from "react";

function Underline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="280"
      height="17"
      fill="none"
      viewBox="0 0 280 17"
      {...props}
    >
      <path
        stroke="#F8DFB6"
        strokeWidth="3"
        d="M1 15c85.021-9.81 259.45-23.544 277 0"
      ></path>
    </svg>
  );
}

export default Underline;
