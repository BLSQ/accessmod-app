import clsx from "clsx";
import {
  ComponentClass,
  createElement,
  FunctionComponent,
  ReactElement,
} from "react";

type Props = {
  className?: string;
  as?: string | FunctionComponent | ComponentClass;
  children: ReactElement | ReactElement[] | string | undefined | null;
};

const Block = (props: Props) => {
  const { children, className } = props;

  return createElement<{ className?: string }>(
    props.as ?? "article",
    {
      className: clsx("bg-white rounded-lg shadow px-5 py-6", className),
    },
    children
  );
};

export default Block;
