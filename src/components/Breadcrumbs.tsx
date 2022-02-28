import { HomeIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { ReactNode } from "react";
import { UrlObject } from "url";

export const Part = ({
  children,
  href,
  onClick,
}: {
  children: ReactNode;
  href?: UrlObject | string;
  onClick?: () => void;
}) => {
  return (
    <li>
      <div className="flex items-center">
        <svg
          className="flex-shrink-0 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
        </svg>
        {href ? (
          <Link href={href}>
            <a className="ml-1 text-md font-medium text-white hover:text-gray-50 hover:underline">
              {children}
            </a>
          </Link>
        ) : (
          <span
            className="ml-1 text-md font-medium text-white hover:text-gray-50 hover:underline"
            onClick={onClick}
          >
            {children}
          </span>
        )}
      </div>
    </li>
  );
};

const Breadcrumbs = (props: {
  children: ReactNode | ReactNode[];
  className?: string;
}) => {
  const { children, className } = props;
  const { t } = useTranslation();

  return (
    <nav className={className} aria-label={t("Breadcrumb")}>
      <ol role="list" className="flex items-center space-x-1">
        <li>
          <div>
            <Link href="/">
              <a className="text-white">
                <HomeIcon className="flex-shrink-0 h-5 w-5" />
                <span className="sr-only">{t("Home")}</span>
              </a>
            </Link>
          </div>
        </li>
        {children}
      </ol>
    </nav>
  );
};

Breadcrumbs.Part = Part;

export default Breadcrumbs;
