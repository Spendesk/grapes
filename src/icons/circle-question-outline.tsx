import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const CircleQuestionOutlineIcon = /*@__PURE__*/ forwardRef<
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
        d="M8.834 6.986c-.23.289-.334.669-.334.971a.75.75 0 0 1-1.5 0c0-.59.19-1.313.66-1.905C8.152 5.433 8.92 5 9.965 5c1.27 0 2.06.567 2.497 1.248.402.628.467 1.29.467 1.53 0 .7-.195 1.241-.527 1.672-.3.39-.69.653-.971.843l-.02.013c-.318.214-.511.35-.65.524-.11.14-.208.336-.208.708a.75.75 0 0 1-1.5 0c0-.69.2-1.22.534-1.641.293-.369.67-.623.944-.807l.041-.027c.31-.21.504-.35.642-.528.114-.148.215-.361.215-.757v-.022l-.007-.06a1.6 1.6 0 0 0-.223-.639c-.166-.258-.483-.557-1.234-.557-.585 0-.923.224-1.131.486M10.965 14.242a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16m6.5-8a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"
        clipRule="evenodd"
      />
    </svg>
  ),
);
