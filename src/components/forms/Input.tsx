import { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import clsx from "clsx";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | null | false | true;
  trailingIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type, name, error, className, trailingIcon, ...delegated } = props;

  const inputClassName = clsx(
    "w-full form-input shadow-sm rounded-md sm:text-sm border-gray-300",
    "hover:border-gray-400 focus:ring-transparent focus:border-lochmara focus:outline-none",
    "disabled:bg-gray-50 disabled:border-gray-300 disabled:cursor-not-allowed", // Override hover:border to not change the border when disabled
    "placeholder-gray-600 placeholder-opacity-70",
    trailingIcon && "pr-4",
    error &&
      "border-red-300 text-red-900 placeholder-red-300 focus:ring-lochmara focus:border-lochmara",
    className
  );

  return (
    <div className="relative group">
      <input
        id={name}
        name={name}
        type={type ?? "text"}
        aria-invalid={Boolean(error)}
        aria-describedby={`${name}-description`}
        className={inputClassName}
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
