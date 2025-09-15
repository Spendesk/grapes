import React, { type ReactNode, useMemo, useRef, useState } from 'react';

import { useLocale } from '../GrapesProvider';
import { classNames } from '../../utils';

import { getEnabledRowIds, tableSortFunction } from './utils';

import type {
  NextSortDirection,
  SortState,
  TableColumn,
  TableSelectionProps,
  TableVariant,
} from './types';

import { TableEmptyState } from './TableEmptyState';
import { TableHeaderCell } from './TableHeaderCell';
import { TableHeaderCheckbox } from './TableHeaderCheckbox';
import { TableFooter } from './TableFooter';
import { TableProvider } from './TableProvider';
import { TableRow } from './TableRow';
import { TableRowCheckbox } from './TableRowCheckbox';
import { TableMini } from './TableMini';
import { groupByFn } from '../ListBox/utils';

import styles from './Table.module.css';
import tableStyles from '../../theme/placeholders/table.module.css';

const NEXT_SORT_DIRECTIONS: NextSortDirection = {
  // when you click on an unsorted column, it goes to Descending order
  none: 'descending',
  descending: 'ascending',
  ascending: 'none',
};

export type TableProps<T extends object> = {
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The columns to display.
   */
  columns: TableColumn<T>[];
  /**
   * The data to display.
   */
  data: T[];
  /**
   * The footer of the Table.
   */
  footer?: ReactNode;
  /**
   * The maximum height of the Table (will allow the rows to be scrollable).
   */
  maxHeight?: number | string;
  /**
   * The size of the rows.
   * @default normal
   */
  rowHeight?: 'normal' | 'compact';
  /**
   * Function to get a row's unique identifier.
   */
  getRowId?: (row: T) => string;
  /**
   * Function to get whether a row is active.
   */
  getIsRowActive?(row: T): boolean;
  /**
   * Function to get whether a row is disabled.
   */
  getIsRowDisabled?(row: T): boolean;
  /**
   * Get whether a given row should be checkable.
   * By default, all options can be checked.
   */
  getIsRowCheckable?: (option: T) => boolean;
  /**
   * Function to get the row's visual style.
   */
  getRowVariant?(row: T): TableVariant | undefined;
  /**
   * Handler that is called when a row is clicked.
   */
  onRowClick?(row: T): void;
  /**
   * Defines the default sort state (direction and column id).
   * Sorting capability is disabled when groupBy is provided.
   */
  defaultSortState?: SortState;
  /**
   * Defines the direction following each sort direction.
   * Sorting capability is disabled when groupBy is provided.
   */
  nextSortDirection?: NextSortDirection;
  /**
   * The content to display if the data is empty.
   */
  emptyState?: {
    title: string;
    subtitle?: ReactNode;
  };
  /**
   * Function to group row together.
   * Disable sorting capability.
   */
  groupBy?: (row: T) => string;
  /**
   * Render function for grouped option.
   * If not provided, the key returned by groupBy will be displayed
   */
  renderGroupedRowHeader?: (value: string, aggregatedRows: T[]) => ReactNode;
} & TableSelectionProps<T>;

function Table<T extends object>({
  className,
  columns,
  data,
  footer,
  maxHeight,
  rowHeight = 'normal',
  selectedRowIds,
  getIsRowActive,
  getIsRowDisabled,
  getIsRowCheckable,
  getRowVariant,
  getRowId,
  groupBy,
  renderGroupedRowHeader,
  onRowClick,
  onRowSelectionChange,
  onAllRowsSelectionChange,
  defaultSortState = {
    direction: 'none',
    columnId: null,
  },
  nextSortDirection = NEXT_SORT_DIRECTIONS,
  emptyState,
  ...rest
}: TableProps<T>) {
  const theadRef = useRef<HTMLTableSectionElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  const [sortState, setSortState] = useState<SortState>(defaultSortState);

  const locale = useLocale();
  const Collator = useMemo(() => Intl.Collator(locale), [locale]);

  const isSelectable = getRowId && selectedRowIds && onRowSelectionChange;

  const memoizedData = useMemo(() => {
    return tableSortFunction(data, sortState, columns, Collator);
  }, [data, sortState, columns, Collator]);

  const groupedData = groupByFn(data, groupBy);

  const rowIds = getRowId
    ? getEnabledRowIds(
        memoizedData,
        getRowId,
        getIsRowDisabled,
        getIsRowCheckable,
      )
    : // TODO: remove this condition once getRowId is mandatory.
      [];

  const memoizedColumns = useMemo(() => {
    if (isSelectable) {
      const selectableColumn: TableColumn<T> = {
        id: 'checkboxes',
        className: styles.tableCheckboxCell,
        width: 48,
        renderCell: (row) => <TableRowCheckbox row={row} />,
        header: <TableHeaderCheckbox />,
      };
      return [selectableColumn, ...columns];
    }
    return columns;
  }, [columns, isSelectable]);

  return (
    <TableProvider
      columns={memoizedColumns}
      data={memoizedData}
      selectedRowIds={selectedRowIds}
      rowIds={rowIds}
      rowHeight={rowHeight}
      sortState={sortState}
      setSortState={setSortState}
      nextSortDirection={nextSortDirection}
      getRowId={getRowId}
      getIsRowActive={getIsRowActive}
      getIsRowDisabled={getIsRowDisabled}
      getIsRowCheckable={getIsRowCheckable}
      getRowVariant={getRowVariant}
      onRowClick={onRowClick}
      onRowSelectionChange={onRowSelectionChange}
      onAllRowsSelectionChange={onAllRowsSelectionChange}
    >
      <table className={classNames(tableStyles.table, className)} {...rest}>
        <thead ref={theadRef} className={styles.tableHeader}>
          <tr className={styles.tableHeaderRow}>
            {memoizedColumns.map((column) => (
              <TableHeaderCell key={column.id} column={column} />
            ))}
          </tr>
        </thead>
        <tbody
          className={classNames(
            styles.tableBody,
            maxHeight !== undefined && styles.tableBodyWithMaxHeight,
          )}
          style={{ maxHeight: maxHeight ?? undefined }}
          ref={tbodyRef}
        >
          {groupBy
            ? Object.entries(groupedData).map(
                ([key, aggregatedRows]: [string, T[]]) => {
                  return [
                    <tr
                      key={key}
                      className={classNames(
                        styles.tableBodyRow,
                        tableStyles.tableBodyRow,
                      )}
                    >
                      <td
                        colSpan={columns.length}
                        className={styles.tableBodyGroupedCell}
                      >
                        {renderGroupedRowHeader
                          ? renderGroupedRowHeader(key, aggregatedRows)
                          : key}
                      </td>
                    </tr>,
                    aggregatedRows.map((row, rowIndex) => (
                      <TableRow key={rowIndex} row={row} rowIndex={rowIndex} />
                    )),
                  ];
                },
              )
            : memoizedData.map((row, rowIndex) => (
                <TableRow key={rowIndex} row={row} rowIndex={rowIndex} />
              ))}
          {data.length === 0 && (
            <TableEmptyState emptyState={emptyState} colSpan={columns.length} />
          )}
          {footer && (
            <TableFooter colSpan={columns.length}>{footer}</TableFooter>
          )}
        </tbody>
      </table>
    </TableProvider>
  );
}

Table.Mini = TableMini;

export { Table };
