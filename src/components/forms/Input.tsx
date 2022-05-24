import { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import clsx from "clsx";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | null | false | true;
  trailingIcon?: ReactNode;
  inputClassName?: string;
  autoComplete?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    type,
    name,
    error,
    className,
    trailingIcon,
    inputClassName,
    autoComplete = "off",
    ...delegated
  } = props;

  const inputClasses = clsx(
    "w-full form-input shadow-sm rounded-md sm:text-sm border-gray-300",
    "hover:border-gray-400 focus:ring-transparent focus:border-lochmara focus:outline-none",
    "disabled:bg-gray-50 disabled:border-gray-300 disabled:cursor-not-allowed", // Override hover:border to not change the border when disabled
    "placeholder-gray-600 placeholder-opacity-70",
    trailingIcon && "pr-12",
    error &&
      "border-red-300 text-red-900 placeholder-red-300 focus:ring-lochmara focus:border-lochmara",
    inputClassName
  );

  return (
    <div className={clsx("group relative", className)}>
      <input
        id={name}
        name={name}
        type={type ?? "text"}
        aria-invalid={Boolean(error)}
        aria-describedby={`${name}-description`}
        className={inputClasses}
        autoComplete={autoComplete}
        {...delegated}
        ref={ref}
      />
      {trailingIcon && (
        <div className="absolute inset-y-0 right-0 inline-flex items-center justify-center pr-2.5">
          {trailingIcon}
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
