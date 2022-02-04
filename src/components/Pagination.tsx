import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { ReactElement } from "react";
import clsx from "clsx";

type Props = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
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
  const { page, perPage, totalPages, totalItems, onChange } = props;
  return (
    <div className="py-3 flex items-center justify-between border-t border-gray-200">
      <div className="flex-1 flex justify-between sm:hidden">
        {page > 1 && (
          <PaginationItem onClick={() => onChange(page - 1)}>
            Previous
          </PaginationItem>
        )}
        {page < totalPages && (
          <PaginationItem onClick={() => onChange(page + 1)}>
            Next
          </PaginationItem>
        )}
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{(page - 1) * perPage + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(page + 1 * perPage, totalItems)}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
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
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </PaginationItem>

              <PaginationItem
                onClick={() => onChange(page + 1)}
                disabled={page + 1 === totalPages}
              >
                <span className="sr-only">Next</span>
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
