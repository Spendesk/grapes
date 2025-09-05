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
      width="var(--grapes-unit-16)"
      height="var(--grapes-unit-16)"
    />
  );
};
