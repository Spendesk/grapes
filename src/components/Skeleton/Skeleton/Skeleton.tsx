import React from 'react';
import { classNames } from '../../../utils';

import styles from './Skeleton.module.css';

export type SkeletonProps = {
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The width of the element.
   */
  width: string;
  /**
   * The height of the element.
   */
  height: string;
};

export const Skeleton = ({ className, width, height }: SkeletonProps) => {
  return (
    <div
      className={classNames(styles.skeleton, className)}
      style={{
        ['--width-skeleton' as string]: width,
        ['--height-skeleton' as string]: height,
      }}
    />
  );
};
