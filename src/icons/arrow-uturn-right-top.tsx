import React from 'react';

import type { IconProps } from './iconProps';

export const ArrowUturnRightTopIcon = ({
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
      d="M12.468 2.22a.75.75 0 0 1 1.061 0l5.25 5.247a.75.75 0 0 1 0 1.06l-5.25 5.253a.75.75 0 0 1-1.06-1.06l3.97-3.973H6.379a3.877 3.877 0 0 0 0 7.754h2.866a.75.75 0 0 1 0 1.5H6.378a5.377 5.377 0 0 1 0-10.754h10.06l-3.97-3.967a.75.75 0 0 1 0-1.06"
      clipRule="evenodd"
    />
  </svg>
);
