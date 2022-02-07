import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type InputProps = {
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type, name, error, className, required, ...delegated } = props;

  const inputClassName = clsx(
    "block hover:border-gray-400 form-input shadow-sm py-1.5 focus:ring-who-blue-main focus:border-who-blue-main block w-full sm:text-sm border-gray-300 rounded-md focus:outline-none",
    error &&
      "border-red-300 text-red-900 placeholder-red-300 focus:ring-who-blue-main focus:border-who-blue-main",
    className
  );

  return (
    <div className="mt-1 relative rounded-md">
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
