import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const CardIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M19 6.24c0 .23 0 .346-.038.437a.5.5 0 0 1-.272.272c-.092.037-.207.037-.439.037H1.75c-.232 0-.347 0-.439-.037a.5.5 0 0 1-.272-.272C1 6.586 1 6.47 1 6.24c0-.693 0-1.039.113-1.312a1.5 1.5 0 0 1 .818-.816C2.205 4 2.552 4 3.246 4h13.508c.694 0 1.041 0 1.315.112a1.5 1.5 0 0 1 .818.816c.113.273.113.62.113 1.312M1 9.993c0-.47 0-.705.147-.852.146-.146.382-.146.854-.146h15.998c.472 0 .708 0 .854.146.147.147.147.382.147.852v3.014c0 1.41 0 2.116-.44 2.555-.44.438-1.147.438-2.563.438H4.003c-1.416 0-2.124 0-2.563-.438C1 15.123 1 14.418 1 13.007z"
      />
    </svg>
  ),
);
