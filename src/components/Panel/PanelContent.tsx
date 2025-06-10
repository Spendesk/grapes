import React, { ReactNode } from 'react';
import { classNames } from '../../utils';

import styles from './Panel.module.css';
import { useId } from '../../hooks/useId';
import { PanelProvider } from './PanelProvider';

export type PanelContentProps = {
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The content of the Panel.
   */
  children: ReactNode;
  /**
   * The selector for the aria title of the <section />
   */
  'aria-labelledby'?: string;
  /**
   * Whether the panel is coming from the side
   */
  DO_NOT_USE_isSidePanel?: boolean;
};

export type SidePanelContentProps = Omit<
  PanelContentProps,
  'DO_NOT_USE_isSidePanel'
>;

export function PanelContent({
  children,
  className,
  DO_NOT_USE_isSidePanel = false,
  'aria-labelledby': ariaLabelledby,
  ...rest
}: PanelContentProps) {
  const titleId = useId();
  return (
    <PanelProvider titleId={titleId}>
      <section
        className={classNames(
          DO_NOT_USE_isSidePanel ? styles.sidePanel : styles.panel,
          className,
        )}
        aria-labelledby={ariaLabelledby ? ariaLabelledby : titleId}
        {...rest}
      >
        {children}
      </section>
    </PanelProvider>
  );
}

export function SidePanelContent(props: SidePanelContentProps) {
  return <PanelContent {...props} DO_NOT_USE_isSidePanel />;
}
