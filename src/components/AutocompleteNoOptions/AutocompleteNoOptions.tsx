import React, { type ReactNode } from 'react';
import { classNames } from '../../utils';

import type { IconName } from '../Icon';
import { HighlightIcon } from '../HighlightIcon';

import styles from './AutocompleteNoOptions.module.css';

export type AutocompleteNoOptionsProps = {
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The visual style of the element.
   * @default info
   */
  variant?: 'info' | 'warning';
  /**
   * The content of the AutocompleteNoOptions.
   */
  children: ReactNode;
};

const getIconName = (variant: 'info' | 'warning'): IconName => {
  switch (variant) {
    case 'warning':
      return 'triangle-warning';
    case 'info':
    default:
      return 'circle-information';
  }
};

export const AutocompleteNoOptions = ({
  children,
  className,
  variant = 'info',
  ...rest
}: AutocompleteNoOptionsProps) => {
  return (
    <div
      className={classNames(styles.autocompleteNoOptions, className)}
      {...rest}
    >
      <HighlightIcon
        className={styles.autocompleteNoOptionsIcon}
        name={getIconName(variant)}
        size={32}
        variant={variant}
      />
      {children}
    </div>
  );
};
