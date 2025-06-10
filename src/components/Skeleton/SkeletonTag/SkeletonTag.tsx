import React from 'react';

import { Skeleton } from '../Skeleton/Skeleton';
import { classNames } from '../../../utils';

import styles from './SkeletonTag.module.css';

export type SkeletonTagProps = {
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The width of the element.
   */
  width?: string;
};

export const SkeletonTag = ({ className, width }: SkeletonTagProps) => {
  return (
    <Skeleton
      className={classNames(styles.skeletonTag, className)}
      width={width ?? '80px'}
      height="var(--unit-24)"
    />
  );
};
