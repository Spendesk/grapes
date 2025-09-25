import React from 'react';

import type { IconProps } from './iconProps';

export const PlugIcon = ({
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
      d="M8.5 2.75a.75.75 0 0 0-1.5 0V6H4.75a.75.75 0 0 0 0 1.5H5V9c0 2.507 1.844 4.638 4.25 5v1.25A2.75 2.75 0 0 0 12 18h2.25a.75.75 0 0 0 0-1.5H12c-.69 0-1.25-.56-1.25-1.25V14c2.406-.362 4.25-2.493 4.25-5V7.5h.25a.75.75 0 0 0 0-1.5H13V2.75a.75.75 0 0 0-1.5 0V6h-3z"
    />
  </svg>
);
