import React from 'react';

import styles from './Table.module.css';

type Props = {
  children: React.ReactNode;
  colSpan: number;
};

export function TableFooter({ children, colSpan }: Props) {
  return (
    <tr className={styles.tableFooterRow}>
      <td className={styles.tableFooterCell} colSpan={colSpan}>
        {children}
      </td>
    </tr>
  );
}
