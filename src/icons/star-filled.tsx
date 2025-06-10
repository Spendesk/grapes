import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const StarFilledIcon = /*@__PURE__*/ forwardRef<
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
        d="M8.451 2.076a1.653 1.653 0 0 1 3.098 0l1.642 4.113 4.263.355c1.488.125 2.09 2.057.957 3.068l-3.248 2.898.993 4.333c.346 1.51-1.233 2.705-2.506 1.895L10 16.417l-3.65 2.321c-1.273.81-2.852-.384-2.506-1.895l.993-4.333-3.248-2.898c-1.134-1.01-.53-2.943.957-3.068l4.263-.355z"
        clipRule="evenodd"
      />
    </svg>
  ),
);
