import React from 'react';

import { classNames, UnknownSizeError } from '../../../utils';
import { Skeleton } from '../Skeleton/Skeleton';

import styles from './SkeletonAvatar.module.css';

type Size = 's' | 'm' | 'l';
type Variant = 'circle' | 'square';

export type SkeletonAvatarProps = {
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The size of the element.
   * @default m
   */
  size?: Size;
  /**
   * Whether the SkeletonAvatar should be square or circle.
   * @default circle
   */
  variant?: Variant;
};

export const SkeletonAvatar = ({
  className,
  size = 'm',
  variant = 'circle',
}: SkeletonAvatarProps) => {
  const width = getWidth(size);

  return (
    <Skeleton
      className={classNames(
        variant === 'circle' && styles.circleSkeletonAvatar,
        variant === 'square' && styles.squareSkeletonAvatar,
        className,
      )}
      width={width}
      height={width}
    />
  );
};

const getWidth = (size: Size): string => {
  switch (size) {
    case 's':
      return 'var(--unit-24)';
    case 'm':
      return 'var(--unit-32)';
    case 'l':
      return 'var(--unit-56)';
    default:
      throw new UnknownSizeError(size);
  }
};
