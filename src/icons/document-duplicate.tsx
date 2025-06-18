import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const DocumentDuplicateIcon = /*@__PURE__*/ forwardRef<
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
        d="M7 3.5a1.5 1.5 0 0 1 1.5 -1.5h3.879a1.5 1.5 0 0 1 1.061 0.439l3.121 3.121a1.5 1.5 0 0 1 0.439 1.061V12.5a1.5 1.5 0 0 1 -1.5 1.5h-1V10.621a3 3 0 0 0 -0.879 -2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7z"
        fill="currentColor"
      />
      <path
        d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5 -1.5V10.621a1.5 1.5 0 0 0 -0.439 -1.061L9.44 6.439a1.5 1.5 0 0 0 -1.061 -0.439z"
        fill="currentColor"
      />
    </svg>
  ),
);
