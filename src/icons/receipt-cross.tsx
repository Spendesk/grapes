import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ReceiptCrossIcon = /*@__PURE__*/ forwardRef<
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
        d="M3 3.2A2.2 2.2 0 0 1 5.2 1h9.6A2.2 2.2 0 0 1 17 3.2v15.05a.75.75 0 0 1-1.075.676l-2.8-1.344-2.8 1.344a.75.75 0 0 1-.65 0l-2.8-1.344-2.8 1.344A.75.75 0 0 1 3 18.25zm4.22 4.02a.75.75 0 0 1 1.06 0L10 8.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L11.06 10l1.72 1.72a.75.75 0 0 1-1.06 1.06L10 11.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L8.94 10 7.22 8.28a.75.75 0 0 1 0-1.06"
        clipRule="evenodd"
      />
    </svg>
  ),
);
