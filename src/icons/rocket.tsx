import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const RocketIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 14.2476C7.16237 13.5929 6.40714 12.8376 5.75236 12H1.75C1.33579 12 1 11.6642 1 11.25C1 8.48858 3.23858 6.25 6 6.25C6.49028 6.25 6.96496 6.32078 7.41387 6.45291C9.77032 3.15331 13.6335 1 18 1C18.0877 1 18.1751 1.00087 18.2624 1.0026C18.665 1.01058 18.9894 1.33502 18.9974 1.73759C18.9991 1.82486 19 1.91234 19 2C19 6.36651 16.8467 10.2297 13.5471 12.5861C13.6792 13.035 13.75 13.5097 13.75 14C13.75 16.7614 11.5114 19 8.75 19C8.33579 19 8 18.6642 8 18.25V14.2476ZM15 7C15 8.10457 14.1046 9 13 9C11.8954 9 11 8.10457 11 7C11 5.89543 11.8954 5 13 5C14.1046 5 15 5.89543 15 7Z"
        fill="currentColor"
      />
      <path
        d="M6.58153 16.1461C6.7172 15.9173 6.84871 15.6955 7 15.5L4.5 13C4.30449 13.1513 4.08271 13.2828 3.85392 13.4185C2.97823 13.9378 2 14.5179 2 16.5V18H3.5C5.48215 18 6.06224 17.0218 6.58153 16.1461Z"
        fill="currentColor"
      />
    </svg>
  ),
);
