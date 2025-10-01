import React from 'react';

import type { IconProps } from './iconProps';

export const ChevronDownIcon = ({
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
      d="M5.22 7.52a.75.75 0 0 1 1.06 0L10 11.237l3.718-3.719a.75.75 0 0 1 1.06 1.061L10.53 12.83a.75.75 0 0 1-1.06 0L5.218 8.58a.75.75 0 0 1 0-1.06"
      clipRule="evenodd"
    />
  </svg>
);
