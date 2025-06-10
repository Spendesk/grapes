import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const CubeIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M10.362 1.095a.74.74 0 0 0-.724 0L2.523 5.088 10 9.285l7.477-4.197zM18 6.537l-7.25 4.07V19l6.862-3.852A.77.77 0 0 0 18 14.48zM9.25 19v-8.393L2 6.537v7.943c0 .278.149.534.388.668z"
      />
    </svg>
  ),
);
