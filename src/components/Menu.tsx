import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Classes as ButtonClasses } from "components/Button";
import { Fragment, ReactNode } from "react";

export const MenuClasses = {
  Menu: "relative",
  TriggerButton: clsx(
    "group",
    ButtonClasses.base,
    ButtonClasses.white,
    ButtonClasses.md
  ),
  Item: "group flex px-2 py-2 items-center w-full text-sm rounded",
  ActiveItem: "bg-lochmara text-white",
  Items:
    "origin-top-right absolute right-0 mt-2 w-36 rounded shadow-lg bg-white text-gray-900 focus:outline-none text-right z-40 divide-y divide-gray-200 ",
};

const TRANSITION = {
  enter: "transition ease-out duration-100",
  enterFrom: "transform opacity-0 scale-95",
  enterTo: "transform opacity-100 scale-100",
  leave: "transition ease-in duration-75",
  leaveFrom: "transform opacity-100 scale-100",
  leaveTo: "transform opacity-0 scale-95",
};

type MenuProps = {
  label: string;
  className?: string;
  children: ReactNode;
};

const Menu = ({ label, className, children }: MenuProps) => {
  return (
    <HeadlessMenu as="div" className={clsx(MenuClasses.Menu, className)}>
      <HeadlessMenu.Button className={MenuClasses.TriggerButton}>
        {label}
        <ChevronDownIcon
          className="ml-2 -mr-1 h-4 w-4 text-gray-500 group-hover:text-gray-700"
          aria-hidden="true"
        />
      </HeadlessMenu.Button>
      <Transition as={Fragment} {...TRANSITION}>
        <HeadlessMenu.Items className={MenuClasses.Items}>
          <div className="px-1 py-1">{children}</div>
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  );
};

const Item = ({
  children,
  activeClassName = MenuClasses.ActiveItem,
  onClick,
  className = MenuClasses.Item,
}: {
  children: ReactNode;
  onClick?: ((event: { preventDefault: Function }) => void) | undefined;
  className?: string;
  activeClassName?: string;
}) => (
  <HeadlessMenu.Item>
    {({ active }) => (
      <button
        onClick={onClick}
        className={clsx(className, active && activeClassName)}
      >
        {children}
      </button>
    )}
  </HeadlessMenu.Item>
);

Menu.Item = Item;

export default Menu;
