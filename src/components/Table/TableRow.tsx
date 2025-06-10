import React, { useState } from 'react';

import styles from './Table.module.scss';
import { TableVariant } from './types';
import { classNames } from '../../utils';
import { TableCell } from './TableCell';
import { useTableRowContext } from './TableProvider';

type Props<T extends object> = {
  row: T;
  rowIndex: number;
};

/* v8 ignore start */
const getRowVariantClassName = (
  variant: TableVariant | undefined,
): string | undefined => {
  switch (variant) {
    case 'info':
      return styles.infoTableBodyRow;
    case 'primary':
      return styles.primaryTableBodyRow;
    case 'success':
      return styles.successTableBodyRow;
    case 'warning':
      return styles.warningTableBodyRow;
    case 'alert':
      return styles.alertTableBodyRow;
  }
  return undefined;
};
/* v8 ignore stop */

export function TableRow<T extends object>({ row, rowIndex }: Props<T>) {
  const [hoveredRow, setHoveredRow] = useState<T | null>(null);

  const {
    isRowActive,
    isRowDisabled,
    isCheckboxDisabled,
    rowVariant,
    onRowClick,
    getRowId,
    columns,
  } = useTableRowContext(row);

  return (
    <tr
      key={getRowId?.(row) ?? rowIndex}
      onMouseEnter={() => {
        setHoveredRow(row);
      }}
      onMouseLeave={() => {
        setHoveredRow(null);
      }}
      className={classNames(
        styles.tableBodyRow,
        !isRowDisabled && onRowClick && styles.clickableTableBodyRow,
        !isRowDisabled && isRowActive && styles.activeTableBodyRow,
        !isRowDisabled && !isRowActive && getRowVariantClassName(rowVariant),
        isRowDisabled && styles.disabledTableBodyRow,
      )}
      onClick={() => {
        if (!isRowDisabled) {
          onRowClick?.(row);
        }
      }}
    >
      {columns.map((column, columnIndex) => (
        <TableCell
          key={column.id}
          column={column}
          columnIndex={columnIndex}
          row={row}
          hoveredRow={hoveredRow}
          isCheckboxDisabled={isCheckboxDisabled}
        />
      ))}
    </tr>
  );
}
