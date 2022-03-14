import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { InformationCircleIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import React, { ReactNode } from "react";
import Tooltip from "./Tooltip";

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
  help,
  className,
}: {
  label: ReactNode;
  children: ReactNode;
  help?: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("col-span-1", className)}>
      <dt className="flex text-sm font-medium text-gray-500">
        <span>{label}</span>
        {help && (
          <Tooltip
            placement="top"
            renderTrigger={(ref) => (
              <span ref={ref}>
                <InformationCircleIcon className="ml-1 h-3 w-3 cursor-pointer" />
              </span>
            )}
            label={help}
          />
        )}
      </dt>
      <dd className="mt-1 text-sm text-gray-900">{children}</dd>
    </div>
  );
};

export default DescriptionList;
