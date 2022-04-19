import { gql } from "@apollo/client";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Avatar from "components/Avatar";
import MenuLink from "components/MenuLink";
import { UserMenu_UserFragment } from "libs/graphql";
import { routes } from "libs/router";
import { useTranslation } from "next-i18next";
import { Fragment } from "react";

type UserMenuProps = {
  user: UserMenu_UserFragment;
  className?: string;
};

const UserMenu = (props: UserMenuProps) => {
  const { user, className } = props;
  const { t } = useTranslation();
  return (
    <Menu as="div" className={clsx("relative", className)}>
      <Menu.Button className="flex max-w-xs items-center text-sm focus:outline-none ">
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
        <Menu.Items className="absolute right-0 z-40 mt-2 w-36 origin-top-right rounded bg-white py-1 text-right text-gray-900 shadow-lg focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <MenuLink
                href={routes.settings}
                className={clsx(
                  "mx-1 block rounded px-4 py-2 text-sm",
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
                  "mx-1 block rounded px-4 py-2 text-sm",
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
                  "mx-1 block rounded px-4 py-2 text-sm",
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
