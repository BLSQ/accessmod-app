import clsx from "clsx";
import Link from "next/link";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavbarQuery } from "libs/graphql";
import useCacheKey from "hooks/useCacheKey";
import { CustomApolloClient } from "libs/apollo";

type NavEntry = {
  label: string;
  link: string;
  items?: { label: string; link: string }[];
};

type NavState = NavEntry[];

const NavEntry = (props: NavEntry) => {
  const { label, link, items } = props;

  return (
    <div
      className={
        "hover:bg-who-blue-dark hover:text-white px-3 text-sm font-medium flex items-center relative group"
      }
    >
      <Link href={link}>
        <a className="h-full flex items-center">{label}</a>
      </Link>

      {items && items.length > 0 && (
        <div className="transition invisible opacity-0 duration-100 ease-out group-hover:visible group-hover:opacity-100 z-40">
          <div
            className={clsx(
              "absolute left-0 top-full w-44 shadow-lg p-1 bg-who-blue-dark text-white focus:outline-none",
              "text-left origin-top-left"
            )}
          >
            {items.map(({ link, label }, idx) => (
              <Link key={idx} href={link}>
                <a className="h-full p-2 flex rounded items-center hover:bg-who-blue-light">
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

const Navbar = () => {
  const { data, refetch } = useNavbarQuery();
  const [items, setItems] = useState<NavState>([
    {
      label: "Dashboard",
      link: "/",
    },
    {
      label: "Projects",
      link: "/projects",
    },
  ]);

  useCacheKey("projects", () => refetch());

  useEffect(() => {
    if (data) {
      const projects = data.accessmodProjects.items.map((project) => ({
        label: project.name,
        link: `/projects/${encodeURIComponent(project.id)}`,
      }));
      if (projects.length > 0) {
        projects.push({ label: "See all", link: "/projects" });
      }
      setItems([
        {
          label: "Dashboard",
          link: "/",
        },
        {
          label: "Projects",
          link: "/projects",
          items: projects,
        },
      ]);
    }
  }, [data]);
  return (
    <div className="flex gap-2 uppercase text-white h-full items-stretch">
      {items.map((itemProps) => (
        <NavEntry key={itemProps.link} {...itemProps} />
      ))}
    </div>
  );
};

Navbar.prefetch = async (client: CustomApolloClient) => {
  await client.query({
    query: gql`
      query Navbar {
        accessmodProjects(page: 1, perPage: 5) {
          items {
            id
            name
          }
          totalPages
        }
      }
    `,
  });
};

export default Navbar;
