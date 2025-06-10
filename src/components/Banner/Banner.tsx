import React, { MouseEventHandler, ReactNode } from 'react';
import { classNames } from '../../utils';

import styles from './Banner.module.scss';
import { useId } from '../../hooks/useId';
import { Button, ButtonVariant } from '../Button';

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
   * Content of the button
   */
  actionText: string;
  /**
   * Handler that is called when the button is clicked
   */
  onClick: MouseEventHandler<HTMLElement>;
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
   * The visual style of the button
   * @default secondaryNeutral
   */
  buttonVariant?: ButtonVariant;
};

/**
 * Callout to prompt the user for an action
 */
export const Banner = ({
  variant = 'brand',
  title,
  children,
  actionText,
  className,
  illustration,
  onClick,
  buttonVariant = 'secondaryNeutral',
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
        <Button variant={buttonVariant} text={actionText} onClick={onClick} />
      </div>
    </aside>
  );
};
