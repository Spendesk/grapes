import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const BuildingBankIcon = /*@__PURE__*/ forwardRef<
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
        d="M1.407 7.184a1 1 0 0 0-.353 1.13.99.99 0 0 0 .949.688H3V15.5a1 1 0 0 0-1 1h-.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H18a1 1 0 0 0-1-1V9.002h.999a.99.99 0 0 0 .949-.689 1 1 0 0 0-.352-1.13l-7.997-4.982a.99.99 0 0 0-1.195 0zM15 15.5V9.002h-2V15.5zm-4 0V9.002H9V15.5zm-4 0V9.002H5V15.5z"
        clipRule="evenodd"
      />
    </svg>
  ),
);
