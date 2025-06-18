import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const Square3Stack3dIcon = /*@__PURE__*/ forwardRef<
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
        d="m3.2 12.87-.83.48a.75.75 0 0 0 0 1.3l7.25 4.25c.23.13.53.13.76 0l7.25-4.25a.75.75 0 0 0 0-1.3l-.83-.48-5.66 3.32c-.7.41-1.58.41-2.28 0L3.2 12.87Z"
      />
      <path
        fill="currentColor"
        d="m3.2 8.87-.83.48a.75.75 0 0 0 0 1.3l7.25 4.25c.23.13.53.13.76 0l7.25-4.25a.75.75 0 0 0 0-1.3l-.83-.48-5.66 3.32c-.7.41-1.58.41-2.28 0L3.2 8.87Z"
      />
      <path
        fill="currentColor"
        d="M10.38 1.1a.75.75 0 0 0-.76 0L2.37 5.35a.75.75 0 0 0 0 1.3l7.25 4.25c.23.13.53.13.76 0l7.25-4.25a.75.75 0 0 0 0-1.3L10.38 1.1Z"
      />
    </svg>
  ),
);
