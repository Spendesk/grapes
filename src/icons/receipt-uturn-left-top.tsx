import React from 'react';

import type { IconProps } from './iconProps';

export const ReceiptUturnLeftTopIcon = ({
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
      d="M5.2 1A2.2 2.2 0 0 0 3 3.2v15.05a.75.75 0 0 0 1.07.68l2.8-1.35 2.8 1.35c.21.1.45.1.65 0l2.8-1.35 2.8 1.35a.75.75 0 0 0 1.08-.68V3.2A2.2 2.2 0 0 0 14.8 1H5.2Zm4.05 5.3a.75.75 0 1 0-1-1.1l-2.5 2.24a.75.75 0 0 0 0 1.12l2.5 2.25a.75.75 0 0 0 1-1.12L8.2 8.75h1.93a1.88 1.88 0 0 1 0 3.75.75.75 0 0 0 0 1.5 3.37 3.37 0 1 0 0-6.75H8.2l1.05-.94Z"
    />
  </svg>
);
