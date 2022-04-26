/* eslint-disable react/jsx-key */
/* react-table already manages the key */

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { useCheckboxColumn } from "hooks/useCheckboxColumn";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Column as ReactTableColumn,
  PluginHook,
  useRowState,
} from "react-table";
import {
  SortingRule,
  useFlexLayout,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import Pagination from "./Pagination";
export type { Cell, SortingRule } from "react-table";

export type Column = ReactTableColumn & {
  Header: string | null;
};
type DataGridTheme = {
  table?: string;
  thead?: string;
  tbody?: string;
  th?: string;
  td?: string;
  tr?: string;
  pagination?: string;
};
interface IDataGridProps {
  columns: ReadonlyArray<Column>;
  data: object[];
  theme?: DataGridTheme;
  manualSortBy?: boolean;
  onSelectionChange?: (
    pageRows: object[],
    allIds: Record<string, boolean>
  ) => void;
  fetchData?: (params: {
    pageSize: number;
    pageIndex: number;
    sortBy: SortingRule<object>[];
  }) => void;
  sortable?: boolean;
  totalPages?: number;
  totalItems?: number;
  idKey?: string;
  defaultPageSize?: number;
  defaultSortBy?: SortingRule<object>[];
  pageSizeOptions?: number[];
}

type DataGridProps = IDataGridProps;

const DEFAULT_THEME = {
  table: "divide-y divide-gray-200 w-full",
  thead: "",
  tbody: "",
  th: "text-xs font-medium text-gray-500 tracking-wider text-left uppercase items-end flex px-3 py-3",
  td: "whitespace-nowrap text-sm font-medium text-gray-800 px-3 py-1 md:py-2 flex items-center",
  tr: "hover:bg-gray-200",
  pagination: "",
};

const DEFAULT_COLUMN = {
  minWidth: 30,
  width: 150,
  maxWidth: 400,
};

const DataGrid = (props: DataGridProps) => {
  const {
    columns,
    data,
    theme = DEFAULT_THEME,
    onSelectionChange,
    fetchData,
    sortable = false,
    totalItems,
    idKey,
    pageSizeOptions,
    defaultSortBy,
    defaultPageSize = 10,
  } = props;

  const [loading, setLoading] = useState(false);
  const hooks = useMemo(() => {
    const hooks: Array<PluginHook<{}>> = [
      useSortBy,
      usePagination,
      useRowSelect,
      useFlexLayout,
      useRowState,
    ];
    if (onSelectionChange) {
      hooks.push(useCheckboxColumn);
    }
    return hooks;
  }, [onSelectionChange]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, sortBy, selectedRowIds },
  } = useTable(
    {
      columns,
      data,

      // Construct row ID
      getRowId(row, relativeIndex, parent) {
        const key = idKey ? (row as any)[idKey] : relativeIndex;
        return parent ? [parent.id, key].join(".") : key;
      },

      // Row selection
      autoResetSelectedRows: false,

      // Column width
      defaultColumn: DEFAULT_COLUMN,

      // Sort
      autoResetSortBy: false,
      disableSortBy: !sortable,
      manualSortBy: Boolean(fetchData),
      disableMultiSort: true,

      // Pagination
      manualPagination: Boolean(fetchData),
      ...(Boolean(fetchData) ? { pageCount: -1 } : {}),

      // Initial state
      initialState: {
        sortBy: defaultSortBy,
        pageSize: defaultPageSize,
      },
    },
    ...hooks
  );

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(
        selectedFlatRows.map((x) => x.original),
        selectedRowIds
      );
    }
  }, [selectedFlatRows, selectedRowIds, onSelectionChange]);

  const onFetchData = useCallback(
    async (params) => {
      if (!fetchData) {
        return;
      }
      setLoading(true);
      try {
        await fetchData(params);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [fetchData]
  );
  const onPaginationChange = useCallback(
    (page: number, perPage: number) => {
      if (perPage !== pageSize) {
        setPageSize(perPage);
      }
      if (page - 1 !== pageIndex) {
        gotoPage(page - 1);
      }
    },
    [gotoPage, setPageSize, pageIndex, pageSize]
  );

  useEffect(() => {
    onFetchData({ pageIndex, pageSize, sortBy });
  }, [onFetchData, pageIndex, pageSize, sortBy]);
  return (
    <div>
      <table className={clsx(theme.table)} {...getTableProps()}>
        <thead className={clsx(theme.thead)}>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className={clsx(theme.th, column.className)}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {column.isSorted && i === headerGroups.length - 1 && (
                    <span
                      className={clsx(
                        "ml-2 inline-block w-4 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300"
                      )}
                    >
                      {column.isSortedDesc ? (
                        <ChevronDownIcon
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      ) : (
                        <ChevronUpIcon className="h-4 w-4" aria-hidden="true" />
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={theme.tbody} {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr className={theme.tr} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className={theme.td} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {totalItems !== undefined && (
        <Pagination
          onChange={onPaginationChange}
          className={theme.pagination}
          loading={loading}
          totalItems={totalItems}
          countItems={page.length}
          page={pageIndex + 1}
          perPage={pageSize}
          perPageOptions={pageSizeOptions}
        />
      )}
    </div>
  );
};

export default DataGrid;
