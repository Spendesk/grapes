import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const PizzaIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M7.077 2.003a.753.753 0 0 0-.817.677.744.744 0 0 0 .677.81c2.161.193 4.327 1.319 6.287 3.27 1.96 1.953 3.09 4.11 3.283 6.263a.751.751 0 0 0 1.494-.14c-.232-2.587-1.577-5.052-3.714-7.18-2.138-2.13-4.613-3.468-7.21-3.7M5.374 5.667 4.857 7.45c.596.136 1.04.667 1.038 1.302a1.348 1.348 0 0 1-1.814 1.259l-2.033 6.708a.994.994 0 0 0 1.243 1.238l11.04-3.32c.373-.112.655-.43.672-.818.091-2.126-.903-4.225-2.73-6.046-1.829-1.82-3.943-2.865-6.077-2.774-.39.017-.709.297-.822.67m5.131 7.168a1.35 1.35 0 0 0 1.347-1.341 1.334 1.334 0 0 0-1.341-1.336A1.35 1.35 0 0 0 9.164 11.5a1.335 1.335 0 0 0 1.341 1.336m-3.868 1.093a.9.9 0 0 1-.897.894.89.89 0 0 1-.894-.89.9.9 0 0 1 .897-.894.89.89 0 0 1 .894.89"
        clipRule="evenodd"
      />
    </svg>
  ),
);
