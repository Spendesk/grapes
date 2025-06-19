import React, { type ReactNode } from 'react';
import { classNames } from '../../utils';

import styles from './Box.module.css';

export type BoxProps = {
  /**
   * Content of the Box
   */
  children: ReactNode;
  /**
   * The visual style of the Box
   * @default primary
   */
  variant?: 'secondary' | 'primary';
  /**
   * className for the element
   */
  className?: string;
  /**
   * ARIA role for the Box
   */
  role?: string;
};

/**
 * Generic container for grouping other components
 */
export const Box = ({
  children,
  className,
  variant = 'primary',
  ...rest
}: BoxProps) => {
  return (
    <div
      {...rest}
      className={classNames(styles.container, className)}
      data-variant={variant}
    >
      {children}
    </div>
  );
};
