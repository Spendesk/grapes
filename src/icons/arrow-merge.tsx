import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ArrowMergeIcon = /*@__PURE__*/ forwardRef<
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
        d="M7 4.5C7.22122 4.5 7.43172 4.5974 7.57422 4.7666L11.3496 9.25H15.4395L14.2197 8.03027C13.9269 7.73745 13.927 7.26265 14.2197 6.96973C14.5125 6.67691 14.9873 6.67613 15.2803 6.96875L17.7803 9.46875C17.8347 9.52321 17.8771 9.58725 17.9121 9.6543C17.9665 9.75813 18 9.87468 18 10C18 10.1423 17.9575 10.2734 17.8887 10.3867C17.8577 10.4377 17.8232 10.4874 17.7803 10.5303L15.2803 13.0303C14.9874 13.3229 14.5126 13.3229 14.2197 13.0303C13.9268 12.7374 13.9268 12.2616 14.2197 11.9688L15.4395 10.75H11.3496L7.57422 15.2334C7.43172 15.4026 7.22122 15.5 7 15.5H2.75C2.33579 15.5 2 15.1642 2 14.75C2 14.3358 2.33579 14 2.75 14H6.65137L10.0195 10L6.65137 6H2.75C2.33579 6 2 5.66421 2 5.25C2 4.83579 2.33579 4.5 2.75 4.5H7Z"
        clipRule="evenodd"
      />
    </svg>
  ),
);
