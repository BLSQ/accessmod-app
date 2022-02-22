import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

interface Props extends ComponentPropsWithoutRef<"span"> {
  size?: "xs" | "sm" | "md";
}

const Classes = {
  xs: "px-2 py-0.5 text-xs",
  sm: "px-2.5 py-1 text-sm",
  md: "px-2.5 pt-1 text-md",
};

const Badge = ({ children, className, size = "xs" }: Props) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded font-medium",
        size === "xs" && Classes.xs,
        size === "sm" && Classes.sm,
        size === "md" && Classes.md,
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;