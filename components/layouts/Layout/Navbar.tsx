import clsx from "clsx"
import Link from "next/link"
import { Transition } from "@headlessui/react"
import { Fragment, useState } from "react"

const ITEMS = [
  {
    label: "Dashboard",
    link: "/",
  },
  {
    label: "Projects",
    link: "/projects",
    items: [
      { label: "Project 1", link: "/projects/1" },
      { label: "Project 1", link: "/projects/1" },
      { label: "Project 1", link: "/projects/1" },
    ],
  },
  {
    label: "Teams",
    link: "/teams",
    items: [
      { label: "Team 1", link: "/teams/1" },
      { label: "Team 1", link: "/teams/1" },
      { label: "Team 1", link: "/teams/1" },
    ],
  },
]

type NavEntry = {
  label: string
  link: string
  items?: { label: string; link: string }[]
}

const NavEntry = (props: NavEntry) => {
  const { label, link, items } = props

  return (
    <div
      className={
        "hover:bg-who-blue-dark hover:text-white px-2 text-sm font-medium flex items-center relative group"
      }
    >
      <Link href={link}>
        <a className="h-full flex items-center">{label}</a>
      </Link>

      {items && (
        <div className="transition invisible opacity-0 duration-100 ease-out group-hover:visible group-hover:opacity-100">
          <div
            className={clsx(
              "absolute left-0 top-full w-44 shadow-lg p-1 bg-who-blue-dark text-white focus:outline-none",
              "text-left origin-top-left"
            )}
          >
            {items.map(({ link, label }, idx) => (
              <Link key={idx} href={link}>
                <a className="h-full p-2 flex items-center hover:bg-who-blue-light">
                  {label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const Navbar = () => {
  return (
    <div className="flex gap-2 uppercase text-white h-full items-stretch">
      {ITEMS.map((itemProps) => (
        <NavEntry key={itemProps.link} {...itemProps} />
      ))}
    </div>
  )
}

export default Navbar
