import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const CircleStrikeoutIcon = /*@__PURE__*/ forwardRef<
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
        d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm2.86 3.98a6.5 6.5 0 0 1 9.12-9.12l-9.12 9.12Zm1.16 1.16a6.5 6.5 0 0 0 9.12-9.12l-9.12 9.12Z"
      />
    </svg>
  ),
);
