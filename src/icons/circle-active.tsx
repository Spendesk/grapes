import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const CircleActiveIcon = /*@__PURE__*/ forwardRef<
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
        d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 10.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z"
        clipRule="evenodd"
      />
    </svg>
  ),
);
