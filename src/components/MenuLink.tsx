import React from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";

type MenuLinkProps = {
  className: string | undefined;
} & React.PropsWithChildren<LinkProps>;

const MenuLink = (props: MenuLinkProps) => {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

export default MenuLink;
