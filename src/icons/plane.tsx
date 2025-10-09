import React from 'react';

import type { IconProps } from './iconProps';

export const PlaneIcon = ({
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
      d="M17.56 2.44a1.5 1.5 0 0 1 0 2.12L15 7.122v10.017a.862.862 0 0 1-1.686.252l-2.006-6.577-2.878 2.878-.482 3.862c-.064.513-.769.604-.96.124l-1.254-3.133a.5.5 0 0 0-.278-.278l-3.133-1.253c-.48-.192-.389-.896.124-.96l3.862-.483 2.878-2.878L2.61 6.686A.862.862 0 0 1 2.862 5h10.017l2.56-2.56a1.5 1.5 0 0 1 2.122 0"
    />
  </svg>
);
