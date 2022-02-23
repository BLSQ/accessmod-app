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
        "h-fit text-white w-full py-4 md:px-4 xl:px-7 md:py-6",
        className
      )}
    >
      <ul className="list-none">{children}</ul>
    </Block>
  );
};

Aside.Item = function AsideItem({ children }: { children: ReactNode }) {
  return (
    <li className="w-full transition-all hover:bg-who-blue-light rounded-md">
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
