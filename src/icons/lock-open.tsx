import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const LockOpenIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M5 9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5a4.5 4.5 0 1 0-9 0v.75a.75.75 0 0 0 1.5 0V5.5a3 3 0 0 1 6 0V9z"
      />
    </svg>
  ),
);
