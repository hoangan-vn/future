import clsx from "clsx";
import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  error?: string;
  className?: string;
  register: UseFormRegister<any>;
  option?: RegisterOptions;
  name: string;
  value: string;
  defaultChecked?: boolean;
}

export default function RadioButton({
  label,
  error,
  className,
  register,
  option,
  name,
  value,
  defaultChecked,
}: Props) {
  return (
    <div>
      <input
        className="hidden"
        id={value}
        type="radio"
        {...register(name, { ...option })}
        value={value}
        defaultChecked={defaultChecked}
      />
      <div className="flex items-center cursor-default group gap-x-2">
        <div
          className={clsx(
            "w-6 h-6 transition-all duration-150 ease-in-out border-2 rounded-full border-light-gray group-hover:border-dark-slate-gray group-hover:border-4",
            defaultChecked && "border-4 !border-dark-slate-gray"
          )}
        ></div>
        <label
          htmlFor={value}
          className={clsx(
            "text-body-1 font-body capitalize",
            error && "text-red-500"
          )}
        >
          {label}
        </label>
      </div>
    </div>
  );
}
