import React from "react";

export function Trash(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#FF1616"
        d="M5 20a2 2 0 002 2h10a2 2 0 002-2V8h2V6h-4V4a2 2 0 00-2-2H9a2 2 0 00-2 2v2H3v2h2v12zM9 4h6v2H9V4zM8 8h9v12H7V8h1z"
      ></path>
      <path fill="#FF1616" d="M9 10h2v8H9v-8zm4 0h2v8h-2v-8z"></path>
    </svg>
  );
}
