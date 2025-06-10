import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const CardRoundedArrowsIcon = /*@__PURE__*/ forwardRef<
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
        d="M13.999 8.41c1.052 0 1.997.473 2.634 1.224h-.616a.75.75 0 0 0-.748.753.75.75 0 0 0 .748.753h2.232a.75.75 0 0 0 .748-.753V8.138a.75.75 0 0 0-.748-.753.75.75 0 0 0-.747.753v.225a4.94 4.94 0 0 0-3.503-1.454c-2.234 0-4.117 1.482-4.745 3.514a.751.751 0 0 0 1.434.444 3.47 3.47 0 0 1 3.31-2.456M18.253 12.409a.75.75 0 0 0-.933.505A3.47 3.47 0 0 1 14 15.404a3.45 3.45 0 0 1-2.631-1.22h.612a.75.75 0 0 0 .748-.753.75.75 0 0 0-.748-.753H9.748a.75.75 0 0 0-.748.753v2.249a.75.75 0 0 0 .748.753.75.75 0 0 0 .747-.753v-.23A4.94 4.94 0 0 0 14 16.905c2.25 0 4.146-1.505 4.759-3.562a.75.75 0 0 0-.505-.934"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M16.5 5.407a.5.5 0 0 0 .5-.5v-.5a1.5 1.5 0 0 0-1.5-1.502h-13A1.5 1.5 0 0 0 1 4.406v.5a.5.5 0 0 0 .5.501zm-9 8.51h-5A1.5 1.5 0 0 1 1 12.414v-4.55a.5.5 0 0 1 .5-.501h7.875A6.5 6.5 0 0 0 7.82 9.98a2.25 2.25 0 0 0 .28 1.917c-.374.404-.601.944-.601 1.534z"
        clipRule="evenodd"
      />
    </svg>
  ),
);
