import clsx from "clsx";
import Link from "next/link";
import { ComponentClass, FunctionComponent, ReactNode } from "react";
import { Url } from "url";
import Block from "./Block";

const Aside = (props: {
  as?: string | FunctionComponent | ComponentClass;
  className?: string;
  children: ReactNode;
}) => {
  const { className, as = "aside", children } = props;

  return (
    <Block
      as={as}
      background="bg-midnight-blue"
      className={clsx(
        "h-fit w-full py-4 text-white md:px-4 md:py-6 xl:px-7",
        className
      )}
    >
      <ul className="list-none">{children}</ul>
    </Block>
  );
};

Aside.Item = function AsideItem({ children }: { children: ReactNode }) {
  return (
    <li className="w-full rounded-md transition-all hover:bg-who-blue-light">
      {children}
    </li>
  );
};

Aside.LinkItem = function AsideLinkItem({
  href,
  children,
  className,
}: {
  href: Url | string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Aside.Item>
      <Link href={href}>
        <a className={clsx("flex px-3 py-2", className)}>{children}</a>
      </Link>
    </Aside.Item>
  );
};

export default Aside;
