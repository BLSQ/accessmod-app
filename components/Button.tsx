import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "pill" | "white"
  size?: "sm" | "md" | "lg" | "xl" | "xxl"
  className?: string
}

const Button = (props: Props) => {
  const {
    variant = "primary",
    size = "md",
    className,
    disabled,
    ...delegated
  } = props

  const classes = clsx(
    "inline-flex items-center justify-center border font-medium shadow-sm focus:outline-none",

    (variant === "primary" || variant === "pill") &&
      "border-transparent text-white bg-indigo-600 hover:bg-indigo-700",

    variant === "secondary" &&
      "border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200",

    variant === "white" &&
      "border-gray-300 text-gray-700 bg-white hover:bg-gray-50",

    variant === "pill" && "rounded-full",

    size === "sm" && "text-xs px-2.5 py-1.5",
    size === "md" && "text-sm px-3 py-2 leading-4 ",
    size === "lg" && "text-sm px-4 py-2 ",
    size === "xl" && "text-base px-4 py-2 ",
    size === "xxl" && "text-base px-6 py-3 ",
    disabled && "opacity-40 cursor-not-allowed",
    className
  )
  return <button className={classes} disabled={disabled} {...delegated} />
}

export default Button
