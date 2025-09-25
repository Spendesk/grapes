import React from 'react';

import type { IconProps } from './iconProps';

export const PuzzleIcon = ({
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
      d="M6.5 17.5a2 2 0 1 1 4 0v.5a.5.5 0 0 0 .5.5h2.3a2.2 2.2 0 0 0 2.2-2.2V14a.5.5 0 0 1 .5-.5h.5a2 2 0 1 0 0-4H16a.5.5 0 0 1-.5-.5V6.7a2.2 2.2 0 0 0-2.2-2.2H11a.5.5 0 0 1-.5-.5v-.5a2 2 0 1 0-4 0V4a.5.5 0 0 1-.5.5H3.7a2.2 2.2 0 0 0-2.2 2.2V9a.5.5 0 0 0 .5.5h.5a2 2 0 1 1 0 4H2a.5.5 0 0 0-.5.5v2.3a2.2 2.2 0 0 0 2.2 2.2H6a.5.5 0 0 0 .5-.5z"
    />
  </svg>
);
