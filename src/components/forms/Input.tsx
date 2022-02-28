import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | null | false | true;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type, name, error, className, required, ...delegated } = props;

  const inputClassName = clsx(
    "block w-full form-input shadow-sm rounded-md py-1.5 sm:text-sm border-gray-300",
    "hover:border-gray-400 focus:ring-transparent focus:border-lochmara focus:outline-none",
    "disabled:bg-gray-50 disabled:pointer-events-none",
    error &&
      "border-red-300 text-red-900 placeholder-red-300 focus:ring-lochmara focus:border-lochmara",
    className
  );

  return (
    <div className="relative rounded-md">
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
    </div>
  );
});

Input.displayName = "Input";

export default Input;
