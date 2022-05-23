import { gql } from "@apollo/client";
import clsx from "clsx";
import { Navbar_NavbarFragment } from "libs/graphql";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useMemo } from "react";

type NavEntry = {
  label: string;
  link: string;
  items?: { label: string; link: string }[];
};

const NavEntry = (props: NavEntry) => {
  const { label, link, items } = props;

  return (
    <div
      className={
        "group relative flex items-center px-3 text-sm font-medium hover:bg-who-blue-dark hover:text-white"
      }
    >
      <Link href={link}>
        <a className="flex h-full items-center">{label}</a>
      </Link>

      {items && items.length > 0 && (
        <div className="invisible z-40 opacity-0 transition duration-100 ease-out group-hover:visible group-hover:opacity-100">
          <div
            className={clsx(
              "absolute left-0 top-full w-44 bg-who-blue-dark p-1 text-white shadow-lg focus:outline-none",
              "origin-top-left text-left"
            )}
          >
            {items.map(({ link, label }, idx) => (
              <Link key={idx} href={link}>
                <a className="flex h-full items-center rounded p-2 hover:bg-who-blue-light">
                  {label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

type NavbarProps = {
  navbar: Navbar_NavbarFragment;
};

const Navbar = (props: NavbarProps) => {
  const { navbar } = props;
  const { t } = useTranslation();

  const items = useMemo(() => {
    return [
      {
        label: t("Projects"),
        link: "/projects",
      },
      {
        label: t("Teams"),
        link: "/teams",
      },
    ];
  }, [t]);

  return (
    <div className="flex h-full items-stretch gap-2 uppercase text-white">
      {items.map((itemProps) => (
        <NavEntry key={itemProps.link} {...itemProps} />
      ))}
    </div>
  );
};

Navbar.fragments = {
  navbar: gql`
    fragment Navbar_navbar on Query {
      teams(page: 1, perPage: 5) {
        items {
          id
          name
        }
      }
      projects: accessmodProjects(page: 1, perPage: 5) {
        items {
          id
          name
        }
      }
    }
  `,
};

export default Navbar;
