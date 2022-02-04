import clsx from "clsx";
import { ReactElement } from "react";

type Props = {
  className?: string;
  children: ReactElement | ReactElement[] | string | undefined | null;
};

const Block = (props: Props) => {
  const { children, className } = props;
  return (
    <article
      className={clsx(
        "bg-white rounded-lg shadow px-5 py-6 sm:px-6",
        className
      )}
    >
      {children}
    </article>
  );
};

export default Block;
