import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const DoubleEllipsisIcon = /*@__PURE__*/ forwardRef<
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
        d="M7.5 3C8.32843 3 9 3.67157 9 4.5C9 5.32843 8.32843 6 7.5 6C6.67157 6 6 5.32843 6 4.5C6 3.67157 6.67157 3 7.5 3Z"
        fill="currentColor"
      />
      <path
        d="M7.5 8.5C8.32843 8.5 9 9.17157 9 10C9 10.8284 8.32843 11.5 7.5 11.5C6.67157 11.5 6 10.8284 6 10C6 9.17157 6.67157 8.5 7.5 8.5Z"
        fill="currentColor"
      />
      <path
        d="M9 15.5C9 14.6716 8.32843 14 7.5 14C6.67157 14 6 14.6716 6 15.5C6 16.3284 6.67157 17 7.5 17C8.32843 17 9 16.3284 9 15.5Z"
        fill="currentColor"
      />
      <path
        d="M12.5 3C13.3284 3 14 3.67157 14 4.5C14 5.32843 13.3284 6 12.5 6C11.6716 6 11 5.32843 11 4.5C11 3.67157 11.6716 3 12.5 3Z"
        fill="currentColor"
      />
      <path
        d="M12.5 8.5C13.3284 8.5 14 9.17157 14 10C14 10.8284 13.3284 11.5 12.5 11.5C11.6716 11.5 11 10.8284 11 10C11 9.17157 11.6716 8.5 12.5 8.5Z"
        fill="currentColor"
      />
      <path
        d="M14 15.5C14 14.6716 13.3284 14 12.5 14C11.6716 14 11 14.6716 11 15.5C11 16.3284 11.6716 17 12.5 17C13.3284 17 14 16.3284 14 15.5Z"
        fill="currentColor"
      />
    </svg>
  ),
);
