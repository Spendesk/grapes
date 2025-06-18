import React, { type ReactElement, type ReactNode } from 'react';
import { classNames } from '../../utils';

import type { IconName } from '../Icon';
import { HighlightIcon, type HighlightIconVariant } from '../HighlightIcon';
import { useId } from '../../hooks/useId';

import styles from './EmptyState.module.scss';

export type EmptyStateProps = {
  /**
   * Actions to display in the EmptyState.
   */
  actions?: ReactElement | ReactElement[];
  /**
   * className for the element.
   */
  className?: string;
  /**
   * Content of the Empty State.
   */
  subtitle: ReactNode;
  /**
   * The title to display in the EmptyState.
   */
  title: ReactNode;
} & (
  | // EmptyState with icon
  {
      /**
       * The icon to display in the EmptyState.
       */
      iconName: IconName;
      /**
       * The variant of the icon.
       * @default info
       */
      iconVariant?: HighlightIconVariant;
      illustration?: never;
    }
  // EmptyState with illustration
  | {
      iconName?: never;
      iconVariant?: never;
      /**
       * The illustration to display in the EmptyState.
       */
      illustration: ReactElement;
    }
);

export const EmptyState = ({
  actions,
  className,
  iconName,
  iconVariant = 'info',
  illustration,
  subtitle,
  title,
  ...rest
}: EmptyStateProps) => {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <div className={classNames(styles.emptyStateContainer, className)}>
      <section
        className={styles.emptyState}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        {...rest}
      >
        {illustration}
        {iconName && iconVariant && (
          <HighlightIcon
            size={56}
            name={iconName}
            variant={iconVariant}
            aria-hidden="true"
          />
        )}
        <h1 id={titleId} className={styles.emptyStateTitle}>
          {title}
        </h1>
        <p id={descriptionId} className={styles.emptyStateSubtitle}>
          {subtitle}
        </p>
        {actions && <div className={styles.emptyStateActions}>{actions}</div>}
      </section>
    </div>
  );
};
