import React, { MouseEventHandler, ReactNode } from 'react';

import { PanelArea } from './PanelArea';

import styles from './Panel.module.css';
import { type FooterSummaryProps, PanelFooter } from './PanelFooter';
import { PanelContent } from './PanelContent';
import { PanelHeader } from './PanelHeader';
import { PanelBody } from './PanelBody';
import { PanelNavigation } from './PanelNavigation';

export type PanelProps = {
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The title of the Panel.
   */
  title?: string | ReactNode;
  /**
   * Header of the Panel
   */
  header?: ReactNode;
  /**
   * Footer of the Panel
   */
  footer?: ReactNode;
  /**
   * Footer summary of the Panel
   */
  footerSummary?: FooterSummaryProps;
  /**
   * The content of the Panel.
   */
  children: ReactNode;
  /**
   * Whether the panel is coming from the side.
   * Please use the component SidePanel instead
   */
  DO_NOT_USE_isSidePanel?: boolean;
  /**
   * Handler that is called when the Panel is closed. If not provided, the close button will not be displayed.
   */
  onClose?: MouseEventHandler<HTMLButtonElement>;
};

export function Panel({
  className,
  title,
  header,
  footer,
  footerSummary,
  children,
  DO_NOT_USE_isSidePanel = false,
  onClose,
  ...rest
}: PanelProps) {
  const hasTitleOrOnClose = title || onClose;
  return (
    <PanelContent
      className={className}
      DO_NOT_USE_isSidePanel={DO_NOT_USE_isSidePanel}
      {...rest}
    >
      <PanelBody>
        {hasTitleOrOnClose && (
          <PanelNavigation onClose={onClose}>
            {(titleId) => {
              return title ? (
                <h2 className={styles.panelNavigationTitle} id={titleId}>
                  {title}
                </h2>
              ) : undefined;
            }}
          </PanelNavigation>
        )}
        {header && <PanelHeader>{header}</PanelHeader>}
        <PanelArea>{children}</PanelArea>
      </PanelBody>
      {(footer || footerSummary) && (
        <PanelFooter footerSummary={footerSummary} {...rest}>
          {footer}
        </PanelFooter>
      )}
    </PanelContent>
  );
}

export function SidePanel(props: PanelProps) {
  return <Panel {...props} DO_NOT_USE_isSidePanel />;
}
