import React, { SVGProps } from "react";

function WhiteHeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 20 20"
      {...props}
    >
      <path d="M10 3.83a4.92 4.92 0 00-5.232-.917c-.602.251-1.15.62-1.609 1.083-1.96 1.969-1.96 5.049.002 7.01l6.11 6.11a.83.83 0 001.1.318.824.824 0 00.289-.249l6.18-6.18c1.96-1.96 1.96-5.04-.003-7.013a4.948 4.948 0 00-3.507-1.461A4.922 4.922 0 0010 3.829zm5.66 1.34c1.302 1.31 1.302 3.355 0 4.658L10 15.488l-5.66-5.66a3.263 3.263 0 01-.003-4.654 3.294 3.294 0 012.333-.977c.87 0 1.696.347 2.324.976l.417.416a.832.832 0 001.178 0l.417-.417c1.26-1.257 3.395-1.254 4.653-.001z"></path>
    </svg>
  );
}

export default WhiteHeartIcon;
