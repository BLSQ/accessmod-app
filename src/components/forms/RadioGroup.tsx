import clsx from "clsx";
import { HTMLAttributes, InputHTMLAttributes } from "react";

interface RadioOption {
  id: OptionId;
  label: string;
}

type OptionId = string | number;

interface RadioGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  options: RadioOption[];
  value?: OptionId;
  className?: string;
  name: string;
}

const RadioGroup = ({
  name,
  options,
  onChange,
  value,
  className,
}: RadioGroupProps) => {
  return (
    <fieldset className={clsx("flex gap-4", className)}>
      {options.map((option) => (
        <div key={option.id} className="flex items-center">
          <input
            id={`${name}-${option.id}`}
            type="radio"
            name={name}
            className={clsx(
              "form-radio text-lochmara focus:outline-none focus:ring-transparent"
            )}
            value={option.id}
            onChange={onChange}
            checked={option.id === value}
          />
          <label
            htmlFor={`${name}-${option.id}`}
            className="ml-2 text-sm font-medium text-gray-700"
          >
            {option.label}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default RadioGroup;
