import React, { ReactNode } from 'react';
import { classNames } from '../../utils';

import styles from './ListView.module.css';

export type ListViewProps = {
  /**
   * className for the element.
   */
  className?: string;
  /**
   * Items of the list, should be ListItem(s).
   */
  children: ReactNode[] | ReactNode;
};

/**
 * A ListView displays a list of interactive items.
 */
export const ListView = ({ className, children, ...rest }: ListViewProps) => {
  return (
    <ul className={classNames(styles.list, className)} {...rest}>
      {children}
    </ul>
  );
};
