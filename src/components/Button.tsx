import clsx from "clsx";
import { ButtonHTMLAttributes, ReactElement } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "white" | "outlined" | "custom";
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
  leadingIcon?: ReactElement;
}

const Classes: { [key: string]: string } = {
  base: "relative inline-flex items-center justify-center transition-all border border-transparent font-medium shadow-sm rounded focus:outline-none h-fit disabled:opacity-50 disabled:cursor-not-allowed",
  primary: "text-white bg-midnight-blue-500 hover:bg-midnight-blue-400",
  secondary: "text-white bg-lochmara hover:bg-lochmara-600",
  white: "text-gray-800 border-gray-300 bg-white hover:bg-gray-50",
  outlined: "text-white hover:bg-white hover:text-gray-800 border-white",

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
    ...delegated
  } = props;

  const classes = clsx(
    Classes.base,
    Classes[size],
    variant !== "custom" && Classes[variant],
    className
  );
  return (
    <button className={classes} disabled={disabled} {...delegated}>
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
