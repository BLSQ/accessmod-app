import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "pill" | "white"
  size?: "sm" | "md" | "lg" | "xl" | "xxl"
  className?: string
}

const Button = (props: Props) => {
  const { variant = "primary", size = "md", className, ...delegated } = props

  const classes = clsx(
    "inline-flex items-center justify-center border font-medium rounded shadow-sm focus:outline-none",

    (variant === "primary" || variant === "pill") &&
      "border-transparent text-white bg-indigo-600 hover:bg-indigo-700",

    variant === "secondary" &&
      "border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200",

    variant === "white" &&
      "border-gray-300 text-gray-700 bg-white hover:bg-gray-50",

    variant === "pill" && "rounded-full",

    size === "sm" && "text-xs px-2.5 py-1.5",
    size === "md" && "text-sm px-3 py-2 leading-4 rounded-md",
    size === "lg" && "text-sm px-4 py-2 rounded-md",
    size === "xl" && "text-base px-4 py-2 rounded-md",
    size === "xxl" && "text-base px-6 py-3 rounded-md",
    className
  )
  return <button className={classes} {...delegated} />
}

export default Button
