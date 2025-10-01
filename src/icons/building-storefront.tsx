import React from 'react';

import type { IconProps } from './iconProps';

export const BuildingStorefrontIcon = ({
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
      d="M2.879 7.121A3 3 0 0 0 7.5 6.66a3 3 0 0 0 2.5 1.34 3 3 0 0 0 2.5-1.34q.163.245.38.462a3 3 0 0 0 4.242-4.243l-.293-.292A2 2 0 0 0 15.415 2H4.585a2 2 0 0 0-1.414.586l-.292.292a3 3 0 0 0 0 4.243M3 9.032a4.51 4.51 0 0 0 4.5-.29A4.5 4.5 0 0 0 10 9.5a4.5 4.5 0 0 0 2.5-.758 4.51 4.51 0 0 0 4.5.29V16.5h.25a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5H3z"
    />
  </svg>
);
