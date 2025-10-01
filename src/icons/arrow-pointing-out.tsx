import React from 'react';

import type { IconProps } from './iconProps';

export const ArrowPointingOutIcon = ({
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
      d="M16.74 2.5c.42 0 .75.34.75.75v4.5a.75.75 0 1 1-1.5 0V5.06l-4 4.19c-.29.3-.95.3-1.25 0-.29-.3-.29-.96 0-1.25l4.2-4h-2.7a.75.75 0 0 1 0-1.5h4.5ZM3.25 17.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 1 1 1.5 0v2.69l4-4.19c.3-.3.96-.3 1.25 0 .3.3.3.96 0 1.25l-4.19 4h2.69a.75.75 0 0 1 0 1.5h-4.5Z"
    />
  </svg>
);
