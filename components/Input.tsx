import { InputHTMLAttributes } from "react"
import clsx from "clsx"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  description?: string
}

const Input = (props: InputProps) => {
  const {
    label,
    type,
    description,
    error,
    name,
    className,
    required,
    id,
    ...delegated
  } = props

  const inputClassName = clsx(
    "block py-1.5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md focus:outline-none",
    error &&
      "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500",
    className
  )
  return (
    <div>
      <div className="flex justify-between">
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        {!required && <span className="text-sm text-gray-400">Optional</span>}
      </div>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          id={id ?? name}
          name={name}
          type={type ?? "text"}
          aria-invalid={Boolean(error)}
          aria-describedby={`${name}-description`}
          className={inputClassName}
          {...delegated}
        />
      </div>
      {description && (
        <p className="mt-2 text-sm text-gray-500" id={`${name}-description`}>
          {description}
        </p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-description`}>
          {error}
        </p>
      )}
    </div>
  )
}

export default Input
