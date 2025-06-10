import React, { forwardRef } from 'react';

import { IconProps } from './iconProps';

export const PaperPlaneIcon = /*@__PURE__*/ forwardRef<
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
        d="M3.4 17.88c-.89.4-1.9-.24-1.9-1.21v-4.03c0-.67.5-1.24 1.17-1.32l8.6-1.05c.3-.04.3-.5 0-.53l-8.6-1.06A1.33 1.33 0 0 1 1.5 7.36V3.33c0-.97 1.01-1.61 1.9-1.2l14.33 6.66a1.33 1.33 0 0 1 0 2.42L3.39 17.88Z"
      />
    </svg>
  ),
);
