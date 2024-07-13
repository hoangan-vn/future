import React, { useEffect, useRef } from "react";
import Underline from "../../icon/underline";

interface Props {
  text: string;
}

export default function TextCustomUnderline({ text }: Props) {
  const ref = useRef<HTMLElement>(null);

  return (
    <p className="relative inline font-heading">
      <strong ref={ref} className="text-dark-slate-gray">
        {text}
      </strong>
      <Underline className="absolute left-0 inline w-full -bottom-1/3" />
    </p>
  );
}
