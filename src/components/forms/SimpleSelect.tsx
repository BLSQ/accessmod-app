import clsx from "clsx";
import { HTMLAttributes } from "react";

type Props = {
  error?: string | boolean;
  value?: string;
} & HTMLAttributes<HTMLSelectElement>;

const SimpleSelect = (props: Props) => {
  const { className, error, ...delegated } = props;
  return (
    <select
      className={clsx(
        "form-select rounded-md border-gray-300 shadow-sm sm:text-sm",
        "hover:border-gray-400 focus:border-lochmara focus:outline-none focus:ring-transparent",
        "disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-50",
        "placeholder-gray-600 placeholder-opacity-70",
        error &&
          "border-red-300 text-red-900 placeholder-red-300 focus:border-lochmara focus:ring-lochmara",
        className
      )}
      {...delegated}
    />
  );
};

export default SimpleSelect;
