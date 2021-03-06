import clsx from "clsx";
import { ButtonHTMLAttributes, ReactElement } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "white" | "outlined" | "custom";
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
  leadingIcon?: ReactElement;
}

export const Classes: { [key: string]: string } = {
  base: "relative inline-flex items-center justify-center transition-all border border-transparent font-medium shadow-sm rounded focus:outline-none h-fit disabled:opacity-50 disabled:cursor-not-allowed",
  primary:
    "text-white bg-midnight-blue hover:bg-midnight-blue-500 disabled:hover:bg-midnight-blue",
  secondary:
    "text-white bg-lochmara hover:bg-lochmara-600 disabled:hover:bg-lochmara",
  white:
    "text-gray-800 border-gray-300 bg-white hover:bg-gray-50 disabled:hover:bg-white",
  outlined:
    "text-gray-600 hover:bg-gray-100 hover:text-gray-800 disabled:hover:bg-white shadow-none outline-0 ",

  // Sizes
  sm: "text-xs px-2 py-1",
  md: "text-sm px-3 py-2 leading-4",
  lg: "text-sm px-4 py-2",
  xl: "text-base px-4 py-2",
  xxl: "text-base px-6 py-3",
};

const Button = (props: ButtonProps) => {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    leadingIcon,
    disabled,
    type = "button",
    ...delegated
  } = props;

  const classes = clsx(
    Classes.base,
    Classes[size],
    variant !== "custom" && Classes[variant],
    className
  );
  return (
    <button type={type} className={classes} disabled={disabled} {...delegated}>
      {leadingIcon ? <LeadingIcon>{leadingIcon}</LeadingIcon> : null}
      {children}
    </button>
  );
};

const LeadingIcon = (props: { children: ReactElement }) => {
  return (
    <div className="-ml-1 mr-2" aria-hidden="true">
      {props.children}
    </div>
  );
};

export default Button;
