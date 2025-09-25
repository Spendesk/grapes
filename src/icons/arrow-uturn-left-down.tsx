import React from 'react';

import type { IconProps } from './iconProps';

export const ArrowUturnLeftDownIcon = ({
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
      d="M10.005 2.75a.75.75 0 0 1 .75-.75h2.867a5.377 5.377 0 0 1 0 10.754H3.562l3.97 3.966a.75.75 0 1 1-1.061 1.061l-5.25-5.247a.75.75 0 0 1 0-1.06L6.47 6.22a.75.75 0 1 1 1.06 1.06l-3.97 3.974h10.06a3.877 3.877 0 0 0 0-7.755h-2.866a.75.75 0 0 1-.75-.75"
      clipRule="evenodd"
    />
  </svg>
);
