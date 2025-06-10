import React, { ReactNode } from 'react';

import { Collapse } from '../../Collapse';
import { Icon } from '../../Icon';

import { colors } from '../../../colors';
import styles from './PanelSimpleSection.module.css';

export type PanelSimpleSectionProps = {
  /**
   * The content of the PanelSection.
   */
  children: ReactNode;
  /**
   * Translation for the aria-label of the edit IconButton.
   */
  editButtonLabel?: string;
} & (
  | {
      /**
       * Whether the PanelSection can be collapsed.
       */
      isCollapsible?: false;
      /**
       * The title of the PanelSection.
       */
      title?: ReactNode;
      /**
       * Whether the PanelSection is initially collapsed.
       * @default false
       */
      isDefaultCollapsed?: never;
      /**
       * Handler that is called when the PanelSection is collapsed
       */
      onCollapsed?: never;
      /**
       * Handler that is called when the PanelSection is collapsed
       */
      onExtended?: never;
      /**
       * Whether the PanelSimpleSection should have opening and closing animation.
       * Has no effect when prefers-reduced-motion is set
       * @default false
       */
      noAnimation?: never;
    }
  | {
      isCollapsible: true;
      title: ReactNode;
      isDefaultCollapsed?: boolean;
      onCollapsed?: () => void;
      onExtended?: () => void;
      /**
       * Whether the PanelSimpleSection should have opening and closing animation.
       * Has no effect when prefers-reduced-motion is set
       * @default false
       */
      noAnimation?: boolean;
    }
);

export const PanelSimpleSection = ({
  title,
  children,
  isCollapsible,
  isDefaultCollapsed = false,
  onCollapsed,
  onExtended,
  noAnimation,
  ...rest
}: PanelSimpleSectionProps) => {
  return isCollapsible ? (
    <div>
      <Collapse
        noAnimation={noAnimation}
        renderHeader={() => (
          <div className={styles.panelSimpleSectionCollapsibleHeader}>
            <div className={styles.panelSimpleSectionTitle}>{title}</div>
            <Icon
              name="chevron-right"
              color={colors.contentPrimary}
              className={styles.panelSimpleSectionIcon}
              aria-hidden
            />
          </div>
        )}
        open={!isDefaultCollapsed}
        onToggle={(isOpen) => {
          if (isOpen && onExtended) {
            onExtended();
          } else if (onCollapsed) {
            onCollapsed();
          }
        }}
        {...rest}
      >
        <section>{children}</section>
      </Collapse>
    </div>
  ) : (
    <section {...rest}>
      {title && <div className={styles.panelSimpleSectionTitle}>{title}</div>}
      <div>{children}</div>
    </section>
  );
};
