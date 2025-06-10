import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ReceiptIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M3 3.2A2.2 2.2 0 0 1 5.2 1h9.6A2.2 2.2 0 0 1 17 3.2v15.05a.75.75 0 0 1-1.075.676l-2.8-1.344-2.8 1.344a.75.75 0 0 1-.65 0l-2.8-1.344-2.8 1.344A.75.75 0 0 1 3 18.25zm3 1.106a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2zm-1 5.75a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75m.75 2.25a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5z"
        clipRule="evenodd"
      />
    </svg>
  ),
);
