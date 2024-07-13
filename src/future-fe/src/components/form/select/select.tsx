import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React, { Fragment, useEffect, useState } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

export interface IOption {
  label: string;
  value: string;
}

interface Props {
  className?: string;
  options: IOption[];
  defaultValue?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  value?: string;
  name: string;
  label?: string;
  error?: string;
  onChange: (value: string) => void;
}

export default function Select({
  className,
  options,
  defaultValue,
  placeholder = "aA...",
  register,
  rules,
  name,
  label,
  error,
  value,
  onChange,
}: Props) {
  const [selected, setSelected] = useState<IOption>();

  useEffect(() => {
    if (defaultValue) {
      setSelected(options.find((item) => item.value === defaultValue));
    }
  }, []);

  useEffect(() => {
    setSelected(options.find((item) => item.value === value));
  }, [value]);

  // useEffect(() => {
  // 	setSelected(undefined);
  // }, [options]);

  const handleOnChange = (value: IOption) => {
    onChange(value.value);
    setSelected(value);
  };

  return (
    <div>
      <Listbox value={selected} onChange={handleOnChange}>
        <div className="hidden">
          {options.map((item) => (
            <input
              {...register(name, { ...rules })}
              name={name}
              type="radio"
              id={item.value}
              defaultChecked={item.value === defaultValue}
              value={item.value}
              key={item.value}
            />
          ))}
        </div>
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
        <div className="relative">
          <Listbox.Button
            className={clsx(
              "relative text-left cursor-default border-light-gray px-5 py-[22px] text-body-1 leading-5 outline-none border-[1px]",
              error && "border-red-500",
              className && className
            )}
          >
            <span
              className={clsx("block truncate", !selected && "text-gray-400")}
            >
              {selected ? selected.label : placeholder}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronUpDownIcon
                className="w-5 h-5 text-light-gray"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          {error && (
            <p className={clsx("text-body-3", error && "text-red-500")}>
              {error}
            </p>
          )}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full z-[1] py-1 mt-1 overflow-auto border-[1px] border-light-gray text-base bg-white max-h-60">
              {options.map((item) => (
                <Listbox.Option
                  key={item.value}
                  className={({ active }) =>
                    `cursor-default select-none flex justify-between ${
                      active
                        ? "bg-dark-slate-gray/10 text-dark-slate-gray"
                        : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <label
                        htmlFor={item.value}
                        className={`block truncate font-body pl-5 py-2 w-full ${
                          selected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {item.label}
                      </label>
                      {selected ? (
                        <span className="py-2 pr-5 text-dark-slate-gray">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
