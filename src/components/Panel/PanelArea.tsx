import React, { ReactNode } from 'react';
import { classNames } from '../../utils';

import styles from './Panel.module.css';

export type PanelAreaProps = {
  /**
   * The content of the PanelArea.
   */
  children: ReactNode;
  /**
   * className for the element
   */
  className?: string;
};

export function PanelArea({ children, className }: PanelAreaProps) {
  return (
    <div className={classNames(styles.panelArea, className)}>{children}</div>
  );
}
