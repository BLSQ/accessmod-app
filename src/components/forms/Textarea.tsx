import {
  InputHTMLAttributes,
  forwardRef,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import clsx from "clsx";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | null | false | true;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { name, error, className, ...delegated } = props;

    const classes = clsx(
      "w-full form-textarea shadow-sm rounded-md sm:text-sm border-gray-300",
      "hover:border-gray-400 focus:ring-transparent focus:border-lochmara focus:outline-none",
      "disabled:bg-gray-50 disabled:border-gray-300 disabled:cursor-not-allowed", // Override hover:border to not change the border when disabled
      "placeholder-gray-600 placeholder-opacity-70",
      error &&
        "border-red-300 text-red-900 placeholder-red-300 focus:ring-lochmara focus:border-lochmara",
      className
    );

    return (
      <textarea
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={`${name}-description`}
        className={classes}
        {...delegated}
        ref={ref}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
