import React, { useState } from 'react';

import { classNames } from '../../utils';
import { Collapse } from '../Collapse';

import styles from './CollapsibleList.module.css';

export type CollapsibleListProps = {
  /**
   * Whether the CollapsibleList should be collapsed by default.
   * @default true
   */
  isInitialCollapsed?: boolean;
  /**
   * The content of the CollapsibleList, should be CollapsibleListItem(s).
   */
  children: React.ReactNode;
  /**
   * Footer of the CollapsibleList.
   */
  footer?: React.ReactNode;
  /**
   * className for the element.
   */
  className?: string;
  /**
   * Function to render the header of the CollapsibleList.
   */
  renderHeader: (toggle: () => void, isCollapsed: boolean) => React.ReactNode;
  /**
   * Whether the CollapsibleList should have opening and closing animation.
   * Has no effect when prefers-reduced-motion is set
   * @default false
   */
  noAnimation?: boolean;
};

export const CollapsibleList = ({
  isInitialCollapsed = true,
  children,
  footer,
  className,
  renderHeader,
  noAnimation,
}: CollapsibleListProps) => {
  const [isCollapsed, setState] = useState(isInitialCollapsed);
  const toggle = () => setState((state) => !state);

  return (
    <div className={classNames(styles.collapsibleList, className)}>
      <Collapse
        open={!isCollapsed}
        className={styles.collapsibleListInner}
        renderHeader={() => renderHeader(toggle, isCollapsed)}
        noAnimation={noAnimation}
      >
        <ul className={styles.collapsibleListContent}>
          {React.Children.map(children, (child) => (
            <li className={styles.item}>{child}</li>
          ))}
          {footer && <li className={styles.collapsibleListFooter}>{footer}</li>}
        </ul>
      </Collapse>
      <div className={styles.collapsibleListDepthEffect} />
    </div>
  );
};
