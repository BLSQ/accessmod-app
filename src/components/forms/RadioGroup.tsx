import { FormEvent, HTMLAttributes } from "react";

interface RadioOption {
  id: OptionId;
  label: string;
}

type OptionId = string;

interface RadioGroupProps extends HTMLAttributes<HTMLInputElement> {
  options: RadioOption[];
  value: OptionId;
  name: string;
}

const RadioGroup = ({ name, options, onChange, value }: RadioGroupProps) => {
  return (
    <fieldset className="mt-1 flex gap-4">
      {options.map((option) => (
        <div key={option.id} className="flex items-center">
          <input
            id={`${name}-${option.id}`}
            type="radio"
            name={name}
            value={option.id}
            onChange={onChange}
            defaultChecked={option.id === value}
          />
          <label
            htmlFor={`${name}-${option.id}`}
            className="text-sm font-medium ml-2 text-gray-700"
          >
            {option.label}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default RadioGroup;
