import React from 'react';

import type { IconProps } from './iconProps';

export const ChevronLeftIcon = ({
  ref,
  width = 20,
  height = 20,
  viewBox = '0 0 20 20',
  role = 'image',
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
      d="M12.669 5.22a.75.75 0 0 1 0 1.06L8.951 10l3.718 3.718a.75.75 0 0 1-1.06 1.06l-4.25-4.248a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0"
      clipRule="evenodd"
    />
  </svg>
);
