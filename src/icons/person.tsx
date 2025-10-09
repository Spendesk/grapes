import React from 'react';

import type { IconProps } from './iconProps';

export const PersonIcon = ({
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
      d="M3.084 14.26a1.32 1.32 0 0 0 .433 1.505A10.48 10.48 0 0 0 9.997 18c2.445 0 4.696-.836 6.487-2.24a1.32 1.32 0 0 0 .432-1.505c-1.068-2.8-3.761-4.788-6.915-4.788-3.156 0-5.85 1.99-6.917 4.793M9.997 8.4c1.753 0 3.174-1.433 3.174-3.2S11.751 2 9.997 2C8.245 2 6.824 3.433 6.824 5.2s1.42 3.2 3.173 3.2"
    />
  </svg>
);
