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
  background?: string;
} & HTMLAttributes<HTMLElement>;

const Block = (props: Props) => {
  const { children, background = "bg-white", className, ...delegated } = props;

  return createElement<{ className?: string }>(
    props.as ?? "article",
    {
      ...delegated,
      className: clsx("rounded-lg shadow px-5 py-6", background, className),
    },
    children
  );
};

export default Block;
