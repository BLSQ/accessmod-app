import { Hooks } from "react-table";

export interface UseRowActions<D extends object = {}> {
  (hooks: Hooks<D>): void;
}

export const useRowActions: UseRowActions = (hooks) => {
  hooks.visibleColumns.push((columns) => [
    ...columns,
    {
      id: "actions",
      Header: "Actions",
      Cell: () => null,
    },
  ]);
};
