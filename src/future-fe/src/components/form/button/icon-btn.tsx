import React from "react";
import clsx from "clsx";

interface Props {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function IconBtn({ icon, onClick, className }: Props) {
  return (
    <button onClick={onClick} className={clsx("p-3", className)}>
      {icon}
    </button>
  );
}
