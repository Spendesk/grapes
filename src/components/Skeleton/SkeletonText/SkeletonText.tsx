import React from 'react';

import { UnknownSizeError } from '../../../utils';
import { Skeleton } from '../Skeleton/Skeleton';

type Size = 's' | 'm' | 'l' | 'xl' | 'xxl';

export type SkeletonTextProps = {
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
   * The width of the element.
   */
  width?: string;
};

/**
 * Provides a placeholder while you wait for the content to load.
 * @see https://grapes.spendesk.design/docs/components/skeleton
 */
export const SkeletonText = ({
  className,
  size = 'm',
  width,
}: SkeletonTextProps) => {
  return (
    <Skeleton
      className={className}
      width={width ?? '100%'}
      height={getHeight(size)}
    />
  );
};

const getHeight = (size: Size): string => {
  switch (size) {
    case 's':
      return 'var(--font-size-12)';
    case 'm':
      return 'var(--font-size-14)';
    case 'l':
      return 'var(--font-size-16)';
    case 'xl':
      return 'var(--font-size-20)';
    case 'xxl':
      return 'var(--font-size-32)';
    default:
      throw new UnknownSizeError(size);
  }
};
