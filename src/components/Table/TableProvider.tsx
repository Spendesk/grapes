import React, { ReactNode } from 'react';
import {
  NextSortDirection,
  SortState,
  TableColumn,
  TableVariant,
} from './types';

type Context<T extends object> = {
  columns: TableColumn<T>[];
  data: T[];
  selectedRowIds?: string[];
  rowIds: string[];
  rowHeight: 'normal' | 'compact';
  sortState: SortState;
  setSortState(sortState: SortState): void;
  nextSortDirection: NextSortDirection;
  getRowId?(row: T): string;
  getIsRowActive?(row: T): boolean;
  getIsRowDisabled?(row: T): boolean;
  getIsRowCheckable?(row: T): boolean;
  getRowVariant?(row: T): TableVariant | undefined;
  onRowClick?(row: T): void;
  onRowSelectionChange?: (row: T, rowId: string, isChecked: boolean) => void;
  onAllRowsSelectionChange?: (
    rows: T[],
    rowIds: string[],
    isChecked: boolean,
  ) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableContext = React.createContext<Context<any> | null>(null);

export type TableProviderProps<T extends object> = {
  children: ReactNode;
} & Context<T>;

export function TableProvider<T extends object>({
  children,
  ...contextProps
}: TableProviderProps<T>) {
  return (
    <TableContext.Provider value={contextProps}>
      {children}
    </TableContext.Provider>
  );
}

function useTableContext() {
  const context = React.useContext(TableContext);
  if (context === null) {
    throw new Error('useTableContext should be within a TableContext');
  }
  return context;
}

export function useTableHeaderCellContext() {
  const { sortState, setSortState, nextSortDirection } = useTableContext();

  return {
    sortState,
    setSortState,
    nextSortDirection,
  };
}

export function useTableHeaderCheckboxContext() {
  const { selectedRowIds, rowIds, data, onAllRowsSelectionChange } =
    useTableContext();

  if (!selectedRowIds) {
    throw new Error('selectedRowIds is undefined. ');
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAllRowsSelectionChange?.(data, rowIds, event.currentTarget.checked);
  };
  const isDisabled = rowIds.length === 0;

  const isChecked =
    selectedRowIds.length > 0 &&
    rowIds.every((id) => selectedRowIds.includes(id));
  const isIndeterminate = !isChecked && selectedRowIds.length > 0;

  return {
    isChecked,
    isDisabled,
    isIndeterminate,
    hasCheckbox: true,
    onChange,
  };
}

export function useTableRowContext<T extends object>(row: T) {
  const {
    columns,
    getRowId,
    getIsRowDisabled,
    getIsRowCheckable,
    getIsRowActive,
    getRowVariant,
    onRowClick,
  } = useTableContext();

  return {
    columns,
    isRowActive: getIsRowActive ? getIsRowActive(row) : false,
    isRowDisabled: getIsRowDisabled ? getIsRowDisabled(row) : false,
    isCheckboxDisabled: getIsRowCheckable ? !getIsRowCheckable(row) : false,
    rowVariant: getRowVariant ? getRowVariant(row) : undefined,
    getRowId,
    onRowClick,
  };
}

export function useTableCellContext<T extends object>(row: T) {
  const { rowHeight, getRowId, getIsRowDisabled } = useTableContext();

  return {
    rowHeight,
    isRowDisabled: getIsRowDisabled ? getIsRowDisabled(row) : false,
    getRowId,
  };
}

export function useTableRowCheckboxContext<T extends object>(row: T) {
  const {
    selectedRowIds,
    getRowId,
    getIsRowDisabled,
    getIsRowCheckable,
    onRowSelectionChange,
  } = useTableContext();

  const rowId = getRowId?.(row);

  return {
    isChecked: selectedRowIds && rowId ? selectedRowIds.includes(rowId) : false,
    isDisabled: getIsRowDisabled?.(row) ?? false,
    isCheckboxDisabled: getIsRowCheckable ? !getIsRowCheckable(row) : false,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      rowId && onRowSelectionChange?.(row, rowId, event.target.checked),
  };
}
