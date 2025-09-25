import React from 'react';

import type { IconProps } from './iconProps';

export const ShieldStarIcon = ({
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
      d="M10.339 2.12a.536.536 0 0 0-.678 0 12.02 12.02 0 0 1-7.078 2.72.5.5 0 0 0-.479.422A12 12 0 0 0 2 6.834c0 5.107 3.26 9.461 7.834 11.137.107.039.225.039.332 0C14.74 16.295 18 11.94 18 6.834q0-.8-.104-1.572a.5.5 0 0 0-.48-.421 12.02 12.02 0 0 1-7.077-2.72m.263 4.251a.645.645 0 0 0-1.204 0L8.76 7.952l-1.657.137c-.578.048-.812.791-.372 1.18l1.262 1.114-.385 1.666c-.135.581.479 1.04.973.729L10 11.885l1.418.893c.495.311 1.109-.148.974-.73l-.385-1.665 1.262-1.114c.44-.389.206-1.132-.372-1.18l-1.657-.137z"
      clipRule="evenodd"
    />
  </svg>
);
