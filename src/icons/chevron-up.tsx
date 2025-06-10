import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ChevronUpIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M9.468 7.42a.75.75 0 0 1 1.06 0l4.25 4.248a.75.75 0 0 1-1.061 1.06L9.999 9.01 6.28 12.73a.75.75 0 0 1-1.06-1.061z"
        clipRule="evenodd"
      />
    </svg>
  ),
);
