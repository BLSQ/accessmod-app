import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import Block from "components/Block";
import { ReactNode } from "react";

const AnalysisStep = (props: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  id?: string;
  titleClassName?: string;
  className?: string;
}) => (
  <Block id={props.id}>
    <Disclosure defaultOpen={props.defaultOpen && !props.disabled}>
      {({ open }) => (
        <>
          <Disclosure.Button
            disabled={props.disabled}
            className="w-full text-left"
          >
            <div
              className={clsx(
                "text-lg flex justify-between -mt-6 pt-6 text-lochmara",
                props.disabled && "text-gray-300",
                props.titleClassName
              )}
            >
              {props.title}
              {open ? (
                <ChevronDownIcon className="h-5" />
              ) : (
                <ChevronUpIcon className="h-5" />
              )}
            </div>
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className={clsx("pt-4", props.className)}>
              {props.children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  </Block>
);

export default AnalysisStep;
