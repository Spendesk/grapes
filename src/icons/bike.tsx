import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const BikeIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M10.746 4.5a.75.75 0 0 0 0 1.5h1.31l1.388 3.175a3.5 3.5 0 0 0-1.362 2.094H10.51L9.276 7.995h.116a.75.75 0 0 0 0-1.5H6.993a.75.75 0 0 0 0 1.5h.681l1.234 3.274h-.989a3.501 3.501 0 1 0-.009 1.5h4.18a3.497 3.497 0 1 0 2.727-4.196l-1.585-3.624a.75.75 0 0 0-.686-.449zm3.325 6.11.748 1.71a.75.75 0 1 0 1.374-.602l-.749-1.711h.057a1.997 1.997 0 1 1-1.43.602m-7.712.66H4.594a.75.75 0 0 0 0 1.5h1.749a2 2 0 1 1 .016-1.5"
        clipRule="evenodd"
      />
    </svg>
  ),
);
