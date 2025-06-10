import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ClockFilledIcon = /*@__PURE__*/ forwardRef<
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
        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0m-7.25-4.75a.75.75 0 0 0-1.5 0V10a.75.75 0 0 0 .275.58l2.75 2.25a.75.75 0 1 0 .95-1.16L10.75 9.644z"
        clipRule="evenodd"
      />
    </svg>
  ),
);
