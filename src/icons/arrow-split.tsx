import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ArrowSplitIcon = /*@__PURE__*/ forwardRef<
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
        d="M14.22 17.78a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 1 0-1.06 1.06L15.44 14h-4.091L7.98 10l3.368-4h4.09l-1.22 1.22a.75.75 0 0 0 1.061 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 0 0-1.06 1.06l1.22 1.22H11a.75.75 0 0 0-.574.267L6.651 9.25H2.75a.75.75 0 0 0 0 1.5h3.901l3.775 4.483A.75.75 0 0 0 11 15.5h4.44l-1.22 1.22a.75.75 0 0 0 0 1.06"
        clipRule="evenodd"
      />
    </svg>
  ),
);
