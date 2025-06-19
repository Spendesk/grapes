import React, { type ReactNode } from 'react';

import styles from './TableMini.module.css';
import { classNames } from '../../utils';

export type TableMiniColumn<T> = {
  id: string;
  width?: number | string;
  align?: 'left' | 'right' | 'center';
  renderCell(row: T): ReactNode;
  className?: string;
};

export type TableMiniProps<T extends object> = {
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The columns to display.
   */
  columns: TableMiniColumn<T>[];
  /**
   * The data to display.
   */
  data: T[];
  /**
   * Function to get a row's unique identifier.
   */
  getRowId: (row: T) => string;
};

export function TableMini<T extends object>({
  data,
  columns,
  getRowId,
  className,
  ...rest
}: TableMiniProps<T>) {
  return (
    <table className={classNames(styles.table, className)} {...rest}>
      <tbody>
        {data.map((row) => (
          <tr key={getRowId(row)}>
            {columns.map((column) => (
              <td
                key={column.id}
                style={{ width: column.width }}
                align={column.align}
              >
                {column.renderCell(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
