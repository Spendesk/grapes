import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ChevronRightIcon = /*@__PURE__*/ forwardRef<
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
        d="M7.22 5.62a.75.75 0 0 1 1.06 0l4.249 4.248a.75.75 0 0 1 0 1.06l-4.249 4.25a.75.75 0 0 1-1.06-1.061l3.718-3.719L7.22 6.68a.75.75 0 0 1 0-1.06"
        clipRule="evenodd"
      />
    </svg>
  ),
);
