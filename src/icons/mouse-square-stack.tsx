import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const MouseSquareStackIcon = /*@__PURE__*/ forwardRef<
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
        d="M13.5 2h-6A1.5 1.5 0 0 0 6 3.5v8A1.5 1.5 0 0 0 7.5 13h5.057l-.955-2.868a2.001 2.001 0 0 1 2.53-2.529l.868.29V3.5A1.5 1.5 0 0 0 13.5 2"
      />
      <path
        fill="currentColor"
        d="m18.854 13.377-1.185-1.185.8-.8a.5.5 0 0 0-.196-.828l-4.615-1.538a.5.5 0 0 0-.633.632l1.538 4.615a.5.5 0 0 0 .829.196l.8-.8 1.185 1.185a.5.5 0 0 0 .707 0l.77-.77a.5.5 0 0 0 0-.707M2.5 9.5a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 0 0-1.5h-.5A2.25 2.25 0 0 0 1 9.5v6.25A2.25 2.25 0 0 0 3.25 18H7.5a2.25 2.25 0 0 0 2.25-2.25v-.5a.75.75 0 0 0-1.5 0v.5a.75.75 0 0 1-.75.75H3.25a.75.75 0 0 1-.75-.75z"
      />
    </svg>
  ),
);
