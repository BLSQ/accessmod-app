import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props extends ComponentPropsWithoutRef<"span"> {
  size?: "xs" | "sm" | "md";
  onRemove?: () => void;
}

const Classes = {
  xs: {
    badge: "px-2 py-0.5 text-xs",
    button: "ml-1",
  },
  sm: { badge: "px-2.5 py-1 text-sm", button: "ml-1.5" },
  md: { badge: "px-2.5 pt-1 text-md", button: "ml-1.5" },
};

const Badge = ({ children, className, size = "xs", onRemove }: Props) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded font-medium",
        className,
        Classes[size].badge
      )}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          className={Classes[size].button}
          onClick={onRemove}
        >
          <XMarkIcon className="w-3" />
        </button>
      )}
    </span>
  );
};

export default Badge;
