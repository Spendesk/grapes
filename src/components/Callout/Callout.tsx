import React, { type ReactNode } from 'react';
import { classNames } from '../../utils';

import { Icon, type IconName } from '../Icon';
import { useId } from '../../hooks/useId';

import styles from './Callout.module.css';

export type CalloutVariant = 'alert' | 'info' | 'success' | 'warning';

const getIcon = (variant: CalloutVariant): IconName => {
  switch (variant) {
    case 'warning':
      return 'triangle-warning';
    case 'alert':
      return 'hexagone-cross';
    case 'success':
      return 'circle-check';
    default:
    case 'info':
      return 'circle-information';
  }
};

export type CalloutProps = {
  /**
   * Identifier of the Callout
   */
  id?: string;
  /**
   * className for the element
   */
  className?: string;
  /**
   * Content of the Callout
   */
  children?: ReactNode;
  /**
   * The icon to display in the Callout
   */
  iconName?: IconName;
  /**
   * The title to display in the Callout
   */
  title: ReactNode;
  /**
   * The visual style of the Callout
   * @default info
   */
  variant?: CalloutVariant;
};

/**
 * Callouts are used to communicate a state that affects a system, feature or page.
 * Callout is an ideal component for use cases such as Form errors.
 * @see https://grapes.spendesk.design/docs/components/callout
 */
export const Callout = ({
  className,
  children,
  iconName,
  title,
  variant = 'info',
  ...rest
}: CalloutProps) => {
  const id = useId();
  return (
    <aside
      data-variant={variant}
      aria-labelledby={id}
      className={classNames(styles.callout, className)}
      {...rest}
    >
      <Icon
        name={iconName ?? getIcon(variant)}
        aria-hidden="true"
        className={styles.icon}
      />
      <span id={id} className={styles.calloutTitle}>
        {title}
      </span>
      {children && <div className={styles.calloutContent}>{children}</div>}
    </aside>
  );
};
