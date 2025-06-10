import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ShoppingCartIcon = /*@__PURE__*/ forwardRef<
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
        d="M1 1.75c0-.414.333-.75.744-.75h1.617c.867 0 1.602.645 1.72 1.51L5.15 3c4.545.013 8.981.499 13.26 1.412a.75.75 0 0 1 .578.875 49 49 0 0 1-1.607 6.2.745.745 0 0 1-.707.513H5.963a2.487 2.487 0 0 0-2.275 1.5H17.13c.41 0 .744.336.744.75s-.333.75-.744.75H2.746a.74.74 0 0 1-.546-.24.75.75 0 0 1-.196-.567 4 4 0 0 1 2.697-3.486L3.607 2.716A.25.25 0 0 0 3.36 2.5H1.744A.747.747 0 0 1 1 1.75M5.963 17.5c0 .828-.667 1.5-1.489 1.5a1.494 1.494 0 0 1-1.489-1.5c0-.828.667-1.5 1.49-1.5.821 0 1.488.672 1.488 1.5M15.393 19c.822 0 1.488-.672 1.488-1.5s-.666-1.5-1.489-1.5c-.822 0-1.488.672-1.488 1.5s.666 1.5 1.489 1.5"
      />
    </svg>
  ),
);
