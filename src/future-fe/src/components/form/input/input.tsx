import clsx from "clsx";
import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props {
  variation?: "outlined" | "filled";
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
  register?: UseFormRegister<any>;
  option?: RegisterOptions;
  type?: "text" | "password" | "number";
  name?: string;
}

export default function Input({
  variation = "filled",
  placeholder = "aA",
  label,
  error,
  className,
  register,
  option,
  name,
  type,
}: Props) {
  if (register && name) {
    return (
      <div>
        {label && (
          <h3
            className={clsx(
              "text-heading-7 mb-[15px]",
              error && "text-red-500"
            )}
          >
            {label}
          </h3>
        )}
        <input
          {...register(name, { ...option })}
          type={type}
          placeholder={placeholder}
          className={clsx(
            "px-5 py-[22px] text-body-1 leading-5 outline-none border-[1px]",
            variation === "filled" && "bg-white border-white",
            variation === "outlined" && "border-light-gray bg-transparent",
            error && "border-red-500",
            className && className
          )}
        />
        {error && (
          <p className={clsx("text-body-3", error && "text-red-500")}>
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      {label && (
        <h3
          className={clsx("text-heading-7 mb-[15px]", error && "text-red-500")}
        >
          {label}
        </h3>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={clsx(
          "px-5 py-[22px] text-body-1 leading-5 outline-none border-[1px]",
          variation === "filled" && "bg-white border-white",
          variation === "outlined" && "border-light-gray bg-transparent",
          error && "border-red-500",
          className && className
        )}
      />
      {error && (
        <p className={clsx("text-body-3", error && "text-red-500")}>{error}</p>
      )}
    </div>
  );
}
