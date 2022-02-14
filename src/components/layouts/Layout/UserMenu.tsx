import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import MenuLink from "components/MenuLink";
import clsx from "clsx";
import { UserIcon } from "@heroicons/react/solid";

const UserMenu = () => {
  return (
    <Menu as="div" className="ml-3 relative">
      <Menu.Button className="max-w-xs flex items-center text-sm focus:outline-none ">
        <span className="sr-only">Open user menu</span>
        <UserIcon className="h-6 w-6 text-white" />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-36 rounded shadow-lg py-1 bg-white text-gray-900 focus:outline-none text-right z-40">
          <Menu.Item>
            {({ active }) => (
              <MenuLink
                href="/settings"
                className={clsx(
                  "block mx-1 rounded px-4 py-2 text-sm",
                  active && "bg-gray-200"
                )}
              >
                Settings
              </MenuLink>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <MenuLink
                href="/help"
                className={clsx(
                  "block mx-1 rounded px-4 py-2 text-sm",
                  active && "bg-gray-200"
                )}
              >
                Help
              </MenuLink>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <MenuLink
                href="/logout"
                className={clsx(
                  "block mx-1 rounded px-4 py-2 text-sm",
                  active && "bg-gray-200"
                )}
              >
                Logout
              </MenuLink>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
