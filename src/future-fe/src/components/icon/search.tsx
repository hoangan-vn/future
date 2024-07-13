import React from "react";

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      fill="none"
      viewBox="0 0 19 19"
      {...props}
    >
      <path
        fill="#000201"
        d="M8 16a7.952 7.952 0 004.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0016 8c0-4.411-3.589-8-8-8S0 3.589 0 8s3.589 8 8 8zM8 2c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"
      ></path>
    </svg>
  );
}

export default Search;
