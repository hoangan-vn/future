import React, { SVGProps } from "react";

export function CirclePlus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
      {...props}
    >
      <path fill="#D9D9D9" d="M13 7.5h-2v4H7v2h4v4h2v-4h4v-2h-4v-4z"></path>
      <path
        fill="#D9D9D9"
        d="M12 2.5c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
      ></path>
    </svg>
  );
}
