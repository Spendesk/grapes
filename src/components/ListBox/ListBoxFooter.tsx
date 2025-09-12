import React, { type ReactNode } from 'react';
import styles from './ListBox.module.css';
import { classNames } from '../../utils';

export type ListBoxFooterProps = {
  children: ReactNode;
};

export function ListBoxFooter({ children }: ListBoxFooterProps) {
  if (!children) {
    return null;
  }

  return (
    <li
      role="presentation"
      className={classNames(styles.item, styles.footerItem)}
    >
      {children}
    </li>
  );
}
