import React, { type ReactNode } from 'react';
import { classNames } from '../../utils';

import styles from './ListView.module.css';

export type ListItemProps = {
  /**
   * className for the element
   */
  className?: string;
  /**
   * The content of the ListItem
   */
  children: ReactNode;
};

/**
 * An item inside a listView
 */
export const ListItem = ({ children, className, ...rest }: ListItemProps) => {
  return (
    <li className={classNames(styles.item, className)} {...rest}>
      {children}
    </li>
  );
};
