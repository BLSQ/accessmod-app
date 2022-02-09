import Label from "./Label";
import { ReactElement } from "react";

type Props = {
  children: ReactElement;
  label?: string;
  error?: string;
  required?: boolean;
  description?: string;
  name: string;
  className?: string;
};

const Field = (props: Props) => {
  const { children, error, description, label, required, name, className } =
    props;

  return (
    <div className={className}>
      <div className="flex justify-between">
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
