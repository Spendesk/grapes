import React from 'react';

import type { IconProps } from './iconProps';

export const Circle3StrikeoutIcon = ({
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
      fill="currentCOlor"
      fillRule="evenodd"
      d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm1.5.33V10a6.5 6.5 0 0 1 6.83-6.5l-6.82 6.83Zm.4 1.93c.23.62.56 1.2.96 1.72l9.12-9.12a6.6 6.6 0 0 0-1.72-.96L3.9 12.26Zm11.24-6.24-9.12 9.12c.52.4 1.1.73 1.72.96l8.36-8.36a6.49 6.49 0 0 0-.96-1.72Zm1.35 3.65-6.82 6.82a6.52 6.52 0 0 0 6.82-6.82Z"
    />
  </svg>
);
