import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ArrowDownTrayIcon = /*@__PURE__*/ forwardRef<
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
        d="M10.75 2.75a.75.75 0 0 0-1.5 0v7.69L6.28 7.47a.75.75 0 1 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06l-2.97 2.97z"
      />
      <path
        fill="currentColor"
        d="M2.75 12a.75.75 0 0 1 .75.75v2.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-2.5a.75.75 0 1 1 1.5 0v2.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-2.5a.75.75 0 0 1 .75-.75"
      />
    </svg>
  ),
);
