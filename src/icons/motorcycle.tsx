import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const MotorcycleIcon = /*@__PURE__*/ forwardRef<
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
        d="M8.104 4.5a.75.75 0 0 0 0 1.5h2.136l1.3 1.511-1.803-.236a1.25 1.25 0 0 0-.67.097l-3.9 1.733-.49-.489a1.25 1.25 0 0 0-.884-.366H1.75a.75.75 0 1 0 0 1.5H2.8a3 3 0 1 0 4.176 2.37l1.505.94c.199.124.428.19.662.19h1.097a1.25 1.25 0 0 0 1.023-.532l2.095-2.983q.275.331.533.632a3 3 0 1 0 1.322-.762A99 99 0 0 1 13.5 7.548l.94-.274a.75.75 0 1 0-.393-1.448l-1.577.447s-.893-1.05-1.128-1.3c-.235-.249-.601-.474-.981-.474zm7.12 6.716a.8.8 0 0 0 .214-.107Q15.7 11.002 16 11a1.5 1.5 0 1 1-.776.216M4 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
        clipRule="evenodd"
      />
    </svg>
  ),
);
