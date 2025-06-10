import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const MapPinIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="m9.693 18.434-.003-.001-.006-.003-.018-.008a6 6 0 0 1-.281-.14c-.186-.096-.446-.24-.757-.433a13.7 13.7 0 0 1-2.273-1.765C4.698 14.488 3 11.993 3 8.5a7 7 0 0 1 14 0c0 3.492-1.698 5.988-3.354 7.584a13.7 13.7 0 0 1-2.274 1.765 12 12 0 0 1-.976.544l-.062.029-.018.008-.006.003h-.002c-.198.087-.308.067-.308.067s-.11.02-.307-.066M10 11.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
        clipRule="evenodd"
      />
    </svg>
  ),
);
