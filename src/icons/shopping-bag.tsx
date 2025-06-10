import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ShoppingBagIcon = /*@__PURE__*/ forwardRef<
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
        fillRule="evenodd"
        d="M5.954 5v1H4.606c-.918 0-1.684.694-1.764 1.598l-.835 9.5C1.917 18.121 2.732 19 3.77 19h12.46c1.038 0 1.853-.88 1.763-1.902l-.835-9.5A1.762 1.762 0 0 0 15.394 6h-1.348V5c0-2.21-1.812-4-4.046-4-2.235 0-4.046 1.79-4.046 4ZM10 2.5C8.603 2.5 7.47 3.62 7.47 5v1h5.057V5c0-1.38-1.132-2.5-2.528-2.5ZM7.47 10c0 1.38 1.132 2.5 2.529 2.5 1.396 0 2.528-1.12 2.528-2.5V8.75c0-.414.34-.75.759-.75s.759.336.759.75V10c0 2.21-1.812 4-4.046 4-2.235 0-4.046-1.79-4.046-4V8.75c0-.414.34-.75.759-.75s.758.336.758.75V10Z"
        clipRule="evenodd"
      />
    </svg>
  ),
);
