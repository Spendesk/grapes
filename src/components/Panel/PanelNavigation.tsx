import React, { type MouseEventHandler, type ReactNode } from 'react';
import { IconButton } from '../IconButton';

import styles from './Panel.module.css';
import { usePanelContext } from './PanelProvider';
import { useTranslate } from '../../hooks/useTranslate';

export type PanelNavigationProps = {
  /**
   * The left content of the PanelNavigation.
   */
  children: (titleId: string) => ReactNode;
  /**
   * Handler that is called when the Panel is closed. If not provided, the close button will not be displayed.
   */
  onClose?: MouseEventHandler<HTMLButtonElement>;
};

export function PanelNavigation({ children, onClose }: PanelNavigationProps) {
  const { titleId } = usePanelContext();
  const t = useTranslate();

  return (
    <nav className={styles.panelNavigation}>
      <div className={styles.panelNavigationLeftSlot}>{children(titleId)}</div>
      {onClose && (
        <IconButton
          className={styles.close}
          iconName="cross"
          onClick={onClose}
          hasNegativeMargins
          aria-label={t('close')}
          variant="secondaryNeutral"
        />
      )}
    </nav>
  );
}
