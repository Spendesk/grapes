import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ReceiptCheckedIcon = /*@__PURE__*/ forwardRef<
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
        d="M3 3.2A2.2 2.2 0 0 1 5.2 1h9.6A2.2 2.2 0 0 1 17 3.2v15.05a.75.75 0 0 1-1.075.676l-2.8-1.344-2.8 1.344a.75.75 0 0 1-.65 0l-2.8-1.344-2.8 1.344A.75.75 0 0 1 3 18.25zm10.691 3.444a.75.75 0 0 1 .166 1.047l-4 5.5a.75.75 0 0 1-1.137.09l-2.5-2.5A.75.75 0 1 1 7.28 9.72l1.88 1.88 3.483-4.79a.75.75 0 0 1 1.048-.166"
        clipRule="evenodd"
      />
    </svg>
  ),
);
