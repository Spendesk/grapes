import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ChatBubbleEllipsisIcon = /*@__PURE__*/ forwardRef<
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2.5C5.69006 2.5 2 5.5334 2 9.5C2 11.5244 2.97849 13.3253 4.49899 14.5848C4.48371 15.2294 4.29476 15.829 3.97742 16.3409C3.83914 16.564 3.82753 16.8431 3.9468 17.0769C4.06608 17.3107 4.29888 17.4651 4.56065 17.4841C4.70585 17.4947 4.85237 17.5 5 17.5C6.3037 17.5 7.51177 17.0834 8.49617 16.3766C8.98381 16.4577 9.48658 16.5 10 16.5C14.3099 16.5 18 13.4666 18 9.5C18 5.5334 14.3099 2.5 10 2.5ZM10 10.5C10.5523 10.5 11 10.0523 11 9.5C11 8.94772 10.5523 8.5 10 8.5C9.44772 8.5 9 8.94772 9 9.5C9 10.0523 9.44772 10.5 10 10.5ZM8 9.5C8 10.0523 7.55228 10.5 7 10.5C6.44772 10.5 6 10.0523 6 9.5C6 8.94772 6.44772 8.5 7 8.5C7.55228 8.5 8 8.94772 8 9.5ZM13 10.5C13.5523 10.5 14 10.0523 14 9.5C14 8.94772 13.5523 8.5 13 8.5C12.4477 8.5 12 8.94772 12 9.5C12 10.0523 12.4477 10.5 13 10.5Z"
        fill="currentColor"
      />
    </svg>
  ),
);
