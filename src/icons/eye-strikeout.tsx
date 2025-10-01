import React from 'react';

import type { IconProps } from './iconProps';

export const EyeStrikeoutIcon = ({
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
      d="M17.78 17.78a.75.75 0 0 0 0-1.06L3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 0 0 1.06 0M18.845 10.463a15 15 0 0 1-2.43 2.77l-1.063-1.063c.84-.738 1.53-1.538 2.022-2.219-.905-1.382-2.545-3.118-4.732-3.955A4 4 0 0 1 14 9c0 .538-.106 1.05-.299 1.52L7.534 4.351A8.8 8.8 0 0 1 9.998 4c4.51 0 7.63 3.425 8.875 5.52a.88.88 0 0 1-.028.943M9.814 12.996l-3.81-3.81a4 4 0 0 0 3.81 3.81"
    />
    <path
      fill="currentColor"
      d="M2.622 9.951a11.2 11.2 0 0 1 1.928-2.22l-1.062-1.06a12.6 12.6 0 0 0-2.365 2.85.88.88 0 0 0 .028.942C2.553 12.558 5.853 16 9.998 16c.848 0 1.66-.144 2.429-.391l-1.229-1.229q-.59.118-1.2.12c-1.65 0-3.204-.687-4.56-1.69a13.5 13.5 0 0 1-2.816-2.859"
    />
  </svg>
);
