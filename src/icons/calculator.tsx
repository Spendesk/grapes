import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const CalculatorIcon = /*@__PURE__*/ forwardRef<
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
        d="M15.799 1.24C15.329 1 14.712 1 13.48 1H6.52c-1.232 0-1.848 0-2.319.24a2.2 2.2 0 0 0-.961.961C3 2.671 3 3.288 3 4.52v10.96c0 1.232 0 1.848.24 2.319.21.414.547.75.961.961.47.24 1.087.24 2.319.24h6.96c1.232 0 1.848 0 2.319-.24a2.2 2.2 0 0 0 .961-.961c.24-.47.24-1.087.24-2.319V4.52c0-1.232 0-1.848-.24-2.319a2.2 2.2 0 0 0-.961-.961M6.742 8.97a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5m4 .75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0m2.5-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5m-5.75 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0m2.5-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5m4-6.75c0-.415-.359-.75-.8-.75h-6.4c-.442 0-.8.335-.8.75v1.5c0 .413.358.75.8.75h6.4c.441 0 .8-.337.8-.75zM6.742 14a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5m4 .75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0m2.5-3.28a.75.75 0 0 0-.75.75v2.5a.75.75 0 1 0 1.5 0v-2.5a.75.75 0 0 0-.75-.75"
        clipRule="evenodd"
      />
    </svg>
  ),
);
