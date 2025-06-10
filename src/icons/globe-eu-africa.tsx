import React, { forwardRef } from 'react';

import { IconProps } from './iconProps';

export const GlobeEuAfricaIcon = /*@__PURE__*/ forwardRef<
  SVGSVGElement,
  IconProps
>(
  (
    { width = 20, height = 20, viewBox = '0 0 20 20', role = 'image', ...rest },
    ref,
  ) => (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      role={role}
      width={width}
      height={height}
      {...rest}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1.5.2a6.5 6.5 0 1 1-8.55-6.37L6.93 5.62a1.45 1.45 0 0 0 1.9 2.02l.18-.09a.5.5 0 0 1 .23-.05h.14a.5.5 0 0 1 .45.72l-.03.06a.4.4 0 0 1-.36.22h-.5c-.75 0-1.46.38-1.88 1l-.04.07a2.1 2.1 0 0 0 1.08 3.16c.24.08.4.3.4.54v1.05a1.18 1.18 0 0 0 2.1.74l1.6-2.02c.2-.23.3-.53.3-.84 0-.31.13-.62.35-.85.46-.45.54-1.17.18-1.71l-.47-.7a.37.37 0 0 1 .53-.5l.34.26c.32.24.74.27 1.1.1.22-.12.5-.07.67.1l1.3 1.3Z"
      />
    </svg>
  ),
);
