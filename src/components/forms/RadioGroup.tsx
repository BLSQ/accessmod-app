import clsx from "clsx";
import { HTMLAttributes, InputHTMLAttributes } from "react";

interface RadioOption {
  id: OptionId;
  label: string;
}

type OptionId = string;

interface RadioGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  options: RadioOption[];
  value?: OptionId;
  name: string;
}

const RadioGroup = ({ name, options, onChange, value }: RadioGroupProps) => {
  return (
    <fieldset className="flex gap-4">
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
            defaultChecked={option.id === value}
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
