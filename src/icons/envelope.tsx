import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const EnvelopeIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M3.2 3A2.2 2.2 0 0 0 1 5.2v9.6A2.2 2.2 0 0 0 3.2 17h13.6a2.2 2.2 0 0 0 2.2-2.2V5.2A2.2 2.2 0 0 0 16.8 3zm.02 3.47a.75.75 0 0 1 1.06 0L10 12.19l5.72-5.72a.75.75 0 0 1 1.06 1.06l-3.094 3.095 2.094 2.095a.75.75 0 1 1-1.06 1.06l-2.095-2.094-2.095 2.095a.75.75 0 0 1-1.06 0l-2.095-2.095L5.28 13.78a.75.75 0 0 1-1.06-1.061l2.094-2.095L3.22 7.531a.75.75 0 0 1 0-1.061"
        clipRule="evenodd"
      />
    </svg>
  ),
);
