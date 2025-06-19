import type { ReactChild } from 'react';

export type TableSortDirection = 'ascending' | 'descending' | 'none';

export type TableColumn<T> = {
  id: string;
  header: ReactChild;
  width?: number | string;
  align?: 'left' | 'right' | 'center';
  getSortValue?: (item: T) => string | number | null | undefined;
  renderCell(
    row: T,
    state: {
      isRowHovered: boolean;
      isCheckboxDisabled?: boolean;
    },
  ): ReactChild;
  getCellVariant?(row: T): TableVariant | undefined;
  className?: string;
};

export type TableVariant = 'alert' | 'info' | 'primary' | 'success' | 'warning';

export type SortState = {
  direction: TableSortDirection;
  columnId: string | null;
};

export type TableSelectionPropsActive<T extends object> = {
  /**
   * The current checked items in the Table.
   */
  selectedRowIds: string[];
  /**
   * Handler that is called when the top checkbox state changes.
   */
  onAllRowsSelectionChange: (
    rows: T[],
    rowIds: string[],
    isChecked: boolean,
  ) => void;
  /**
   * Handler that is called when the selection changes.
   */
  onRowSelectionChange: (row: T, rowId: string, isChecked: boolean) => void;
};

type TableSelectionPropsInactive = {
  selectedRowIds?: never;
  onRowSelectionChange?: never;
  onAllRowsSelectionChange?: never;
};

export type TableSelectionProps<T extends object> =
  | TableSelectionPropsActive<T>
  | TableSelectionPropsInactive;

/**
 * Given a current direction, determine the next direction
 * Think about it as a state machine
 */
export type NextSortDirection = {
  [K in TableSortDirection]: TableSortDirection;
};
