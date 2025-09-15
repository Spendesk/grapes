import React from 'react';

import { classNames } from '../../utils';
import type { TableColumn, TableSortDirection } from './types';
import { SortIcon } from './SortIcon';
import { useTableHeaderCellContext } from './TableProvider';

import styles from './Table.module.scss';
import commonStyles from '../../theme/placeholders/common.module.css';

type Props<T extends object> = {
  column: TableColumn<T>;
};

export function TableHeaderCell<T extends object>({ column }: Props<T>) {
  const { sortState, setSortState, nextSortDirection } =
    useTableHeaderCellContext();

  const onColumnHeaderClick = (column: TableColumn<T>) => {
    if (!column.id || !column.getSortValue) {
      return;
    }

    const columnSortDirection: TableSortDirection =
      column.id === sortState.columnId ? sortState.direction : 'none';

    setSortState({
      columnId: column.id,
      direction: nextSortDirection[columnSortDirection],
    });
  };

  return (
    <th
      key={column.id}
      className={classNames(
        styles.tableHeaderCell,
        commonStyles.ellipsis,
        column.id !== 'checkboxes' && styles.borderedTableHeaderCell,
        column.className,
      )}
      style={{ width: column.width }}
      onClick={() => onColumnHeaderClick(column)}
      aria-sort={
        column.id === sortState.columnId ? sortState.direction : 'none'
      }
    >
      <span
        className={classNames(
          styles.tableHeaderCellContent,
          column.align === 'right' && styles.tableHeaderCellContentAlignRight,
          Boolean(column.getSortValue) && styles.tableHeaderCellContentSort,
        )}
      >
        {column.header}
        {column.getSortValue && (
          <div className={classNames(styles.tableHeaderSortIcons)}>
            <SortIcon column={column} sortState={sortState} />
          </div>
        )}
      </span>
    </th>
  );
}
