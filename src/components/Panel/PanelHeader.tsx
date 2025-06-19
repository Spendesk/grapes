import React, { type ReactNode } from 'react';

import styles from './Panel.module.css';

export type PanelHeaderProps = {
  /**
   * The content of the PanelHeader.
   */
  children: ReactNode;
};

export function PanelHeader({ children }: PanelHeaderProps) {
  return <header className={styles.panelHeader}>{children}</header>;
}
