import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const BellIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M8.511 3.19a1.633 1.633 0 0 1 3.157.049c2.347.691 4.054 2.802 4.054 5.3 0 1.741.433 3.383 1.2 4.831.101.192.104.42.008.615a.71.71 0 0 1-.5.379 32 32 0 0 1-3.106.468l-1.464.116a33 33 0 0 1-3.72 0l-1.464-.116a32 32 0 0 1-3.106-.468.71.71 0 0 1-.5-.38.67.67 0 0 1 .009-.614c.766-1.448 1.199-3.09 1.199-4.832 0-2.56 1.795-4.715 4.233-5.349M11.378 16s-1.031.024-1.391.024S8.62 16 8.62 16a.62.62 0 0 0-.567.396c-.1.24-.06.515.106.716a2.35 2.35 0 0 0 3.68 0 .7.7 0 0 0 .106-.716.62.62 0 0 0-.568-.396"
      />
    </svg>
  ),
);
