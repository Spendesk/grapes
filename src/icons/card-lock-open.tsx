import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const CardLockOpenIcon = /*@__PURE__*/ forwardRef<
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
        fill="currentColor"
        d="M15.5 7.505c-1.396 0-2.592 1.057-2.745 2.435a.75.75 0 1 0 1.49.165c.068-.605.61-1.1 1.255-1.1.67 0 1.25.58 1.25 1.273V11.5H13.4a1.4 1.4 0 0 0-1.4 1.4V15.1a1.4 1.4 0 0 0 1.4 1.4h4.2a1.4 1.4 0 0 0 1.4-1.4V12.9a1.4 1.4 0 0 0-.75-1.24v-1.382c0-1.499-1.23-2.773-2.75-2.773M17 5.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5V5a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 17 5zM10.5 14.5v-1.6c0-.822.342-1.564.891-2.092a2.24 2.24 0 0 1-.127-1.034c.074-.67.304-1.287.651-1.82H1.5a.5.5 0 0 0-.5.5V13a1.5 1.5 0 0 0 1.5 1.5z"
      />
    </svg>
  ),
);
