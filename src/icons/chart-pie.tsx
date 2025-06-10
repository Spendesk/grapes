import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ChartPieIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M12.039 8.965c-.555 0-1.004-.45-1.004-1.004v-5.02c0-.554.452-1.01 1-.932a7.03 7.03 0 0 1 5.956 5.955c.079.55-.378 1.001-.933 1.001z"
      />
      <path
        fill="currentColor"
        d="M8.026 4.017c.55-.079 1.001.378 1.001.933v5.019c0 .554.45 1.004 1.004 1.004h5.02c.554 0 1.01.452.932 1a7.029 7.029 0 0 1-13.983-1c0-3.541 2.62-6.47 6.026-6.956"
      />
    </svg>
  ),
);
