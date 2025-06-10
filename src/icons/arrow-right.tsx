import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ArrowRightIcon = /*@__PURE__*/ forwardRef<
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
        d="M10.47 4.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 0 1-1.06-1.06l3.97-3.97H3.75a.75.75 0 0 1 0-1.5h10.69l-3.97-3.97a.75.75 0 0 1 0-1.06"
        clipRule="evenodd"
      />
    </svg>
  ),
);
