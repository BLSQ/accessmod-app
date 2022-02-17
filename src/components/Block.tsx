import clsx from "clsx";
import {
  ComponentClass,
  createElement,
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
} from "react";

type Props = {
  as?: string | FunctionComponent | ComponentClass;
  children: ReactElement | ReactElement[] | string | undefined | null;
} & HTMLAttributes<HTMLElement>;

const Block = (props: Props) => {
  const { children, className, ...delegated } = props;

  return createElement<{ className?: string }>(
    props.as ?? "article",
    {
      ...delegated,
      className: clsx("bg-white rounded-lg shadow px-5 py-6", className),
    },
    children
  );
};

export default Block;
