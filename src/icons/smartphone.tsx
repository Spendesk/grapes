import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const SmartphoneIcon = /*@__PURE__*/ forwardRef<
  SVGSVGElement,
  IconProps
>(
  (
    { width = 20, height = 20, viewBox = '0 0 20 20', role = 'image', ...rest },
    ref,
  ) => (
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
        d="M8 16.25C8 15.8358 8.33579 15.5 8.75 15.5H11.25C11.6642 15.5 12 15.8358 12 16.25C12 16.6642 11.6642 17 11.25 17H8.75C8.33579 17 8 16.6642 8 16.25Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 4C4 2.34315 5.34315 1 7 1H13C14.6569 1 16 2.34315 16 4V16C16 17.6569 14.6569 19 13 19H7C5.34315 19 4 17.6569 4 16V4ZM8 2.5V3.25C8 3.66421 8.33579 4 8.75 4H11.25C11.6642 4 12 3.66421 12 3.25V2.5H13C13.8284 2.5 14.5 3.17157 14.5 4V16C14.5 16.8284 13.8284 17.5 13 17.5H7C6.17157 17.5 5.5 16.8284 5.5 16V4C5.5 3.17157 6.17157 2.5 7 2.5H8Z"
        fill="currentColor"
      />
    </svg>
  ),
);
