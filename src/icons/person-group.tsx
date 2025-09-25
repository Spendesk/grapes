import React from 'react';

import type { IconProps } from './iconProps';

export const PersonGroupIcon = ({
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
      d="M5.165 14.464c-.11.5.108 1.011.54 1.286A7.96 7.96 0 0 0 10 17a7.96 7.96 0 0 0 4.296-1.25c.43-.275.649-.786.539-1.286C14.269 11.894 12.319 10 10 10s-4.27 1.895-4.835 4.464M13 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0M1.622 14.4a1.06 1.06 0 0 1-.53-.66 3 3 0 0 1 4.516-3.273c-.937.995-1.602 2.286-1.908 3.675a2.7 2.7 0 0 0-.05.846 5 5 0 0 1-2.028-.589M16.3 14.142c.062.284.078.569.05.846a5 5 0 0 0 2.028-.589c.259-.14.458-.374.53-.66Q19 13.385 19 13a3 3 0 0 0-4.607-2.533c.936.995 1.601 2.286 1.907 3.675M18 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0"
    />
  </svg>
);
