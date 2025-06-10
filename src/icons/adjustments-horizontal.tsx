import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const AdjustmentsHorizontalIcon = /*@__PURE__*/ forwardRef<
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
        d="M10 3.75a2 2 0 1 0-4 0 2 2 0 0 0 4 0M17.25 4.5a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5zM5 3.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75M4.25 17a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zM17.25 17a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5zM9 10a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1 0-1.5h5.5A.75.75 0 0 1 9 10M17.25 10.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zM14 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0M10 16.25a2 2 0 1 0-4 0 2 2 0 0 0 4 0"
      />
    </svg>
  ),
);
