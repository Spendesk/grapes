import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ReceiptQuestionIcon = /*@__PURE__*/ forwardRef<
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
        d="M3 3.2A2.2 2.2 0 0 1 5.2 1h9.6A2.2 2.2 0 0 1 17 3.2v15.05a.75.75 0 0 1-1.075.676l-2.8-1.344-2.8 1.344a.75.75 0 0 1-.65 0l-2.8-1.344-2.8 1.344A.75.75 0 0 1 3 18.25zm5.834 2.786c-.23.289-.334.67-.334.971a.75.75 0 0 1-1.5 0c0-.59.19-1.313.66-1.905C8.152 4.434 8.92 4 9.965 4c1.27 0 2.06.567 2.497 1.249.402.628.467 1.29.467 1.53 0 .7-.195 1.24-.527 1.671-.3.391-.69.653-.971.843l-.02.014c-.318.213-.511.35-.65.523-.11.14-.208.336-.208.708a.75.75 0 0 1-1.5 0c0-.69.2-1.22.534-1.64.293-.37.67-.623.944-.808l.041-.027c.31-.21.504-.35.642-.528.114-.148.215-.36.215-.757v-.022l-.007-.06a1.6 1.6 0 0 0-.223-.639c-.166-.258-.483-.557-1.234-.557-.585 0-.923.224-1.131.486m2.13 7.256a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
        clipRule="evenodd"
      />
    </svg>
  ),
);
