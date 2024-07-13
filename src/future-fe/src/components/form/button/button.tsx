import React from "react";

interface Props {
  variant: "primary" | "secondary" | "teritary" | "wheat";
  title: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  form?: string;
}

export default function Button({
  variant,
  title,
  className,
  onClick,
  type = "button",
  form,
}: Props) {
  const handleBtnColor = () => {
    switch (variant) {
      case "primary":
        return "bg-dark-slate-gray text-wheat border-2 border-dark-slate-gray";
      case "secondary":
        return "text-dark-slate-gray border-2 border-dark-slate-gray";
      case "teritary":
        return "bg-black text-white";
      case "wheat":
        return "bg-wheat text-dark-slate-gray";
    }
  };

  return (
    <button
      onClick={onClick}
      form={form}
      type={type}
      className={`font-body ${handleBtnColor()} ${className}`}
    >
      {title}
    </button>
  );
}
