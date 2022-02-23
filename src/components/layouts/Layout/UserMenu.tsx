import { gql } from "@apollo/client";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Avatar from "components/Avatar";
import MenuLink from "components/MenuLink";
import { UserMenu_UserFragment } from "libs/graphql";
import { useTranslation } from "next-i18next";
import { Fragment } from "react";

type UserMenuProps = {
  user: UserMenu_UserFragment;
};

const UserMenu = (props: UserMenuProps) => {
  const { user } = props;
  const { t } = useTranslation();
  return (
    <Menu as="div" className="ml-3 relative">
      <Menu.Button className="max-w-xs flex items-center text-sm focus:outline-none ">
        <span className="sr-only">{t("Open user menu")}</span>
        <Avatar
          size="sm"
          color={user.avatar.color}
          initials={user.avatar.initials}
        />
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
                {t("Settings")}
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
                {t("Help")}
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
                {t("Logout")}
              </MenuLink>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

UserMenu.fragments = {
  user: gql`
    fragment UserMenu_user on User {
      avatar {
        initials
        color
      }
    }
  `,
};

export default UserMenu;
