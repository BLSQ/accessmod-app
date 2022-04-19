import clsx from "clsx";
import { HTMLAttributes } from "react";

export function PageHeader({
  className,
  ...delegated
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="bg-lochmara">
      <div
        {...delegated}
        className={clsx(
          "mx-auto w-full max-w-6xl px-4 py-4 sm:px-4 md:px-8 md:py-8",
          className
        )}
      />
    </div>
  );
}

export function PageContent(props: HTMLAttributes<HTMLDivElement>) {
  const { children, className, ...delegated } = props;
  return (
    <main
      className="flex-1 bg-gray-50 pb-6 before:block before:h-16 before:bg-lochmara before:content-['']"
      {...delegated}
    >
      <div
        className={clsx(
          "mx-auto -mt-16 w-full max-w-6xl px-4 sm:px-4 md:px-8",
          className
        )}
      >
        {children}
      </div>
    </main>
  );
}
