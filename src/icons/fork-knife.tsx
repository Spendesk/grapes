import React, { forwardRef } from 'react';

import { IconProps } from './iconProps';

export const ForkKnifeIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M3.77778 3C4.20733 3 4.55556 3.34662 4.55556 3.77419V8H6.00111V3.77419C5.89111 3.34662 6.34933 3 6.77889 3C7.20844 3 7.55667 3.34662 7.55667 3.77419V8H9.00222V3.77419C9 3.34662 9.35045 3 9.78 3C10.2096 3 10.5578 3.34662 10.5578 3.77419V8.8381C10.5578 10.5425 9.23834 11.8911 7.55667 11.8911V17.2258C7.55667 17.6534 7.20844 18 6.77889 18C6.34933 18 6.00111 17.6534 6.00111 17.2258V11.8911C4.31944 11.8911 3 10.5425 3 8.8381V3.77419C3 3.34662 3.34822 3 3.77778 3ZM15.4444 11.8911V17.2258C15.4444 17.6534 15.7927 18 16.2222 18C16.6518 18 17 17.6534 17 17.2258V3.84319C17 3.37751 16.6207 3 16.1529 3C14.3298 3 13 4.47112 13 6.28584V10.325C13 11.1899 13.5562 11.8911 14.4252 11.8911H15.4444Z"
        fill="currentColor"
      />
    </svg>
  ),
);
