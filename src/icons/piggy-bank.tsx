import React from 'react';

import type { IconProps } from './iconProps';

export const PiggyBankIcon = ({
  width = 20,
  height = 20,
  viewBox = '0 0 20 20',
  role = 'image',
  ref,
  ...rest
}: IconProps) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
    viewBox={viewBox}
    role={role}
    {...rest}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2.13 16.552C1.382 14.482 1 11.624 1 9.424c0-2.762 2.239-4.921 5-4.921h3l.202-.404c.194-.389.575-.79.953-1.006l1.675-.957a1 1 0 0 1 1.482.703l.264 1.584L16 7.003h2a1 1 0 0 1 1 1v3.78a1 1 0 0 1-.684.948L16 14.003l-1.698 3.311a1 1 0 0 1-.95.689h-2.87a1 1 0 0 1-.845-.465l-.705-1.115h-.856l-.705 1.115a1 1 0 0 1-.845.465H3.35a1 1 0 0 1-.968-.75zm3.052-9.55a.75.75 0 0 1 .75-.75h2a.75.75 0 1 1 0 1.5h-2a.75.75 0 0 1-.75-.75m7.818 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
      clipRule="evenodd"
    />
  </svg>
);
