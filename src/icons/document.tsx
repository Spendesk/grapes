import React from 'react';

import type { IconProps } from './iconProps';

export const DocumentIcon = ({
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.8 19H5.2C3.98497 19 3 18.015 3 16.8V3.2C3 1.98497 3.98497 1 5.2 1H11.1007C11.6851 1 12.2455 1.23252 12.6583 1.64625L16.3575 5.35449C16.7689 5.76692 17 6.32569 17 6.90824V16.8C17 18.015 16.015 19 14.8 19ZM6 11.25C6 10.8358 6.33579 10.5 6.75 10.5H13.25C13.6642 10.5 14 10.8358 14 11.25C14 11.6642 13.6642 12 13.25 12H6.75C6.33579 12 6 11.6642 6 11.25ZM6 14.25C6 13.8358 6.33579 13.5 6.75 13.5H13.25C13.6642 13.5 14 13.8358 14 14.25C14 14.6642 13.6642 15 13.25 15H6.75C6.33579 15 6 14.6642 6 14.25Z"
      fill="currentColor"
    />
  </svg>
);
