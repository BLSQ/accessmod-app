import clsx from "clsx";
import { LabelHTMLAttributes } from "react";

const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      {...props}
      className={clsx(
        "block text-sm font-medium text-gray-500",
        props.className
      )}
    ></label>
  );
};

export default Label;
