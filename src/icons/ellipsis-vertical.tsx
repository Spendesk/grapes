import React from 'react';

import type { IconProps } from './iconProps';

export const EllipsisVerticalIcon = ({
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
      d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"
    />
  </svg>
);
