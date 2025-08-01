import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const FunnelIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M2.62803 1.60102C5.02718 1.2056 7.48986 1 10 1C12.5101 1 14.9728 1.2056 17.372 1.60102C17.7342 1.66072 18 1.97389 18 2.34103V4.62868C18 5.22542 17.7629 5.79771 17.341 6.21967L12.659 10.9017C12.2371 11.3236 12 11.8959 12 12.4926V15.5291C12 16.2126 11.6893 16.859 11.1556 17.286L9.21852 18.8357C8.99339 19.0158 8.68496 19.0509 8.42511 18.926C8.16526 18.8011 8 18.5383 8 18.25V12.4926C8 11.8959 7.76295 11.3236 7.34099 10.9017L2.65901 6.21967C2.23705 5.79771 2 5.22542 2 4.62868V2.34103C2 1.97389 2.26578 1.66072 2.62803 1.60102Z"
        fill="currentColor"
      />
    </svg>
  ),
);
