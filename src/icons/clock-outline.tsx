import React from 'react';

import type { IconProps } from './iconProps';

export const ClockOutlineIcon = ({
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
      d="M10.75 6a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 .3.6l2 1.5a.75.75 0 1 0 .9-1.2l-1.7-1.275z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16m6.5-8a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"
      clipRule="evenodd"
    />
  </svg>
);
