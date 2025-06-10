import React, { ElementType } from 'react';
import { classNames } from '../../utils';

import styles from './NavigationItem.module.css';

type ElementProps<T> =
  T extends ElementType<infer Props>
    ? Props extends object
      ? Props
      : never
    : never;

export type NavigationItemProps<C> = {
  /**
   * The type of component (NavLink, a, div, etc.)
   */
  component?: ElementType;
  /**
   * The label of the navigation item
   */
  text: string;
  /**
   * Left addon of the navigation item
   */
  leftAddon?: React.ReactNode;
  /**
   * Right addon of the navigation item
   */
  rightAddon?: React.ReactNode;
  /**
   * If the navigation item should be displayed as active
   * @default false
   */
  isActive?: boolean;
  /**
   * className for the element
   */
  className?: string;
} & Partial<ElementProps<C>>;

export const NavigationItem = <C extends ElementType>({
  component,
  text,
  leftAddon,
  rightAddon,
  isActive,
  className,
  ...rest
}: NavigationItemProps<C>) => {
  const Component = component || 'div';

  return (
    <Component
      data-active={isActive}
      className={classNames(styles.navigationItem, className)}
      {...rest}
    >
      {leftAddon ? leftAddon : null}
      <span className={styles.text} data-content={text}>
        {text}
      </span>
      {rightAddon ? rightAddon : null}
    </Component>
  );
};
