import React from 'react';

import type { IconProps } from './iconProps';

export const ArrowRightRectangleIcon = ({
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
      d="M4.25 2.3A2.25 2.25 0 0 0 2 4.55v11.5a2.25 2.25 0 0 0 2.25 2.25h5.5A2.25 2.25 0 0 0 12 16.05v-2a.75.75 0 0 0-1.5 0v2a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75V4.55a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v2a.75.75 0 0 0 1.5 0v-2A2.25 2.25 0 0 0 9.75 2.3z"
    />
    <path
      fill="currentColor"
      d="M15.28 7.27a.75.75 0 1 0-1.06 1.06l1.22 1.22H5.75a.75.75 0 0 0 0 1.5h9.69l-1.22 1.22a.75.75 0 0 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06z"
      clipRule="evenodd"
    />
  </svg>
);
