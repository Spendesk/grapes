import React from 'react';

import type { IconProps } from './iconProps';

export const CardArrowDownIcon = ({
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
    <g fill="currentColor">
      <path d="M17 5.498a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-.5A1.5 1.5 0 0 1 2.5 3.5h13A1.5 1.5 0 0 1 17 4.999zM12.77 7.95H1.5a.5.5 0 0 0-.5.5v4.542a1.5 1.5 0 0 0 1.5 1.499h8.057l-.398-.399a2.247 2.247 0 0 1 0-3.179c.7-.7 1.75-.842 2.591-.425V8.246q0-.15.02-.296" />
      <path
        fillRule="evenodd"
        d="M18.78 11.973a.75.75 0 0 1 0 1.06l-3.25 3.248a.75.75 0 0 1-1.06 0l-3.25-3.248a.749.749 0 1 1 1.06-1.06l1.97 1.968V8.246a.75.75 0 0 1 1.5 0v5.695l1.97-1.968a.75.75 0 0 1 1.06 0"
        clipRule="evenodd"
      />
    </g>
  </svg>
);
