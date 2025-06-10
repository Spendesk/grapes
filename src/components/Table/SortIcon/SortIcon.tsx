import React from 'react';
import { classNames } from '../../../utils';

import { Icon } from '../../Icon';

import { SortState, TableColumn } from '../types';

import styles from '../Table.module.scss';

type Props<T extends object> = {
  column: TableColumn<T>;
  sortState: SortState;
};

export function SortIcon<T extends object>({ column, sortState }: Props<T>) {
  if (column.id === sortState.columnId && sortState.direction === 'ascending') {
    return (
      <Icon
        name="arrow-down"
        size="s"
        className={styles.tableHeaderCellSortIcon}
      />
    );
  }
  if (
    column.id === sortState.columnId &&
    sortState.direction === 'descending'
  ) {
    return (
      <Icon
        name="arrow-up"
        size="s"
        className={styles.tableHeaderCellSortIcon}
      />
    );
  }

  return (
    <>
      <Icon
        name="chevron-up"
        size="s"
        className={styles.tableHeaderCellSortIcon}
      />
      <Icon
        name="chevron-down"
        size="s"
        className={classNames(
          styles.tableHeaderCellSortIcon,
          styles.tableHeaderCellSortIconDown,
        )}
      />
    </>
  );
}
