import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ArrowUpIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M9.47 3.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1-1.06 1.06l-3.97-3.97v10.69a.75.75 0 0 1-1.5 0V5.56L5.28 9.53a.75.75 0 0 1-1.06-1.06z"
        clipRule="evenodd"
      />
    </svg>
  ),
);
