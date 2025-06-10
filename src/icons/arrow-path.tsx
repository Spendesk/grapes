import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ArrowPathIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M10 3.5a6.5 6.5 0 0 0-6.25 4.706.75.75 0 1 1-1.442-.412A8.003 8.003 0 0 1 16.5 5.336V3.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1 0-1.5h1.728A6.5 6.5 0 0 0 10 3.5m7.177 7.779a.75.75 0 0 1 .515.928A8.003 8.003 0 0 1 3.5 14.665v1.585a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5H4.522a6.503 6.503 0 0 0 11.728-1.707.75.75 0 0 1 .927-.514"
        clipRule="evenodd"
      />
    </svg>
  ),
);
