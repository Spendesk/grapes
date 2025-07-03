import React, { type ReactNode } from 'react';
import { classNames } from '../../utils';

import styles from './Banner.module.scss';
import { useId } from '../../hooks/useId';

export type BannerVariant = 'brand' | 'neutral';

export type BannerProps = {
  /**
   * The visual style of the banner
   * @default brand
   */
  variant?: BannerVariant;
  /**
   * Title of the Banner
   */
  title: ReactNode;
  /**
   * Illustration on the left side of the Banner.
   * Illustration will be centered vertically with margin on both left and right
   */
  illustration?: ReactNode;
  /**
   * Content of the Banner
   */
  children: ReactNode;
  /**
   * className for the element
   */
  className?: string;
  /**
   * Action buttons to be displayed in the Banner
   */
  actions: ReactNode;
};

/**
 * Callout to prompt the user for an action
 */
export const Banner = ({
  variant = 'brand',
  title,
  children,
  className,
  illustration,
  actions,
}: BannerProps) => {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <aside
      className={classNames(styles.banner, className)}
      data-variant={variant}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      {illustration}
      <div className={styles.container}>
        <h1 className={styles.title} id={titleId}>
          {title}
        </h1>
        <p className={styles.description} id={descriptionId}>
          {children}
        </p>
        <div className={styles.actions}>{actions}</div>
      </div>
    </aside>
  );
};
