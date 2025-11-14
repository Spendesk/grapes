import React, { type ReactNode } from 'react';
import { classNames } from '../../utils';

import styles from './DropdownItem.module.css';

export type DropdownItemProps = {
  /**
   * Whether the DropdownItem should be selected.
   * @default false
   */
  isSelected?: boolean;
  /**
   * Whether the DropdownItem should be disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Do not have any impact
   * @default false
   * @deprecated use isSelected instead
   */
  isHighlighted?: boolean;
  /**
   * Content to render as the DropdownItem's help text
   */
  helpText?: ReactNode;
  /**
   * The text to display as the label.
   */
  label: ReactNode;
  /**
   * Content to render as the DropdownItem's prefix.
   */
  prefix?: ReactNode;
  /**
   * Content to render as the DropdownItem's suffix.
   */
  suffix?: ReactNode;
  /**
   * className for the element
   */
  className?: string;
};

export const DropdownItem = ({
  isSelected,
  isDisabled,
  isHighlighted,
  helpText,
  label,
  prefix,
  suffix,
  className,
  ...rest
}: DropdownItemProps) => {
  return (
    <div
      className={classNames(
        styles.dropdownItem,
        (isSelected || isHighlighted) && styles.selectedDropdownItem,
        isDisabled && styles.disabledDropdownItem,
        className,
      )}
      {...rest}
    >
      {prefix && <div className={styles.prefix}>{prefix}</div>}
      <span className={styles.label}>{label}</span>
      {suffix && <div className={styles.suffix}>{suffix}</div>}
      {helpText && <div className={styles.helpText}>{helpText}</div>}
    </div>
  );
};
