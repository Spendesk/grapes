import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const SpendeskIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M8.544 11.335a.3.3 0 0 0-.09-.216L6.208 8.873a.306.306 0 0 1 0-.431l4.61-4.61a.305.305 0 0 0-.206-.532h-4.49a.3.3 0 0 0-.216.09L1.253 8.04a.88.88 0 0 0-.008 1.225l4.533 4.529c.12.12.314.12.434 0l2.243-2.243a.3.3 0 0 0 .09-.216M11.457 8.654c0 .08.032.158.09.216l2.246 2.246a.305.305 0 0 1 0 .43l-4.61 4.611a.306.306 0 0 0 .206.532h4.49c.081 0 .16-.033.217-.09l4.652-4.65a.88.88 0 0 0 .006-1.226l-4.531-4.528a.307.307 0 0 0-.434 0l-2.243 2.242a.3.3 0 0 0-.09.217"
      />
    </svg>
  ),
);
