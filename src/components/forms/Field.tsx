import Label from "./Label";
import { ReactElement } from "react";
import Input, { InputProps } from "./Input";
import clsx from "clsx";

interface CommonProps {
  label?: string;
  error?: string | null | false;
  required?: boolean;
  description?: string;
  name: string;
  className?: string;
  labelColor?: string;
  errorColor?: string;
}

type CustomField = CommonProps & {
  children: ReactElement | ReactElement[];
};

type InputField = CommonProps & InputProps;

const Field = (props: CustomField | InputField) => {
  const {
    error,
    description,
    label,
    required,
    name,
    className,
    labelColor,
    errorColor = "text-red-600",
    ...delegated
  } = props;

  let children;
  if (props.children) {
    children = props.children;
  } else {
    children = (
      <Input name={name} error={error} required={required} {...delegated} />
    );
  }

  return (
    <div className={className}>
      <div className="flex justify-between mb-1">
        {label && (
          <Label color={labelColor} htmlFor={name}>
            {label}
          </Label>
        )}
        {!required && <span className="text-sm text-gray-400">Optional</span>}
      </div>
      {children}
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
      {error && <p className={clsx("mt-2 text-sm", errorColor)}>{error}</p>}
    </div>
  );
};

export default Field;
