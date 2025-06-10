import React from 'react';

import { TableColumn, TableVariant } from './types';
import { classNames } from '../../utils';

import styles from './Table.module.scss';
import { useTableCellContext } from './TableProvider';

type Props<T extends object> = {
  column: TableColumn<T>;
  columnIndex: number;
  row: T;
  hoveredRow: T | null;
  isCheckboxDisabled?: boolean;
};

/* v8 ignore start */
const getCellVariantClassName = (
  variant: TableVariant | undefined,
): string | undefined => {
  switch (variant) {
    case 'info':
      return styles.infoTableBodyCell;
    case 'primary':
      return styles.primaryTableBodyCell;
    case 'success':
      return styles.successTableBodyCell;
    case 'warning':
      return styles.warningTableBodyCell;
    case 'alert':
      return styles.alertTableBodyCell;
  }
  return undefined;
};
/* v8 ignore stop */

export function TableCell<T extends object>({
  column,
  columnIndex,
  row,
  hoveredRow,
  isCheckboxDisabled,
}: Props<T>) {
  const cellVariant = column.getCellVariant
    ? column.getCellVariant(row)
    : undefined;

  const { isRowDisabled, rowHeight, getRowId } = useTableCellContext(row);

  return (
    <td
      key={`cell-${column.id}-${getRowId?.(row) ?? columnIndex}`}
      className={classNames(
        styles.tableBodyCell,
        rowHeight === 'compact' && styles.compactTableBodyCell,
        column.id !== 'checkboxes' && styles.borderedTableBodyCell,
        !isRowDisabled && getCellVariantClassName(cellVariant),
        column.className,
      )}
      style={{ width: column.width }}
      align={column.align || 'left'}
    >
      {column.renderCell(row, {
        isRowHovered: hoveredRow === row,
        isCheckboxDisabled,
      })}
    </td>
  );
}
