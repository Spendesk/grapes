import React from 'react';

import { Collapse } from '../Collapse';

import { useAccordion } from './AccordionContext';
import { Icon } from '../Icon';

import styles from './AccordionItem.module.css';
import { classNames } from '../../utils';

export type AccordionItemProps = {
  /**
   * className for the element
   */
  className?: string;
  /**
   * The content of the AccordionItem
   */
  children: React.ReactNode;
  /**
   * Function to render the item's header
   */
  renderHeader: () => React.ReactNode;
  /**
   * Whether the AccordionItem should be open
   * @default false
   */
  open?: boolean;
  /**
   * Whether the AccordionItem should have opening and closing animation.
   * Has no effect when prefers-reduced-motion is set
   * @default false
   */
  noAnimation?: boolean;
  /**
   * Handler that is called when the AccordionItem is toggle
   */
  onToggle?: (isOpen: boolean) => void;
};

export const AccordionItem = ({
  open = false,
  className,
  children,
  renderHeader,
  noAnimation,
  onToggle,
}: AccordionItemProps) => {
  const name = useAccordion();

  return (
    <Collapse
      open={open}
      name={name}
      onToggle={onToggle}
      noAnimation={noAnimation}
      className={classNames(styles.accordionItem, className)}
      renderHeader={() => {
        return (
          <div className={styles.accordionItemHeader}>
            {renderHeader()}
            <Icon
              className={styles.accordionItemHeaderIcon}
              name="chevron-right"
              aria-hidden="true"
            />
          </div>
        );
      }}
    >
      {children}
    </Collapse>
  );
};
