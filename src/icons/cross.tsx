import React from 'react';

import type { IconProps } from './iconProps';

export const CrossIcon = ({
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
      d="M5.408 4.264a.777.777 0 0 0-1.166 0 .96.96 0 0 0 0 1.272L8.333 10l-4.091 4.464a.96.96 0 0 0 0 1.272.777.777 0 0 0 1.166 0L9.5 11.273l4.092 4.463a.777.777 0 0 0 1.166 0 .96.96 0 0 0 0-1.272L10.667 10l4.091-4.464a.96.96 0 0 0 0-1.272.777.777 0 0 0-1.166 0L9.5 8.727z"
    />
  </svg>
);
