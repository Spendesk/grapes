import React, { type ReactNode } from 'react';
import { classNames } from '../../../utils';

import styles from './SkeletonTable.module.css';
import tableStyles from '../../../theme/table.module.css';

export type Column = {
  width?: number | string;
  cell: ReactNode;
};

export type SkeletonTableProps = {
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The amount of table rows to display.
   * @default 5
   */
  numberOfRows?: number;
  /**
   * The size of the rows.
   * @default normal
   */
  rowHeight?: 'normal' | 'compact';
  /**
   * Whether the columns should be separated by a line.
   */
  withColumnSeparator?: boolean;
} & (
  | {
      /**
       * Whether the table should have a header.
       */
      withHeader?: true;
      /**
       * The columns to display in the Skeleton.
       */
      columns: (Column & { header: ReactNode })[];
    }
  | {
      withHeader?: false;
      columns: Column[];
    }
);

export const SkeletonTable = ({
  className,
  columns,
  numberOfRows = 5,
  rowHeight = 'normal',
  withColumnSeparator,
  withHeader,
}: SkeletonTableProps) => {
  return (
    <table className={classNames(tableStyles.table, className)}>
      {!!withHeader && (
        <thead aria-hidden>
          <tr>
            {(columns as (Column & { header?: ReactNode })[]).map(
              (column, index) => (
                <th
                  key={`header-cell-${index}`}
                  className={classNames(
                    tableStyles.tableHeaderCell,
                    withColumnSeparator && tableStyles.tableCellSeparator,
                  )}
                  style={{ width: column.width || undefined }}
                >
                  <div className={styles.cell}>{column.header}</div>
                </th>
              ),
            )}
          </tr>
        </thead>
      )}
      <tbody>
        {Array.from({ length: numberOfRows }, (_, index) => {
          return (
            <tr key={index} className={tableStyles.tableBodyRow}>
              {(columns as (Column & { header?: ReactNode })[]).map(
                (column, columnIndex) => (
                  <td
                    key={`body-cell-${columnIndex}`}
                    className={classNames(
                      tableStyles.tableBodyCell,
                      rowHeight === 'compact' &&
                        tableStyles.tableBodyCellCompact,
                      withColumnSeparator && tableStyles.tableCellSeparator,
                    )}
                    style={{ width: column.width || undefined }}
                  >
                    <div className={styles.cell}>{column.cell}</div>
                  </td>
                ),
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
