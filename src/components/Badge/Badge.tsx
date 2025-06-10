import React from 'react';
import { classNames } from '../../utils';

import styles from './Badge.module.scss';

export type BadgeVariant = 'primary' | 'secondary';

export type BadgeProps = {
  /**
   * The content of the badge
   */
  children: React.ReactNode;
  /**
   * The visual style of the badge
   * @default primary
   */
  variant?: BadgeVariant;
  /**
   * className for the element
   */
  className?: string;
};

export const Badge = ({
  children,
  variant = 'primary',
  className,
}: BadgeProps) => {
  return (
    <div data-variant={variant} className={classNames(styles.badge, className)}>
      {children}
    </div>
  );
};
