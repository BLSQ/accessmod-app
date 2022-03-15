import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { ReactElement } from "react";
import clsx from "clsx";
import Spinner from "./Spinner";
import { useTranslation } from "next-i18next";

type Props = {
  loading?: boolean;
  page: number;
  perPage: number;
  totalPages: number;
  countItems: number;
  totalItems: number;
  className?: string;
  onChange: (page: number) => void;
};

const PaginationItem = (props: {
  children: ReactElement | string | ReactElement[];
  current?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  const { children, current, onClick, disabled = false } = props;
  return (
    <button
      onClick={onClick}
      aria-current="page"
      disabled={disabled}
      className={clsx(
        "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-3 py-1 border text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        current && "z-10 bg-indigo-50 border-who-blue-main text-who-blue-main"
      )}
    >
      {children}
    </button>
  );
};

const Pagination = (props: Props) => {
  const {
    loading,
    page,
    perPage,
    countItems,
    totalPages,
    totalItems,
    onChange,
    className,
  } = props;

  const { t } = useTranslation();
  const start = (page - 1) * perPage + 1;
  const end = (page - 1) * perPage + countItems;
  return (
    <div className={clsx("py-3 flex items-center justify-between", className)}>
      <div className="flex-1 flex justify-between sm:hidden">
        {page > 1 && (
          <PaginationItem onClick={() => onChange(page - 1)}>
            {t("Previous")}
          </PaginationItem>
        )}
        {page < totalPages && (
          <PaginationItem onClick={() => onChange(page + 1)}>
            {t("Next")}
          </PaginationItem>
        )}
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        {loading && (
          <div className="inline-flex items-center">
            <Spinner size="xs" className="mr-2" />
            {t("Loading...")}
          </div>
        )}
        {!loading && totalPages > 1 && (
          <div>
            <p className="text-sm text-gray-700">
              {t("Showing {{start}} to {{end}} of {{totalItems}} results", {
                totalItems,
                start,
                end,
              })}
            </p>
          </div>
        )}
        {!loading && totalPages <= 1 && (
          <div>
            <p className="text-sm text-gray-700">{t("Showing all results")}</p>
          </div>
        )}
        {totalPages > 1 && (
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <PaginationItem
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
              >
                <span className="sr-only">{t("Previous")}</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </PaginationItem>

              <PaginationItem
                onClick={() => onChange(page + 1)}
                disabled={page === totalPages}
              >
                <span className="sr-only">{t("Next")}</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </PaginationItem>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
