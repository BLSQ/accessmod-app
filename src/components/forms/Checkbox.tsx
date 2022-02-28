import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const Checkbox = (props: CheckboxProps) => {
  const { id, name, label, description, className, ...delegated } = props;

  const inputClassName = clsx(
    "form-checkbox h-4 w-4 text-lochmara border-gray-300 rounded focus:ring-0 focus:ring-offset-0",
    className
  );
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          id={id ?? name}
          name={name}
          type="checkbox"
          className={inputClassName}
          {...delegated}
        />
      </div>
      {(label || description) && (
        <div className="ml-3 text-sm">
          {label && (
            <label htmlFor={name} className="font-medium text-gray-700">
              {label}
            </label>
          )}
          {description && (
            <p id={`${name}-description`} className="text-gray-500">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
