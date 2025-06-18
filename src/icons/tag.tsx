import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const TagIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M5.60803 3C4.16765 3 3 4.16765 3 5.60803V8.6111C3 9.30279 3.27477 9.96615 3.76387 10.4553L10.5447 17.2361C11.5632 18.2546 13.2146 18.2546 14.2331 17.2361L17.2361 14.2331C18.2546 13.2146 18.2546 11.5632 17.2361 10.5447L10.4553 3.76387C9.96615 3.27477 9.30279 3 8.6111 3H5.60803ZM6.12963 7.17284C6.70578 7.17284 7.17284 6.70578 7.17284 6.12963C7.17284 5.55348 6.70578 5.08642 6.12963 5.08642C5.55348 5.08642 5.08642 5.55348 5.08642 6.12963C5.08642 6.70578 5.55348 7.17284 6.12963 7.17284Z"
        fill="currentColor"
      />
    </svg>
  ),
);
