import React, { type ReactNode } from 'react';
import { PanelSection } from './PanelSection';

import styles from './Panel.module.css';
import { classNames } from '../../utils';

export type FooterSummaryProps =
  | {
      isCollapsible: true;
      title: ReactNode;
      content: ReactNode;
      isDefaultCollapsed?: boolean;
      onCollapsed?: () => void;
      onExtended?: () => void;
      /**
       * Whether the footerSummary should have opening and closing animation.
       * Has no effect when prefers-reduced-motion is set
       * @default false
       */
      noAnimation?: boolean;
    }
  | {
      isCollapsible: false;
      title?: ReactNode;
      content: ReactNode;
    };

export type PanelFooterProps = {
  /**
   * The content of the PanelFooter
   */
  children?: ReactNode;
  /**
   * Footer summary of the Panel
   */
  footerSummary?: FooterSummaryProps;
};

export function PanelFooter({ footerSummary, children }: PanelFooterProps) {
  return (
    <footer>
      {footerSummary && (
        <div
          className={classNames(
            styles.panelFooterAccordion,
            !children && styles.panelFooterAccordionWithoutFooter,
          )}
        >
          {footerSummary.isCollapsible ? (
            <PanelSection
              title={footerSummary.title}
              isCollapsible
              noAnimation={footerSummary.noAnimation}
              isDefaultCollapsed={footerSummary.isDefaultCollapsed}
              onCollapsed={footerSummary.onCollapsed}
              onExtended={footerSummary.onExtended}
            >
              {footerSummary.content}
            </PanelSection>
          ) : (
            <PanelSection title={footerSummary.title}>
              {footerSummary.content}
            </PanelSection>
          )}
        </div>
      )}
      {children && <div className={styles.panelFooter}>{children}</div>}
    </footer>
  );
}
