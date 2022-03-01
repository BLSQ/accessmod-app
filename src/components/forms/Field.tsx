import Label from "./Label";
import { ReactElement } from "react";
import Input, { InputProps } from "./Input";

interface CommonProps {
  label?: string;
  error?: string | null | false;
  required?: boolean;
  description?: string;
  name: string;
  className?: string;
}

type CustomField = CommonProps & {
  children: ReactElement | ReactElement[];
};

type InputField = CommonProps & InputProps;

const Field = (props: CustomField | InputField) => {
  const { error, description, label, required, name, className, ...delegated } =
    props;

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
        {label && <Label htmlFor={name}>{label}</Label>}
        {!required && <span className="text-sm text-gray-400">Optional</span>}
      </div>
      {children}
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Field;
