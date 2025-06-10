import React, { ReactNode } from 'react';
import { classNames } from '../../../utils';

import styles from './SkeletonTable.module.scss';

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
    <table className={classNames(styles.skeletonTable, className)}>
      {!!withHeader && (
        <thead className={styles.skeletonTableHeader} aria-hidden>
          <tr>
            {(columns as (Column & { header?: ReactNode })[]).map(
              (column, index) => (
                <th
                  key={`header-cell-${index}`}
                  className={classNames(
                    styles.skeletonTableHeaderCell,
                    withColumnSeparator &&
                      styles.borderedSkeletonTableHeaderCell,
                  )}
                  style={{ width: column.width || undefined }}
                >
                  <div className={styles.skeletonTableCellWrapper}>
                    {column.header}
                  </div>
                </th>
              ),
            )}
          </tr>
        </thead>
      )}
      <tbody>
        {Array.from({ length: numberOfRows }, (_, index) => {
          return (
            <tr key={index} className={styles.skeletonTableBodyRow}>
              {(columns as (Column & { header?: ReactNode })[]).map(
                (column, columnIndex) => (
                  <td
                    key={`body-cell-${columnIndex}`}
                    className={classNames(
                      styles.skeletonTableBodyCell,
                      rowHeight === 'compact' &&
                        styles.compactSkeletonTableBodyCell,
                      withColumnSeparator &&
                        styles.borderedSkeletonTableBodyCell,
                    )}
                    style={{ width: column.width || undefined }}
                  >
                    <div className={styles.skeletonTableCellWrapper}>
                      {column.cell}
                    </div>
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
