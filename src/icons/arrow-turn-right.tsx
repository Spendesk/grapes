import React from 'react';

import type { IconProps } from './iconProps';

export const ArrowTurnRightIcon = ({
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
      d="M2 10a8 8 0 0 1 14.5-4.664V3.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1 0-1.5h1.728a6.5 6.5 0 1 0 .771 5.294.75.75 0 1 1 1.443.412A8 8 0 0 1 2 10"
      clipRule="evenodd"
    />
  </svg>
);
