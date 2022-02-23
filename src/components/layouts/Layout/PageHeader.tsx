import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const PageHeader = (props: Props) => {
  return (
    <header className={clsx("pb-10", props.className)}>{props.children}</header>
  );
};

export default PageHeader;
