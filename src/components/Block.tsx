import clsx from "clsx";
import {
  ComponentClass,
  createElement,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
} from "react";

type Props = {
  as?: string | FunctionComponent | ComponentClass;
  children: ReactNode | undefined | null;
  withPadding?: boolean;
  background?: string;
} & HTMLAttributes<HTMLElement>;

const Block = (props: Props) => {
  const {
    children,
    background = "bg-white",
    withPadding = true,
    className,
    ...delegated
  } = props;

  return createElement<{ className?: string }>(
    props.as ?? "article",
    {
      ...delegated,
      className: clsx(
        "rounded-lg shadow",
        withPadding && "px-5 py-5",
        background,
        className
      ),
    },
    children
  );
};

export default Block;
