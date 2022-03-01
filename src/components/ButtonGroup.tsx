import { Fragment, ReactElement } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import Button from "./Button";

export type ButtonGroupOption = {
  onClick: (event: { preventDefault: Function }) => void;
  label: string;
  className?: string;
};

type Props = {
  items: ButtonGroupOption[];
};

const ButtonGroup = ({ items }: Props) => {
  const [firstItem, ...listItems] = items;
  return (
    <div className="relative z-0 shadow-sm flex rounded-md items-center">
      <Button
        variant="white"
        size="md"
        onClick={firstItem.onClick}
        className={clsx(
          "px-6 focus:z-10",
          listItems.length > 0 && "rounded-r-none rounded-br-none",
          firstItem.className
        )}
      >
        {firstItem.label}
      </Button>
      {listItems.length > 0 && (
        <Menu as="div" className="-ml-px relative" style={{ lineHeight: 0 }}>
          <Menu.Button as="div" className="block">
            <Button
              variant="white"
              size="md"
              className="rounded-l-none px-2 border-l-gray-300"
            >
              <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 -mr-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {listItems.map((item) => (
                  <Menu.Item key={item.label} onClick={item.onClick}>
                    {({ active }) => (
                      <button
                        type="button"
                        className={clsx(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "w-full block px-4 py-2 text-sm text-right",
                          item.className
                        )}
                      >
                        {item.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  );
};

export default ButtonGroup;
