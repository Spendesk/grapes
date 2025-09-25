import React from 'react';

import type { IconProps } from './iconProps';

export const CardArrowUpIcon = ({
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
      d="M17 5.504a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-.5a1.5 1.5 0 0 1 1.5-1.5h13a1.5 1.5 0 0 1 1.5 1.5z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10.159 9.903a2.25 2.25 0 0 0 2.591 3.607v.994H2.5a1.5 1.5 0 0 1-1.5-1.5V8.458a.5.5 0 0 1 .5-.5h10.604z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M11.22 12.024a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.251 3.25a.75.75 0 0 1-1.06 1.06l-1.97-1.97v5.7a.75.75 0 0 1-1.5 0v-5.7l-1.97 1.97a.75.75 0 0 1-1.061 0"
      clipRule="evenodd"
    />
  </svg>
);
