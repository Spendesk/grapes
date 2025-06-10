import React, { ReactNode } from 'react';

import styles from './Table.module.scss';

type Props = {
  emptyState?: {
    title: string;
    subtitle?: ReactNode;
  };
  colSpan: number;
};

export function TableEmptyState({ emptyState, colSpan }: Props) {
  if (!emptyState) {
    return null;
  }

  return (
    <tr className={styles.tableEmptyState}>
      <td className={styles.tableEmptyStateCell} colSpan={colSpan}>
        <div className={styles.tableEmptyStateTitle}>{emptyState.title}</div>
        {emptyState.subtitle && (
          <div className={styles.tableEmptyStateSubtitle}>
            {emptyState.subtitle}
          </div>
        )}
      </td>
    </tr>
  );
}
