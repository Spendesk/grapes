import React from 'react';

import { Skeleton } from '../Skeleton/Skeleton';

export type SkeletonCheckboxProps = {
  /**
   * className for the element.
   */
  className?: string;
};

export const SkeletonCheckbox = ({ className }: SkeletonCheckboxProps) => {
  return (
    <Skeleton
      className={className}
      width="var(--unit-16)"
      height="var(--unit-16)"
    />
  );
};
