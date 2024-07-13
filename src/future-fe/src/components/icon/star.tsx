import React from "react";

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      {...props}
    >
      <g clipPath="url(#clip0_185_1643)">
        <path
          // fill="#D9D9D9"
          d="M15.958 6.137a.849.849 0 00-.732-.584l-4.618-.42L8.782.86A.85.85 0 007.218.86L5.392 5.133l-4.619.42A.85.85 0 00.291 7.04l3.49 3.061-1.03 4.534a.85.85 0 001.266.919L8 13.175l3.982 2.38a.85.85 0 001.265-.919l-1.029-4.534 3.49-3.06a.85.85 0 00.25-.905z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_185_1643">
          <path fill="#fff" d="M0 0H16V16H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default Star;
