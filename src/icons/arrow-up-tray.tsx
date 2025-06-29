import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ArrowUpTrayIcon = /*@__PURE__*/ forwardRef<
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
        d="M10.5303 2.21967C10.2374 1.92678 9.76256 1.92678 9.46967 2.21967L5.21967 6.46967C4.92678 6.76256 4.92678 7.23744 5.21967 7.53033C5.51256 7.82322 5.98744 7.82322 6.28033 7.53033L9.25 4.56066L9.25 12.25C9.25 12.6642 9.58579 13 10 13C10.4142 13 10.75 12.6642 10.75 12.25V4.56066L13.7197 7.53033C14.0126 7.82322 14.4874 7.82322 14.7803 7.53033C15.0732 7.23744 15.0732 6.76256 14.7803 6.46967L10.5303 2.21967Z"
        fill="currentColor"
      />
      <path
        d="M2.75 12C3.16421 12 3.5 12.3358 3.5 12.75V15.25C3.5 15.9404 4.05964 16.5 4.75 16.5H15.25C15.9404 16.5 16.5 15.9404 16.5 15.25V12.75C16.5 12.3358 16.8358 12 17.25 12C17.6642 12 18 12.3358 18 12.75V15.25C18 16.7688 16.7688 18 15.25 18H4.75C3.23122 18 2 16.7688 2 15.25V12.75C2 12.3358 2.33579 12 2.75 12Z"
        fill="currentColor"
      />
    </svg>
  ),
);
