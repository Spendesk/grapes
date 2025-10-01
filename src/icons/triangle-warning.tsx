import React from 'react';

import type { IconProps } from './iconProps';

export const TriangleWarningIcon = ({
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
      d="M8.49 3.852c.671-1.136 2.349-1.136 3.02 0l6.254 10.592c.67 1.136-.168 2.556-1.51 2.556H3.746c-1.342 0-2.18-1.42-1.51-2.556zM10 6.292c.413 0 .747.327.747.73v3.409c0 .403-.334.73-.747.73a.74.74 0 0 1-.747-.73V7.022c0-.403.334-.73.747-.73m0 8.765c.55 0 .996-.436.996-.974A.985.985 0 0 0 10 13.11a.985.985 0 0 0-.996.974c0 .538.446.974.996.974"
      clipRule="evenodd"
    />
  </svg>
);
