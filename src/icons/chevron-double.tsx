import React from 'react';

import type { IconProps } from './iconProps';

export const ChevronDoubleIcon = ({
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
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M5.75 13 10 17.25 14.247 13m0-6.002L10 2.749 5.75 6.998"
    />
  </svg>
);
