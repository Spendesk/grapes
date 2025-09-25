import React from 'react';

import type { IconProps } from './iconProps';

export const CardLockCloseIcon = ({
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
      d="M17 5.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5V5a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 17 5v.5Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10.5 14.5h-8A1.5 1.5 0 0 1 1 13V8.454a.5.5 0 0 1 .5-.5h10.443a4.262 4.262 0 0 0-.693 2.324v.676a2.89 2.89 0 0 0-.75 1.946v1.6ZM12.75 11.66v-1.382c0-1.499 1.23-2.773 2.75-2.773s2.75 1.274 2.75 2.773v1.381A1.4 1.4 0 0 1 19 12.9V15.1a1.4 1.4 0 0 1-1.4 1.4h-4.2a1.4 1.4 0 0 1-1.4-1.4V12.9a1.4 1.4 0 0 1 .75-1.24Zm1.5-1.382c0-.692.58-1.273 1.25-1.273s1.25.58 1.25 1.273V11.5h-2.5v-1.222Z"
      clipRule="evenodd"
    />
  </svg>
);
