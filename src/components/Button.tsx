import clsx from "clsx";
import { ButtonHTMLAttributes, ReactElement } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "pill" | "white" | "outlined";
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
  leadingIcon?: ReactElement;
}

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
    "btn",

    variant === "primary" && "btn-primary",

    variant === "secondary" && "btn-secondary",

    variant === "white" && "btn-white",

    variant === "outlined" && "btn-outlined",

    size === "sm" && "btn-sm",
    size === "md" && "btn-md",
    size === "lg" && "btn-lg",
    size === "xl" && "btn-xl",
    size === "xxl" && "btn-xxl",
    variant === "pill" && "btn-pill",
    disabled && "btn-disabled",
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
    <div className="-ml-1 mr-2 " aria-hidden="true">
      {props.children}
    </div>
  );
};

export default Button;
