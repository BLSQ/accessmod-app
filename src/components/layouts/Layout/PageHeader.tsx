import clsx from "clsx";
import { ReactElement } from "react";

type Props = {
  children: ReactElement;
  className?: string;
};

const PageHeader = (props: Props) => {
  return (
    <header className={clsx("pb-10", props.className)}>{props.children}</header>
  );
};

export default PageHeader;
