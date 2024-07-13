import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface Props {
  title: string;
  content: string;
}

function Accordion({ title, content }: Props) {
  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`${open ? "text-emerald-500 border-b-0" : ""}
              flex w-full justify-between bg-transparent text-left text-sm font-medium text-black-900 hover:text-emerald-500 focus:outline-none`}
            >
              <h3 className="text-heading-6">{title}</h3>
              <ChevronDownIcon
                className={`${
                  open ? "rotate-180 text-emerald-500" : ""
                } h-6 w-6 text-black-500 transition-transform ease-linear`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="pt-5 !mt-0 text-sm text-gray-500">
              {content}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="h-2 border-b-2"></div>
    </>
  );
}

export default Accordion;
