import clsx from "clsx";

type Props = {
  initials: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color: string;
};

const Avatar = (props: Props) => {
  const { initials, color, size = "md" } = props;

  let className;
  switch (size) {
    case "xs":
      className = "text-xs h-6 w-6";
      break;
    case "sm":
      className = "text-sm h-8 w-8";
      break;
    case "md":
      className = "text-md h-10 w-10";
      break;
    case "lg":
      className = "text-lg h-12 w-12";
      break;
    case "xl":
      className = "text-xl h-14 w-14";
      break;
  }

  return (
    <>
      <span
        style={{ background: color }}
        className={clsx(
          "inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-500",
          className
        )}
      >
        <span className="font-medium leading-none text-white">{initials}</span>
      </span>
    </>
  );
};

export default Avatar;
