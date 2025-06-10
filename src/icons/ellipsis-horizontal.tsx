import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const EllipsisHorizontalIcon = /*@__PURE__*/ forwardRef<
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
        d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
      />
    </svg>
  ),
);
