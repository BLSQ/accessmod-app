import React from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";

type MenuLinkProps = {
  className?: string | undefined;
} & React.PropsWithChildren<LinkProps>;

export default React.forwardRef<HTMLAnchorElement, MenuLinkProps>(
  function MenuLink(props, ref) {
    const { href, children, ...rest } = props;
    return (
      <Link href={href} ref={ref}>
        <a {...rest}>{children}</a>
      </Link>
    );
  }
);
