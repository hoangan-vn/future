import React from "react";
import IconBtn from "./icon-btn";
import { Trash } from "../../icon";

export default function TrashBtn() {
  const handleClick = () => {
    // write your logic here
  };
  return (
    <IconBtn onClick={handleClick} icon={<Trash />} className="bg-scarlet" />
  );
}
