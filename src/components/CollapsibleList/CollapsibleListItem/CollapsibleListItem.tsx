import React, {
  type ChangeEventHandler,
  type MouseEventHandler,
  type ReactNode,
} from 'react';

import { classNames } from '../../../utils';
import { CheckboxInput } from '../../CheckboxInput';

import styles from './CollapsibleListItem.module.scss';

type CollapsibleListItemVariant = 'alert';

export type CollapsibleListItemProps = {
  /**
   * Whether this element is active.
   * @default false
   */
  isActive?: boolean;
  /**
   * Whether this element is the header of a CollapsibleList.
   * @default false
   */
  asHeader?: boolean;
  /**
   * The content of the CollapsibleListItem.
   */
  children: ReactNode;
  /**
   * className for the element.
   */
  className?: string;
  /**
   * Handler that is called when the CollapsibleListItem is clicked.
   */
  onClick: MouseEventHandler;
  /**
   * Whether the CollapsibleList is collapsed.
   * @default true
   */
  isCollapsed?: boolean;
  /**
   * The visual style of the CollapsibleListItem.
   */
  variant?: CollapsibleListItemVariant;
  /**
   * Right addon of the CollapsibleListItem.
   */
  rightAddon?: React.ReactNode;
} & (
  | // Selection
  {
      /**
       * Whether the CollapsibleListItem is selected.
       */
      isSelected: boolean;
      /**
       * Whether the CollapsibleListItem is indeterminate (only active if the asHeader prop is set to true).
       */
      isIndeterminate?: boolean;
      /**
       * Handler that is called when a CollapsibleListItem has been selected.
       */
      onSelect: ChangeEventHandler<HTMLInputElement>;
    }
  | {
      isSelected?: never;
      isIndeterminate?: never;
      onSelect?: never;
    }
);

export const CollapsibleListItem = ({
  isActive = false,
  asHeader = false,
  children,
  className,
  isSelected,
  isIndeterminate,
  onSelect,
  onClick,
  isCollapsed = true,
  variant,
  rightAddon,
}: CollapsibleListItemProps) => (
  <div
    className={classNames(
      styles.collapsibleListItem,
      isActive && styles.collapsibleListItemIsActive,
      asHeader && styles.collapsibleListItemAsHeader,
      asHeader &&
        !isCollapsed &&
        styles.collapsibleListItemAsHeaderNotCollapsed,
      !isActive && variant === 'alert' && styles.collapsibleListItemIsAlert,
      className,
    )}
  >
    {isSelected !== undefined && onSelect && (
      <CheckboxInput
        isIndeterminate={isIndeterminate}
        isChecked={isSelected}
        onChange={(e) => {
          onSelect(e);
        }}
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
    )}
    <button
      type="button"
      className={styles.collapsibleListItemContent}
      onClick={onClick}
    >
      {children}
    </button>
    {rightAddon}
  </div>
);
