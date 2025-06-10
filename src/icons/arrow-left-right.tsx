import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ArrowLeftRightIcon = /*@__PURE__*/ forwardRef<
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
        d="M6.53 2.22a.75.75 0 0 1 0 1.06L4.56 5.25h8.69a.75.75 0 0 1 0 1.5H4.56l1.97 1.97a.75.75 0 1 1-1.06 1.061l-3.25-3.25a.75.75 0 0 1 0-1.061l3.25-3.25a.75.75 0 0 1 1.06 0m6.94 8a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.251a.75.75 0 0 1-1.06-1.06l1.97-1.97H6.75a.75.75 0 0 1 0-1.5h8.69l-1.97-1.97a.75.75 0 0 1 0-1.061"
        clipRule="evenodd"
      />
    </svg>
  ),
);
