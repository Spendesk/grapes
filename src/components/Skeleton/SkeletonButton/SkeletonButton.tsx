import React from 'react';

import { Skeleton } from '../Skeleton/Skeleton';
import { classNames } from '../../../utils';

import styles from './SkeletonButton.module.css';

export type SkeletonButtonProps = {
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The width of the element.
   */
  width?: string;
};

export const SkeletonButton = ({ className, width }: SkeletonButtonProps) => {
  return (
    <Skeleton
      className={classNames(styles.skeletonButton, className)}
      width={width ?? '128px'}
      height="var(--grapes-unit-40)"
    />
  );
};
