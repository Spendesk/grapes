import React from 'react';

import type { IconProps } from './iconProps';

export const ArrowLeftIcon = ({
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
      d="M8.53 4.22a.75.75 0 0 1 0 1.06L4.56 9.25h10.69a.75.75 0 0 1 0 1.5H4.56l3.97 3.97a.75.75 0 0 1-1.06 1.06l-5.25-5.25a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0"
      clipRule="evenodd"
    />
  </svg>
);
