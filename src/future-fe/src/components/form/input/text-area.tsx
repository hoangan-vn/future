import clsx from "clsx";
import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props {
  placehodler?: string;
  label?: string;
  error?: string;
  className?: string;
  register?: UseFormRegister<any>;
  option?: RegisterOptions;
  name?: string;
  labelClassName?: string;
}

export default function TextArea({
  placehodler = "aA",
  label,
  error,
  className,
  register,
  option,
  name,
  labelClassName,
}: Props) {
  if (register && name) {
    return (
      <div>
        {label && (
          <h3
            className={clsx(
              "text-heading-6 mb-[15px]",
              error && "text-red-500"
            )}
          >
            {label}
          </h3>
        )}
        <textarea
          {...register(name, { ...option })}
          placeholder={placehodler}
          className={clsx(
            "px-5 py-[22px] text-body-1 resize-none leading-5 outline-none border-[1px] border-light-gray bg-transparent",
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
          className={clsx(
            "text-heading-6 mb-[15px] mt-[10px]",
            labelClassName,
            error && "text-red-500"
          )}
        >
          {label}
        </h3>
      )}
      <textarea
        placeholder={placehodler}
        className={clsx(
          "px-5 py-[22px] text-body-1 resize-none leading-5 outline-none border-[1px] border-light-gray bg-transparent",
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
