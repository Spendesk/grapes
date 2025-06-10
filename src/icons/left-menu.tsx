import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const LeftMenuIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M16.75 3A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5A2.25 2.25 0 0 1 3.25 3zm0 12.5H7v-11h9.75a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75"
        clipRule="evenodd"
      />
    </svg>
  ),
);
