import React, { Children, type ReactNode } from 'react';
import { classNames } from '../../utils';

import styles from './Navigation.module.css';

export type NavigationProps = {
  /**
   * className for the element
   */
  className?: string;
  /**
   * Navigation items inside the navigation bar
   */
  children: ReactNode | ReactNode[];
};

export const Navigation = ({
  className,
  children,
  ...rest
}: NavigationProps) => {
  return (
    <nav className={classNames(styles.navigation, className)} {...rest}>
      <ul className={styles.navigationItems}>
        {Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </nav>
  );
};
