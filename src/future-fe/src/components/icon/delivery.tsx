import React from "react";

interface delivery {
  color: string;
}

// #F8DFB6
function DeliveryIcon({ color }: delivery) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M22 8c.01-.07.01-.14 0-.21v-.08a.772.772 0 00-.07-.16.35.35 0 00-.05-.08l-.1-.13-.08-.06-.12-.09-9-5a1 1 0 00-1 0l-9 5-.09.07-.11.08a.41.41 0 00-.07.11.39.39 0 00-.08.1.59.59 0 00-.06.14.3.3 0 000 .1A.76.76 0 002 8v8a1 1 0 00.52.87l9 5a.75.75 0 00.13.06h.1c.164.04.336.04.5 0h.1l.14-.06 9-5A1 1 0 0022 16V8zm-10 3.87L5.06 8l2.76-1.52 6.83 3.9L12 11.87zm0-7.72L18.94 8 16.7 9.25 9.87 5.34 12 4.15zM4 9.7l7 3.92v5.68l-7-3.89V9.7zm9 9.6v-5.68l3-1.68V15l2-1v-3.18l2-1.11v5.7l-7 3.89z"
      ></path>
    </svg>
  );
}

export default DeliveryIcon;
