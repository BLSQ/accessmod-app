import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "pill" | "white" | "outlined";
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
}

const Button = (props: Props) => {
  const {
    variant = "primary",
    size = "md",
    className,
    disabled,
    ...delegated
  } = props;

  const classes = clsx(
    "btn",

    variant === "primary" && "btn-primary",

    variant === "secondary" && "btn-secondary",

    variant === "white" && "btn-white",

    variant === "pill" && "btn-pill",

    variant === "outlined" && "btn-outlined",

    size === "sm" && "bn-sm",
    size === "md" && "btn-md",
    size === "lg" && "btn-lg",
    size === "xl" && "btn-xl",
    size === "xxl" && "btn-xxl",
    disabled && "btn-disabled",
    className
  );
  return <button className={classes} disabled={disabled} {...delegated} />;
};

export default Button;
