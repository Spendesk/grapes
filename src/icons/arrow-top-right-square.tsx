import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ArrowTopRightSquareIcon = /*@__PURE__*/ forwardRef<
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
        fillRule="evenodd"
        d="M11.75 3.25a.75.75 0 0 1 .75-.75h4.25a.75.75 0 0 1 .75.75V7.5a.75.75 0 0 1-1.5 0V5.06l-8.22 8.22a.75.75 0 0 1-1.06-1.06L14.94 4H12.5a.75.75 0 0 1-.75-.75M4.75 6a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75V11a.75.75 0 0 1 1.5 0v4.25a2.25 2.25 0 0 1-2.25 2.25h-8.5a2.25 2.25 0 0 1-2.25-2.25v-8.5A2.25 2.25 0 0 1 4.75 4.5H9A.75.75 0 0 1 9 6z"
        clipRule="evenodd"
      />
    </svg>
  ),
);
