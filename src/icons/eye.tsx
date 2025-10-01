import React from 'react';

import type { IconProps } from './iconProps';

export const EyeIcon = ({
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
      fillRule="evenodd"
      d="M9.998 4c-4.51 0-7.63 3.425-8.875 5.52a.88.88 0 0 0 .028.943C2.553 12.558 5.853 16 9.998 16s7.446-3.443 8.847-5.537a.88.88 0 0 0 .028-.942C17.628 7.425 14.508 4 9.998 4m-4.56 8.81a13.5 13.5 0 0 1-2.816-2.859c.906-1.384 2.549-3.121 4.74-3.957a4 4 0 1 0 5.28.003c2.187.836 3.827 2.572 4.732 3.954a13.5 13.5 0 0 1-2.815 2.86c-1.357 1.002-2.911 1.689-4.56 1.689-1.65 0-3.205-.687-4.562-1.69"
      clipRule="evenodd"
    />
  </svg>
);
