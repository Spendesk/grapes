import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ChevronDoubleRightIcon = /*@__PURE__*/ forwardRef<
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
        d="M5.276 5.532a.75.75 0 0 0-1.06 1.06l3.718 3.72-3.719 3.717a.75.75 0 0 0 1.06 1.061l4.25-4.249a.75.75 0 0 0 0-1.06zM11.274 5.532a.75.75 0 0 0-1.061 1.06l3.718 3.72-3.718 3.717a.75.75 0 0 0 1.06 1.061l4.25-4.249a.75.75 0 0 0 0-1.06z"
      />
    </svg>
  ),
);
