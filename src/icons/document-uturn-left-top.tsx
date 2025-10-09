import React from 'react';

import type { IconProps } from './iconProps';

export const DocumentUturnLeftTopIcon = ({
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
      d="M5.2 19h9.6a2.2 2.2 0 0 0 2.2-2.2V6.908a2.2 2.2 0 0 0-.642-1.554l-3.7-3.708A2.2 2.2 0 0 0 11.101 1H5.2A2.2 2.2 0 0 0 3 3.2v13.6A2.2 2.2 0 0 0 5.2 19ZM9.557 6.248a.75.75 0 0 1-.056 1.059l-1.047.942h1.92c1.864 0 3.375 1.537 3.375 3.375 0 1.89-1.51 3.4-3.375 3.375-.414.025-.75-.31-.75-.75 0-.389.336-.75.75-.75a1.875 1.875 0 0 0 0-3.75h-1.92l1.047.943a.75.75 0 1 1-1.003 1.115l-2.5-2.25a.75.75 0 0 1 0-1.115l2.5-2.25a.75.75 0 0 1 1.059.056Z"
      clipRule="evenodd"
    />
  </svg>
);
