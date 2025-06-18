import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const CircleHalfFilledIcon = /*@__PURE__*/ forwardRef<
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
        d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm3.4 4.6a6.5 6.5 0 1 0 9.2-9.2l-9.2 9.2Z"
      />
    </svg>
  ),
);
