import clsx from "clsx";
import React, { ReactNode } from "react";

const DescriptionList = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDataListElement>) => {
  return (
    <dl className={clsx("grid grid-cols-2 gap-x-4 gap-y-6", className)}>
      {children}
    </dl>
  );
};

DescriptionList.Item = function Item({
  children,
  label,
  className,
}: {
  label: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("col-span-1", className)}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{children}</dd>
    </div>
  );
};

export default DescriptionList;
